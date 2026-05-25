# IncentiRise — Devlog

## Project Summary

Full-stack rewards and accountability platform built as a progressive DevOps learning system.
Career goal: Cloud/DevOps Engineer at $100k+ after tax.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- ORM: Prisma v7
- Database: PostgreSQL 16
- Infrastructure: AWS (EC2, RDS) + Terraform
- Environment: Windows 11 + WSL2 Ubuntu 24.04 (primary), macOS (secondary)
- Editor: VS Code with Ubuntu terminal as default shell
- Version Control: Git + GitHub

## Environment Details

### WSL2 (Primary)

- Project path: ~/projects/incentirise
- All development happens on the Linux filesystem for better Docker and Vite performance

### Windows (Legacy)

- Project path (Windows): C:\Users\Steven\incentirise
- No longer used for active development

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

## AWS Infrastructure (Terraform-managed)

- EC2: t2.micro, Amazon Linux 2023, us-east-1
- RDS: db.t3.micro, PostgreSQL 16, us-east-1
- Security groups: incentirise-backend-sg-tf, incentirise-db-sg-tf
- Terraform state: local (terraform/terraform.tfstate)

## Current Position

Phase 7 complete — Phase 8 up next

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
- **Phase 2 complete**

### Phase 4 — Day 10

- Created .github/workflows/ci.yml — GitHub Actions workflow triggered on push and PR to main
- Added lint job — installs dependencies with npm ci, runs ESLint against src/
- Added docker-build job — builds backend Docker image to verify it compiles cleanly
- Resolved PAT scope error — added workflow scope to Personal Access Token
- Pipeline ran successfully on both PR open and merge to main
- Added CI status badge to README
- **Phase 4 complete**

### Phase 5 — Day 11

- Moved project from Windows filesystem (/mnt/c/) to WSL2 Linux filesystem (~/projects/incentirise)
- Scaffolded React + Vite frontend with npm create vite@latest
- Replaced Vite boilerplate with IncentiRise UI
- Built Users component — create users, display list with point balances
- Built Tasks component — create tasks, select user, complete task, earn points
- Built Rewards component — create rewards, select user, redeem reward, spend points
- Replaced App.css with clean minimal styles — nav tabs, form layout, error and success states
- Full points loop verified working end to end in the browser
- **Phase 5 complete**

### Phase 6 — Day 12

- Created IAM user steven-admin — root account no longer used for daily work
- Installed and configured AWS CLI in WSL2
- Created key pair incentirise-key for EC2 SSH access
- Created security groups for backend (ports 22, 80, 3000) and database (port 5432)
- Launched RDS PostgreSQL 16 instance on db.t3.micro
- Launched EC2 t2.micro instance with Amazon Linux 2023
- Installed Docker and Docker Compose on EC2
- Cloned repo and deployed backend via Docker Compose on EC2
- Verified /health endpoint publicly accessible at 54.91.0.108:3000
- **Phase 6 complete**

### Phase 7 — Day 13

- Installed Terraform via HashiCorp apt repository
- Created terraform/ directory with variables.tf, outputs.tf, main.tf, and .gitignore
- Defined all AWS infrastructure as code — security groups, RDS, EC2
- Ran terraform init — downloaded AWS provider v5.100.0
- Ran terraform plan — previewed 4 resources to create
- Ran terraform apply — provisioned full infrastructure automatically
- EC2 public IP: 34.228.53.220
- RDS endpoint: incentirise-db-tf.c210yk2gc8vk.us-east-1.rds.amazonaws.com
- Cleaned up Phase 6 manual resources — terminated EC2, deleted RDS, removed security groups
- Only Terraform-managed infrastructure remains in AWS
- **Phase 7 complete**

---

## Key Decisions

- PostgreSQL over SQLite — production-grade from day one, matches AWS RDS
- WSL2 Ubuntu over Windows shell — Linux environment matches cloud servers
- AWS over Azure — larger job market, better cert recognition
- Prisma v7 requires connection URL in prisma.config.ts, not schema.prisma
- Prisma v7 requires @prisma/adapter-pg for direct PostgreSQL connections
- Project moved to WSL2 Linux filesystem — better Docker and Vite performance, consistent with cloud environment
- Single shared Prisma instance exported from index.js and imported by all route files
- CI pipeline runs lint and Docker build — catches broken code and broken images before they reach main
- Frontend built with React + Vite — fast dev server, standard React toolchain
- IAM user for daily AWS work — root account reserved for billing and account-level settings
- Terraform for all infrastructure — reproducible, version controlled, single command provisioning

---

## Known Gotchas

### WSL2

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

### GitHub Actions

- Personal Access Token requires workflow scope to push files under .github/workflows/
- Use git credential reject to clear cached tokens after regenerating
- CI runs two independent jobs — lint and docker-build — both must pass for the pipeline to be green

### Vite / Frontend

- npm create vite@latest uses the folder name as given — verify it matches expected name before proceeding
- .gitkeep placeholder in frontend/ folder must be removed before renaming
- Frontend dev server runs on http://localhost:5173 by default
- Backend must be running on http://localhost:3000 for API calls to work

### AWS / Terraform

- Always work in us-east-1 — console defaults can switch regions silently
- IAM user requires workflow scope on PAT to push GitHub Actions workflows
- Terraform state file (terraform.tfstate) must never be committed to Git
- Delete dependent security groups in reverse dependency order
- EC2 must fully terminate before its security group can be deleted
- AWS CLI and console must be in the same region or resources won't be visible
- RDS takes 5-10 minutes to become available after creation
- EC2 public IP changes if instance is stopped and restarted — use Elastic IP for stable addressing
