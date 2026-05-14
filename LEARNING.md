# IncentiRise — Learning Log

A running record of concepts learned, errors solved, and skills built.
Updated after every session.

---

## Phase 1 — Days 1 & 2 (combined session)

### Stats

|                  |     |
| ---------------- | --- |
| Tables created   | 5   |
| Files committed  | 8   |
| Concepts learned | 12  |
| Errors resolved  | 4   |

---

### The environment

**WSL2 + Ubuntu — foundation**
Windows Subsystem for Linux runs Ubuntu as a lightweight virtual environment inside Windows. Your project lives on the Windows filesystem and is accessed from Ubuntu via /mnt/c/. The terminal is the primary interface because production servers are Linux — what works here works in the cloud.

**Processes vs commands**
Some commands execute and finish immediately. Others start a long-running process that occupies the terminal — like Prisma Studio or your Node server. Ctrl+C kills a running process and returns the prompt.

---

### The database layer

**PostgreSQL — running locally**
A production-grade relational database running inside Ubuntu. Started with `sudo service postgresql start`. Requires a user, a database, and permissions before anything can connect to it.

**Database users and permissions**
PostgreSQL has its own user system separate from your OS. You created `stevenuser` with a password, granted it access to the `incentirise` database, and granted CREATEDB so Prisma could create its shadow database during migrations.

**Connection strings**
Applications connect to databases via a URL that encodes the user, password, host, port, and database name. Format: `postgresql://user:password@host:port/dbname`. Stored in `.env` and never committed to Git.

---

### Prisma ORM

**Schema = blueprint (most important concept)**
The schema file defines what your data looks like — models, fields, types, relationships. It is the source of truth for your database structure. You never change the database directly. You change the schema, then migrate.

**Migrations = version history**
A migration is a SQL file generated from your schema that records exactly what changed and when. Running `npx prisma migrate dev` applies those changes to the database. Your entire database can be rebuilt from scratch by running migrations in order.

**The workflow never changes**
Regardless of complexity, the pattern is always:

```
Change schema → Run migrate → Database updates
```

---

### Your data models

| Model          | Fields                                       |
| -------------- | -------------------------------------------- |
| User           | id, name, email, points, createdAt           |
| Task           | id, title, description, points, createdAt    |
| Reward         | id, title, description, pointCost, createdAt |
| TaskCompletion | links User → Task with timestamp             |
| Transaction    | links User → Reward, records points spent    |

---

### Git

**What `git add .` does**
Stages all changed and new files for the next commit. The dot means "everything in this directory." Then `git commit -m "..."` saves a snapshot with a descriptive message. Every commit is a point you can return to.

---

### Mindset notes

**Read error messages literally**
Every error today told you exactly what was wrong. "permission denied to create database" is precise. "url is no longer supported in schema files" is precise. The terminal is talking to you — read it before asking for help.

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

---

### The server layer

**What a web server is**
Your computer is normally a consumer of the internet — you request things and get them back. A web server flips that. It waits for requests and serves responses. When you ran `npm run dev` your machine became a server. When you ran `curl http://localhost:3000/health` you were a client making a request to it.

**Express**
A framework that makes it easy to define what your server does when it receives different requests. Without it you would have to write a lot of low level Node.js code. With it you define routes in plain, readable JavaScript.

**What a route is**
A route is a URL pattern that triggers specific code. When someone makes a GET request to `/health`, your server runs the function you wrote for that path and sends back a response. You will write dozens of these.

**What middleware is**
Middleware is code that runs on every request before it hits your route. Think of it like airport security — every passenger goes through it regardless of where they are flying. You added two:

- `cors()` — lets your frontend talk to your backend across different ports. Without it the browser blocks the request entirely.
- `express.json()` — reads the body of incoming requests and makes it available as `req.body`. Without it you cannot read data that clients send you.

**The /health route**
Not just a test. A real production pattern. In Phase 4 your CI/CD pipeline will ping it to confirm a deployment succeeded. In Phase 5 your AWS load balancer will ping it every 30 seconds to confirm your server is alive. You built that foundation today.

---

### Prisma 7 — what changed

Prisma 7 is a major version with breaking changes from all previous tutorials and documentation. These are the three things that broke today and how they were resolved:

**Breaking change 1 — url removed from schema.prisma**
Previous versions accepted `url = env("DATABASE_URL")` inside the datasource block. Prisma 7 removed this entirely. The connection URL now lives only in `prisma.config.ts`.

**Breaking change 2 — datasources removed from PrismaClient constructor**
Previous versions accepted `new PrismaClient({ datasources: { db: { url: ... } } })`. Prisma 7 removed this option. Passing it throws an error.

**Breaking change 3 — PrismaClient requires a driver adapter**
Prisma 7 no longer connects to databases directly. It requires an adapter. For PostgreSQL the adapter is `@prisma/adapter-pg`. It must be installed and passed to the constructor.

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

---

### Node.js and ES modules

**What `"type": "module"` does**
Adding this to `package.json` switches Node.js to modern JavaScript syntax. This is what allows `import` statements instead of the older `require()` syntax. Required for the code style used in this project.

**What `node --watch` does**
Automatically restarts the server whenever you save a file. This is the development workflow — save a file, server restarts, changes take effect immediately. No need to stop and restart manually.

---

### Testing with curl

**What curl is**
A command line tool for making HTTP requests. Used constantly by developers to test APIs without needing a frontend. The pattern is:

```bash
curl http://localhost:3000/health          # GET request
curl -X POST http://localhost:3000/users   # POST request
```

---

### Git

**Committing from the right directory**
Git commits are relative to where your `.git` folder lives. Your `.git` is in the root `incentirise/` folder, not inside `backend/`. When files are not staged, check that you are in the correct directory before running `git add .`.

**Pushing to GitHub**
`git push` sends your local commits to GitHub. Your code is now backed up, visible to recruiters, and safe if your machine dies.

---

### Mindset notes

**Debugging is the job**
Six errors were hit and resolved today. That is not a bad session — that is a normal session. The skill is not avoiding errors. The skill is reading them, isolating the cause, and fixing them. Every error you solve today is one you will recognize instantly next time.

**How developers solve problems without help**

1. Read the error message carefully — the last few lines always tell you what went wrong
2. Google the exact error text — copy and paste it
3. Check official documentation
4. Ask an AI or post on Stack Overflow

**Bleeding edge is harder but teaches more**
Prisma 7 was so new that most tutorials were wrong. You hit problems nobody had written solutions for yet. Working through that is harder than following a guide — and worth ten times as much.

---

## Vocabulary reference

| Term              | Definition                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| WSL2              | Windows Subsystem for Linux — runs Ubuntu inside Windows                   |
| Terminal          | Text interface for running commands                                        |
| Process           | A running program that occupies the terminal until stopped                 |
| PostgreSQL        | A production-grade relational database                                     |
| Connection string | A URL that tells an app how to connect to a database                       |
| ORM               | Object Relational Mapper — translates between code and database            |
| Schema            | The blueprint that defines what your data looks like                       |
| Migration         | A recorded change to the database structure                                |
| Express           | A Node.js framework for building web servers                               |
| Route             | A URL pattern that triggers specific server code                           |
| Middleware        | Code that runs on every request before hitting a route                     |
| cors              | Allows cross-origin requests between frontend and backend                  |
| req.body          | The data sent in an incoming request                                       |
| Adapter           | A plugin that connects two systems that don't natively speak to each other |
| curl              | Command line tool for making HTTP requests                                 |
| git add           | Stages files for the next commit                                           |
| git commit        | Saves a snapshot of staged files                                           |
| git push          | Sends commits to GitHub                                                    |
| npm run dev       | Starts the development server                                              |
| Ctrl+C            | Kills a running process                                                    |
