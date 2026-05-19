# IncentiRise — Devlog

## Project Summary

Full-stack rewards and accountability platform built as a progressive DevOps learning system.
Career goal: Cloud/DevOps Engineer at $100k+ after tax.

## Stack

- Frontend: React + Vite (not started yet)
- Backend: Node.js + Express
- ORM: Prisma v7
- Database: PostgreSQL 16
- Environment: Windows 11 + WSL2 Ubuntu 24.04 (primary), macOS (secondary)
- Editor: VS Code with Ubuntu terminal as default shell
- Version Control: Git + GitHub

## Environment Details

### Windows (Primary)

- Project path (Windows): C:\Users\Steven\incentirise
- Project path (Ubuntu): /mnt/c/Users/Steven/incentirise
- Backend: /mnt/c/Users/Steven/incentirise/backend
- PostgreSQL user: stevenuser
- PostgreSQL database: incentirise
- PostgreSQL port: 5432
- Prisma config: prisma.config.ts (Prisma v7 requirement)
- Connection string: postgresql://stevenuser:PASSWORD@localhost:5432/incentirise

### macOS (Secondary)

- Project path: /Users/stevenmontoya/incentirise
- PostgreSQL user: stevenuser
- PostgreSQL database: incentirise
- PostgreSQL port: 5432
- PostgreSQL starts automatically via Homebrew services
- Node.js installed via Homebrew
- Connection string: postgresql://stevenuser:PASSWORD@localhost:5432/incentirise

## Database Models

- User (id, name, email, points, createdAt)
- Task (id, title, description, points, createdAt)
- TaskCompletion (id, userId, taskId, createdAt)
- Reward (id, title, description, pointCost, createdAt)
- Transaction (id, userId, rewardId, pointsSpent, createdAt)

## Current Position

Phase 2 — Day 9 (in progress)

---

## Session Log

### Phase 1 — Day 1

- Defined MVP scope: users, tasks, rewards, transactions, points system
- Initialized Git repository and project folder
- Created README.md with full system definition
- Configured Git username and email
- First commit made

### Phase 1 — Day 2

- Verified Node.js, npm, Git, and PostgreSQL installed in WSL2 Ubuntu
- Initialized backend with npm init -y
- Installed dependencies: express, prisma, @prisma/client, dotenv, cors
- Ran npx prisma init (Prisma v7)
- Configured prisma.config.ts with DATABASE_URL from .env
- Wrote full schema: User, Task, TaskCompletion, Reward, Transaction
- Created PostgreSQL user stevenuser with CREATEDB permission
- Ran first migration (20260513045405_init) — all 5 tables created
- Verified tables in Prisma Studio
- Committed 8 files to Git

### Phase 1 — Day 3

- Created backend/src/index.js — Express server entry point
- Installed @prisma/adapter-pg (required by Prisma v7 for direct DB connections)
- Configured PrismaClient with PrismaPg adapter using DATABASE_URL from .env
- Added cors and express.json() middleware
- Added /health route — returns { status: 'ok' }
- Confirmed server runs on http://localhost:3000
- Committed all changes to Git

### Phase 1 — Day 4

- Set up full development environment on macOS from scratch
- Installed Homebrew, Node.js, npm, PostgreSQL 16
- Added PostgreSQL to system PATH
- Cloned repository from GitHub and ran npm install
- Created .env with database connection string
- Ran prisma migrate deploy — applied existing migration, all 5 tables created
- Ran npx prisma generate — generated Prisma client for macOS
- Confirmed server and /health route working on http://localhost:3000
- Created backend/src/routes/users.js
- Built POST /users, GET /users, GET /users/:id
- Wired users router into index.js
- Fixed Prisma instance error — routes now import shared prisma from index.js
- Tested all three routes successfully with curl
- Committed all changes to Git

### Phase 1 — Day 5

- Created backend/src/routes/tasks.js
- Built POST /tasks, GET /tasks, GET /tasks/:id
- Wired tasks router into index.js
- Tested all three routes successfully with curl
- Committed all changes to Git

### Phase 1 — Day 6

- Created backend/src/routes/rewards.js
- Built POST /rewards, GET /rewards, GET /rewards/:id
- Wired rewards router into index.js
- Resolved .env not loading — server must be started from inside backend/ folder
- Tested all three routes successfully with curl
- Installed VS Code via Homebrew on macOS
- Restored missing frontend/, controllers/, and middleware/ folders
- Committed all changes to Git

### Phase 1 — Day 7

- Created backend/src/routes/logic.js
- Built POST /complete-task — completes a task, adds points to user balance, creates TaskCompletion record
- Built POST /redeem-reward — deducts points, creates Transaction record
- Resolved task.pointValue mismatch — schema uses points, updated logic.js accordingly
- Tested complete-task — user earned 50 points
- Tested redeem-reward — user spent 30 points, balance dropped to 20
- Full rewards loop working end to end
- Committed and pushed to GitHub

### Phase 1 — Day 8

- Installed Zod for schema-based input validation
- Created backend/src/middleware/validate.js — reusable middleware factory using Zod safeParse
- Wrote Zod schemas for all five operations: createUser, createTask, createReward, completeTask, redeemReward
- Updated all route files to use validate() middleware
- Standardized error response shape: { "error": "message" } across all routes
- Added Prisma P2002 handling for duplicate email on POST /users
- Added 404 handling for all not-found cases
- Added invalid ID handling for all /:id routes
- Added insufficient points check to POST /redeem-reward
- Ran 18 validation tests — all passed
- Committed and pushed to GitHub
- **Phase 1 complete**

### Phase 2 — Day 9

- Created feature branch: phase-2/git-workflow
- Enabled branch protection on GitHub — main now requires a pull request to merge
- Adopted conventional commits standard — all commits from Day 9 forward follow this format
- Reviewed Phase 1 commit history and rewrote each entry in conventional format as a retrospective exercise
- Opened and merged first pull request — no longer pushing directly to main

---

## Key Decisions

- PostgreSQL over SQLite — production-grade from day one, matches AWS RDS
- WSL2 Ubuntu over Windows shell — Linux environment matches cloud servers
- AWS over Azure — larger job market, better cert recognition
- Prisma v7 requires connection URL in prisma.config.ts, not schema.prisma
- Prisma v7 requires @prisma/adapter-pg for direct PostgreSQL connections
- Project files stay on Windows filesystem for now — revisit when Docker is introduced
- Single shared Prisma instance exported from index.js and imported by all route files

---

## Known Gotchas

### Windows

- PostgreSQL must be started manually each session: sudo service postgresql start
- Prisma v7 does not accept url = env("DATABASE_URL") in schema.prisma
- Prisma v7 does not accept datasources option in PrismaClient constructor
- Prisma v7 requires PrismaPg adapter: import { PrismaPg } from '@prisma/adapter-pg'
- stevenuser requires CREATEDB permission for Prisma shadow database during migrations
- npx prisma init may overwrite .env with Prisma Cloud format if prior projects exist — always verify after init
- After any schema or config change, run: npx prisma generate
- Prisma v7 import pattern:
  import pkg from '@prisma/client'
  const { PrismaClient } = pkg

### macOS

- PostgreSQL starts automatically via Homebrew: brew services start postgresql@16
- PostgreSQL must be added to PATH manually after install
- After cloning, always run npm install and npx prisma generate
- Always create .env manually — never committed to Git
- Never instantiate a second PrismaClient in route files — import the shared instance from index.js
- Server must be started from inside the backend/ folder or .env will not load
