# IncentiRise — Progress Log

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
- Version Control: Git + GitHub (GitHub connected)

## Environment Details

### Windows (Primary)

- Project path (Windows): C:\Users\Steven\incentirise
- Project path (Ubuntu): /mnt/c/Users/Steven/incentirise
- All backend code lives in: /mnt/c/Users/Steven/incentirise/backend
- PostgreSQL user: stevenuser
- PostgreSQL database: incentirise
- PostgreSQL port: 5432
- Prisma config: uses prisma.config.ts for connection URL (Prisma v7 requirement)
- Connection string format: postgresql://stevenuser:PASSWORD@localhost:5432/incentirise

### macOS (Secondary)

- Project path: /Users/stevenmontoya/incentirise
- PostgreSQL user: stevenuser
- PostgreSQL database: incentirise
- PostgreSQL port: 5432
- PostgreSQL started automatically via Homebrew services
- Node.js installed via Homebrew
- Connection string format: postgresql://stevenuser:PASSWORD@localhost:5432/incentirise

## Database Models

- User (id, name, email, points, createdAt)
- Task (id, title, description, points, createdAt)
- TaskCompletion (id, userId, taskId, createdAt) — links User → Task
- Reward (id, title, description, pointCost, createdAt)
- Transaction (id, userId, rewardId, pointsSpent, createdAt) — links User → Reward

## Current Position

Phase 1 — Day 8 (not started)

## Completed

### Phase 1 — Day 1

- Defined MVP scope: users, tasks, rewards, transactions, points system
- Created project folder, initialized Git
- Created README.md with full system definition
- Configured Git username and email
- First commit made

### Phase 1 — Day 2

- Verified Node.js, npm, Git, PostgreSQL all installed in WSL2 Ubuntu
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
- Confirmed /health route responds correctly via curl
- Committed all changes to Git

### Phase 1 — Day 4

- Set up full development environment on macOS from scratch
- Installed Homebrew, Node.js, npm, PostgreSQL 16
- Added PostgreSQL to system PATH
- Cloned repository from GitHub
- Installed dependencies with npm install
- Created .env file with database connection string
- Ran prisma migrate deploy — applied existing migration, all 5 tables created
- Ran npx prisma generate — generated Prisma client for macOS
- Confirmed server running on http://localhost:3000
- Confirmed /health route responding correctly
- Created backend/src/routes/users.js
- Built POST /users — creates a new user in the database
- Built GET /users — returns all users
- Built GET /users/:id — returns one user by ID
- Wired users router into index.js
- Fixed Prisma instance error — routes import shared prisma from index.js
- Tested all three routes successfully with curl
- Committed all changes to Git

### Phase 1 — Day 5

- Created backend/src/routes/tasks.js
- Built POST /tasks — creates a new task in the database
- Built GET /tasks — returns all tasks
- Built GET /tasks/:id — returns one task by ID
- Wired tasks router into index.js
- Tested all three routes successfully with curl
- Committed all changes to Git

### Phase 1 — Day 6

- Created backend/src/routes/rewards.js
- Built POST /rewards — creates a new reward in the database
- Built GET /rewards — returns all rewards
- Built GET /rewards/:id — returns one reward by ID
- Wired rewards router into index.js
- Fixed .env not loading — server must be started from inside backend/ folder
- Tested all three routes successfully with curl
- Installed VS Code via Homebrew on macOS
- Restored missing frontend/, controllers/, and middleware/ folders
- Committed all changes to Git

### Phase 1 — Day 7

- Created backend/src/routes/logic.js
- Built POST /complete-task — user completes a task, points added to balance, TaskCompletion record created
- Built POST /redeem-reward — user spends points on a reward, balance deducted, Transaction record created
- Fixed task.pointValue mismatch — schema uses points, updated logic.js accordingly
- Tested complete-task with curl — user earned 50 points
- Tested redeem-reward with curl — user spent 30 points, balance dropped to 20
- Full rewards loop working end to end
- Committed and pushed to GitHub

## Next Session — Day 8 Goals

Complete Phase 1 by making the app production-ready at the local level.

1. Add input validation to all routes — reject bad or missing data before it hits the database
2. Standardize error responses across all routes so every failure looks consistent
3. Test all routes with bad data to confirm validation is working
4. Commit and push all changes
5. Close out Phase 1 and prep for Phase 2 — Git Workflow and Code Discipline

## Key Decisions Made

- PostgreSQL over SQLite (production-grade from day one, matches AWS RDS)
- WSL2 Ubuntu over Windows shell (Linux environment matches cloud servers)
- AWS over Azure (larger job market, better cert recognition)
- Prisma v7 requires connection URL in prisma.config.ts not schema.prisma
- Prisma v7 requires @prisma/adapter-pg for direct PostgreSQL connections
- Project files stay on Windows filesystem for now, revisit when Docker starts
- Shared Prisma instance exported from index.js and imported by all route files

## Known Gotchas

### Windows

- PostgreSQL must be started manually each session: sudo service postgresql start
- Prisma v7 does NOT accept url = env("DATABASE_URL") in schema.prisma
- Prisma v7 does NOT accept datasources option in PrismaClient constructor
- Prisma v7 requires PrismaPg adapter — import { PrismaPg } from '@prisma/adapter-pg'
- stevenuser needs CREATEDB permission for Prisma shadow database during migrations
- npx prisma init auto-populates .env with Prisma cloud format if previous Prisma projects exist — always verify .env after init
- After any schema or config change always run: npx prisma generate
- Prisma v7 import pattern that works:
  import pkg from '@prisma/client'
  const { PrismaClient } = pkg

### macOS

- PostgreSQL starts automatically via Homebrew: brew services start postgresql@16
- PostgreSQL must be added to PATH manually after install
- After cloning on a new machine always run: npm install
- After cloning on a new machine always run: npx prisma generate
- Always create .env manually — it is never committed to Git
- Never create a second PrismaClient in route files — import the shared instance from index.js
- Server must be started from inside the backend/ folder or .env will not load
