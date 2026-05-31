[![CI](https://github.com/stemon90/incentirise/actions/workflows/ci.yml/badge.svg)](https://github.com/stemon90/incentirise/actions/workflows/ci.yml)

# IncentiRise

A rewards and accountability platform for afterschool programs, Boys & Girls Clubs, and youth-serving organizations. Staff award points to youth for positive behaviors and good deeds. Youth redeem points for prizes. Everything is tracked, audited, and managed through a simple mobile-friendly interface.

## Infrastructure

Built as a progressive DevOps learning project. Each phase adds a layer of production-grade infrastructure on AWS.

### Phase 1 — Core App ✅

Local MVP. REST API with full CRUD, input validation, error handling, and a working points and rewards loop.

### Phase 2 — Git Workflow ✅

Feature branch workflow, branch protection, conventional commits, and ESLint setup.

### Phase 3 — Dockerization ✅

Containerized backend and database. Full stack runs with a single command via Docker Compose.

### Phase 4 — CI Pipeline ✅

Automated lint and Docker build triggered on every push to main.

### Phase 5 — Frontend ✅

React + Vite frontend. Users, tasks, rewards, and the points loop visible in a real UI.

### Phase 6 — Cloud Deployment ✅

Full stack deployed to AWS. EC2, RDS, and a publicly accessible app.

### Phase 7 — Infrastructure as Code ✅

All AWS infrastructure provisioned with Terraform. Reproducible, version controlled, single command deployment.

### Phase 8 — Observability ✅

Structured logging with Winston, CloudWatch log shipping, and IAM role-based access.

### Phase 9 — Scaling and Architecture ✅

Application Load Balancer, Auto Scaling Group, and target tracking scaling policy.

### Phase 10 — Full Stack Deployment ✅

Frontend containerized with nginx, environment-aware API configuration, full stack deployed via Docker Compose.

### Phase 11 — Domain and HTTPS

Custom domain via Route 53, SSL certificate via ACM, HTTPS listener on ALB.

### Phase 12 — CI/CD Deployment Pipeline ✅

Push to main automatically deploys to EC2. No manual SSH required.

### Phase 13 — ASG Self-Deployment ✅

New instances boot, fetch secrets from AWS Secrets Manager, and start the app automatically. Infrastructure is fully self-healing.

### Phase 14 — Remote Terraform State ✅

Terraform state stored in S3 with DynamoDB locking. Production-safe infrastructure management.

## Product Roadmap

### Phase 15 — V2 Data Model ✅

Complete rebuild of the schema to match the real product vision. Organizations, Staff with roles, Youth with QR codes, Behaviors with sliding scale point ranges, Prizes with approval thresholds, and full transaction and redemption tracking.

### Phase 16 — Authentication

JWT-based auth for staff. Login, registration, password hashing, and role-based route protection.

### Phase 17 — Core API

Routes for organizations, staff, youth, and behaviors with role-based access control.

### Phase 18 — Points and Redemptions

Point award flow with sliding scale, full audit trail, and prize redemption with Admin approval for big ticket items.

### Phase 19 — QR Code System

QR code generation for youth accounts and mobile-friendly scanning flow for staff.

### Phase 20 — Frontend Rebuild

Complete frontend rebuild — staff dashboard, youth profiles, prize catalog, and redemption workflow.

## Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **ORM:** Prisma v7
- **Database:** PostgreSQL 16
- **Infrastructure:** AWS (EC2, RDS, ALB, ASG) + Terraform
- **CI/CD:** GitHub Actions
- **Observability:** Winston + CloudWatch
- **Secrets:** AWS Secrets Manager
