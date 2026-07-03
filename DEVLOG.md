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

Day 28 complete — incentirise.com live on HTTPS. Production database cleaned: all four test/demo orgs removed and the primary org re-registered fresh, so it now carries the current 52/110 auto-seed. Reusable deleteOrgs dev script committed on chore/prod-cleanup. Domain previously down from a clientHold (unverified registrant email) — now resolved.

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

### Phase 11 — Day 23

- Registered incentirise.com via Route 53 — domain cost ~$12/year
- Requested SSL certificate via ACM with DNS validation — covers incentirise.com and \*.incentirise.com
- Added CNAME validation record to Route 53 hosted zone — cert issued within minutes
- Created HTTPS listener on ALB (port 443) with ACM cert attached
- Updated HTTP listener (port 80) to redirect to HTTPS with 301
- Opened port 443 on ALB security group
- Created Route 53 A record aliasing incentirise.com to ALB DNS name
- Created new ALB target group on port 8080 for frontend — old target group was pointing to port 3000 (backend)
- Updated HTTPS listener to forward to frontend target group
- Rotated JWT_SECRET to strong random value via openssl rand -base64 48
- Updated all secrets in AWS Secrets Manager via file:// to avoid bash special character issues
- Discovered docker-compose.yml was still pointing DATABASE_URL at local db container — fixed to use RDS via ${RDS_ENDPOINT}?sslmode=require
- Added NODE_TLS_REJECT_UNAUTHORIZED=0 to backend environment — RDS uses self-signed cert
- Added nginx reverse proxy config to frontend container — API routes proxied to backend:3000 internally
- Updated frontend Dockerfile to copy nginx.conf into container
- Rebuilt and redeployed — login working at https://incentirise.com
- Created organization, admin account (steven@incentirise.com), and seeded behaviors and prizes
- **Phase 11 complete**

**Infrastructure state:**

- Domain: incentirise.com (Route 53)
- HTTPS: ACM cert, ALB HTTPS listener, HTTP→HTTPS redirect
- EC2: 3.236.65.55 (use ALB or domain for stable access)
- ALB: incentirise-alb-tf-2134160699.us-east-1.elb.amazonaws.com
- RDS: incentirise-db-tf.c210yk2gc8vk.us-east-1.rds.amazonaws.com
- Secrets: incentirise/env in AWS Secrets Manager

**Known issues:**

- Terraform not yet updated to reflect Phase 11 AWS changes (listeners, target group, Route 53, ACM)
- user_data.sh needs updating so new ASG instances connect to RDS with SSL and start correctly
- NODE_TLS_REJECT_UNAUTHORIZED=0 disables cert verification — acceptable for now, should be replaced with proper RDS CA cert verification later

### Hardening & Product Planning — Day 24

**Infrastructure hardening:**

- Enabled RDS automated backups — 7-day retention, 3am UTC backup window
- Codified all Phase 11 AWS infrastructure in Terraform — ACM cert, HTTPS listener, frontend target group, Route 53 record
- Imported all Phase 11 resources into Terraform state — terraform plan shows no changes
- Updated user_data.sh — new ASG instances now boot with RDS SSL and correct file ownership
- Locked CORS to incentirise.com in production via NODE_ENV check
- Added NODE_ENV=production to docker-compose.yml backend environment
- Fixed GitHub Actions secrets — EC2_HOST, EC2_USER, EC2_SSH_KEY were empty
- Fixed deploy script — changed docker compose to docker-compose for EC2 compatibility
- CI/CD pipeline fully operational — push to main deploys automatically

**Product features shipped:**

- Added Staff management tab — Admin only, visible in dashboard nav
- Admin can create new staff accounts with name, email, password, and role
- Admin can change staff roles from the Staff tab
- Locked POST /staff route — Admin JWT required
- Added mobile responsive CSS — app works on phones
- Added landscape and tablet CSS — app works in all orientations
- Added public org registration — new clubs can self-serve sign up at incentirise.com
- Login page now has "Get Started" link to registration
- Registration creates org and first Admin account in one step
- Confirmed org isolation works — separate orgs cannot see each other's data

**Product planning — key decisions:**

- IncentiRise targets individual clubs (BGC Santa Fe, BGCMD chapters, YMCAs, schools) as separate paying customers — not the umbrella org as one unified system
- Parent orgs (BGCMD) get read-only dashboard access to see cross-club data without controlling clubs
- Business model: tiered SaaS — Starter ($150/mo), Professional ($300/mo), Enterprise ($500+/mo)
- Killer feature is grant reporting — turning incentive activity into measurable impact data
- Elevator pitch: "IncentiRise turns your incentive program into measurable data that helps you win grants"
- Future products: IncentiRise for Families (freemium), IncentiRise for Classrooms, track/milestone app, attendance tracker
- Confirmed: new org registration creates blank slate — default behaviors and prizes must be seeded automatically on signup

**Front desk workflow identified:**

- USB barcode scanner ($30-50) plugs into desktop, scans youth QR codes
- App needs always-active scan field on Award Points page
- Printable QR sheets needed — multiple youth per page, admin generates from app

**Full product roadmap established — see roadmap section below**

### Product Design & Feature Build — Day 25

**Product design sessions:**

Completed two full product design sessions covering the entire Good Deeds, Points, and Prize framework. All decisions documented in PRODUCT.md.

Key decisions made:

- Renamed Behaviors → Good Deeds throughout the product (code rename deferred)
- Good deeds must be directly observable by staff — no subjective or self-reported actions
- Good deeds organized into 12 categories with tags for filtering
- Archive vs delete rule: zero transactions → delete allowed, has transactions → archive only, app enforces automatically
- New good deed submissions are atomic with point awards — approve the deed, points land; reject, nothing happens
- Pending points show on youth balance while awaiting Admin approval
- Point correction flow: formal request with reason, Admin approval, permanent audit trail (bank reversal model)
- Bulk awarding: staff can award same good deed to multiple youth at once
- Prize tiers are organizational labels only, not hard limits — orgs set any point value they want
- Two redemption modes: pre-requested (catalogued prizes) and on-the-spot (tier prizes for bulk donated inventory)
- Tier prizes solve the donated inventory problem — staff redeems a tier, not a specific item, no reservation conflicts
- Group challenges: max 3 active, donated points returned if challenge fails, staff-designated group points disappear
- Youth of the month: staff nominated, free prize credit (not points), Admin sets tier limit
- Point economy anchors: attendance 1pt fixed, homework/participation 3–10pt sliding scale, PS5 at 1,500pt ceiling, wooden pencil at 15pt floor
- Default good deeds list finalized at 52 items across 12 categories
- Default prize list finalized at 110 items across 8 categories

**Features shipped:**

- Auto-seed on org registration — 52 good deeds and 110 prizes created automatically for every new org
- Expanded default good deeds from 20 to 52 with full category coverage
- Added .env.development and .env.production to frontend — Vite automatically uses correct API URL per environment, no more manual switching
- Fixed tab title from "front" to "IncentiRise"
- Fixed missing space in Register button className

**Infrastructure:**

- CI/CD pipeline fully operational throughout
- All changes shipped via feature branches and PRs

**Next session priorities:**

1. Add category/tag field to Behavior model
2. Add category field to Prize model
3. Update seed to include categories for all 52 good deeds and 110 prizes
4. Update UI to filter by category on award screen and prize catalog

### Category Filtering — Day 26

**Goal:** Add categories to good deeds and prizes so the 52-item and 110-item default lists are filterable instead of one long flat scroll.

**Schema changes:**

- Added `category String?` field to `Behavior` model — migration `add-category-to-behavior`
- Added `category String?` field to `Prize` model — migration `add-category-to-prize`
- Ran `npx prisma generate` after each migration (client validation errors occur otherwise — Prisma client doesn't recognize new fields until regenerated)

**Backend changes:**

- `behaviors.js` — POST and PATCH routes accept and persist `category`; GET route now orders by `[{ category: "asc" }, { name: "asc" }]`
- `prizes.js` — POST and PATCH routes accept and persist `category`; GET route now orders by `[{ category: "asc" }, { pointCost: "asc" }]`
- `prizes.js` — quantity default changed from `1` to `999` when left blank, to actually behave as "unlimited"
- `defaultSeed.js` — every one of the 52 good deeds and 110 prizes now has a `category` field matching the categories defined in PRODUCT.md

**Frontend changes:**

- `AwardPoints.jsx` — added category filter pill bar above the good deed list; derives unique categories from the loaded behaviors, "All" option included; added empty states for no youth match / no behaviors in category
- `Prizes.jsx` — same pattern: category filter pill bar, category field added to the Add Prize form, quantity field now optional with "Leave blank for unlimited" placeholder
- `Youth.jsx` — removed grade field from the add-youth form and from the profile display (decided DOB-derived age is sufficient, grade tracked elsewhere by orgs)
- `App.css` — added `.category-filter` and `.category-btn` styles (pill buttons, orange active state)
- `App.jsx` — discovered `App.css` was never being imported, so none of the custom styles were rendering; added `import "./App.css"` at the top. This was a longstanding latent bug — the app was running on browser-default styling the whole time.

**Known gotchas hit this session:**

- After adding a field to the Prisma schema, the migration alone isn't enough — `npx prisma generate` must be run or `PrismaClientValidationError: Unknown argument` is thrown on first use of the new field, even though the database column exists
- Editing `defaultSeed.js` by hand introduced a syntax error (stray `}` / `];` after the prizes array, and at one point a missing closing brace for the whole `seedDefaultData` function) — Node failed with `SyntaxError: Unexpected end of input` and `npm run dev` crashed entirely instead of restarting cleanly; fixed by carefully re-closing the function
- Local Postgres auth failures resurfaced (`stevenuser` password mismatch) — resolved by resetting the role password directly in `psql` rather than fighting bash's history-expansion on `!` in the connection string
- Registering through the UI while already logged in just redirects to the dashboard instead of erroring — looks like "nothing happened" but is expected behavior, not a bug
- A partial registration (org + Staff created, then seed function throws) leaves a real Staff row with a usable email and no good deeds/prizes attached — shows up later as "email already in use" with an empty org; cleaned up manually via cascading deletes through PointTransaction → Redemption → Youth → Behavior → Prize → BehaviorRequest → Staff → Organization, in that order, due to foreign key constraints

**UI issues identified but not yet fixed (flagged for next session):**

- Header nav links: inactive state reads as too light/washed out, active state reads as too dark/heavy — needs a softer contrast pass
- Page header layout: tab title (e.g. "Youth", "Prizes", "Staff") sits too close to its adjacent "+ Add" button — needs more spacing in the `page-header` flex layout

**Outstanding from previous session, still true:**

- Production org (steven@incentirise.com) predates the auto-seed feature and has none of the 52/110 default lists — would need manual seeding or a one-off script if a live demo of the full catalog is needed on incentirise.com
- Steven wants to eventually wipe all test/demo orgs from the production database while preserving the real org, but deferred to a future session

**Next session priorities:**

1. Fix nav link active/inactive styling
2. Fix page-header spacing between tab labels and add buttons
3. Decide on and build either the visual prize spectrum or move toward the good-deed approval/pending-points atomic flow
4. Production database cleanup (remove test orgs, keep steven@incentirise.com)

- **Day 26 complete**

### Nav Consolidation, Hamburger Menu, Spacing & Logo Fixes — Day 27

**Goal:** Fix the nav link styling complaint and replace mobile horizontal-scroll nav with something cleaner, then clean up two more flagged UI issues (page-header spacing, logo sizing/centering) in the same sitting.

**Root cause discovered — duplicate stylesheets:**

- `App.css` (leftover boilerplate from the original Day 5 V1 build, plain gray/black nav styling) was being imported in `App.jsx`, while `index.css` (the real, polished stylesheet — dark header, orange gradient on the active nav tab) was already being imported separately in `main.jsx`
- Both were active at once, fighting over the same `nav button` and `nav button.active` selectors — this is almost certainly why the nav sometimes looked like unstyled HTML defaults instead of the intended dark/orange design
- Fix: deleted `App.css` entirely, removed `import "./App.css"` from `App.jsx`, moved the `.category-filter` / `.category-btn` rules (the only thing actually unique to App.css, added last session) into `index.css`
- Confirmed in-browser that nav and category pills still render correctly with only `index.css` active

**Hamburger menu for mobile:**

- Added `menuOpen` state to `Dashboard.jsx`, a hamburger toggle button (☰) between the logo and nav, and a `nav-open` class applied conditionally to `<nav>`
- All six nav buttons (Youth, Award Points, Behaviors, Prizes, Redemptions, Staff) now close the menu on click in addition to setting the active tab
- Added `.hamburger-btn` CSS (hidden by default, `display: block` only inside the `max-width: 768px` media query) and restructured the mobile nav rule to `display: none` by default, `display: flex; flex-direction: column` when `.nav-open` is applied, replacing the old `overflow-x: auto` horizontal scroll
- Decided against closing the menu on hover-out or click-outside — not the standard mobile pattern (no cursor on touch devices, and click-outside can mis-fire mid-scroll); tap-to-toggle plus close-on-select is the same pattern used by most production mobile apps

**Bug caught during testing — breakpoint overlap:**

- At a window width of ~696px, the hamburger menu would open but render no visible nav buttons
- Root cause: the existing landscape tablet media query (`max-width: 1024px and orientation: landscape`) was still firing alongside the new `max-width: 768px` hamburger query at that width, since a desktop browser window narrower than it is tall reads as "landscape." The two queries set conflicting `flex-direction` / `flex-wrap` values on `<nav>`, collapsing the buttons to zero visible height even though `display: flex` was technically applied
- Fix: scoped the landscape query to `min-width: 769px` as well, so it no longer overlaps with the hamburger breakpoint at all — hamburger mode now cleanly owns 0–768px, compact landscape nav owns 769–1024px, no shared territory
- Verified across the full range top to bottom in dev tools after the fix — no more dead zones

**Page-header spacing fix:**

- All six pages (Youth, Staff, Prizes, Redemptions, AwardPoints, Behaviors) share one `.page-header` class for the title + "+ Add" button row
- The rule used `justify-content: space-between` with no `gap`, so in some viewport widths the title and button ended up touching with no breathing room
- Added `gap: 24px` to `.page-header` — one change fixed the spacing across all six pages at once

**Logo fixes:**

- Discovered `logo.png` was 1536×1024 with a lot of dead transparent canvas around the actual artwork — tried ImageMagick `-trim` (both plain and with `-fuzz 5%`) but the alpha trim didn't catch it, since the padding likely wasn't pure transparent
- User manually cropped the logo using an online tool, producing a much tighter 809×576 image — replaced `frontend/public/logo.png` with the new crop
- Login screen: added `text-align: center` to `.login-card` so the heading and subtitle center correctly (previously left-aligned by default with no rule overriding it); centered the logo specifically with `display: block; margin: 0 auto`; resized to `width: 140px`
- Dashboard header: after the crop, the logo initially looked huge at 100px (overflowing into the body) — settled on `height: 46px` for a clean fit inside the 60px header bar

**Known gotchas hit this session:**

- Browsing the local dev app at `127.0.0.1:5173` instead of `localhost:5173` caused a login failure that looked like a broken account — they're different origins to the browser even though they're the same machine; always use `localhost` for local dev
- Running `~/projects/incentirise/frontend/public/logo.png` directly in bash (instead of opening it with a viewer) throws a generic permission-denied error — bash is trying to execute the PNG as a script, not actually blocked by file permissions; use `code <path>` or an image viewer instead
- `convert -trim` and even `-fuzz 5% -trim` did not meaningfully reduce the original logo's canvas size (1536×1024 → 1500×1022) despite there clearly being visual dead space — manual/visual cropping was needed instead, since the padding wasn't simply uniform transparent or near-background pixels ImageMagick's alpha/fuzz trim could detect automatically

**Decided NOT to do tonight:**

- A full aesthetic redesign pass (sizing, spacing, color/brand decisions as a deliberate overall pass) — explicitly deferred to its own future session rather than continuing to patch one element at a time

**Next session priorities:**

1. Full aesthetic/design pass — deliberate sizing, spacing, and brand decisions rather than reactive bug fixes
2. Decide next feature build: pending points display, bulk awarding, or the good-deed atomic approval flow
3. Seed `steven@incentirise.com` on production (it predates the auto-seed feature and currently has none of the 52/110 default lists) and/or do the broader production database cleanup (remove test/demo orgs while preserving the real one)

- **Day 27 complete**

### Production Cleanup & Outage Fix — Day 28

**Goal:** Production database cleanup — remove the accumulated test/demo orgs and get the primary org onto the current 52/110 auto-seed. Branched `chore/prod-cleanup` off main per the no-direct-commits-to-main rule.

**Site outage diagnosed and fixed first (incentirise.com was down):**

- Symptom in the browser was `DNS_PROBE_FINISHED_NXDOMAIN` — the domain wasn't resolving at all, so the problem was above the load balancer, not in the app. (Confirmed the ALB target was `healthy` the whole time — the app was fine, just unreachable by name.)
- `aws route53domains get-domain-detail` showed the registration was paid through 2027 with auto-renew on and correct nameservers, but `StatusList` contained **`clientHold`**. `clientHold` tells the registry to stop publishing DNS for the domain entirely → NXDOMAIN.
- Cause: unverified registrant contact email. ICANN requires the registrant email to be verified; the verification request had gone unanswered, so the registrar suspended the domain via `clientHold`.
- Fix: verified the registrant email. The hold cleared at the registry a short time later — re-checking `StatusList` showed only `clientTransferProhibited` remaining (that one is a normal protective lock, kept on purpose). `dig @<ns> incentirise.com` then returned the six ALB IPs, confirming resolution restored.

**Production cleanup:**

- Took a manual RDS snapshot `incentirise-pre-cleanup-20260623` on instance `incentirise-db-tf` as the restore point, and waited for it to read `available` before any destructive step. (First attempt at the snapshot last session never actually ran — `DescribeDBSnapshots` returned `DBSnapshotNotFound` — so re-ran it and confirmed this time.)
- Ran a read-only inventory of all orgs through the live backend container. Found 4 orgs:
  - id 1 — IncentiRise — `steven@incentirise.com` (ADMIN) + `eharrington121@gmail.com` (LEADER); **15 behaviors / 14 prizes** (the _old_ pre-auto-seed defaults), 1 youth, 2 transactions
  - id 2 — Axiomatas — `zekesocialmedia@gmail.com`; 1/1/1 — test
  - id 3 — Backflow Kings — `perezjake49@gmail.com`; full 52/110 — test
  - id 4 — ShizzyBizzy — `bryanmontoya83@outlook.com`; full 52/110 — test
- **Plan changed mid-session.** Original plan was "seed org 1, delete 2–4." Decided instead to delete **all four** including org 1: it was all throwaway test data (no real users yet), and re-registering org 1 fresh gives it the current 52/110 auto-seed in one step — simpler than back-filling the old org's seed. So the seed-existing-org step was dropped entirely.
- Built reusable dev script `backend/scripts/deleteOrgs.js` (committed on `chore/prod-cleanup`): takes org IDs as CLI args, refuses to run with none, prints a per-org summary and requires the operator to type `yes`, then runs all deletes inside one `prisma.$transaction` in FK-safe order so a partial failure rolls back. Built as a real reusable tool rather than a throwaway because many more test orgs are expected over time (seed testing, feature checks, friends logging in to look around).
- Confirmed FK-safe deletion order: PointTransaction → Redemption → BehaviorRequest → Behavior → Prize → Youth → Staff → Organization.
- Ran a dry run (typed a non-`yes` value, confirmed it listed the right orgs and cancelled), then deleted orgs 2/3/4, verified count dropped from 4 to 1, then deleted org 1. Database left at zero orgs (expected, intended).
- Re-registered the org through the live site (incentirise.com → Get Started). Confirmed the auto-seed fired — new org carries the full 52 good deeds / 110 prizes. Cleanup complete.

**Known gotchas hit this session:**

- **SSH to the domain hangs forever.** `ssh ec2-user@incentirise.com` silently hangs because the domain resolves to the **ALB**, and a load balancer doesn't speak SSH. Must SSH to the **instance's** public IP directly. (Prior successful SSHs were to the instance IP, not the domain.)
- **Two running EC2 instances exist.** `incentirise-asg-node` (the live ASG-launched node serving the app — was `3.236.65.55` this session) and a separate `incentirise-backend-tf`. Identify the live one via ALB target health / the ASG node tag before SSHing; don't assume.
- **SSH port 22 on the backend SG is open to `0.0.0.0/0`** (the whole internet), plus a redundant `/32` for the personal IP. This predates the session. Flagged as a real hardening item — should be scoped to known IPs (see roadmap).
- **Prisma v7 cannot be constructed bare.** `new PrismaClient()` throws `PrismaClientInitializationError` — v7 requires the adapter. For one-off scripts/commands against prod, replicate the app's construction exactly: `const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL }); const prisma = new PrismaClient({ adapter });`. The app builds this in `backend/src/index.js` (the only file with `new PrismaClient`), but importing `index.js` boots the whole Express server, so replicate the construction inline rather than importing it.
- **`docker cp` needs the destination directory to already exist in the container.** `docker cp file container:/app/scripts/file` reported "Successfully copied" but the file wasn't there, because `/app/scripts/` didn't exist in the container and the path got interpreted ambiguously. Fix: `docker exec <container> mkdir -p /app/scripts` first, then `docker cp`.
- **A git push that silently didn't happen.** Last session's `git add/commit/push` block apparently never ran — the file stayed **untracked** (`git status` showed `backend/scripts/` untracked, no commit in the log), so the branch never reached GitHub, and the EC2 `git checkout chore/prod-cleanup` failed with `pathspec ... did not match any file(s)`. Lesson: run `git add` / `commit` / `push` as separate commands and confirm the `* [new branch] ... -> ...` line actually prints before assuming the push landed.
- The two RDS warnings on every script run (SSL-mode deprecation alias warning, and the `NODE_TLS_REJECT_UNAUTHORIZED=0` insecure-TLS warning) are expected noise from the known RDS setup — ignore them.

**Decisions / takeaways:**

- The app has **no in-app deletion flow** at all — that's why deletion is a terminal operation right now. Acceptable only because it's pre-launch with no real data. The proper long-term answers (a super admin cross-org panel to replace the dev script, and soft-delete for org-facing youth/staff deletion) are now in PRODUCT.md.
- Auto-seed runs **only once, at registration** — existing orgs never get updates to the default list. An additive re-seed/sync script is the realistic near-term tool for pushing updated defaults to a real org once it has data that can't be deleted. Also noted in PRODUCT.md, along with an open question on whether to keep the full 52/110 seed or move to a starter set + opt-in template library.
- `steven@incentirise.com` is a login identifier only — no real mailbox is configured on the domain yet. Fine until email features (forgot-password, notifications) ship.

**Known issues / follow-ups:**

- SSH port 22 open to `0.0.0.0/0` on `incentirise-backend-sg-tf` — scope down to known IPs (hardening).
- Suspected Terraform drift — the two running instances and the SG state suggest `.tf` and live AWS have diverged; worth a `terraform plan` to see the gap. (Still consistent with the long-standing "Terraform not fully reflecting Phase 11 changes" note.)
- `chore/prod-cleanup` is pushed; PR merge status to confirm/complete next session. Decide whether `deleteOrgs.js` merges to main (useful keeper) — verified nothing imports from `scripts/` so it's inert in the build.
- The manual snapshot `incentirise-pre-cleanup-20260623` can be deleted once confident the cleanup is good (it costs a little storage while it sits).

**Next session priorities:**

1. Merge `chore/prod-cleanup` (or confirm it merged); update PRODUCT.md + DEVLOG on their own docs branch.
2. Scope SSH (port 22) down from `0.0.0.0/0`, and run `terraform plan` to assess drift.
3. Resume the deferred Day 27 item: full aesthetic/design pass, or pick the next feature build (pending points display, bulk awarding, or the good-deed atomic approval flow).

- **Day 28 complete**

### Cost Teardown — Infrastructure → Dormant Mode — Day 31

**Goal:** Kill AWS costs to near-zero while pre-revenue/pre-launch. First bill (June cycle) came to $100.89 — free tier had expired without warning.

**Root cause of the surprise bill:**

- AWS's free tier (12 months on new accounts) had quietly expired; everything started billing at normal rates with no notification
- Biggest single line item was "Amazon Virtual Private Cloud" ($30.09) — traced to AWS's per-public-IP hourly charge (started Feb 2024, ~$3.65/mo per IP) rather than a NAT Gateway (confirmed none existed). 8 public IPs were in play: 6 from the ALB being spread across all 6 default subnets (leftover from Phase 9), 1 from the live ASG instance, 1 from a second, orphaned EC2 instance

**Found and fixed before the full teardown:**

- Discovered a second EC2 instance (`incentirise-backend-tf`) had existed since early phases, still Terraform-managed but never part of the ASG, doing nothing but costing money and holding a public IP. Destroyed via `terraform destroy -target=aws_instance.backend`, then removed the resource block from `main.tf` and the now-broken `ec2_public_ip` output from `outputs.tf`
- Narrowed the ALB and ASG from all 6 default subnets down to 2 (the AWS minimum for an ALB), via a new `locals.selected_subnet_ids` block referenced by both `aws_lb.backend.subnets` and `aws_autoscaling_group.backend.vpc_zone_identifier`. Confirmed the live instance's subnet (`us-east-1f`) was one of the 2 kept. Verified zero downtime — `curl -I https://incentirise.com` returned 200 immediately after apply
- Note: old ALB-owned ENIs in the removed subnets don't release instantly — AWS deprovisions them asynchronously in the background (can take up to ~an hour), this is expected and not something to force

**Full teardown to dormant mode:**

Since there are no real users yet and no plans to job-search or demo immediately, decided to go further than cost-trimming — full teardown of everything except the domain itself, to be rebuilt via Terraform when actually needed for a demo or launch.

Destroyed via one targeted `terraform destroy` (13 resources, RDS `skip_final_snapshot = true` so no backup taken — confirmed acceptable, no real user data existed):

- ASG, launch template, scale-out policy
- ALB, both listeners (HTTP redirect + HTTPS), both target groups (backend + frontend)
- RDS instance
- All three security groups (backend, ALB, db)
- Route 53 A record (expected — it's an alias to the ALB, has to go when the ALB does)

**Preserved (survives, low/no cost):**

- Route 53 hosted zone + domain registration (incentirise.com)
- ACM certificate — has `prevent_destroy` in Terraform, couldn't be destroyed even by accident
- Terraform state (S3 + DynamoDB) — untouched, this is how rebuild stays easy
- AWS Secrets Manager secret `incentirise/env` was NOT kept — deleted via `aws secretsmanager delete-secret --secret-id incentirise/env --recovery-window-in-days 7` (7-day recovery window instead of the 30-day default, so it actually stops billing quickly instead of lingering a month). Scheduled deletion date: 2026-07-10. Recoverable via `aws secretsmanager restore-secret --secret-id incentirise/env` until that date; after that, gone for good.

**New monthly cost: ~$1-2 (domain + hosted zone only), down from $100.89.**

**REBUILD PROCEDURE (do this when ready to demo to customers or employers):**

1. `cd ~/projects/incentirise/terraform && terraform apply` — recreates all 13 destroyed resources. RDS is the slow part (~5-10 min), rest is faster. ~15 min total.
2. Visit incentirise.com → "Get Started" → register a fresh org. Auto-seed fires immediately (52 good deeds, 110 prizes) — no manual data restore needed, there was nothing real to restore.
3. Confirm `curl -I https://incentirise.com` returns 200 before considering it demo-ready.
4. Recreate the Secrets Manager secret first — it was deleted (not kept) during teardown: `aws secretsmanager create-secret --name incentirise/env --secret-string '{"DB_PASSWORD":"...","JWT_SECRET":"...","VITE_API_URL":"...","RDS_ENDPOINT":"..."}' --region us-east-1`. Do this BEFORE `terraform apply`, since `user_data.sh` reads from this secret at instance boot — if it's missing, new EC2 instances will fail to start correctly.

**Known gotchas from this session:**

- AWS CLI v2 pipes long output through a pager by default, silently truncating anything copy-pasted before scrolling fully — fix is `export AWS_PAGER=""` (added to `~/.bashrc`)
- `terraform plan` only previews; `terraform apply` is what actually prompts for `yes` and executes — easy to conflate these when reading Terraform docs quickly
- A `locals {}` block cannot live nested inside the `terraform {}` block — it's a sibling top-level block. Nesting it there throws "Unsupported block type"

**Known follow-up (unrelated to this session, still open):** redemptions page prompted "save before closing" — possible sign the redemption duplicate-click / unsaved-state bug class extends further than known. Check next time in the app code.

- **Day 31 complete — infrastructure now dormant, ~$1-2/mo**

---

## Product Roadmap

### INFRASTRUCTURE & OPERATIONS

- [ ] Replace NODE_TLS_REJECT_UNAUTHORIZED=0 with proper RDS CA cert
- [ ] Scope SSH (port 22) on incentirise-backend-sg-tf down from 0.0.0.0/0 to known IPs
- [ ] Run terraform plan to assess drift (two running instances + SG state suggest .tf and live AWS have diverged)
- [ ] Reconcile SSH ingress and other drifted rules back into Terraform so applies don't wipe them

### MOBILE & UX

- [x] Mobile responsive CSS
- [x] Landscape/tablet CSS
- [ ] Touch-optimized QR scanning flow — mobile camera scan
- [ ] Youth-facing mobile view — simplified view for kids

### AUTH & ACCOUNTS

- [x] Staff login
- [x] Org registration
- [x] Staff management by Admin
- [ ] Forgot password flow — email reset link
- [ ] Home version vs Program version — optional location/site field on youth account

### CORE PRODUCT RULES

- [ ] Points-only-positive enforcement — UI never allows point removal as punishment
- [ ] Behavior guardrails — growth-oriented behaviors, app guides this
- [ ] No food/drink as prize — onboarding guidance
- [ ] No threat-based goals — onboarding education

### PRIZE & BEHAVIOR FRAMEWORK

- [ ] Default global behavior list — seeded for every new org
- [ ] Prize tier framework — Tier 1 (5-25pts), Tier 2 (25-75pts), Tier 3 (75-200pts)
- [ ] Prize setup guidance during onboarding — templates and examples
- [ ] Customize point name per org (club bucks, stars, coins) — field exists, needs UI

### QR & FRONT DESK WORKFLOW

- [ ] Printable QR sheets — multiple youth per page, admin prints from app
- [ ] Desktop scan-to-award flow — always-active field listening for USB barcode scanner
- [ ] USB barcode scanner compatible — standard $30-50 USB scanners work

### FEATURES

- [ ] Group challenges — create groups, pool points toward shared prize
- [ ] Event-based redemptions — time-boxed events like Christmas gift drive, draft-style prize selection, leaderboard
- [ ] Star student recognition — student of week/month on dashboard
- [ ] Stats and reporting — per youth, per org, grant-ready reports
- [ ] Analytics dashboard — attendance trends, top behaviors, redemption rates
- [ ] Read-only parent org dashboard — cross-club reporting for umbrella orgs

### PLATFORM ADMIN & DATA LIFECYCLE

- [x] Reusable deleteOrgs dev script — clear test/demo orgs (backend/scripts/deleteOrgs.js)
- [ ] Super admin panel — cross-org platform-owner management; proper replacement for the deleteOrgs dev script
- [ ] Soft-delete for org-facing youth/staff deletion — deletedAt timestamp, filtered from queries, recoverable
- [ ] Additive re-seed / sync script — push updated defaults to existing orgs without touching their data
- [ ] Decide seeding strategy — full 52/110 seed vs. starter set + opt-in template library

### BUSINESS

- [ ] Pricing tiers — Starter ($150), Professional ($300), Enterprise ($500+)
- [ ] Stripe integration — credit card payments, recurring subscriptions
- [ ] Subscription management — billing portal, invoices, cancellation
- [ ] Onboarding flow — welcome email, setup checklist, first-time guidance
- [ ] Auto-seed behaviors and prizes on new org registration
- [ ] Vendor partnerships — discounted prize marketplace, commission model

### FUTURE PRODUCTS

- [ ] IncentiRise for Families — lightweight household version, freemium
- [ ] IncentiRise for Classrooms — teacher edition with grade-level defaults
- [ ] Track/milestone app — learning paths for Tech Club youth
- [ ] Lightweight attendance tracker with grant reporting

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
- Production data deletion is done via a guarded, reusable dev script (snapshot first, dry run, typed confirmation, FK-safe transaction) — pre-launch only; the long-term answer is an in-app super admin panel + soft-delete

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

### Git

- A push can silently not happen — if git add/commit/push is run as one block and something fails, the file stays untracked and the branch never reaches GitHub (downstream symptom: `git checkout <branch>` elsewhere fails with `pathspec ... did not match any file(s)`). Run the three commands separately and confirm the `* [new branch] ... -> ...` line prints before assuming the push landed.

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

### SSH / EC2 access

- SSH to incentirise.com hangs forever — the domain resolves to the ALB, which doesn't speak SSH. SSH to the instance's public IP directly instead.
- The instance IP changes when the ASG replaces the node — look it up fresh (aws ec2 describe-instances) each session rather than reusing an old IP.
- Two instances may be running (incentirise-asg-node, the live one, and incentirise-backend-tf) — confirm which is live via ALB target health before connecting.

### DNS / domain

- DNS_PROBE_FINISHED_NXDOMAIN on a domain that previously worked usually means the registry stopped publishing it, not an app problem — check `aws route53domains get-domain-detail` StatusList for `clientHold`.
- `clientHold` is most often caused by an unverified registrant contact email (ICANN requirement); verifying the email clears it at the registry within minutes to hours. `clientTransferProhibited` staying in the list is normal/protective.

### Running scripts against prod (Docker / Prisma)

- Prisma v7 throws PrismaClientInitializationError if constructed bare — replicate the app's adapter construction: `new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })`. Importing index.js to reuse its client boots the whole Express server, so replicate inline instead.
- `docker cp` needs the destination directory to exist in the container first — run `docker exec <container> mkdir -p /app/scripts` before copying, or the file silently doesn't land where expected.
- The SSL-mode deprecation warning and NODE_TLS_REJECT_UNAUTHORIZED=0 warning on every prod script run are expected noise from the current RDS setup — ignore.

### Observability

- Logs directory must be created in Dockerfile with RUN mkdir -p logs — Winston won't create it automatically
- Docker volume mount required for CloudWatch agent to read logs from host filesystem
- EC2 instance requires IAM role with CloudWatchAgentServerPolicy to ship logs to CloudWatch
- CloudWatch agent config must point to host filesystem path, not container path
- Pull from feature branch on EC2 when changes aren't merged to main yet

- RDS requires SSL — append ?sslmode=require to DATABASE_URL and set NODE_TLS_REJECT_UNAUTHORIZED=0 in docker environment
- VITE_API_URL is baked into the frontend bundle at build time — changing it requires a full docker build --no-cache
- nginx proxy required when frontend and backend share a domain — add location blocks to proxy API routes to backend:3000
- AWS secrets with special characters (!) break bash heredoc — use file:// with aws secretsmanager update-secret instead
- Docker build cache will reuse old layers even after .env changes — use --no-cache to force a clean frontend rebuild
- git pull fails if files were edited with sudo on EC2 — fix with sudo chown -R ec2-user:ec2-user /home/ec2-user/incentirise
