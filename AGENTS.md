# AGENTS.md — Deskly

## 1. Project Overview
Deskly is a fullstack web application for managing internal work tickets.

Tech stack:
- Next.js (App Router)
- TypeScript
- PostgreSQL
- Prisma

---

## 2. Development Principles

- The human developer defines architecture and requirements.
- The AI agent (Codex) implements specific tasks.
- Tasks must be small and atomic.
- Only the requested scope should be implemented.

---

## 3. Coding Rules

- Use TypeScript everywhere
- Follow existing project structure
- Do not introduce new libraries without request
- Do not modify unrelated files
- Keep code simple and readable

---

## 4. Prisma & Database

- Use Prisma Client from `@/lib/prisma`
- Do not create new database connections
- Do not modify schema unless explicitly asked

---

## 5. API Development

- Use Next.js App Router API routes
- Validate input data
- Return proper HTTP status codes
- Handle errors explicitly

---

## 6. Workflow

For each task:

1. Read the task carefully
2. Identify required files
3. Implement minimal working solution
4. Ensure no unrelated changes
5. Ensure project builds successfully

---

## 7. Testing & Validation

- Code must pass:
  - `npm run lint`
  - `npm run build`
- Avoid breaking existing functionality

---

## 8. Restrictions

- Do not refactor large parts of the project
- Do not change architecture
- Do not add features not requested
