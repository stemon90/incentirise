# My Journey — Cloud/DevOps Engineer

## Who I am

Steven. Career changer. Based in Albuquerque, New Mexico.
I am teaching myself Cloud and DevOps engineering from scratch by building a real project
instead of just watching tutorials. Every day I write code, hit errors, solve them, and commit
the progress. This is the log of that journey.

---

## Where I want to go

**Target role:** Cloud Engineer, DevOps Engineer, Infrastructure Engineer, or Site Reliability Engineer
**Target salary:** $100,000+ after tax (~$130-140k gross)
**Target timeline:** Hired within 10-12 months
**Preferred work:** Remote first — not limited to Albuquerque market

---

## Why I am doing this

I want to make more money, faster, by learning skills the market actually pays for.
Cloud and DevOps is one of the few fields where a self-taught person with a real project
and the right certifications can compete with people who have degrees.
I am betting on that. This project is the proof of work.

---

## The Project

**IncentiRise** — a full stack rewards and accountability platform.

I chose to build a real app instead of following a tutorial because:

- Tutorials don't teach you to debug
- Real projects force you to make decisions
- Employers can see it on GitHub
- Every phase adds something I can talk about in an interview

By the time this project is done it will have touched every major skill
a Cloud/DevOps engineer needs — containers, CI/CD, cloud deployment,
infrastructure as code, monitoring, and scaling.

---

## Certification Plan

| Cert                              | When            | Why                                                         |
| --------------------------------- | --------------- | ----------------------------------------------------------- |
| AWS Cloud Practitioner            | During Phase 3  | Entry level proof of seriousness, gets past keyword filters |
| AWS Solutions Architect Associate | During Phase 5  | The most recognized cloud cert — opens doors                |
| HashiCorp Terraform Associate     | During Phase 6  | Pairs with real Terraform work, increasingly requested      |
| AWS DevOps Engineer Professional  | After first job | Nice to have, not needed to get hired                       |

**Resources:**

- Adrian Cantrill's AWS courses — best available, worth every dollar
- TutorialsDojo practice exams — closest to the real thing
- Terraform documentation — read it while building, not before

---

## Networking Plan

- LinkedIn profile updated with IncentiRise project after every phase
- Post a short weekly update about what I learned — consistency over perfection
- Connect with DevOps and Cloud engineers and ask for 15 minute conversations
- Join the DevOps subreddit, AWS community Slack, Cloud Resume Challenge Discord
- Complete the Cloud Resume Challenge as a companion project during Phase 5

---

## Target Roles

Start applying around Phase 5 when the story is strong enough.

**First job targets:**

- Cloud Support Engineer (AWS direct is a legitimate entry point)
- Junior DevOps Engineer
- Infrastructure Engineer I
- Cloud Operations Engineer

**Avoid for first role:**

- Large enterprises — slow moving, less learning
- Roles requiring 3+ years experience — apply anyway but prioritize realistic targets

**Second job targets (1-2 years in):**

- Site Reliability Engineer
- Senior DevOps Engineer
- Platform Engineer

---

## Roadmap

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

## Daily Log

### Day 1

Defined the entire system — entities, flow, features, screens, tech stack.
First commit to Git. The project is real now, not just an idea.

### Day 2

Set up the full backend environment. Node, PostgreSQL, Prisma.
Wrote the database schema. Ran the first migration. Tables exist in a real database.
Learned that production grade decisions made early save pain later.

### Day 3

Built the Express server. Hit four different Prisma 7 errors.
Solved every one by reading error messages and trying fixes.
Server is running. Health check responds. Committed and pushed to GitHub.
Learned that debugging is not a sign of failure — it is the job.

### Day 4

Set up a complete development environment on a MacBook from scratch.
Installed Homebrew, Node.js, PostgreSQL. Configured PATH. Cloned the repo.
Built the first real API routes — POST, GET all, and GET by ID for Users.
Learned that every machine is a fresh start and knowing how to set one up
is a core skill, not a one time task.

### Day 5

Built Task API routes following the same pattern as Users.
POST, GET all, and GET by ID — all tested and working.
The pattern is becoming familiar. The second set of routes took a fraction
of the time the first set did. That is what repetition does.

### Day 6

Built Reward API routes — POST, GET all, and GET by ID.
Zero structural errors. The only issue was environmental — starting the server
from the wrong directory. Fixed in one step.
The pattern that took hours on Day 4 now takes minutes.
Installed VS Code. The development environment is fully professional now.

### Day 7

Built the two logic routes that make IncentiRise actually work as a rewards system.
POST /complete-task — a user completes a task and earns points.
POST /redeem-reward — a user spends points on a reward.
Tested the full loop end to end: user started at 0 points, earned 50, spent 30, ended at 20.
Every action recorded in the database. The app is no longer just storing data — it is doing something.

---

## Things I Want to Remember

The people who make it are not the ones who never get stuck.
They are the ones who get stuck, figure it out, and keep going.

Every error I solve today is one I will never have to Google again.

The job market does not care how I learned this.
It cares that I can do it.

Tutorials teach you what to type.
Building teaches you how to think.

Speed comes from repetition, not shortcuts.
The more routes I build, the faster I build them.
By the time I am deploying to AWS, this will all feel obvious.

I am building.

---

## Current Status

Phase 1 — Day 8 up next.
Twelve routes total — Users, Tasks, Rewards, and the full rewards logic loop.
All committed and pushed to GitHub.
Day 8 completes Phase 1 with input validation and standardized error handling.
After that, Phase 2 begins — Git Workflow and Code Discipline.
