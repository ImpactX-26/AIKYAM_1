# Educaro Pathfinder

Educaro Pathfinder is an agentic AI applicant journey platform built for applicants from India who want to study, work, or pursue vocational training in Germany.

## Features Built in Prototype
- **Frontend**: React + Vite, Tailwind CSS, TanStack Query, React Router.
  - Dashboard and AI Guide chat interface implemented.
- **Backend**: NestJS, TypeORM, SQLite (configurable for Postgres via env `DB_TYPE=postgres`).
  - Agent Orchestrator (`AgentsService`) coordinating `IntakeAgent` and `ValidationAgent`.
  - `LlmService` with Mock implementation for fallback when no API key is set.
  - Basic Seed logic for database.
- **Deployment**: `docker-compose.yml` for PostgreSQL included.

## How to Run
We have configured a `package.json` in the root that runs both the frontend and backend.

1. Set up `.env` (already done in `.env.example`).
2. Run `npm install` in the root folder.
3. Start the application:
   ```bash
   npm run dev
   ```
4. Access the frontend at `http://localhost:5173` (or `5174` if port is in use).

## Architecture & Data Flow
The AI Orchestrator loops through user's profile state to trigger specific sub-agents (Intake, Document Validation, Recommendations).

## Sample Docs
Place your sample docs in the `/sample-docs` folder for local testing with the Document Agent.
