# IncentiRise

A full-stack rewards and accountability platform where users complete tasks to earn points
and redeem them for rewards. Built as a progressive learning project to develop real-world
Cloud and DevOps skills.

---

## What it does

- Users earn points by completing tasks
- Points can be redeemed for rewards
- Every transaction is logged with a full history
- Admins can create and manage tasks and rewards

---

## Tech Stack

- **Frontend:** React + Vite (not started yet)
- **Backend:** Node.js + Express
- **Database:** PostgreSQL 16
- **ORM:** Prisma 7
- **Environment:** WSL2 Ubuntu 24.04 on Windows 11 (primary), macOS (secondary)

---

## Project Structure
incentirise/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma         # Database models
│   │   └── migrations/           # Migration history
│   ├── src/
│   │   ├── index.js              # Express server entry point
│   │   ├── routes/
│   │   │   ├── users.js          # User API routes
│   │   │   ├── tasks.js          # Task API routes
│   │   │   └── rewards.js        # Reward API routes
│   │   ├── controllers/          # Empty — coming in Phase 2
│   │   └── middleware/           # Empty — coming in Phase 2
│   ├── prisma.config.ts          # Prisma 7 configuration
│   ├── package.json
│   └── .env                      # Not committed — contains DATABASE_URL
├── frontend/                     # Not started yet
├── JOURNEY.md                    # Personal career journey log
├── LEARNING.md                   # Concepts and study notes by session
├── PROGRESS.md                   # Detailed session-by-session progress log
└── README.md

---

## Database Models

- **User** — name, email, point balance
- **Task** — title, description, point value
- **TaskCompletion** — links a user to a completed task
- **Reward** — title, description, point cost
- **Transaction** — records every point redemption

---

## API Routes

| Method | Route          | Description            |
| ------ | -------------- | ---------------------- |
| GET    | /health        | Server health check    |
| POST   | /users         | Create a user          |
| GET    | /users         | Get all users          |
| GET    | /users/:id     | Get a user by ID       |
| POST   | /tasks         | Create a task          |
| GET    | /tasks         | Get all tasks          |
| GET    | /tasks/:id     | Get a task by ID       |
| POST   | /rewards       | Create a reward        |
| GET    | /rewards       | Get all rewards        |
| GET    | /rewards/:id   | Get a reward by ID     |

More routes coming as the project progresses.

---

## Running Locally

### Prerequisites

- Node.js 20+
- PostgreSQL 16
- WSL2 Ubuntu (if on Windows) or macOS

### Setup

```bash
# Clone the repository
git clone https://github.com/stemon90/incentirise.git
cd incentirise

# Install dependencies
cd backend
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

Server runs on http://localhost:3000

---

## Learning Roadmap

This project is being built in phases to develop real Cloud and DevOps skills:

| Phase | Focus                                 | Status      |
| ----- | ------------------------------------- | ----------- |
| 1     | Core App — Local MVP                  | In progress |
| 2     | Code Discipline + Git Workflow        | Not started |
| 3     | Dockerization                         | Not started |
| 4     | CI/CD with GitHub Actions             | Not started |
| 5     | Cloud Deployment on AWS               | Not started |
| 6     | Infrastructure as Code with Terraform | Not started |
| 7     | Observability + Reliability           | Not started |
| 8     | Scaling + Architecture                | Not started |

---

## Career Goal

Transition into a Cloud or DevOps Engineer role at $100k+ after tax.
Target certifications: AWS Cloud Practitioner, AWS Solutions Architect Associate, Terraform Associate.

---

## Author

Steven — career changer, learning in public.