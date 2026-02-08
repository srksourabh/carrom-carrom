# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

West Bengal Carrom Community Platform — mobile-first monorepo with `backend/` (Express + Prisma + TypeScript) and `mobile/` (React Native + Expo). Deployed on Vercel as serverless API + static SPA.

**Live:** https://carrom-two.vercel.app
**DB:** Neon PostgreSQL (ap-southeast-1)

## Commands

### Backend (run from `backend/`)
```bash
npm run dev              # Dev server with nodemon hot-reload (port 3000)
npm run build            # TypeScript → dist/
npm start                # Production: node dist/index.js
npm run prisma:migrate   # Run Prisma migrations (prisma migrate dev)
npm run prisma:generate  # Generate Prisma client
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:seed      # Seed DB: 20 players, 2 clubs, 50 matches, 1 admin
```

### Mobile (run from `mobile/`)
```bash
npm start       # Expo dev server
npm run web     # Launch web version
npm run android # Android emulator
npm run ios     # iOS simulator
```

### Local Infrastructure
```bash
docker compose up -d   # PostgreSQL 16 + Redis 7 for local dev
```

### Vercel Deployment
Build runs: `prisma generate` → `expo export --platform web` → serves `mobile/dist/` as SPA with `api/index.ts` as serverless function.

## Architecture

### Backend (`backend/src/`)
Strict MVC layering: **routes → controllers → services → Prisma**

- `routes/index.ts` mounts all route modules at `/api/v1`
- `controllers/` extract params and call services, return via `apiResponse` helpers
- `services/` contain all business logic and Prisma queries
- `validators/` are Zod schemas applied by `middleware/validate.ts`
- `middleware/auth.ts` — JWT Bearer token extraction, attaches `req.user`
- `middleware/admin.ts` — checks `req.user.role` for admin access
- `middleware/errorHandler.ts` — `AppError` class + global handler (also maps Prisma error codes P2002/P2025)
- `utils/elo.ts` — ELO calculation, K-factor 32, floor 100
- `utils/carromPhysics.ts` — 2D physics engine (700x700 board, elastic collisions, friction, 4-corner pockets)

### Mobile (`mobile/src/`)
- `screens/` — screen components organized by feature (auth, home, rankings, match, challenge, club, feed, chat, profile, play)
- `hooks/` — React Query hooks wrapping API calls (one per domain: useAuth, useMatches, useRankings, etc.)
- `services/api.ts` — Axios instance with smart base URL detection (relative `/api/v1` on web prod, `localhost:3000` in dev) and automatic token refresh on 401
- `stores/authStore.ts` — Zustand with AsyncStorage persistence for auth state
- `navigation/` — React Navigation: `AuthStack` (login/OTP) vs `MainTabs` (6 bottom tabs with nested stacks)
- UI: React Native Paper (Material Design)
- Path alias: `@/*` → `src/*`

### Auth Flow
OTP passwordless: send-otp → verify-otp → JWT access token (15min) + refresh token (7d). In dev/mock mode, any email + OTP `123456` works. Admin: `admin@carromcarrom.com`.

### Match Flow
Record match (PENDING) → opponent confirms → ELO recalculated in Prisma transaction → rankings updated.

### Vercel Routing (`vercel.json`)
- `/health` → serverless function
- `/api/v1/*` → serverless function
- Everything else → `index.html` (SPA)

### Database
Prisma schema at `backend/prisma/schema.prisma`. Key models: User, Club, Match, Tournament, Challenge, Post, Comment, Conversation, Message, Notification, LiveStream, GameRoom, GameMove. Redis is optional with graceful fallback — rankings cache (5min TTL).

### Virtual Carrom Game Flow
Create game (WAITING) → opponent joins (IN_PROGRESS) → turns alternate: player sends striker position/angle/power → server runs physics simulation → returns updated board + pocketed coins → game ends when target score reached or all coins pocketed.

### Live Streaming Flow
Create stream (isLive=true) → viewers join/leave (viewer count tracked) → host ends stream (isLive=false).

## Important Gotchas

- **Express 4.x** (not 5): `req.params.id` type is `string | string[]` — always use `String(req.params.id)`
- **Prisma compound keys**: `findUnique` with `@@unique` needs `{ field1_field2: { field1, field2 } }` syntax. Prefer `findFirst` with individual fields.
- **Windows curl**: Single-quoted JSON with `!` gets mangled in Git Bash. Use `--data-raw` with escaped double quotes.
- **Vercel env vars**: Use `printf` not `echo` when piping to `vercel env add` (echo adds trailing newline).
- **Prisma Json fields**: Cast arrays via `as unknown as Prisma.InputJsonValue` when writing to Json columns.
- **No test suite or linter configured** — no Jest/Vitest/ESLint in the project yet.
- **Redis optional in serverless** — OTP mock mode bypasses Redis entirely.
- `.env` is loaded from both `backend/.env` and root `.env` (see `backend/src/config/index.ts`).
