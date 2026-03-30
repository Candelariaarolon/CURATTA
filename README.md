# CURATTA — Fashion Recommendation App

CURATTA is a Next.js 14 fashion recommendation web application. Create mood boards, upload outfit photos, get AI-powered style analysis, and receive personalised product recommendations.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Prisma** with SQLite
- **NextAuth.js v5** (JWT credentials)
- **Tailwind CSS** with a rose/pink design system
- **bcryptjs** for password hashing
- **Sharp** for image optimisation

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` (already provided) and update the values as needed:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Set up the database

```bash
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Mood Boards** — create boards and upload outfit images
- **Style Analysis** — automatic colour, style, garment, and pattern detection
- **Recommendations** — personalised product feed scored against your style profile
- **Favourites** — save products you love
- **Auth** — JWT-based sign-up / sign-in with middleware-protected routes

## Font

The application uses the system font stack (`system-ui, -apple-system, sans-serif`) via an inline style on the `<body>` element in `src/app/layout.tsx`.

## Deploy on Vercel

```bash
# Set NEXTAUTH_SECRET and DATABASE_URL in the Vercel dashboard, then:
vercel deploy
```

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.
