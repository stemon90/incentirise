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
Change schema → Run migrate → Database updates
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

## Phase 1 — Day 4

### Stats

|                        |     |
| ---------------------- | --- |
| Environments set up    | 1   |
| Routes created         | 3   |
| Files committed        | 4   |
| Concepts learned       | 11  |
| Errors resolved        | 2   |

---

### Setting up a development environment from scratch

**What Homebrew is**
Homebrew is macOS's package manager. A package manager is a tool that installs, updates, and manages software from the command line. Instead of going to a website, downloading an installer, and clicking through a wizard, you run one command and Homebrew handles everything. It is the first thing any developer installs on a fresh Mac.

**What PATH is and why it matters**
PATH is a list of folders your terminal searches through when you type a command. When you type `psql`, your terminal looks through every folder in PATH until it finds a program called `psql`. If the folder containing `psql` is not in PATH, the terminal says "command not found" — even if the program is installed. When you installed PostgreSQL via Homebrew, it was placed in a non-standard location, so you had to add that location to PATH manually. This is a one-time setup step on any new machine.

**Why we added PostgreSQL to .zprofile**
`.zprofile` is a file that runs every time you open a new terminal window. By adding the PATH update there, you ensure PostgreSQL is always findable without having to run the command again. Think of it as a startup script for your terminal.

**What `brew services start` does**
On macOS, Homebrew can manage background services — programs that run continuously in the background without occupying your terminal. `brew services start postgresql@16` starts PostgreSQL as a background service that launches automatically when your Mac starts. This is different from Windows/WSL2 where you have to start PostgreSQL manually every session.

**Cloning a repository**
`git clone` downloads a complete copy of your project from GitHub to your local machine, including the full Git history. Every commit, every branch, every file — all of it. After cloning, the folder is a fully functional Git repository connected to GitHub. You can pull updates and push changes immediately.

**Why npm install is always required after cloning**
The `node_modules` folder — which contains all your dependencies — is never committed to Git. It is listed in `.gitignore`. This means every time you clone a project onto a new machine, you must run `npm install` to rebuild it. npm reads `package.json`, finds all the listed dependencies, and downloads them fresh.

**Why npx prisma generate is always required after cloning**
Prisma generates a custom client tailored to your schema and your operating system. This generated client lives inside `node_modules` and is never committed to Git. After cloning on any new machine, you must run `npx prisma generate` before your server can start. Without it, Prisma cannot find its client and throws a MODULE_NOT_FOUND error.

**Why .env is never in Git**
The `.env` file contains your database password and other secrets. Committing it to GitHub would expose those credentials publicly. It is listed in `.gitignore` and must be created manually on every new machine. This is standard practice across all professional projects.

**prisma migrate deploy vs prisma migrate dev**
These two commands do similar things but serve different purposes:
- `prisma migrate dev` — used during development. Creates new migrations from schema changes. Should only be run on your primary machine.
- `prisma migrate deploy` — used when setting up a new environment. Applies existing migrations without creating new ones. This is what you run after cloning on a new machine, and what you will run in production on AWS.

---

### API routes and how the system connects

**The three layers of your application**
Your application has three distinct layers that communicate with each other:

1. **Database (PostgreSQL)** — stores all the data permanently
2. **Backend (Express + Prisma)** — the engine. Receives requests, talks to the database, sends responses
3. **Frontend (React — not built yet)** — the interface. What users see and interact with

These layers never skip each other. The frontend never talks directly to the database. Everything goes through the backend.

**What an API is**
API stands for Application Programming Interface. It is the set of routes your backend exposes for other systems to interact with. When your React frontend needs to create a user, it does not touch the database — it sends a request to your API, which handles the database interaction and sends back the result. This separation is what makes applications secure, maintainable, and scalable.

**The four HTTP methods**
Every request to your API uses one of four methods that describe the intent:

| Method | Purpose         | Example                    |
| ------ | --------------- | -------------------------- |
| GET    | Read data       | GET /users — get all users |
| POST   | Create data     | POST /users — create user  |
| PATCH  | Update data     | PATCH /users/1 — edit user |
| DELETE | Delete data     | DELETE /users/1            |

**How a route works end to end**
When your React frontend (once built) has a button that says "Add User":
1. User clicks the button
2. React sends a POST request to `http://localhost:3000/users` with the user's name and email
3. Express receives the request and routes it to your `POST /users` handler
4. Your handler calls `prisma.user.create()` to insert a row in PostgreSQL
5. PostgreSQL confirms the insert and returns the new record
6. Prisma passes it back to your handler
7. Your handler sends it back to React as JSON
8. React displays the new user on screen

Every interaction in your app will follow this exact pattern.

**Why routes are in separate files**
You could write all your routes directly in `index.js`. For three routes that would be fine. For a real application with dozens of routes across users, tasks, rewards, and transactions, one file becomes unmanageable. Separating routes into their own files keeps the code organized and makes it easy to find, edit, and debug specific functionality.

**The shared Prisma instance**
You only ever create one PrismaClient instance per application. Creating multiple instances causes connection pool errors and wastes resources. The pattern used in this project is to create the instance in `index.js`, export it, and import it in every route file that needs it. This is the correct production pattern.

---

### Errors resolved

**Error 1 — MODULE_NOT_FOUND for Prisma client**
Cause: Prisma generates a machine-specific client that is not committed to Git. After cloning, the client did not exist yet.
Fix: `npx prisma generate`

**Error 2 — PrismaClient needs valid options**
Cause: `users.js` was creating its own PrismaClient without the required PrismaPg adapter.
Fix: Removed the local PrismaClient instance and imported the shared `prisma` from `index.js` instead.

---

### Mindset notes

**Setting up environments is a core skill**
Today you set up a complete development environment on a machine that had nothing on it. You installed a package manager, a runtime, a database, configured PATH, cloned a repo, and had a running server in under an hour. This is exactly what DevOps engineers do — except at scale, automated, on cloud servers. Everything you did manually today will eventually be scripted.

**Every machine is a fresh start**
Code lives in Git. Everything else — dependencies, environment variables, generated files, database data — must be recreated on each machine. Understanding what needs to be recreated and why is what separates developers who can work anywhere from developers who are stuck when their usual machine isn't available.

**The outcome and the how are both important**
Building a working app is the goal. Understanding why it works is what makes you employable. The study sheets after each session bridge that gap — you build fast during sessions and learn the reasoning afterward. Both matter.

---

## Phase 1 — Day 5

### Stats

|                        |     |
| ---------------------- | --- |
| Routes created         | 3   |
| Files committed        | 2   |
| Concepts learned       | 4   |
| Errors resolved        | 0   |

---

### The pattern becomes familiar

**Repetition is how developers build speed**
The Task routes built today followed the exact same structure as the User routes from Day 4. The second time through, there were no errors, no confusion about where files go, and no uncertainty about how to wire things into index.js. This is how real skill develops — not by learning something new every session, but by repeating patterns until they become automatic. By the time you build Reward and Transaction routes, this will feel effortless.

**What a router file always contains**
Every route file in this project follows the same four-part structure:
1. Import express and create a router — `const router = express.Router()`
2. Import the shared prisma instance from index.js
3. Define the route handlers — GET, POST, PATCH, DELETE
4. Export the router — `export default router`

This structure will never change regardless of which resource you are routing.

**What index.js always does with routes**
Every new route file gets wired into index.js with two lines:
1. Import the router — `import tasksRouter from './routes/tasks.js'`
2. Register it with a path — `app.use('/tasks', tasksRouter)`

The path you register determines the URL prefix. Registering at `/tasks` means all routes inside tasks.js respond to URLs that start with `/tasks`.

**How Prisma model names map to routes**
Prisma model names are capitalized in the schema — `Task`, `User`, `Reward`. In your route handlers, Prisma uses the lowercase camel case version — `prisma.task`, `prisma.user`, `prisma.reward`. The model name in the schema and the property name on the prisma client always correspond directly.

---

### Mindset notes

**Zero errors is a good session too**
Not every session involves debugging. Some sessions are about building cleanly and quickly using patterns you already understand. Day 5 had no errors. That is not luck — it is the result of solving the same problems on Day 4 and knowing exactly what to do the second time.

**The routes you have built so far**

| Route           | Method | What it does              |
| --------------- | ------ | ------------------------- |
| /users          | GET    | Return all users          |
| /users/:id      | GET    | Return one user by ID     |
| /users          | POST   | Create a new user         |
| /tasks          | GET    | Return all tasks          |
| /tasks/:id      | GET    | Return one task by ID     |
| /tasks          | POST   | Create a new task         |

Six routes down. More to come. The pattern is yours now.

## Vocabulary reference

| Term                    | Definition                                                                    |
| ----------------------- | ----------------------------------------------------------------------------- |
| WSL2                    | Windows Subsystem for Linux — runs Ubuntu inside Windows                      |
| Terminal                | Text interface for running commands                                           |
| Process                 | A running program that occupies the terminal until stopped                    |
| PostgreSQL              | A production-grade relational database                                        |
| Connection string       | A URL that tells an app how to connect to a database                          |
| ORM                     | Object Relational Mapper — translates between code and database               |
| Schema                  | The blueprint that defines what your data looks like                          |
| Migration               | A recorded change to the database structure                                   |
| Express                 | A Node.js framework for building web servers                                  |
| Route                   | A URL pattern that triggers specific server code                              |
| Middleware              | Code that runs on every request before hitting a route                        |
| cors                    | Allows cross-origin requests between frontend and backend                     |
| req.body                | The data sent in an incoming request                                          |
| Adapter                 | A plugin that connects two systems that don't natively speak to each other    |
| curl                    | Command line tool for making HTTP requests                                    |
| git add                 | Stages files for the next commit                                              |
| git commit              | Saves a snapshot of staged files                                              |
| git push                | Sends commits to GitHub                                                       |
| git clone               | Downloads a full copy of a repository from GitHub to your machine             |
| npm install             | Downloads and installs all project dependencies listed in package.json        |
| npm run dev             | Starts the development server                                                 |
| Ctrl+C                  | Kills a running process                                                       |
| Homebrew                | macOS package manager — installs software from the command line               |
| PATH                    | A list of folders your terminal searches when you type a command              |
| .zprofile               | A file that runs every time a new terminal window opens on macOS              |
| brew services           | Homebrew tool for managing background services like PostgreSQL                |
| API                     | The set of routes your backend exposes for other systems to interact with     |
| HTTP method             | The type of request — GET, POST, PATCH, or DELETE                            |
| prisma migrate deploy   | Applies existing migrations on a new machine without creating new ones        |
| npx prisma generate     | Generates the Prisma client for the current machine and OS                    |
| Shared Prisma instance  | One PrismaClient created in index.js and imported everywhere it is needed     |
| .gitignore              | A file that tells Git which files and folders to never commit                 |
| node_modules            | The folder containing all installed dependencies — never committed to Git     |
| .env                    | A file containing secret environment variables — never committed to Git       |