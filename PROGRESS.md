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
- Version Control: Git + GitHub (GitHub not connected yet)

## Environment Details

- Project path (Windows): C:\Users\Steven\incentirise
- Project path (Ubuntu): /mnt/c/Users/Steven/incentirise
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

## Roadmap

- Phase 1 — Core App (Local MVP)
- Phase 2 — Code Discipline + Git Workflow
- Phase 3 — Dockerization
- Phase 4 — CI/CD Automation
- Phase 5 — Cloud Deployment (AWS Core)
- Phase 6 — Infrastructure as Code (Terraform)
- Phase 7 — Observability + Reliability
- Phase 8 — Scaling + Architecture Upgrade

## Current Position

Phase 1 — Day 3 (not started)

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

## Next Session — Day 3

Goal: Build the Express server and first API routes

Steps:

1. Create src/index.js — Express server entry point
2. Connect Prisma client to Express
3. Build GET/POST routes for Users
4. Test routes manually
5. Commit progress

## Key Decisions Made

- PostgreSQL over SQLite (production-grade from day one, matches AWS RDS)
- WSL2 Ubuntu over Windows shell (Linux environment matches cloud servers)
- AWS over Azure (larger job market, better cert recognition)
- Prisma v7 requires connection URL in prisma.config.ts not schema.prisma
- Project files stay on Windows filesystem for now, revisit when Docker starts

## Known Gotchas

- PostgreSQL must be started manually each session: sudo service postgresql start
- Prisma v7 does NOT accept url = env("DATABASE_URL") in schema.prisma
- stevenuser needs CREATEDB permission for Prisma shadow database during migrations
- npx prisma init auto-populates .env with Prisma cloud format if previous Prisma projects exist — always verify .env after init
