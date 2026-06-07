# Project Context & Rules

## Tech Stack

* Language: JavaScript (ES2023)
* Framework: Next.js 15 (App Router)
* Frontend: React
* Styling: Tailwind CSS
* Database: MongoDB
* Runtime: Node.js

## Project Goal

Build an AI-powered Brand Color Palette Generator for designers.
The application generates professional color palettes from a brand description, explains color choices, provides accessibility insights, and allows saving/exporting palettes.

## Architecture Rules

1. Keep business logic separate from UI components.
   React components should focus on presentation and user interaction.
   Data processing and AI-related logic should be placed in dedicated services or utility files.

2. Access data only through server actions, API routes, or dedicated service layers.
   Do not place database logic directly inside UI components.

3. Do not use "quick fixes" that hide understanding.
   Prefer simple, readable, educational code over clever abstractions.
   Every generated file should be easy for a junior developer to understand and explain.

4. Create small reusable components whenever possible.
   Avoid large components that exceed a few hundred lines.

5. Use Next.js best practices.
   Prefer Server Components by default and use Client Components only when interactivity is required.

## Learning Rules

1. Explain major architectural decisions before implementing them.

2. When generating new code, include short comments only where they help understanding.

3. Prefer teaching-oriented solutions over advanced patterns.

4. If there are multiple implementation options, briefly explain the tradeoffs.

5. Assume the developer is learning React, Next.js, SSR, API Routes, and Full Stack architecture.

## Style Guide

* Naming Convention:

  * camelCase for variables and functions
  * PascalCase for React components
  * UPPER_SNAKE_CASE for constants

* React Style:

  * Functional Components only
  * React Hooks only
  * No Class Components

* Code Style:

  * Keep files focused on a single responsibility
  * Prefer async/await over promise chains
  * Use clear descriptive names
  * Avoid duplicated code

## AI Assistant Instructions

Always use this project context.

When generating code:

1. Explain the purpose of the file.
2. Explain where the file belongs in the project structure.
3. Generate production-quality code.
4. Favor readability and learning over unnecessary complexity.
