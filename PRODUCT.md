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
- Observable by staff — if a staff member cannot directly see it happen, it should not be a good deed

Good deeds can include academic tasks, participation, character moments, leadership, cleaning and maintenance (voluntary), and anything else that reflects the above spirit.

### Categories (Tags)

Good deeds are organized into categories for filtering on the award screen:

- Attendance
- Academic
- Participation
- Helping Others
- Character
- Leadership
- Cleaning & Facility Care
- Community & Citizenship
- Athletics & Physical Activity
- Arts & Creativity
- Tech & STEM
- Personal Growth

### Organization

- Good deeds have tags for filtering by category
- On the award screen, staff sees their most used good deeds first, then org-wide most used below
- Staff can filter by category tag for fast lookup
- Good deeds can be archived but never deleted if they have transactions attached
- Good deeds with zero transactions can be deleted
- The app enforces this automatically — delete is only available when transaction count is zero
- A search bar is available on the award screen for fast lookup
- Good deeds are sorted by usage frequency by default — rarely used ones sink naturally

### Creating Good Deeds

- Staff can create new good deeds on the fly from the award screen
- New good deeds require Admin approval before points are awarded
- The submission and the point award are one atomic action:
  - Admin approves → good deed added to org list AND points land on youth balance
  - Admin rejects → neither happens
- This prevents staff from forgetting to award points after approval
- Every good deed in the system has at least one transaction attached — no orphaned records

### Good Deed Approval Flow (Behaviors Tab)

- The Behaviors tab serves two purposes: management view for Admin, approval queue for new submissions
- Staff submits a new good deed from the award screen with a point value and youth selected
- The submission appears in the Admin's approval queue in the Behaviors tab
- Admin approves or rejects
- Approved: good deed added to org list, points awarded to youth
- Rejected: nothing happens, no points awarded

### Bulk Awarding

- Staff can select multiple youth and award the same good deed to all of them at once
- Useful for classroom participation, group activities, attendance
- Each award is individually logged per youth in the audit trail

### Flagging

- The app auto-warns staff before submitting if a good deed contains obvious violations:
  - Negative language ("didn't," "stopped," "refused")
  - Language suggesting assigned labor rather than voluntary participation
- The warning does not block submission — staff can proceed, but they were warned
- No platform-level moderation — responsibility stays with the org

### Cleaning and Maintenance Tasks

Cleaning tasks are allowed and encouraged as good deeds when voluntary. The distinction is:

- Voluntary and youth-initiated → good deed
- Assigned as a condition or requirement → violation of community guidelines

This is addressed in onboarding, not enforced by the app.

### Suggestions

- Award screen surfaces staff's most used good deeds first
- Org-wide most used good deeds fill in below
- Advanced pattern-based suggestions per youth — future feature

---

## Default Good Deeds List

Every new org is seeded with these 52 good deeds on registration. All use a sliding scale — staff picks the point value within the min/max range.

### Attendance (1)

| Good Deed       | Points    |
| --------------- | --------- |
| Signed in today | 1 (fixed) |

### Academic (6)

| Good Deed                              | Points |
| -------------------------------------- | ------ |
| Completed homework / Power Hour        | 3–10   |
| Turned in a completed assignment       | 3–8    |
| Asked for help                         | 3–5    |
| Helped a peer with homework            | 5–10   |
| Read independently during reading time | 3–8    |
| Finished a book                        | 5–15   |

### Participation (5)

| Good Deed                           | Points |
| ----------------------------------- | ------ |
| Participated in an activity         | 3–10   |
| Stayed engaged for the full session | 3–8    |
| Tried something new                 | 3–8    |
| Raised their hand to contribute     | 3–5    |
| Shared an idea with the group       | 3–8    |

### Helping Others (5)

| Good Deed                              | Points |
| -------------------------------------- | ------ |
| Helped a staff member                  | 5–10   |
| Helped a peer                          | 3–10   |
| Helped set up or clean up for an event | 3–8    |
| Helped with snack, lunch, or dinner    | 3–8    |
| Shared supplies with someone           | 3–5    |

### Character (6)

| Good Deed                         | Points |
| --------------------------------- | ------ |
| Welcomed a new member             | 3–8    |
| Complimented someone sincerely    | 3–5    |
| Apologized sincerely              | 3–8    |
| Walked away from an argument      | 3–8    |
| Resolved a conflict peacefully    | 5–10   |
| Took responsibility for a mistake | 5–10   |

### Leadership (4)

| Good Deed                          | Points |
| ---------------------------------- | ------ |
| Mentored a younger member          | 5–15   |
| Led a group activity               | 5–15   |
| Kept the group focused and on task | 5–10   |
| Read to a younger member           | 5–10   |

### Cleaning & Facility Care (7)

| Good Deed                  | Points |
| -------------------------- | ------ |
| Picked up trash            | 3–5    |
| Swept a room               | 3–8    |
| Wiped down tables          | 3–5    |
| Vacuumed the carpet        | 3–8    |
| Cleaned windows            | 3–8    |
| Cleaned walls              | 3–8    |
| Picked up after themselves | 3–5    |

### Community & Citizenship (5)

| Good Deed                            | Points |
| ------------------------------------ | ------ |
| Held the door for someone            | 1–3    |
| Said please and thank you unprompted | 1–3    |
| Behaved on the bus                   | 3–8    |
| Behaved on a field trip              | 5–10   |
| Represented the club positively      | 5–10   |

### Athletics & Physical Activity (3)

| Good Deed                         | Points |
| --------------------------------- | ------ |
| Participated in physical activity | 3–8    |
| Showed good sportsmanship         | 3–10   |
| Encouraged a teammate             | 3–8    |

### Arts & Creativity (3)

| Good Deed                                 | Points |
| ----------------------------------------- | ------ |
| Completed an art project                  | 3–10   |
| Shared their creative work with the group | 3–8    |
| Presented a project to the group          | 5–15   |

### Tech & STEM (4)

| Good Deed                            | Points |
| ------------------------------------ | ------ |
| Completed a coding or STEM challenge | 5–15   |
| Helped a peer troubleshoot           | 5–10   |
| Learned a new tech skill             | 5–10   |
| Demonstrated a project to the group  | 5–15   |

### Personal Growth (3)

| Good Deed                        | Points |
| -------------------------------- | ------ |
| Kept trying after failing        | 5–10   |
| Improved on a previous attempt   | 5–10   |
| Got an A on a test or assignment | 5–15   |

**Point economy anchor:**
A consistently engaged kid attending 5 days/week for a full school year (~180 days) earns approximately 1,000–2,000 points depending on effort level. The PS5 ceiling at 1,500 points represents roughly one full school year of dedicated positive participation.

---

## Points

### Rules

- Points can only go up — never removed as discipline
- If points were awarded by mistake, staff submits a correction request with a reason
- Admin approves the correction
- Points are removed only after approval
- Both the original transaction and the correction are permanently in the audit trail — nothing is deleted, everything is documented (bank reversal model)

### Custom Point Name

- Admin sets a custom name for points during onboarding or in org settings
- Examples: Club Bucks, Stars, Coins, Tokens, Roadrunner Bucks
- The custom name cascades through the entire UI

### Pending Points

- When a new good deed is submitted and awaiting Admin approval, points show on the youth's balance marked as pending
- Points are confirmed and added to balance when Admin approves
- Points disappear from balance if Admin rejects
- No artificial urgency in the UI — natural accountability only

---

## Prizes

### Prize Types

- **Catalogued prize** — a specific named item with an exact point value
- **Tier prize** — a bulk catch-all entry (Tier 1 Prize, Tier 2 Prize, etc.) used for donated or chaotic inventory
- **Experience** — a planned event or activity — always catalogued specifically

### Prize Categories

Prizes are organized into categories for filtering on the prize catalog:

- Small / Instant
- Privileges & Experiences
- Art & School Supplies
- Clothing & Accessories
- Toys & Games
- Sports & Outdoors
- Tech
- Big Ticket

### Prize Tiers

Tiers are organizational labels to help Admin place new prizes on the scale. They are not hard limits.

| Tier   | Point Range  | Examples                                  |
| ------ | ------------ | ----------------------------------------- |
| Tier 1 | 15–75 pts    | Pencil, snack, privilege, stickers        |
| Tier 2 | 75–250 pts   | Sports ball, clothing, board game         |
| Tier 3 | 250–600 pts  | Tech accessories, instruments, Lego large |
| Tier 4 | 600–1500 pts | Console, mountain bike, tablet            |

Big ticket prizes (Tier 4) are always catalogued specifically at their exact point value.

### Quantity

- Quantity field is optional on prizes
- If set, app tracks remaining stock and closes the prize when it hits zero
- If not set, prize stays open until Admin archives or closes it manually

### Redemption Flow

**Pre-requested (catalogued prizes)**

- Youth requests a specific prize through the app
- Sits as pending in the Admin queue
- Staff fulfills when ready
- Staff marks as fulfilled, points deducted

**On-the-spot (tier prizes)**

- Staff pulls up youth profile
- Selects the tier of the item the youth chose from a physical pile or box
- Points deducted immediately
- No prior request needed

### Prize Rules

- Prizes should never include meals or basic sustenance — onboarding guidelines and terms of service
- Snacks and treats are fine

### Archive and Delete

- Zero redemptions → delete allowed
- Has redemptions → archive only, app enforces automatically

---

## Default Prize List

Every new org is seeded with 110 prizes on registration across 8 categories. See seed file for full list.

**Point economy anchors:**

- Wooden pencil — 15 pts (floor)
- PS5 / Xbox Series X — 1,500 pts (ceiling)

---

## Group Challenges

- Admin creates group challenges with a goal, a prize, and an optional deadline
- Maximum 3 active challenges at once per org
- The entire center can be the group for center-wide challenges

### Funding

- Individual donations — youth voluntarily donate existing points (private, no leaderboard)
- Staff-designated group events — staff awards points directly to the pool

### Rules

- Donations are voluntary and private
- No minimum contribution — youth benefit regardless of contribution
- Goal reached → everyone receives the prize
- Challenge fails or expires → donated individual points returned, staff-designated points disappear

---

## Youth of the Month

- Staff nominated — Admin or any staff selects youth of the week or month
- Can be by category (Art, Athletics, STEM, Academic, etc.)
- Winner receives a free prize credit — not bonus points
- Admin sets the prize tier limit for the credit
- No automatic selection — leaderboard informs but human decides
- Aligns with existing Boys & Girls Club youth recognition traditions

---

## Youth Profile

Designed for fast daily use.

Shows:

- Current point balance
- Pending points (if any)
- Recent activity — "Did homework — 10 points"

Deep historical data lives in a separate Admin reports section.

---

## Reporting

- Every point transaction is permanently logged — never deleted
- Every good deed award includes: staff, youth, good deed, amount, note, timestamp
- Every correction is logged alongside the original transaction
- Reports section (Admin only) — per youth stats, org-wide activity, grant-ready impact data

---

## Rules, Restrictions & Community Guidelines

Presented during onboarding and agreed to via terms of service at signup.

1. Points cannot be removed as discipline — ever
2. Corrections require Admin approval and are permanently documented
3. Good deeds must be voluntary, growth-oriented, and directly observable by staff
4. Goals cannot be used as threats
5. Prizes cannot include meals or basic sustenance
6. Good deeds should not make youth the primary cleaning or maintenance service
7. The app's only consequence for not earning points is not being able to redeem a prize yet

---

## Onboarding

Every new org registration:

- Agrees to community guidelines and terms of service
- Receives 52 default good deeds pre-seeded
- Receives 110 default prizes pre-seeded
- Admin sets custom point name
- Admin sets prize tier limits for youth of the month credit
- Onboarding walks orgs through point economy so they understand how effort maps to prizes

---

## Authentication

- Staff login via email and password
- Forgot password — email → reset link → new password → return to login
- New org registration creates org and first Admin account in one step

---

## What's Still Open

- [ ] Tags/categories on good deeds — filter on award screen, management in Behaviors tab
- [ ] Categories on prizes — filter on prize catalog
- [ ] Good deed approval flow — staff submits from award screen, Admin approves/rejects in Behaviors tab, atomic point award
- [ ] Archive vs delete enforcement on good deeds and prizes
- [ ] Pending points display on youth balance
- [ ] Correction request flow — accidental point removal with Admin approval and audit trail
- [ ] Bulk awarding — award same good deed to multiple youth at once
- [ ] Visual prize spectrum — design and interaction model
- [ ] Group challenges
- [ ] Youth of the month with free prize credit
- [ ] Admin reports section
- [ ] Prize expiration / time-limited prizes
- [ ] Youth-facing mobile view
- [ ] Forgot password email implementation
- [ ] Stripe integration and subscription tiers
- [ ] Smart suggestions — future
- [ ] Deprecation prompts for unused good deeds — future
