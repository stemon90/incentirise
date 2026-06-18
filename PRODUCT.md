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

- **Good Deeds** — the positive actions youth are awarded points for (formerly "Behaviors"; backend rename deferred until app is more complete)
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

No grade field — dropped in favor of DOB-derived age only, since orgs already track demographic data like grade through other systems.

---

## Good Deeds

### What They Are

Good deeds are the positive actions staff award points for. They should be:

- Voluntary and youth-initiated
- Growth-oriented and positive in framing
- Rooted in good citizenship, helping others, and taking pride in their space
- Observable by staff — if a staff member cannot directly see it happen, it should not be a good deed

Good deeds can include academic tasks, participation, character moments, leadership, cleaning and maintenance (voluntary), and anything else that reflects the above spirit.

### Categories — Shipped

Good deeds are organized into categories for filtering on the award screen: Attendance, Academic, Participation, Helping Others, Character, Leadership, Cleaning & Facility Care, Community & Citizenship, Athletics & Physical Activity, Arts & Creativity, Tech & STEM, Personal Growth.

The `category` field lives on the `Behavior` model. The award screen renders a pill-style filter bar above the good deed list — tap a category to filter, "All" shows everything. Categories are also used to sort the good deed list (category, then name) when fetched from the API.

### Organization

- Good deeds have a category field for filtering — shipped
- Category filter buttons on the award screen — shipped
- Good deeds can be archived but never deleted if they have transactions attached — not yet enforced in code
- Good deeds with zero transactions can be deleted — not yet enforced in code
- A search bar on the award screen for fast lookup — not yet built
- Sort by usage frequency (staff's most used first, then org-wide) — not yet built; currently sorted by category then name

### Creating Good Deeds

- Staff can create new good deeds on the fly from the award screen — not yet built (currently Admin-only direct add via Behaviors tab, or Leader request via existing behavior-request flow)
- New good deeds require Admin approval before points are awarded — partially built via existing BehaviorRequest model and approval flow
- The submission and the point award are one atomic action — not yet fully wired to match this design; current behavior-request flow awards provisional points immediately and reverses on rejection rather than holding points pending until approval

### Good Deed Approval Flow (Behaviors Tab)

- The Behaviors tab serves two purposes: management view for Admin, approval queue for new submissions — built
- Staff submits a new good deed from the award screen with a point value and youth selected — not yet built (current flow is a separate "Request New Behavior" form, not integrated into the award screen)
- Admin approves or rejects — built

### Bulk Awarding

Not yet built. Staff should be able to select multiple youth and award the same good deed to all of them at once. Useful for classroom participation, group activities, attendance.

### Flagging

Not yet built. The app should auto-warn staff before submitting if a good deed contains obvious violations (negative language, language suggesting assigned labor). Warning does not block submission. No platform-level moderation — responsibility stays with the org.

### Cleaning and Maintenance Tasks

Cleaning tasks are allowed and encouraged as good deeds when voluntary. The distinction is:

- Voluntary and youth-initiated → good deed
- Assigned as a condition or requirement → violation of community guidelines

This is addressed in onboarding, not enforced by the app.

### Suggestions

Not yet built. Award screen should surface staff's most used good deeds first, then org-wide most used below. Advanced pattern-based suggestions per youth are a future feature.

---

## Default Good Deeds List

Every new org is seeded with these 52 good deeds on registration, each with a category. All use a sliding scale — staff picks the point value within the min/max range.

**Attendance (1):** Signed in today — 1 pt (fixed)

**Academic (6):** Completed homework / Power Hour (3–10), Turned in a completed assignment (3–8), Asked for help (3–5), Helped a peer with homework (5–10), Read independently during reading time (3–8), Finished a book (5–15)

**Participation (5):** Participated in an activity (3–10), Stayed engaged for the full session (3–8), Tried something new (3–8), Raised their hand to contribute (3–5), Shared an idea with the group (3–8)

**Helping Others (5):** Helped a staff member (5–10), Helped a peer (3–10), Helped set up or clean up for an event (3–8), Helped with snack/lunch/dinner (3–8), Shared supplies with someone (3–5)

**Character (6):** Welcomed a new member (3–8), Complimented someone sincerely (3–5), Apologized sincerely (3–8), Walked away from an argument (3–8), Resolved a conflict peacefully (5–10), Took responsibility for a mistake (5–10)

**Leadership (4):** Mentored a younger member (5–15), Led a group activity (5–15), Kept the group focused and on task (5–10), Read to a younger member (5–10)

**Cleaning & Facility Care (7):** Picked up trash (3–5), Swept a room (3–8), Wiped down tables (3–5), Vacuumed the carpet (3–8), Cleaned windows (3–8), Cleaned walls (3–8), Picked up after themselves (3–5)

**Community & Citizenship (5):** Held the door for someone (1–3), Said please and thank you unprompted (1–3), Behaved on the bus (3–8), Behaved on a field trip (5–10), Represented the club positively (5–10)

**Athletics & Physical Activity (3):** Participated in physical activity (3–8), Showed good sportsmanship (3–10), Encouraged a teammate (3–8)

**Arts & Creativity (3):** Completed an art project (3–10), Shared their creative work with the group (3–8), Presented a project to the group (5–15)

**Tech & STEM (4):** Completed a coding or STEM challenge (5–15), Helped a peer troubleshoot (5–10), Learned a new tech skill (5–10), Demonstrated a project to the group (5–15)

**Personal Growth (3):** Kept trying after failing (5–10), Improved on a previous attempt (5–10), Got an A on a test or assignment (5–15)

**Point economy anchor:** a consistently engaged kid attending 5 days/week for a full school year (~180 days) earns roughly 1,000–2,000 points depending on effort level. The PS5 ceiling at 1,500 points represents about one full school year of dedicated positive participation.

---

## Points

### Rules

- Points can only go up — never removed as discipline
- If points were awarded by mistake, staff submits a correction request with a reason — not yet built
- Admin approves the correction — not yet built
- Points are removed only after approval, original + correction both permanently in the audit trail (bank reversal model) — not yet built

### Custom Point Name

- `pointName` field exists on the Organization model, defaults to "points"
- Admin sets a custom name during onboarding or in org settings — UI not yet built
- The custom name should cascade through the entire UI — not yet wired into frontend display

### Pending Points

Not yet built. When a new good deed is submitted and awaiting Admin approval, points should show on the youth's balance marked as pending. Confirmed and added on approval, removed on rejection. No artificial urgency in the UI.

---

## Prizes

### Prize Types

- **Catalogued prize** — a specific named item with an exact point value
- **Tier prize** — a bulk catch-all entry (Tier 1 Prize, Tier 2 Prize, etc.) used for donated or chaotic inventory; included in the default seed
- **Experience** — a planned event or activity — always catalogued specifically

### Prize Categories — Shipped

Prizes are organized into categories for filtering on the prize catalog: Small & Instant, Privileges & Experiences, Art & School Supplies, Clothing & Accessories, Toys & Games, Sports & Outdoors, Tech, Big Ticket.

The `category` field lives on the `Prize` model. The Prizes tab renders the same pill-style filter bar used on the award screen. Prizes are sorted by category, then point cost, when fetched from the API.

### Prize Tiers

Tiers are organizational labels to help Admin place new prizes on the scale, not hard limits.

Tier 1: 15–75 pts (pencil, snack, privilege, stickers). Tier 2: 75–250 pts (sports ball, clothing, board game). Tier 3: 250–600 pts (tech accessories, instruments, Lego large). Tier 4: 600–1500 pts (console, mountain bike, tablet).

Big ticket prizes (Tier 4) are always catalogued specifically at their exact point value.

### Quantity — Shipped

- Quantity field is optional on prizes — form no longer requires it, placeholder reads "Leave blank for unlimited"
- Backend defaults to 999 (effectively unlimited) instead of 1 when left blank
- If set, app tracks remaining stock and closes the prize when it hits zero — display only; depletion logic not yet enforced
- If not set, prize stays open until Admin archives or closes it manually

### Redemption Flow

**Pre-requested (catalogued prizes)** — built via existing Redemption model and approval flow. Youth requests a specific prize, it sits pending in the Admin queue, staff fulfills when ready and marks fulfilled, points deducted.

**On-the-spot (tier prizes)** — not yet built. Staff pulls up youth profile, selects the tier of the item the youth physically chose, points deducted immediately, no prior request needed.

### Prize Rules

Prizes should never include meals or basic sustenance — covered via onboarding guidelines and terms of service (not yet written). Snacks and treats are fine.

### Archive and Delete

Zero redemptions → delete allowed. Has redemptions → archive only, enforced automatically. Not yet enforced in code — current delete is unconditional.

---

## Default Prize List

Every new org is seeded with 110 prizes on registration across 8 categories. See `backend/src/seed/defaultSeed.js` for the full list with categories and point values.

**Point economy anchors:** wooden pencil — 15 pts (floor); PS5 / Xbox Series X — 1,500 pts (ceiling).

---

## Group Challenges

Not yet built. Admin creates group challenges with a goal, a prize, and an optional deadline. Max 3 active per org. Funded via private individual donations and/or staff-designated group events. No minimum contribution. Goal reached → everyone gets the prize. Challenge fails → donated points returned, staff-designated points disappear.

---

## Youth of the Month

Not yet built. Staff nominated, optionally by category, winner gets a free prize credit (not bonus points) at an Admin-set tier limit. No automatic selection.

---

## Youth Profile

Built, with room to grow. Currently shows current point balance, QR code, prize redemption list, and point history (good deed, note, staff, points earned).

Still needed: pending points display, a leaner faster-loading daily-use view, and a separate Admin reports section for deep historical data.

---

## Reporting

Every point transaction is permanently logged with staff, youth, good deed, amount, note, and timestamp — built. Correction audit trail — not yet built (correction flow doesn't exist yet). Reports section for per-youth stats, org-wide activity, and grant-ready impact data — not yet built.

---

## Rules, Restrictions & Community Guidelines

To be presented during onboarding and agreed to via terms of service at signup (onboarding flow not yet built). The app enforces what software can enforce; human behavior in the physical world is the org's responsibility.

1. Points cannot be removed as discipline — ever
2. Corrections require Admin approval and are permanently documented
3. Good deeds must be voluntary, growth-oriented, and directly observable by staff
4. Goals cannot be used as threats
5. Prizes cannot include meals or basic sustenance
6. Good deeds should not make youth the primary cleaning or maintenance service
7. The app's only consequence for not earning points is not being able to redeem a prize yet

---

## Onboarding

Not yet built as a formal flow. New org registration already auto-seeds 52 good deeds and 110 prizes. Still needed: terms of service agreement, custom point name setup, prize tier limits for youth of the month, and a walkthrough of how effort maps to prizes.

---

## Authentication

Staff login via email and password — built. Forgot password (email → reset link → new password → login) — not yet built. New org registration creates org and first Admin account in one step, with auto-seeded good deeds and prizes — built.

---

## What's Still Open

### Shipped this session

- [x] Tags/categories on good deeds — `category` field added to Behavior model, migration run, seed updated, award screen filters by category
- [x] Categories on prizes — `category` field added to Prize model, migration run, seed updated, Prizes tab filters by category
- [x] Prize quantity made optional (defaults to 999 / unlimited instead of requiring 1)

### Shipped in follow-up session (nav, spacing, logo)

- [x] Nav link styling and mobile UX — consolidated App.css and index.css into a single stylesheet (App.css was a leftover V1 file silently conflicting with the real styles), replaced horizontal-scroll mobile nav with a hamburger dropdown menu
- [x] Fixed a breakpoint conflict where the landscape tablet media query (max-width: 1024px) overlapped with the new hamburger breakpoint (max-width: 768px), causing nav buttons to disappear around 696–768px wide; landscape query now scoped to min-width: 769px
- [x] Page-header spacing — added `gap: 24px` to the shared `.page-header` rule, fixing the cramped spacing between tab titles and their "+ Add" buttons across all six pages (Youth, Staff, Prizes, Redemptions, AwardPoints, Behaviors) in one change
- [x] Logo fixes — cropped logo.png to remove excess transparent canvas (was 1536×1024 with the actual mark occupying only a fraction of that space), resized and centered the login screen logo and heading/subtitle text, resized the dashboard header logo so it no longer reads as tiny against the 60px header bar

### Not yet built

- [ ] Good deed approval flow fully wired so submission + point award is one atomic action (currently uses the older provisional-points/behavior-request model)
- [ ] Archive vs delete enforcement on good deeds and prizes (zero transactions → delete; has transactions → archive only)
- [ ] Pending points display on youth balance
- [ ] Correction request flow — accidental point removal with Admin approval and permanent audit trail
- [ ] Bulk awarding — award same good deed to multiple youth at once
- [ ] Visual prize spectrum — design and interaction model for placing new prizes on the point scale intuitively
- [ ] Group challenges
- [ ] Youth of the month with free prize credit
- [ ] Admin reports section (deep historical data, grant-ready reports)
- [ ] Prize expiration / time-limited prizes
- [ ] Youth-facing mobile view
- [ ] Forgot password email implementation
- [ ] Stripe integration and subscription tiers
- [ ] Smart suggestions (staff's most-used good deeds first, then org-wide) — future
- [ ] Deprecation prompts for unused good deeds — future
- [ ] Full Good Deeds rename across backend (model name, route paths, variable names, CSS classes) — deferred until app is more feature-complete
- [ ] Production database cleanup — remove old test orgs from incentirise.com while preserving the real org (steven@incentirise.com)
