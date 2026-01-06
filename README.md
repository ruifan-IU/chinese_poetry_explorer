# Chinese Poetry Explorer

A Next.js application for exploring Chinese poetry, built with modern web technologies.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn or pnpm or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ruifan-IU/chinese_poetry_explorer.git
cd chinese_poetry_explorer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the `DATABASE_URL` with your PostgreSQL connection string:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

4. Generate Prisma Client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:push` - Push schema changes to database (for prototyping)

## Project Structure

```
chinese_poetry_explorer/
├── app/                    # Next.js App Router pages and layouts
│   ├── generated/         # Prisma generated client (auto-generated)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Utility functions and configurations
│   └── prisma.ts          # Prisma client singleton
├── prisma/                # Prisma schema and migrations
│   └── schema.prisma      # Database schema
├── public/                # Static assets
├── .env                   # Environment variables (not committed)
├── .env.example           # Example environment variables
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── prisma.config.ts       # Prisma configuration
├── tailwind.config.ts     # TailwindCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Database Schema

The application includes example models for Chinese poetry:

- **Author**: Stores information about poets (name, dynasty, biography)
- **Poem**: Stores poems with content, title, tags, and author relationship

You can modify these models in `prisma/schema.prisma` to fit your needs.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

