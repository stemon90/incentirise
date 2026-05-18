# IncentiRise — Learning Log

A running record of concepts learned, errors solved, and skills built.
Updated after every session.

---

## Phase 1 — Days 1 & 2

### Stats

|                  |     |
| ---------------- | --- |
| Tables created   | 5   |
| Files committed  | 8   |
| Concepts learned | 12  |
| Errors resolved  | 4   |

### The environment

**WSL2 + Ubuntu — foundation**
Windows Subsystem for Linux runs Ubuntu as a lightweight virtual environment inside Windows. Your project lives on the Windows filesystem and is accessed from Ubuntu via /mnt/c/. The terminal is the primary interface because production servers are Linux — what works here works in the cloud.

**Processes vs commands**
Some commands execute and finish immediately. Others start a long-running process that occupies the terminal — like Prisma Studio or your Node server. Ctrl+C kills a running process and returns the prompt.

### The database layer

**PostgreSQL — running locally**
A production-grade relational database running inside Ubuntu. Started with `sudo service postgresql start`. Requires a user, a database, and permissions before anything can connect to it.

**Database users and permissions**
PostgreSQL has its own user system separate from your OS. You created `stevenuser` with a password, granted it access to the `incentirise` database, and granted CREATEDB so Prisma could create its shadow database during migrations.

**Connection strings**
Applications connect to databases via a URL that encodes the user, password, host, port, and database name. Format: `postgresql://user:password@host:port/dbname`. Stored in `.env` and never committed to Git.

### Prisma ORM

**Schema = blueprint**
The schema file defines what your data looks like — models, fields, types, relationships. It is the source of truth for your database structure. You never change the database directly. You change the schema, then migrate.

**Migrations = version history**
A migration is a SQL file generated from your schema that records exactly what changed and when. Running `npx prisma migrate dev` applies those changes to the database. Your entire database can be rebuilt from scratch by running migrations in order.

**The workflow never changes**
Change schema → Run migrate → Database updates

### Your data models

| Model          | Fields                                       |
| -------------- | -------------------------------------------- |
| User           | id, name, email, points, createdAt           |
| Task           | id, title, description, points, createdAt    |
| Reward         | id, title, description, pointCost, createdAt |
| TaskCompletion | links User → Task with timestamp             |
| Transaction    | links User → Reward, records points spent    |

### Git

**What `git add .` does**
Stages all changed and new files for the next commit. The dot means "everything in this directory." Then `git commit -m "..."` saves a snapshot with a descriptive message. Every commit is a point you can return to.

### Mindset notes

**Read error messages literally**
Every error today told you exactly what was wrong. The terminal is talking to you — read it before asking for help.

**Always read the files tools generate**
Prisma auto-populated your .env with the wrong connection format based on your history. You caught it by opening the file. Tools make assumptions — verify what they actually did.

---

## Phase 1 — Day 3

### Stats

|                  |     |
| ---------------- | --- |
| Routes created   | 1   |
| Files committed  | 3   |
| Concepts learned | 10  |
| Errors resolved  | 6   |

### The server layer

**What a web server is**
Your computer is normally a consumer of the internet — you request things and get them back. A web server flips that. It waits for requests and serves responses. When you ran `node src/index.js` your machine became a server.

**Express**
A framework that makes it easy to define what your server does when it receives different requests. Without it you would have to write a lot of low level Node.js code.

**What a route is**
A route is a URL pattern that triggers specific code. When someone makes a GET request to `/health`, your server runs the function you wrote for that path and sends back a response.

**What middleware is**
Middleware is code that runs on every request before it hits your route. Think of it like airport security — every passenger goes through it regardless of where they are flying. You added two:

- `cors()` — lets your frontend talk to your backend across different ports
- `express.json()` — reads the body of incoming requests and makes it available as `req.body`

**The /health route**
Not just a test. A real production pattern. In Phase 4 your CI/CD pipeline will ping it to confirm a deployment succeeded. In Phase 5 your AWS load balancer will ping it every 30 seconds to confirm your server is alive.

### Prisma 7 — breaking changes

**Breaking change 1 — url removed from schema.prisma**
Previous versions accepted `url = env("DATABASE_URL")` inside the datasource block. Prisma 7 removed this. The connection URL now lives only in `prisma.config.ts`.

**Breaking change 2 — datasources removed from PrismaClient constructor**
Previous versions accepted `new PrismaClient({ datasources: { db: { url: ... } } })`. Prisma 7 removed this option entirely.

**Breaking change 3 — PrismaClient requires a driver adapter**
Prisma 7 no longer connects to databases directly. It requires an adapter. For PostgreSQL the adapter is `@prisma/adapter-pg`.

**The import pattern that works with Prisma 7 + ES modules**

```js
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const { PrismaClient } = pkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });
```

**After any Prisma change always run:**

```bash
npx prisma generate
```

### Node.js and ES modules

**What `"type": "module"` does**
Switches Node.js to modern JavaScript syntax. This allows `import` statements instead of the older `require()` syntax.

**What `node --watch` does**
Automatically restarts the server whenever you save a file. No need to stop and restart manually during development.

### Mindset notes

**Debugging is the job**
Six errors were hit and resolved today. That is not a bad session — that is a normal session. The skill is not avoiding errors. The skill is reading them, isolating the cause, and fixing them.

**Bleeding edge is harder but teaches more**
Prisma 7 was so new that most tutorials were wrong. Working through undocumented problems is worth ten times more than following a guide.

---

## Phase 1 — Day 4

### Stats

|                     |     |
| ------------------- | --- |
| Environments set up | 1   |
| Routes created      | 3   |
| Files committed     | 4   |
| Concepts learned    | 11  |
| Errors resolved     | 2   |

### Setting up a development environment from scratch

**What Homebrew is**
macOS's package manager. Installs, updates, and manages software from the command line. The first thing any developer installs on a fresh Mac.

**What PATH is and why it matters**
A list of folders your terminal searches when you type a command. If the folder containing a program is not in PATH, the terminal says "command not found" — even if the program is installed.

**Why we added PostgreSQL to .zprofile**
`.zprofile` runs every time you open a new terminal window. Adding the PATH update there ensures PostgreSQL is always findable without running the command again.

**What `brew services start` does**
Starts PostgreSQL as a background service that launches automatically when your Mac starts. Different from Windows/WSL2 where you start PostgreSQL manually every session.

**Why npm install is always required after cloning**
The `node_modules` folder is never committed to Git. Every time you clone a project onto a new machine, you must run `npm install` to rebuild it.

**Why npx prisma generate is always required after cloning**
Prisma generates a custom client tailored to your schema and OS. This client is never committed to Git. Without running it after cloning, Prisma throws a MODULE_NOT_FOUND error.

**prisma migrate deploy vs prisma migrate dev**

- `prisma migrate dev` — used during development. Creates new migrations from schema changes.
- `prisma migrate deploy` — used when setting up a new environment. Applies existing migrations without creating new ones.

### API routes and how the system connects

**The three layers of your application**

1. **Database (PostgreSQL)** — stores all the data permanently
2. **Backend (Express + Prisma)** — receives requests, talks to the database, sends responses
3. **Frontend (React — not built yet)** — what users see and interact with

**The four HTTP methods**

| Method | Purpose     | Example                    |
| ------ | ----------- | -------------------------- |
| GET    | Read data   | GET /users — get all users |
| POST   | Create data | POST /users — create user  |
| PATCH  | Update data | PATCH /users/1 — edit user |
| DELETE | Delete data | DELETE /users/1            |

**The shared Prisma instance**
Only one PrismaClient instance per application. Create it in `index.js`, export it, and import it in every route file that needs it.

### Errors resolved

**Error 1 — MODULE_NOT_FOUND for Prisma client**
Cause: Prisma client not generated after cloning.
Fix: `npx prisma generate`

**Error 2 — PrismaClient needs valid options**
Cause: `users.js` was creating its own PrismaClient without the required adapter.
Fix: Import the shared `prisma` from `index.js` instead.

### Mindset notes

**Setting up environments is a core skill**
Today you set up a complete dev environment on a machine that had nothing on it. This is exactly what DevOps engineers do at scale, automated, on cloud servers. Everything you did manually today will eventually be scripted.

**Every machine is a fresh start**
Code lives in Git. Everything else — dependencies, environment variables, generated files, database data — must be recreated on each machine.

---

## Phase 1 — Day 5

### Stats

|                  |     |
| ---------------- | --- |
| Routes created   | 3   |
| Files committed  | 2   |
| Concepts learned | 4   |
| Errors resolved  | 0   |

### The pattern becomes familiar

**Repetition is how developers build speed**
The Task routes followed the exact same structure as the User routes. The second time through there were no errors, no confusion about structure, and no uncertainty about wiring. This is how real skill develops — not by learning something new every session, but by repeating patterns until they become automatic.

**What a router file always contains**

1. Import express and create a router
2. Import the shared prisma instance from index.js
3. Define the route handlers
4. Export the router

**What index.js always does with routes**
Every new route file gets wired in with two lines — an import and an `app.use()` registration.

**How Prisma model names map to routes**
Prisma model names are capitalized in the schema — `Task`, `User`, `Reward`. In route handlers, Prisma uses lowercase camel case — `prisma.task`, `prisma.user`, `prisma.reward`.

### Mindset notes

**Zero errors is a good session too**
Not every session involves debugging. Some sessions are about building cleanly using patterns you already own. Day 5 had no errors. That is not luck — it is the result of solving the same problems on Day 4.

---

## Phase 1 — Day 6

### Stats

|                  |     |
| ---------------- | --- |
| Routes created   | 3   |
| Files committed  | 2   |
| Concepts learned | 3   |
| Errors resolved  | 1   |

### The pattern is now automatic

**Why the working directory matters for .env**
When Node.js starts, it looks for `.env` relative to where the server was launched from. If you start from the wrong directory, Node cannot find `.env` and falls back to system defaults. Always start from inside `backend/`:

```bash
cd ~/incentirise/backend
node src/index.js
```

**VS Code as your primary editor**
VS Code is a full professional editor with syntax highlighting, error detection, file navigation, and an integrated terminal. Opening projects with `code .` is the standard developer workflow.

### Errors resolved

**Error 1 — Database 'stevenmontoya' does not exist**
Cause: Server started from wrong directory. Node could not find `.env` so Prisma fell back to system username as default database name.
Fix: Always start the server from inside the `backend/` folder.

### Mindset notes

**Patterns compound**
Day 4 took significant time to build three routes. Day 5 was faster. Day 6 was faster still. Each repetition makes the next one easier until the pattern costs you nothing.

**Day 7 is different**
Every route so far has been a simple read or write. Day 7 introduces logic — multiple database operations in sequence, conditional checks, and real failure handling.

---

## Phase 1 — Day 7

### Stats

|                  |     |
| ---------------- | --- |
| Routes created   | 2   |
| Files committed  | 3   |
| Concepts learned | 5   |
| Errors resolved  | 1   |

### Business logic routes

**What makes logic routes different**
Every route built before Day 7 did one thing — read from the database or write to it. Logic routes do multiple things in sequence and make decisions along the way. POST /complete-task does four things in one request: find the user, find the task, update the user's points, and create a completion record. If any step fails the whole thing fails.

**Conditional logic in routes**
Before touching the database, logic routes check whether the operation is valid. POST /redeem-reward checks if the user has enough points before deducting anything. If they don't, it returns a 400 error immediately and nothing in the database changes. This is how you prevent bad data from ever being written.

**HTTP status codes**
Your routes now return different status codes depending on what happened:

| Code | Meaning                                          |
| ---- | ------------------------------------------------ |
| 200  | Success                                          |
| 400  | Bad request — the client sent invalid data       |
| 404  | Not found — the requested resource doesn't exist |
| 500  | Server error — something unexpected went wrong   |

**The full rewards loop — tested end to end**

- User created with 0 points
- Completed a task worth 50 points → balance became 50
- Redeemed a reward costing 30 points → balance dropped to 20
- TaskCompletion record created, Transaction record created
- Every action permanently recorded in the database

**Why ES module syntax must be consistent**
Your project uses `import/export` syntax throughout. When a new file uses `require()` instead, Node throws an error because you cannot mix the two styles in the same project. Every file must use the same syntax.

### Errors resolved

**Error 1 — task.pointValue is undefined**
Cause: The Task schema field is named `points`, not `pointValue`. Logic.js referenced the wrong field name.
Fix: Changed `task.pointValue` to `task.points` in the complete-task route.

### Mindset notes

**The app crossed a line today**
Before Day 7 IncentiRise stored data. After Day 7 it does something with that data. That is the difference between a database wrapper and an application. The core system is now complete.

**Validation is next**
The logic routes work when given correct data. They do not yet handle missing fields, wrong types, or malicious input gracefully. Day 8 fixes that — and finishing it closes out Phase 1.

---

## All Routes — Current State

| Route          | Method | What it does                                         |
| -------------- | ------ | ---------------------------------------------------- |
| /health        | GET    | Confirm server is running                            |
| /users         | POST   | Create a new user                                    |
| /users         | GET    | Return all users                                     |
| /users/:id     | GET    | Return one user by ID                                |
| /tasks         | POST   | Create a new task                                    |
| /tasks         | GET    | Return all tasks                                     |
| /tasks/:id     | GET    | Return one task by ID                                |
| /rewards       | POST   | Create a new reward                                  |
| /rewards       | GET    | Return all rewards                                   |
| /rewards/:id   | GET    | Return one reward by ID                              |
| /complete-task | POST   | User completes a task — points added to balance      |
| /redeem-reward | POST   | User redeems a reward — points deducted from balance |

---

## Vocabulary Reference

| Term                   | Definition                                                                   |
| ---------------------- | ---------------------------------------------------------------------------- |
| WSL2                   | Windows Subsystem for Linux — runs Ubuntu inside Windows                     |
| Terminal               | Text interface for running commands                                          |
| Process                | A running program that occupies the terminal until stopped                   |
| PostgreSQL             | A production-grade relational database                                       |
| Connection string      | A URL that tells an app how to connect to a database                         |
| ORM                    | Object Relational Mapper — translates between code and database              |
| Schema                 | The blueprint that defines what your data looks like                         |
| Migration              | A recorded change to the database structure                                  |
| Express                | A Node.js framework for building web servers                                 |
| Route                  | A URL pattern that triggers specific server code                             |
| Middleware             | Code that runs on every request before hitting a route                       |
| cors                   | Allows cross-origin requests between frontend and backend                    |
| req.body               | The data sent in an incoming request                                         |
| Adapter                | A plugin that connects two systems that don't natively speak to each other   |
| curl                   | Command line tool for making HTTP requests                                   |
| HTTP status code       | A number that tells the client what happened — 200, 400, 404, 500            |
| Business logic         | Code that enforces rules — like checking points before allowing a redemption |
| git add                | Stages files for the next commit                                             |
| git commit             | Saves a snapshot of staged files                                             |
| git push               | Sends commits to GitHub                                                      |
| git clone              | Downloads a full copy of a repository from GitHub                            |
| npm install            | Downloads all project dependencies listed in package.json                    |
| Homebrew               | macOS package manager                                                        |
| PATH                   | A list of folders your terminal searches when you type a command             |
| .zprofile              | A file that runs every time a new terminal window opens on macOS             |
| brew services          | Homebrew tool for managing background services like PostgreSQL               |
| API                    | The set of routes your backend exposes for other systems to interact with    |
| HTTP method            | The type of request — GET, POST, PATCH, or DELETE                            |
| prisma migrate deploy  | Applies existing migrations on a new machine without creating new ones       |
| npx prisma generate    | Generates the Prisma client for the current machine and OS                   |
| Shared Prisma instance | One PrismaClient created in index.js and imported everywhere it is needed    |
| .gitignore             | A file that tells Git which files and folders to never commit                |
| node_modules           | The folder containing all installed dependencies — never committed to Git    |
| .env                   | A file containing secret environment variables — never committed to Git      |
| Working directory      | The folder your terminal is currently in                                     |
| code .                 | VS Code command to open the current folder as a project                      |
