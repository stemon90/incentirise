# IncentiRise — Progress Log

## Project Summary

Full-stack rewards and accountability platform built as a progressive DevOps learning system.
Career goal: Cloud/DevOps Engineer at $100k+ after tax.

## Stack

- Frontend: React + Vite (not started yet)
- Backend: Node.js + Express
- ORM: Prisma v7
- Database: PostgreSQL 16
- Environment: Windows 11 + WSL2 Ubuntu 24.04
- Editor: VS Code with Ubuntu terminal as default shell
- Version Control: Git + GitHub (GitHub connected)

## Environment Details

- Project path (Windows): C:\Users\Steven\incentirise
- Project path (Ubuntu): /mnt/c/Users/Steven/incentirise
- All backend code lives in: /mnt/c/Users/Steven/incentirise/backend
- PostgreSQL user: stevenuser
- PostgreSQL database: incentirise
- PostgreSQL port: 5432
- Prisma config: uses prisma.config.ts for connection URL (Prisma v7 requirement)
- Connection string format: postgresql://stevenuser:PASSWORD@localhost:5432/incentirise

## Database Models

- User (id, name, email, points, createdAt)
- Task (id, title, description, points, createdAt)
- TaskCompletion (id, userId, taskId, createdAt) — links User → Task
- Reward (id, title, description, pointCost, createdAt)
- Transaction (id, userId, rewardId, pointsSpent, createdAt) — links User → Reward

## Current Position

Phase 1 — Day 4 (not started)

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

## Next Session — Day 4 Goal

Build the first real API routes for Users.

Steps:

1. Create backend/src/routes/users.js
2. Build POST /users — create a new user in the database
3. Build GET /users — return all users
4. Build GET /users/:id — return one user by ID
5. Wire the routes into index.js
6. Test all three routes with curl
7. Commit progress

## Key Decisions Made

- PostgreSQL over SQLite (production-grade from day one, matches AWS RDS)
- WSL2 Ubuntu over Windows shell (Linux environment matches cloud servers)
- AWS over Azure (larger job market, better cert recognition)
- Prisma v7 requires connection URL in prisma.config.ts not schema.prisma
- Prisma v7 requires @prisma/adapter-pg for direct PostgreSQL connections
- Project files stay on Windows filesystem for now, revisit when Docker starts

## Known Gotchas

- PostgreSQL must be started manually each session: sudo service postgresql start
- Prisma v7 does NOT accept url = env("DATABASE_URL") in schema.prisma
- Prisma v7 does NOT accept datasources option in PrismaClient constructor
- Prisma v7 requires PrismaPg adapter — import { PrismaPg } from '@prisma/adapter-pg'
- stevenuser needs CREATEDB permission for Prisma shadow database during migrations
- npx prisma init auto-populates .env with Prisma cloud format if previous Prisma projects exist — always verify .env after init
- After any schema or config change always run: npx prisma generate
