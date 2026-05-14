# IncentiRise

A full-stack rewards and accountability platform where users complete tasks to earn points and redeem them for rewards. Built as a progressive learning project to develop real-world Cloud and DevOps skills.

---

## What it does

- Users earn points by completing tasks
- Points can be redeemed for rewards
- Every transaction is logged with a full history
- Admins can create and manage tasks and rewards

---

## Tech Stack

- **Frontend:** React + Vite (in progress)
- **Backend:** Node.js + Express
- **Database:** PostgreSQL 16
- **ORM:** Prisma 7
- **Environment:** WSL2 Ubuntu 24.04 on Windows 11

---

## Project Structure

incentirise/
├── backend/
│ ├── prisma/
│ │ ├── schema.prisma # Database models
│ │ └── migrations/ # Migration history
│ ├── src/
│ │ ├── index.js # Express server entry point
│ │ └── routes/ # API route handlers (in progress)
│ ├── prisma.config.ts # Prisma 7 configuration
│ ├── package.json
│ └── .env # Not committed — contains DATABASE_URL
├── frontend/ # Not started yet
├── PROGRESS.md # Detailed session-by-session progress log
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

| Method | Route      | Description         |
| ------ | ---------- | ------------------- |
| GET    | /health    | Server health check |
| POST   | /users     | Create a user       |
| GET    | /users     | Get all users       |
| GET    | /users/:id | Get a user by ID    |

More routes coming as the project progresses.

---

## Running Locally

### Prerequisites

- Node.js 20+
- PostgreSQL 16
- WSL2 Ubuntu (if on Windows)

### Setup

```bash
# Start PostgreSQL
sudo service postgresql start

# Install dependencies
cd backend
npm install

# Generate Prisma client
npx prisma generate

# Run the server
npm run dev
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

Transition into a Cloud or DevOps Engineer role at $100k+ after tax. Target certifications: AWS Cloud Practitioner, AWS Solutions Architect Associate, Terraform Associate.

---

## Author

Steven — career changer, learning in public.
