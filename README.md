# PalettePilot

Project scaffold for a Next.js 15 App Router + Tailwind CSS application.

## Architecture

- `app/` - Next.js App Router routes and server-rendered pages.
- `client/` - Client-only UI modules and hooks for interactive components.
- `server/` - Server-only logic, services, and helper modules.
- `public/` - Static assets.
- `styles/` - Global styling.

## Config files

- `.env.local` - local secret values (not committed).
- `.env.example` - sample environment variables.
- `.gitignore` - ignored files and folders.
- `next.config.mjs` - Next.js configuration.
- `tailwind.config.js` / `postcss.config.js` - Tailwind setup.
- `.eslintrc.js` / `.prettierrc` - code quality formatting.

## Setup

```bash
npm install
npm run dev
```

## Notes

Keep business logic in `server/` and UI state/hooks in `client/`. Use `app/api/` for API routes and `app/` for page layout and server-rendered entry points.
