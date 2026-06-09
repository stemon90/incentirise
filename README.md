[![CI](https://github.com/stemon90/incentirise/actions/workflows/ci.yml/badge.svg)](https://github.com/stemon90/incentirise/actions/workflows/ci.yml)

# IncentiRise

A rewards and accountability platform for afterschool programs, Boys & Girls Clubs, and youth-serving organizations. Staff award points to youth for good deeds and positive actions. Youth redeem points for prizes. Everything is tracked, audited, and reported through a simple mobile-friendly interface.

**Live:** [incentirise.com](https://incentirise.com)

---

## Stack

- **Frontend:** React + Vite, served via nginx
- **Backend:** Node.js + Express
- **ORM:** Prisma v7
- **Database:** PostgreSQL 16 (AWS RDS)
- **Infrastructure:** AWS (EC2, RDS, ALB, ASG) + Terraform
- **CI/CD:** GitHub Actions
- **Observability:** Winston + CloudWatch
- **Secrets:** AWS Secrets Manager

---

## Architecture

The frontend and backend run as separate Docker containers on EC2, managed via Docker Compose. nginx serves the React frontend and proxies API requests to the Express backend internally — no CORS required in production.

Traffic flows through an Application Load Balancer with HTTPS termination via ACM. HTTP redirects to HTTPS at the ALB level. DNS is managed via Route 53 with an A record aliasing incentirise.com to the ALB.

The Auto Scaling Group maintains at least one healthy EC2 instance at all times. New instances boot via a user data script that fetches all environment variables from AWS Secrets Manager and starts the app automatically — no manual setup required.

Terraform manages all AWS infrastructure. State is stored remotely in S3 with DynamoDB locking.

```
incentirise.com
      │
   Route 53
      │
    ALB (HTTPS, ACM cert)
      │
    EC2 (ASG)
    ├── nginx (frontend, port 8080)
    │     └── proxies /api → backend:3000
    └── Express (backend, port 3000)
          └── RDS PostgreSQL
```

---

## CI/CD

Every push to main triggers a GitHub Actions pipeline:

1. **Lint** — ESLint against the backend source
2. **Docker build** — verifies the backend image compiles cleanly
3. **Deploy** — SSH into EC2, pull latest, rebuild and restart containers

All three jobs must pass. No manual deployments.

---

## Local Development

### Prerequisites

- Node.js
- Docker + Docker Compose
- PostgreSQL (local or via Docker)

### Setup

```bash
git clone https://github.com/stemon90/incentirise.git
cd incentirise
```

Create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/incentirise
JWT_SECRET=your_secret
NODE_ENV=development
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run migrations
cd ../backend && npx prisma migrate dev

# Start backend
npm run dev

# Start frontend (separate terminal)
cd ../frontend && npm run dev
```

Or run the full stack with Docker Compose:

```bash
docker compose up --build
```

---

## Infrastructure

Managed entirely with Terraform. All resources live in `us-east-1`.

| Resource    | Details                                    |
| ----------- | ------------------------------------------ |
| EC2         | t2.micro, Amazon Linux 2023                |
| RDS         | db.t3.micro, PostgreSQL 16                 |
| ALB         | Internet-facing, HTTPS on port 443         |
| ASG         | min=1, desired=1, max=3, CPU-based scaling |
| Domain      | incentirise.com via Route 53               |
| Certificate | ACM, DNS validated                         |
| Secrets     | AWS Secrets Manager (incentirise/env)      |
| State       | S3 + DynamoDB locking                      |

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

---

## Product

See [PRODUCT.md](./PRODUCT.md) for the full product spec — feature design, rules, philosophy, and roadmap.
