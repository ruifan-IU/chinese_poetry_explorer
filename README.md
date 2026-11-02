# Chinese Poetry Explorer

A web app for reading, collecting and memorizing classical Chinese poetry. You
can browse poems by dynasty, poet, form and theme, save favorites, and learn
poems by heart with a spaced-repetition review schedule that sends reminder emails.

The poetry data is built by a reproducible Python pipeline. The pipeline cleans
the 全唐诗 (*Complete Tang Poems*) corpus and links poets to
[Wikidata](https://www.wikidata.org/) for identifiers, dates and portraits.
See [Data](#data).

## Features

- **Explore:** filter poems by dynasty, form (诗 / 词 / 文) and tag, and search
  titles, poet names and text.
- **Poem and poet pages:** full text, poet biography and the poet's other works.
- **Favorites:** bookmark poems. The favorite counts double as a popularity score.
- **Memorization:** SM-2-style spaced repetition with five mastery levels
  (`NEW → LEARNING → YOUNG → MATURE → MASTERED`) and a practice mode.
- **Daily review emails:** a scheduled job lowers the mastery level of overdue
  poems and emails users who have reviews due.
- **Accounts:** email and password sign-up with email verification. Unverified
  users can save up to 5 favorites.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Database | PostgreSQL, using [Prisma 6](https://www.prisma.io/) with `@prisma/adapter-pg` |
| Auth | Custom JWT in an httpOnly cookie, passwords hashed with bcryptjs |
| Email | [Resend](https://resend.com/) |
| Validation | [Zod](https://zod.dev/) |
| Data pipeline | Python 3, [OpenCC](https://github.com/BYVoid/OpenCC), Wikidata SPARQL |
| Hosting | Vercel, including Vercel Cron |

## Getting started

### Prerequisites

- Node.js 20+
- Docker, for local Postgres, or any PostgreSQL 15+ instance
- Python 3.10+, only needed to rebuild the dataset

### Setup

```bash
git clone https://github.com/ruifan-IU/chinese_poetry_explorer.git
cd chinese_poetry_explorer
npm install
cp .env.example .env        # then fill in the variables below
```

Start Postgres, create the schema and load the data:

```bash
docker compose up -d db     # Postgres on :5432 (add `pgadmin` for a GUI on :8080)
npm run prisma:generate     # generates the client into lib/prisma-client
npm run prisma:migrate
npm run prisma:seed         # loads the poem subset in prisma/data/dev/
npm run dev                 # http://localhost:3000
```

### Environment variables

All `prisma:*` scripts read `.env`, not `.env.local`.

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | Postgres connection string |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | for Docker | credentials for the `db` service in `compose.yaml` |
| `JWT_SECRET` | yes | signs the auth cookie. Use a long random string; the code's built-in fallback is not secret |
| `RESEND_API_KEY` | for email | verification and review-reminder emails |
| `FROM_EMAIL` | no | sender address (default `onboarding@resend.dev`) |
| `APP_URL` | no | base URL used in email links (default `http://localhost:3000`) |
| `CRON_SECRET` | in production | bearer token that protects `/api/cron/daily-review` |

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build (runs `prisma generate` first) and start |
| `npm run lint` | ESLint |
| `npm run prisma:generate` | Regenerate the Prisma client after schema changes |
| `npm run prisma:migrate` | Create and apply a dev migration |
| `npm run prisma:push` | Push schema changes without a migration (prototyping) |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run prisma:seed` | Load poetry data into the database |

## Data

### Sources

| Source | What it provides | License |
|---|---|---|
| [chinese-poetry/chinese-poetry](https://github.com/chinese-poetry/chinese-poetry) | 全唐诗 poems and poet bios, plus the 唐诗三百首 and 千家诗 anthologies | MIT |
| [Wikidata](https://www.wikidata.org/) | Poet identifiers (QIDs), aliases, birth and death dates, sitelink counts | CC0 |
| [Wikimedia Commons](https://commons.wikimedia.org/) | Poet portraits (planned) | per file; attribution is stored with each image |

### Pipeline

The scripts in [`scripts/`](scripts/) rebuild the Tang dataset from scratch:

```
fetch_tang_data.py      download the corpus and run the Wikidata SPARQL query
clean_tang_data.py      strip editorial notes, normalize authors, dedupe, convert to Simplified, score fame
match_wikidata_poets.py link local poets to Wikidata items
```

Main data decisions:

- **Editorial notes.** Notes and variant readings in the 全唐诗 text, such as
  `（一作…）`, are removed from the displayed text but kept per poem.
- **Unknown authors.** The source uses about a dozen terms for an unknown author
  (不詳, 無名氏, 缺名…). These are merged into a single 佚名 poet.
- **Fame.** Poem fame comes from curated anthologies, not search-engine hit
  counts, which mostly measured how common a title is. A poem counts as
  appearing in an anthology even when its text differs slightly (异文).

Every step writes a review report to `prisma/data/audit/` so the decisions can
be checked by hand. [`scripts/README.md`](scripts/README.md) has the full details.

> **Status:** the database is currently seeded from an older multi-dynasty
> subset in `prisma/data/dev/`. The new Tang pipeline will replace it once the
> Prisma schema and `prisma/seed.ts` are updated for its output: fame,
> Wikidata IDs and portraits.

## Project structure

```
app/
  api/
    auth/                 signup, login, logout, me, email verification
    favorites/            add or remove favorites (updates the stars counters in a transaction)
    memorization/         study list and review grading
    cron/daily-review/    daily mastery decay and reminder emails
  explore/  poems/[id]/  poets/[id]/  favorites/  memorization/   pages
  components/             UI components
lib/
  auth.ts                 JWT cookie auth; getCurrentUser()
  queries.ts              read queries for poems, poets, tags and dynasties
  favorites.ts            per-user favorites data access
  memorization.ts         per-user memorization data access
  spaced-repetition.ts    SM-2 scheduling and mastery degradation
  email.ts                Resend email templates
  prisma.ts               Prisma client singleton
  prisma-client/          generated Prisma client (custom output path)
prisma/
  schema.prisma           data model
  seed.ts                 database seeding
  data/                   dev subset (committed), audit reports (committed); raw/ and cleaned/ (not committed)
scripts/                  Python data pipeline (see scripts/README.md)
```

### Data model

```
Dynasty ─< Poet ─< Poem >─< Tag
                    │
User ─< UserFavorite >──┤
User ─< UserMemorization >┘   (easeFactor, interval, repetitions, masteryLevel, nextReviewAt)
```

- `Poem.type` is `shi`, `ci` or `wen`.
- `Poem.contentHash` is a unique SHA-256 of the content, used to deduplicate poems.
- `stars` on `Poem` and `Poet` counts how many users have favorited them.

## Design notes

There's no auth middleware. Every protected API route calls `getCurrentUser()`
and returns 401 itself, which keeps the access check visible in each route. More
design notes:

- [EMAIL_VERIFICATION_SETUP.md](EMAIL_VERIFICATION_SETUP.md): the sign-up verification flow.
- [FAVORITES_LIMIT_IMPLEMENTATION.md](FAVORITES_LIMIT_IMPLEMENTATION.md): the soft limit for unverified users.
- [MEMORIZATION_SCHEMA_DESIGN.md](MEMORIZATION_SCHEMA_DESIGN.md): the spaced-repetition data model.

## Deployment

Deploy to Vercel with the environment variables above. `vercel.json` schedules
`/api/cron/daily-review` every day at 02:00 UTC. Vercel sends `CRON_SECRET` as a
bearer token, and the route rejects requests without it.
