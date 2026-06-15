# PalettePilot — Claude Code Instructions

## Project Goal

An AI-powered Brand Color Palette Generator for designers.
Takes a brand description as input → generates professional color palettes with HEX codes, color explanations, accessibility insights, and export/save functionality.

## Tech Stack

- **Language:** JavaScript (ES2023)
- **Framework:** Next.js 15 (App Router)
- **Frontend:** React (Functional Components + Hooks only)
- **Styling:** Tailwind CSS
- **Database:** MongoDB (Atlas)
- **Runtime:** Node.js
- **AI Provider:** Groq (`llama-3.1-8b-instant`) — API key in `GROQ_API_KEY`
- **API Docs:** Swagger UI available at `/api-docs` (spec served from `/api/docs`)

## Project Structure Rules

1. **Separate business logic from UI.**
   React components handle presentation and interaction only.
   AI logic, data processing → dedicated services or utility files.

2. **Data access only through server actions, API routes, or service layers.**
   No database logic inside UI components.

3. **Server Components by default.**
   Use Client Components only when interactivity is required (`use client`).

4. **Small, reusable components.**
   No component should exceed a few hundred lines.

5. **No quick fixes that hide understanding.**
   Simple, readable, educational code always wins over clever abstractions.

## Code Style

- `camelCase` for variables and functions
- `PascalCase` for React components
- `UPPER_SNAKE_CASE` for constants
- `async/await` over promise chains
- One responsibility per file
- Clear, descriptive names — no abbreviations

## How Claude Should Work in This Project

This is a learning project. The developer is actively learning React, Next.js, SSR, API Routes, and Full Stack architecture.

When generating or editing code:

1. **Before writing code** — briefly explain what the file does and where it fits in the project structure.
2. **When there are multiple approaches** — explain the tradeoffs before choosing one.
3. **Comments in code** — only where they genuinely help understanding. Not on every line.
4. **Prefer teaching-oriented solutions** over advanced patterns.
5. **Before making edits** — ask for approval (use Ask before edits mode).
6. **Never delete or rename existing files** without explicitly asking first.

## API Structure

- `POST /api/palette` — generates a 5-color palette from a brand description using Groq
- `GET /api/docs` — serves the OpenAPI spec as JSON
- `/api-docs` — Swagger UI for testing the API manually

## What NOT to Do

- Do not place DB logic inside components
- Do not use Class Components
- Do not use `.then()` chains — use `async/await`
- Do not generate code without a brief explanation first
- Do not apply patterns the developer hasn't seen yet without explaining them
- Do not switch AI providers without updating this file
