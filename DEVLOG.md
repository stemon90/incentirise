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

Phase 20 complete — App live on AWS, connected to RDS, ready for Phase 11 (domain/HTTPS)

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

### Phase 8 — Day 14

- Installed Winston logging library in backend
- Created backend/src/logger.js — structured JSON logger with timestamp, level, and message
- Added request logging middleware to index.js — logs every incoming request with method, URL, and IP
- Fixed logs directory — added RUN mkdir -p logs to Dockerfile and fs.mkdirSync to logger.js
- Updated docker-compose.yml to mount ./backend/logs:/app/logs so host can read container logs
- Moved DB_PASSWORD out of docker-compose.yml into .env — password no longer hardcoded in repo
- Created IAM role incentirise-ec2-role with CloudWatchAgentServerPolicy
- Created IAM instance profile and attached to EC2 instance
- Installed amazon-cloudwatch-agent on EC2
- Configured CloudWatch agent to ship combined.log and error.log to log group "incentirise"
- Verified logs flowing into CloudWatch — backend-combined stream showing live request logs
- **Phase 8 complete**

### Phase 9 — Day 15

- Added data sources to Terraform for default VPC and subnets
- Created ALB security group allowing port 80 inbound
- Created Application Load Balancer (internet-facing) across all 6 default subnets
- Created target group with health checks on /health port 3000
- Created ALB listener forwarding port 80 to target group
- Created launch template mirroring existing EC2 configuration
- Created Auto Scaling Group — min=1, desired=1, max=3
- Created target tracking scaling policy — scales out at 70% average CPU
- Registered existing EC2 with target group — health checks passing
- Verified traffic flowing through ALB: incentirise-alb-tf-2134160699.us-east-1.elb.amazonaws.com/health returns {"status":"ok"}
- ASG instances are unhealthy (no app deployed) — to be solved in Phase 10
- **Phase 9 complete**

### Phase 10 — Day 16

- Added frontend Dockerfile using multi-stage build — Node to build, nginx to serve
- Updated all three components to use VITE_API_URL environment variable instead of hardcoded localhost
- Added frontend service to docker-compose.yml with VITE_API_URL build arg
- Created frontend/.env for local development pointing to localhost:3000
- Added VITE_API_URL to root .env pointing to ALB DNS name for production
- Fixed root .gitignore — removed overly broad package.json and package-lock.json exclusions
- Added frontend package.json and package-lock.json to Git
- Changed frontend Dockerfile from npm ci to npm install to handle missing lockfile
- Opened port 8080 in backend security group for frontend access
- Deployed full stack to EC2 via docker compose up --build
- Verified full stack publicly accessible at http://34.228.53.220:8080
- Tested complete points loop through the deployed app — all features working
- **Phase 10 complete**

### Phase 12 — Day 17

- Added deploy job to .github/workflows/ci.yml
- Deploy job runs only on push to main, after lint and docker-build pass
- Configured appleboy/ssh-action to SSH into EC2 and run git pull + docker compose up --build
- Added EC2_HOST, EC2_USER, and EC2_SSH_KEY to GitHub Secrets
- Merged PR — pipeline ran successfully, all three jobs green
- App auto-deployed to EC2 without manual SSH
- **Phase 12 complete**

### Phase 13 — Day 18

- Created AWS Secrets Manager secret incentirise/env with DB_PASSWORD and VITE_API_URL
- Attached SecretsManagerReadWrite policy to incentirise-ec2-role
- Wrote terraform/user_data.sh — installs Docker, Docker Compose, clones repo, fetches secrets, writes .env, starts app
- Updated aws_launch_template in main.tf to use user_data.sh via file() reference
- Added iam_instance_profile block to launch template — new instances can read Secrets Manager
- Ran terraform apply — launch template updated with new user data and IAM profile
- Terminated existing ASG instance to force replacement
- New instance booted, fetched secrets, and started app automatically
- ALB health check returned {"status":"ok"} — self-healing infrastructure verified
- **Phase 13 complete**

### Phase 14 — Day 19

- Created S3 bucket incentirise-terraform-state for remote state storage
- Enabled versioning on S3 bucket for state file recovery
- Created DynamoDB table incentirise-terraform-locks for state locking
- Added S3 backend block to terraform block in main.tf
- Ran terraform init -migrate-state — local state migrated to S3
- Verified state file present in S3 bucket
- Fixed launch template — replaced old inline user data heredoc with file() reference to user_data.sh
- Added iam_instance_profile block to launch template
- Ran terraform apply — launch template recreated with correct user data and IAM profile
- Verified correct Phase 13 script present in new launch template via base64 decode
- terraform plan shows no changes — Terraform and AWS fully in sync
- State is now stored remotely in S3 with DynamoDB locking
- **Phase 14 complete — DevOps portfolio complete**

### Phase 15 — Day 20

- Designed V2 product schema based on real IncentiRise vision
- Models: Organization, Staff, Youth, Behavior, PointTransaction, Prize, Redemption
- Staff roles: Admin and Leader
- Youth have auto-generated QR codes
- Behaviors have min/max point ranges to support sliding scale effort system
- PointTransaction logs every award with staff, youth, behavior, amount, and note
- Prizes have requiresAdmin flag for big ticket item approval workflow
- Redemptions have PENDING/APPROVED/REJECTED status
- Dropped all V1 tables: User, Task, TaskCompletion, Reward, Transaction
- Ran prisma migrate dev — new schema applied cleanly
- Ran prisma generate — client updated
- **Phase 15 complete**

### Phase 16 — Day 21

- Installed bcrypt and jsonwebtoken
- Created backend/src/routes/auth.js — staff registration and login
- Created backend/src/middleware/auth.js — JWT authentication and role checking
- Wired auth router into index.js
- Added JWT_SECRET to backend .env
- Tested registration and login via curl — both working
- **Phase 16 complete**

### Phase 17 — Day 21

- Created backend/src/routes/organizations.js — create and get organizations
- Created backend/src/routes/staff.js — get staff, get by ID, update role
- Created backend/src/routes/youth.js — full CRUD with QR code auto-generation
- Created backend/src/routes/behaviors.js — full CRUD, Admin only for write operations
- Wired all four routers into index.js
- Tested behavior creation and youth creation via curl — both working with JWT auth
- **Phase 17 complete**

### Phase 18 — Day 21

- Created backend/src/routes/points.js — award points with sliding scale validation, full audit trail
- Created backend/src/routes/prizes.js — full CRUD, Admin only for write operations
- Created backend/src/routes/redemptions.js — create redemption, get pending, approve/reject
- Points awarded atomically with youth balance update
- Redemption approval deducts points and decrements prize quantity atomically
- Big ticket prizes with requiresAdmin flag require Admin role to approve
- Tested full loop via curl — points awarded, prize redeemed, redemption approved, points deducted
- **Phase 18 complete**

### Phase 19 — Day 21

- Installed qrcode library
- Created backend/src/routes/qr.js — generate QR image for youth, scan QR and return youth info with behaviors
- QR codes are base64 PNG data URLs — renderable directly in img tags
- Tested QR generation and scan endpoints via curl
- **Phase 19 complete**

### Phase 20 — Day 21

- Installed axios in frontend
- Created frontend/src/api.js — centralized API helper with JWT interceptor
- Rebuilt App.jsx — auth state management, login/logout flow
- Created Login.jsx — staff login screen with IncentiRise branding
- Created Dashboard.jsx — tab navigation with staff name and role display
- Created Youth.jsx — youth list, add youth, profile with QR code, point history, prize redemption
- Created AwardPoints.jsx — search youth, select behavior, sliding scale point slider, submit
- Created Prizes.jsx — prize catalog with Admin-only add/delete
- Created Redemptions.jsx — pending redemption queue with approve/reject
- Created Behaviors.jsx — behavior list, Admin direct add, Leader request with provisional points
- Added behavior request system — Leaders submit requests, Admin approves/rejects, provisional points auto-reversed on rejection
- Created prisma/seed.js — 15 default behaviors and 14 default prizes seeded
- Added IncentiRise logo and orange/amber color scheme matching brand
- Tested full product loop in browser — login, add youth, award points, redeem prize, approve redemption

### Deployment Session — Day 22

**Goal:** Deploy V2 app to EC2 and change DB password.

**What happened:**

- Added JWT_SECRET to docker-compose.yml backend environment — was missing, causing login failures
- Added JWT_SECRET to AWS Secrets Manager
- Changed DB password in RDS, Secrets Manager, and local .env files
- Discovered critical bug: docker-compose.yml was spinning up a local postgres container instead of connecting to RDS — data was being lost every time a new EC2 instance spun up
- Fixed docker-compose.yml to remove local db service and point DATABASE_URL to RDS endpoint via ${RDS_ENDPOINT}
- Added RDS_ENDPOINT to AWS Secrets Manager and user_data.sh
- Fixed Docker Compose version — pinned to v2.24.0 to resolve "buildx 0.17.0 or later required" error
- Increased ASG health check grace period from 120s to 600s — bootstrap was taking longer than grace period causing instances to be terminated mid-build
- Manually registered new EC2 instance with ALB target group
- Suspended and resumed ASG HealthCheck and ReplaceUnhealthy processes during stabilization
- Created organization, admin account, and seeded default behaviors and prizes on RDS
- App fully functional at http://3.236.65.55:8080 with data persisting in RDS

**Current infrastructure state:**

- EC2 instance: 3.236.65.55 (IP will change if instance is replaced — use ALB URL for stable access)
- ALB: incentirise-alb-tf-2134160699.us-east-1.elb.amazonaws.com
- Database: RDS PostgreSQL 16 at incentirise-db-tf.c210yk2gc8vk.us-east-1.rds.amazonaws.com
- Secrets: All env vars in AWS Secrets Manager (incentirise/env) — DB_PASSWORD, JWT_SECRET, VITE_API_URL, RDS_ENDPOINT

**Known issues to address:**

- EC2 public IP changes on instance replacement — Phase 11 (domain/HTTPS) will fix this permanently
- If a new instance spins up from the ASG, it will need org/admin/seed setup unless we add a startup script for this
- JWT_SECRET should be rotated to a strong random value before going to real users

**Next session priorities:**

1. Start new chat — this thread is too long and slow
2. Phase 11 — buy domain, set up Route 53, ACM certificate, HTTPS listener on ALB
3. Rotate JWT_SECRET to a strong value
4. Add org/seed setup to startup flow so new instances are self-sufficient

- **Phase 20 complete**

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

### Observability

- Logs directory must be created in Dockerfile with RUN mkdir -p logs — Winston won't create it automatically
- Docker volume mount required for CloudWatch agent to read logs from host filesystem
- EC2 instance requires IAM role with CloudWatchAgentServerPolicy to ship logs to CloudWatch
- CloudWatch agent config must point to host filesystem path, not container path
- Pull from feature branch on EC2 when changes aren't merged to main yet
