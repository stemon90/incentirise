# IncentiRise — Product Spec

This document captures product design decisions, feature specs, rules, and philosophy for IncentiRise. It is a living document updated as decisions are made.

---

## What Is IncentiRise?

IncentiRise is a rewards and accountability platform for afterschool programs, Boys & Girls Clubs, schools, families, and any entity that regularly serves youth. It incentivizes youth to engage in positive behaviors and perform good deeds by assigning points to each action. When youth reach a certain number of points, they can redeem them for prizes.

**Elevator pitch:** "IncentiRise turns your incentive program into measurable data that helps you win grants."

---

## Who Is It For?

- Afterschool programs
- Boys & Girls Clubs
- Schools and classrooms
- Families (future)
- Any organization that regularly serves youth

---

## Core Philosophy

- Points should only go up. They are never removed as discipline.
- The only consequence of not earning enough points is not being able to redeem a prize yet.
- Good deeds should be voluntary, growth-oriented, and rooted in positive citizenship.
- The app encourages positive behavior — it never threatens or punishes.
- The platform sets the culture through design and language. Enforcement of human behavior is the org's responsibility.

---

## Terminology

- **Good Deeds** — the positive actions youth are awarded points for (formerly "Behaviors")
- **Points** — customizable per org (e.g. Club Bucks, Stars, Coins, Tokens)
- **Prize** — what youth redeem their points for
- **Prize Store** — a real-world event where staff fulfills redemptions (not tracked in the app)
- **Staff** — adults who use the app (Admin or Leader role)
- **Youth** — members who earn points and redeem prizes
- **Org** — the organization using the platform (a Boys & Girls Club, school, etc.)

---

## User Accounts

### Staff Accounts

Fields: first name, last name, email, password, role, auto-assigned ID

Roles:

- **Admin** — full access, approves good deeds, corrections, redemptions, manages org settings
- **Leader** — awards points, submits new good deed requests, fulfills redemptions

Age policy: who receives staff access is the org's responsibility. The app does not enforce age requirements.

### Youth Accounts

Fields: first name, last name, date of birth (age calculated automatically), auto-assigned ID, version (Home or Program), site/location (Program version only)

- **Program version** — youth attends a physical site, location field required
- **Home version** — no location needed

---

## Good Deeds

### What They Are

Good deeds are the positive actions staff award points for. They should be:

- Voluntary and youth-initiated
- Growth-oriented and positive in framing
- Rooted in good citizenship, helping others, and taking pride in their space

Good deeds can include academic tasks, participation, character moments, leadership, cleaning and maintenance (voluntary), and anything else that reflects the above spirit.

### Organization

- Good deeds have **tags** for filtering (e.g. Academic, Character, Athletics, Art, Tech)
- On the award screen, staff sees their **most used good deeds first**, then org-wide most used below
- Good deeds can be **archived** but never deleted if they have transactions attached
- Good deeds with zero transactions can be **deleted**
- The app enforces this automatically — delete is only available when transaction count is zero
- A **search bar** is available on the award screen for fast lookup
- Good deeds are sorted by usage frequency by default — rarely used ones sink naturally

### Creating Good Deeds

- Staff can create new good deeds on the fly from the award screen
- New good deeds require **Admin approval** before points are awarded
- The submission and the point award are one atomic action:
  - Admin approves → good deed added to org list AND points land on youth balance
  - Admin rejects → neither happens
- This prevents staff from forgetting to award points after approval
- Every good deed in the system has at least one transaction attached — no orphaned records

### Bulk Awarding

- Staff can select multiple youth and award the same good deed to all of them at once
- Useful for classroom participation, group activities, attendance — any scenario where the same good deed applies to many youth simultaneously
- Each award is still individually logged per youth in the audit trail

### Flagging

- The app **auto-warns** staff before submitting if a good deed contains obvious violations:
  - Negative language ("didn't," "stopped," "refused")
  - Language suggesting assigned labor rather than voluntary participation
- The warning does not block submission — staff can proceed, but they were warned
- Staff are not blocked by the app. The org agreed to the community guidelines at signup.
- No platform-level moderation — responsibility stays with the org

### Cleaning and Maintenance Tasks

Cleaning tasks are allowed and encouraged as good deeds when voluntary. Youth taking pride in their space and community is a legitimate good deed. The distinction is:

- **Voluntary and youth-initiated** → good deed
- **Assigned as a condition or requirement** → violation of community guidelines

This is addressed in onboarding, not enforced by the app.

### Suggestions

- Award screen surfaces staff's most used good deeds first
- Org-wide most used good deeds fill in below
- Advanced pattern-based suggestions per youth ("You usually award Maria for reading") — future feature

---

## Default Good Deeds List

Every new org is seeded with this list on registration. All good deeds use a sliding scale — staff picks the point value within the min/max range based on effort and context.

### Attendance & Participation

| Good Deed                           | Points    |
| ----------------------------------- | --------- |
| Signed in / Attended today          | 1 (fixed) |
| Completed homework / Power Hour     | 3 – 10    |
| Participated in an activity         | 3 – 10    |
| Read independently                  | 3 – 8     |
| Stayed engaged for the full session | 3 – 8     |
| Tried something new                 | 3 – 8     |

### Academic

| Good Deed                      | Points |
| ------------------------------ | ------ |
| Asked for help when stuck      | 3 – 5  |
| Helped a peer with homework    | 5 – 10 |
| Improved on a previous attempt | 5 – 10 |

### Character

| Good Deed                             | Points |
| ------------------------------------- | ------ |
| Showed kindness to another member     | 3 – 10 |
| Resolved a conflict peacefully        | 5 – 10 |
| Took responsibility for a mistake     | 5 – 10 |
| Encouraged someone who was struggling | 3 – 8  |
| Welcomed a new member                 | 3 – 8  |

### Leadership

| Good Deed                        | Points |
| -------------------------------- | ------ |
| Helped staff without being asked | 5 – 10 |
| Mentored a younger member        | 5 – 15 |
| Led a group activity             | 5 – 15 |

### Community & Citizenship

| Good Deed                      | Points |
| ------------------------------ | ------ |
| Cleaned up without being asked | 3 – 8  |
| Picked up trash                | 3 – 5  |
| Held the door for someone      | 1 – 3  |

**Point economy anchor:**
A consistently engaged kid attending 5 days/week for a full school year (~180 days) earns approximately 1,000–2,000 points depending on effort level. The PS5 ceiling at 1,500 points represents roughly one full school year of dedicated positive participation.

---

## Points

### Rules

- Points can only go up — never removed as discipline
- If points were awarded by mistake, staff submits a **correction request** with a reason
- Admin approves the correction
- Points are removed only after approval
- Both the original transaction and the correction are permanently in the audit trail — nothing is deleted, everything is documented (bank reversal model)

### Custom Point Name

- Admin sets a custom name for points during onboarding or in org settings
- Examples: Club Bucks, Stars, Coins, Tokens, Roadrunner Bucks
- The custom name cascades through the entire UI — every instance of "points" uses the org's name

### Pending Points

- When a new good deed is submitted and awaiting Admin approval, points show on the youth's balance marked as **pending**
- Points are confirmed and added to balance when Admin approves
- Points disappear from balance if Admin rejects
- No artificial urgency in the UI — natural accountability only (staff knows a kid is waiting)

---

## Prizes

### Prize Types

- **Catalogued prize** — a specific named item with an exact point value (PS5, water bottle, hoodie)
- **Tier prize** — a bulk catch-all entry (Tier 1 Prize, Tier 2 Prize, Tier 3 Prize) used for donated or chaotic inventory where individual cataloging isn't practical
- **Experience** — a planned event or activity (field trip, pizza party) — always catalogued specifically

Catalogued specific prizes can be requested and reserved through the app. Tier prizes are interchangeable — nothing is reserved, no accidental giveaways.

### Prize Tiers

Tiers are organizational labels to help Admin place new prizes on the scale. They are not hard limits — orgs can set any point value they want.

| Tier   | Point Range    | Examples                                  |
| ------ | -------------- | ----------------------------------------- |
| Tier 1 | 15 – 75 pts    | Pencil, snack, privilege, stickers        |
| Tier 2 | 75 – 250 pts   | Sports ball, clothing, board game         |
| Tier 3 | 250 – 600 pts  | Tech accessories, instruments, Lego large |
| Tier 4 | 600 – 1500 pts | Console, mountain bike, tablet            |

Big ticket prizes (Tier 4) are always catalogued specifically at their exact point value. They cannot be redeemed as a generic tier prize.

### Quantity

- Quantity field is **optional** on catalogued prizes
- If set, app tracks remaining stock and closes the prize when it hits zero
- If not set, prize stays open until Admin archives or closes it manually
- Real-world inventory is the org's responsibility — the app tracks requests, not physical stock

### Redemption Flow

**Pre-requested (catalogued prizes)**

- Youth requests a specific prize through the app
- Sits as pending in the Admin queue
- Staff fulfills when ready — immediately or during Prize Store
- Staff marks as fulfilled, points deducted

**On-the-spot (tier prizes)**

- Staff pulls up youth profile
- Selects the tier of the item the youth chose from a physical pile or box
- Points deducted immediately
- No prior request needed — works for bulk donated inventory

### Prize Rules

- Prizes should never include meals or basic sustenance — onboarding guidelines and terms of service
- Snacks and treats are fine
- The app cannot detect misuse of this rule — legal cover through terms of service

### Archive and Delete

- Zero redemptions → delete allowed
- Has redemptions → archive only, app enforces automatically

---

## Default Prize List

Every new org is seeded with this list on registration. Orgs can add, edit, archive, or delete prizes freely.

### Small / Instant (Tier 1 — 15–75 pts)

| Prize                                 | Points |
| ------------------------------------- | ------ |
| Wooden pencil                         | 15     |
| Eraser                                | 15     |
| Stickers                              | 15     |
| Glue                                  | 15     |
| Snack of choice                       | 20     |
| Tier 1 Prize (prize box item)         | 20     |
| Can of soda                           | 20     |
| Slime                                 | 25     |
| Yo-yo                                 | 25     |
| Hacky sack                            | 25     |
| Jump rope (basic)                     | 25     |
| Silly string                          | 25     |
| Origami kit                           | 30     |
| Lanyard                               | 30     |
| Laptop sticker pack                   | 30     |
| Graphite pencils                      | 30     |
| Homework pass (one day)               | 30     |
| Deck of cards                         | 35     |
| Coloring book                         | 35     |
| Origami paper pack                    | 35     |
| Hula hoop                             | 35     |
| New scissors                          | 35     |
| Journal                               | 40     |
| Comic book / Manga volume             | 40     |
| Small toy (doll, action figure, etc.) | 40     |
| Frisbee                               | 40     |
| Fanny pack                            | 45     |
| Sunglasses                            | 45     |
| Baseball cap                          | 50     |

### Privileges / Experiences (Tier 1–2 — 25–200 pts)

| Prize                                                     | Points |
| --------------------------------------------------------- | ------ |
| Line leader for a week                                    | 25     |
| First in line for a week                                  | 25     |
| Sit anywhere day                                          | 25     |
| Extra screen time (30 mins)                               | 30     |
| Pick your seat for a week                                 | 30     |
| Choice of class or group game                             | 35     |
| Skip chore rotation (one time)                            | 35     |
| Choose the playlist for the day                           | 35     |
| Front desk helper for one hour                            | 40     |
| Be the DJ for one hour                                    | 40     |
| Extra recess or free play time                            | 40     |
| Computer lab free time (30 mins)                          | 40     |
| Name a club activity                                      | 45     |
| Lead a group activity                                     | 45     |
| Facility pass (game room, gym, soccer field, teen center) | 50     |
| Open gym session                                          | 50     |
| Choose the movie for movie day                            | 50     |
| Get out of homework pass (one day)                        | 50     |
| Be a junior staff helper for a day                        | 60     |
| Pizza party (individual)                                  | 100    |
| Lunch with the director                                   | 110    |
| Early dismissal pass                                      | 175    |
| Field trip                                                | 200    |

### Art & School Supplies (Tier 1–2 — 50–200 pts)

| Prize                       | Points |
| --------------------------- | ------ |
| New markers                 | 50     |
| Colored pencils             | 50     |
| Maracas                     | 50     |
| Puzzle (100–500 pieces)     | 50     |
| Kite                        | 50     |
| Sketchbook                  | 60     |
| Novel of choice             | 60     |
| Paint set                   | 75     |
| Clay kit                    | 75     |
| Craft supply kit (assorted) | 75     |
| Watercolor set              | 75     |
| Calligraphy set             | 100    |
| Board game                  | 125    |
| Lego set (small)            | 125    |
| D&D starter kit             | 150    |
| Ukulele                     | 200    |

### Clothing & Accessories (Tier 2 — 60–250 pts)

| Prize                              | Points |
| ---------------------------------- | ------ |
| Water bottle                       | 60     |
| Club apparel (shirt, shorts, etc.) | 75     |
| Drawstring backpack                | 75     |
| Hoodie                             | 150    |
| Nice backpack                      | 200    |
| New shoes                          | 250    |

### Toys & Games (Tier 1–3 — 60–300 pts)

| Prize                           | Points |
| ------------------------------- | ------ |
| Mini chess board                | 60     |
| Deck of Pokemon cards           | 75     |
| Model kit (car, airplane, etc.) | 75     |
| Jump rope (speed/nice)          | 75     |
| Nice chess board                | 150    |
| Remote control car              | 200    |
| Lego set (large)                | 300    |

### Sports & Outdoors (Tier 2–4 — 75–1000 pts)

| Prize                 | Points |
| --------------------- | ------ |
| Badminton set         | 75     |
| Resistance bands set  | 75     |
| Sports ball of choice | 125    |
| Skateboard            | 250    |
| Mountain bike         | 1000   |

### Tech (Tier 2–3 — 75–600 pts)

| Prize                                                   | Points |
| ------------------------------------------------------- | ------ |
| Tech accessory (USB drive, adapter, charger, mouse pad) | 75     |
| Bluetooth receiver                                      | 100    |
| Gaming mouse                                            | 150    |
| Bluetooth speaker                                       | 250    |
| First Act guitar                                        | 250    |
| Arduino starter kit                                     | 350    |
| Xbox controller                                         | 350    |
| Electronic drum pad                                     | 350    |
| PS5 controller                                          | 400    |
| Raspberry Pi kit                                        | 400    |
| Airpods / earbuds                                       | 500    |
| Record player                                           | 500    |
| Electric guitar (full size)                             | 600    |

### Big Ticket (Tier 4 — 100–1500 pts)

| Prize                | Points |
| -------------------- | ------ |
| Gift card ($10)      | 100    |
| Gift card ($25)      | 225    |
| Gift card ($50)      | 400    |
| Tier 2 Prize         | 75     |
| Tier 3 Prize         | 250    |
| Tier 4 Prize         | 700    |
| Nintendo Switch game | 300    |
| Tablet               | 700    |
| Nintendo Switch      | 800    |
| PS5                  | 1500   |
| Xbox Series X        | 1500   |

---

## Group Challenges

- Admin creates group challenges with a goal (point total), a prize, and an optional deadline
- Maximum **3 active challenges** at once per org
- The entire center can be the group for center-wide challenges

### Funding a Challenge

- **Individual donations** — youth voluntarily donate existing points to the challenge pool (private, no leaderboard)
- **Staff-designated group events** — staff awards points directly to the challenge pool (e.g. day of service, group activity)

### Rules

- Donations are voluntary and private — no one can see who donated or how much
- No minimum contribution required — youth benefit from the prize regardless of contribution
- When the goal is reached, everyone in the group receives the prize
- If a challenge fails or expires:
  - Donated individual points are returned to original balances
  - Staff-designated group points disappear — they were never personal points

---

## Youth of the Month

- Staff nominated — Admin or any staff selects youth of the week or month
- Can be by category if the org wants (Art, Athletics, STEM, Academic, etc.)
- Winner receives a **free prize credit** — not bonus points
- Admin sets the prize tier limit for the credit
- No automatic selection — leaderboard data is visible to inform the decision but the final call is human
- Aligns with existing Boys & Girls Club youth recognition traditions

---

## Youth Profile

Designed for fast daily use — staff pulls this up mid-session.

Shows:

- Current point balance
- Pending points (if any)
- Recent activity — "Did homework — 10 points"

Deep historical data (all-time stats, full transaction history, engagement trends) lives in a separate **Admin reports section** for monthly reviews and grant reporting.

---

## Reporting

- Every point transaction is permanently logged — never deleted
- Every good deed award includes: staff, youth, good deed, amount, note, timestamp
- Every correction is logged alongside the original transaction
- Reports section (Admin only) — per youth stats, org-wide activity, grant-ready impact data
- Grant reporting is a killer feature — incentive activity becomes measurable impact data

---

## Rules, Restrictions & Community Guidelines

These are presented during onboarding and agreed to via terms of service at signup. The app enforces what software can enforce. Human behavior in the physical world is the org's responsibility.

1. Points cannot be removed as discipline — ever
2. Corrections require Admin approval and are permanently documented
3. Good deeds must be voluntary and growth-oriented
4. Goals cannot be used as threats ("meet your goals or something bad will happen")
5. Prizes cannot include meals or basic sustenance
6. Good deeds should not make youth the primary cleaning or maintenance service for the facility
7. The app's only consequence for not earning points is not being able to redeem a prize yet

---

## Onboarding

Every new org registration:

- Agrees to community guidelines and terms of service
- Receives education on the platform philosophy (earned dopamine, positive reinforcement, growth-oriented good deeds)
- Receives the default good deeds list pre-seeded
- Receives the default prize list pre-seeded
- Admin sets custom point name
- Admin sets prize tier limits for youth of the month credit
- Onboarding walks orgs through point economy so they understand how effort maps to prizes

---

## Authentication

- Staff login via email and password
- Forgot password — enter email → reset link sent → staff creates new password → return to login
- Forgot username flow is unnecessary — email is the login identifier
- New org registration creates org and first Admin account in one step

---

## What's Still Open

- [ ] Visual prize spectrum — design and interaction model for prize setup UI
- [ ] Smart suggestions (advanced, per-youth patterns) — future feature
- [ ] Deprecation prompts for unused good deeds — future feature
- [ ] Prize expiration / time-limited prizes — not yet addressed
- [ ] Youth-facing mobile view — simplified view for kids
- [ ] Forgot password email implementation
- [ ] Stripe integration and subscription tiers
