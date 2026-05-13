# IncentiRise

## Phase 1 — Day 1: System Definition

### System Definition (IncentiRise MVP)

IncentiRise is a simple rewards system where users complete tasks to earn points and redeem those points for rewards. Every action is tracked through a transaction log.

---

### Core Entities

- User
  - Has a name and point balance

- Task
  - A defined action a user can complete
  - Has a point value

- Reward
  - Something users can redeem using points
  - Has a point cost

- Transaction
  - Records every point change
  - Includes earning and spending history

---

### Core System Flow

1. User is created
2. Task is created with point value
3. User completes task
4. System adds points to user
5. User views updated balance
6. User selects reward
7. System subtracts points
8. Transaction is recorded for both actions

---

### Minimum Feature Set (MVP Scope Locked)

- Create user
- Create task
- Complete task → award points
- View user points
- Create reward
- Redeem reward → deduct points
- Transaction history log

---

### Screens (Minimal UI)

- Dashboard
- Tasks Page
- Rewards Page
- Admin Page

---

### Tech Stack (Locked)

- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: SQLite
- ORM: Prisma

---

### Done Criteria for Day 1

- System entities clearly defined
- Reward loop mapped
- Feature scope locked
- Screens defined
- Tech stack finalized
