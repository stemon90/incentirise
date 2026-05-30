[![CI](https://github.com/stemon90/incentirise/actions/workflows/ci.yml/badge.svg)](https://github.com/stemon90/incentirise/actions/workflows/ci.yml)

## Roadmap

### Phase 1 — Core App ✅

Local MVP. REST API with full CRUD, input validation, error handling, and a working
points and rewards loop.

### Phase 2 — Git Workflow ✅

Feature branch workflow, branch protection, conventional commits, controller refactor,
and ESLint setup.

### Phase 3 — Dockerization ✅

Containerized the backend and database. Full stack runs with a single command via
Docker Compose. Migrations run automatically on startup.

### Phase 4 — CI/CD with GitHub Actions

Automated lint and build pipeline triggered on every push to main.

### Phase 5 — Frontend

Minimal React + Vite frontend. Users, tasks, rewards, and the points loop visible
in a real UI.

### Phase 6 — Cloud Deployment on AWS

Deploy the full stack to AWS. EC2, RDS, networking, and a publicly accessible app.

### Phase 7 — Infrastructure as Code

Provision all AWS infrastructure with Terraform.

### Phase 8 — Observability

Logging, metrics, alerting, and reliability practices.

### Phase 9 — Scaling and Architecture ✅

Application Load Balancer, Auto Scaling Group, and target tracking scaling policy.
Infrastructure handles traffic distribution and automatic instance replacement.

### Phase 10 — Full Stack Deployment ✅

Frontend containerized with nginx, environment-aware API configuration, and full
stack deployed to EC2 via Docker Compose. App publicly accessible at a real URL.

### Phase 11 — Domain and HTTPS

Custom domain via Route 53, SSL certificate via ACM, HTTPS listener on ALB,
and HTTP to HTTPS redirect.

### Phase 12 — CI/CD Deployment Pipeline ✅

Push to main automatically builds and deploys to EC2. No manual SSH required.
Rolling updates with zero downtime.

### Phase 13 — ASG Self-Deployment ✅

New instances spin up and deploy the full app automatically via user data and
AWS Secrets Manager. Infrastructure is fully self-healing.

### Phase 14 — Remote Terraform State ✅

Terraform state moved to S3 with DynamoDB locking. Production-safe infrastruct
