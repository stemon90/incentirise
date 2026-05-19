---

## API Reference

### Health

| Method | Route     | Description         |
| ------ | --------- | ------------------- |
| GET    | /health   | Server health check |

### Users

| Method | Route         | Description      |
| ------ | ------------- | ---------------- |
| POST   | /users        | Create a user    |
| GET    | /users        | Get all users    |
| GET    | /users/:id    | Get user by ID   |

### Tasks

| Method | Route         | Description      |
| ------ | ------------- | ---------------- |
| POST   | /tasks        | Create a task    |
| GET    | /tasks        | Get all tasks    |
| GET    | /tasks/:id    | Get task by ID   |

### Rewards

| Method | Route          | Description       |
| ------ | -------------- | ----------------- |
| POST   | /rewards       | Create a reward   |
| GET    | /rewards       | Get all rewards   |
| GET    | /rewards/:id   | Get reward by ID  |

### Logic

| Method | Route             | Description                     |
| ------ | ----------------- | ------------------------------- |
| POST   | /complete-task    | Complete a task and earn points |
| POST   | /redeem-reward    | Redeem points for a reward      |

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16
- WSL2 Ubuntu (Windows) or macOS

### Setup

```bash
# Clone the repository
git clone https://github.com/stemon90/incentirise.git
cd incentirise/backend

# Install dependencies
npm install

# Create your .env file
echo 'DATABASE_URL="postgresql://stevenuser:PASSWORD@localhost:5432/incentirise"' > .env

# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate deploy

# Start the server
node src/index.js
```

Server runs on `http://localhost:3000`

---

## Roadmap

### Phase 1 — Core App ✅

Local MVP. REST API with full CRUD, input validation, error handling, and a working
points and rewards loop.

### Phase 2 — Git Workflow 🔄

Feature branch workflow, branch protection, conventional commits, code discipline.

### Phase 3 — Dockerization

Containerize the app and database. Learn Docker fundamentals.

### Phase 4 — CI/CD with GitHub Actions

Automated testing and deployment pipeline.

### Phase 5 — Cloud Deployment on AWS

Deploy to AWS. Learn EC2, RDS, and networking fundamentals.

### Phase 6 — Infrastructure as Code

Provision infrastructure with Terraform.

### Phase 7 — Observability

Logging, metrics, alerting, and reliability practices.

### Phase 8 — Scaling and Architecture

Load balancing, horizontal scaling, architectural patterns.

---

## Author

Steven — career changer building in public.  
Target certifications: AWS Cloud Practitioner → AWS Solutions Architect Associate → Terraform Associate.
