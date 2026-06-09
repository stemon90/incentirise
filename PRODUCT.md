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

### Suggestions (Future)

Advanced pattern-based suggestions per youth ("You usually award Maria for reading, it's been 3 days") are a future feature.

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

### Point Values

Point values for good deeds use a sliding scale — each good deed has a min and max range and staff picks where the effort deserves within that range.

Default good deed point ranges and the default prize point economy are to be designed together in a dedicated session. The two systems must be balanced — the effort required to earn points should feel proportional to the prizes available.

---

## Prizes

### Prize Types

- **Specific item** — a named physical item (water bottle, pencil, hoodie)
- **Experience** — a planned event or activity (field trip, pizza party, movie night)
- **Choice** — youth picks from a physical prize box or table; staff records the tier, not the item

### Prize Tiers

- Default tiers: Tier 1 (5–25 pts), Tier 2 (25–75 pts), Tier 3 (75–200 pts)
- Orgs can adjust ranges and costs freely — no hard limits
- A visual spectrum (prize ladder) is used during prize setup so Admin can see where prizes fall relative to each other and assign values intuitively
- The visual spectrum and default prize list (approx. 100 items) are to be designed in a dedicated session

### Quantity

- Quantity field is **optional** on prizes
- If set, app tracks remaining stock and closes the prize when it hits zero
- If not set, prize stays open until Admin archives or closes it manually
- Real-world inventory is the org's responsibility — the app tracks requests, not physical stock

### Redemption Flow

Two redemption modes:

**Pre-requested**

- Youth requests a redemption through the app anytime
- Sits as pending in the Admin queue
- Staff fulfills when ready (immediately if possible, or during Prize Store)
- Staff marks as fulfilled
- Points deducted on fulfillment

**On-the-spot (tier-based)**

- Staff pulls up youth profile during Prize Store or any time
- Selects the tier of the item the youth chose physically
- Points deducted immediately
- No prior request needed — works for bulk donated prizes and prize boxes

Experiences and events are always pre-requested and specifically listed. Physical prizes can use either model depending on what the org can manage.

**Note:** The catalog model vs. tier-based model decision is still under consideration. To be finalized in the prize list session.

### Prize Rules

- Prizes should never include meals or basic sustenance — covered in onboarding guidelines and terms of service
- Snacks and treats are fine
- The app cannot detect misuse of this rule — legal cover through terms of service

### Archive and Delete

Same rules as good deeds:

- Zero redemptions → delete allowed
- Has redemptions → archive only, app enforces automatically

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
- Walks through point economy setup — guidance on balancing good deed values and prize costs
- Receives a default good deeds list (to be finalized in a dedicated session)
- Receives suggested prize tiers and visual spectrum tool for prize setup
- Admin sets custom point name
- Admin sets prize tier limits for youth of the month credit

---

## Authentication

- Staff login via email and password
- Forgot password — enter email → reset link sent → staff creates new password → return to login
- Forgot username flow is unnecessary — email is the login identifier
- New org registration creates org and first Admin account in one step

---

## What's Still Open

- [ ] Default good deeds list — approx. 100 items with tags and point ranges
- [ ] Default prize list — approx. 100 items mapped to the visual spectrum
- [ ] Point economy design — good deed values and prize costs designed together as a balanced system
- [ ] Visual prize spectrum — design and interaction model
- [ ] Catalog model vs. tier-based redemption — final decision pending
- [ ] Smart suggestions (advanced, per-youth patterns) — future feature
- [ ] Deprecation prompts for unused good deeds — future feature
- [ ] Prize expiration / time-limited prizes — not yet addressed
- [ ] Youth-facing mobile view — simplified view for kids
- [ ] Forgot password email implementation
- [ ] Stripe integration and subscription tiers
