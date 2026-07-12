# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server (Next.js App Router, http://localhost:3000)
npm run build            # prisma generate && next build
npm run lint             # ESLint (eslint-config-next core-web-vitals + typescript)

npm run prisma:generate  # Regenerate Prisma client into lib/prisma-client (custom output dir)
npm run prisma:migrate   # Create/apply a dev migration
npm run prisma:push      # Push schema changes without a migration (prototyping)
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # tsx prisma/seed.ts — loads prisma/data/cleaned/*.json into the DB
```

All `prisma:*` scripts run via `node --env-file=.env`, so `.env` (not `.env.local`) is the source of
`DATABASE_URL`, `JWT_SECRET`, etc. There is no test runner configured in this repo.

Local Postgres for development: `docker compose up -d db` (see `compose.yaml`; also has an optional
`pgadmin` service on port 8080).

## Architecture

**Stack**: Next.js 16 (App Router) + React 19 + TypeScript, Prisma 6 (`@prisma/adapter-pg`) against
Postgres, TailwindCSS 4, Zod, custom JWT cookie auth (no NextAuth/Clerk).

### Prisma client has a non-default output path

The schema (`prisma/schema.prisma`) generates the client into `lib/prisma-client` instead of
`node_modules/@prisma/client`. Always import types/enums from `@/lib/prisma-client` (e.g.
`PoemType`, `MasteryLevel`), and the singleton client from `@/lib/prisma`. Run
`npm run prisma:generate` after any schema change before TypeScript will pick up new fields.

### Data model

Core content: `Dynasty` → `Poet` → `Poem` (many-to-many with `Tag`). `Poem.type` is an enum
(`shi` | `ci` | `wen`). `Poem.contentHash` is a unique SHA256 used by the data pipeline to dedupe.
`stars` on both `Poet` and `Poem` acts as a popularity score, incremented/decremented transactionally
when a user favorites/unfavorites a poem (see `app/api/favorites/route.ts`).

User-owned data hangs off `User` via two join models:
- `UserFavorite` — simple bookmarking.
- `UserMemorization` — spaced-repetition study state (SM-2 style: `easeFactor`, `interval`,
  `repetitions`, `masteryLevel` enum `NEW→LEARNING→YOUNG→MATURE→MASTERED`). Algorithm lives in
  `lib/spaced-repetition.ts` (`calculateNextReview`, `getDegradedMasteryLevel`). A Vercel cron job
  (`vercel.json` → `/api/cron/daily-review`, daily at 02:00, protected by `Bearer $CRON_SECRET`)
  degrades overdue mastery levels and emails users with due reviews via Resend.

### Auth

Custom JWT-in-httpOnly-cookie auth in `lib/auth.ts` (`auth_token` cookie, 7-day expiry,
`getCurrentUser()` reads/verifies it server-side). There is no middleware.ts — every API route
protects itself by calling `getCurrentUser()` and returning 401 if null. Follow this pattern for
new protected routes rather than adding centralized middleware. Passwords are hashed with bcryptjs.

Signup includes email verification (Resend-sent link, token+expiry on `User`). Unverified users are
soft-limited to 5 favorites (`MAX_FAVORITES_UNVERIFIED` in `app/api/favorites/route.ts`, mirrored in
`app/favorites/page.tsx`) to nudge verification without hard-blocking new users — see
`FAVORITES_LIMIT_IMPLEMENTATION.md` and `EMAIL_VERIFICATION_SETUP.md` for the full design.

### Read/query layer

`lib/queries.ts` centralizes read queries for poems/poets/tags/dynasties (filtering, search,
detail-by-id) used by Server Components in `app/`. `lib/favorites.ts` and `lib/memorization.ts`
provide the equivalent per-user data-access helpers. Prefer adding to these files over inlining
Prisma calls in page components.

### Data pipeline (scripts/, prisma/)

Poetry data originates as raw JSON (`prisma/data/raw/`), gets cleaned/deduped/validated by
`scripts/clean_data.py` (pure stdlib, SHA256-based dedup) into `prisma/data/cleaned/`, and is loaded
into Postgres by `prisma/seed.ts`. `prisma/categorize-poems.ts` and `scripts/data_insights.py` /
`scripts/create_dev_subset.py` are auxiliary data-prep tools. `scripts/semantic_search.py` is an
OpenAI-embeddings proof-of-concept (unrelated to the app's runtime search, which is a simple
case-insensitive `contains` query in `lib/queries.ts#searchPoems`).

Note: `lib/validations/poetry.ts` (Zod schemas with a `cuid` `authorId`) is leftover boilerplate from
the initial template and does not match the current schema (`Poet`/`Dynasty` use integer IDs) — it
is not wired into any current route.

### Path alias

`@/*` maps to the repo root (`tsconfig.json`), e.g. `@/lib/prisma`, `@/lib/prisma-client`.
