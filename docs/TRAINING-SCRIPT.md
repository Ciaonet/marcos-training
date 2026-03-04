# Claude Code Training — Facilitator Script

**Duration:** 60 minutes
**Format:** Video call — you talk, they follow along in their own terminal
**Prereqs:** Trainees have Claude Code installed & authenticated

---

## Pre-Session Setup (you do this before the call)

```bash
# Ensure repo is accessible
gh repo view Ciaonet/marcos-training
```

Send trainees this before the call:
> Clone the training repo and install deps before we start:
> ```
> git clone https://github.com/Ciaonet/marcos-training.git
> cd marcos-training
> npm install
> ```

---

## Part 1 — First Contact (10 min)

> **Goal:** They type their first prompts and see Claude read/explain code.

### 1.1 — Launch & Orient

**SAY:** "Open your terminal in the marcos-training folder and type `claude`"

```
THEY TYPE:  claude
```

**SAY:** "You're now in Claude Code. It can see your entire project. Let's start
simple — ask it what this project does."

```
THEY TYPE:  What does this project do?
```

**POINT OUT:**
- Claude read the CLAUDE.md and source files automatically
- It gave a summary without you pointing it at specific files
- The CLAUDE.md file acts like a briefing doc — Claude reads it on every session

### 1.2 — Code Navigation

**SAY:** "Now ask it something specific about the code."

```
THEY TYPE:  What order statuses exist and what's the flow between them?
```

**POINT OUT:**
- It found the `STATUS_FLOW` array in `orders.ts` and the `OrderStatus` type
- It understood the relationship between the type definition and the runtime logic
- You didn't have to tell it which file to look in

### 1.3 — Explain a Function

```
THEY TYPE:  Explain the advanceOrderStatus function — what happens if I call it
            on a delivered order?
```

**POINT OUT:**
- Claude reads the code, traces the logic, and answers the edge case question
- This is how you onboard to an unfamiliar codebase — ask Claude, not grep

---

## Part 2 — Debugging (10 min)

> **Goal:** They see Claude find and fix a real bug.

### 2.1 — Run the Tests

**SAY:** "Let's run the tests. You can ask Claude to do it."

```
THEY TYPE:  Run the tests
```

**POINT OUT:**
- Claude ran `npm test` because it read the CLAUDE.md and knows the commands
- 3 passing, 1 failing: "should reject an invalid phone number"

### 2.2 — Debug the Failure

**SAY:** "Ask Claude to figure out why it's failing."

```
THEY TYPE:  Why is the phone validation test failing? Find the bug.
```

**POINT OUT:**
- Claude traced from the test → `createOrder` → `validatePhone`
- It identified the regex is too permissive (accepts 7+ digits instead of requiring 10)
- It didn't just read the error message — it understood the *intent* of the test

### 2.3 — Fix It

**SAY:** "Now ask it to fix the bug."

```
THEY TYPE:  Fix the validatePhone function to require exactly 10 digits
```

**POINT OUT:**
- It edited `utils.ts` in place — you can see the diff
- It used the Edit tool, not a full file rewrite (show the green/red diff)

**SAY:** "Now run the tests again to verify."

```
THEY TYPE:  Run the tests again
```

**CELEBRATE:** All 4 passing.

---

## Part 3 — Adding a Feature (10 min)

> **Goal:** They see Claude write new code that fits existing patterns.

### 3.1 — Add the Missing Endpoint

**SAY:** "The API is missing a GET /orders/:id endpoint. Ask Claude to add it."

```
THEY TYPE:  Add a GET /orders/:id endpoint that returns a single order by ID,
            or 404 if not found
```

**POINT OUT:**
- Claude added the route in `index.ts`, following the existing patterns
- It used `getOrderById` from `orders.ts` which already existed
- It returned a proper 404 — Claude understood HTTP conventions
- It placed the route in a logical position in the file

### 3.2 — Add a Test

```
THEY TYPE:  Add a test for the new endpoint
```

**WAIT** — Claude may ask whether to test via HTTP or unit test. Either way:

**POINT OUT:**
- It matched the existing test style (vitest, same describe blocks)
- It's not generating boilerplate — it's *adapting* to your project's patterns

---

## Part 4 — Skills & CLAUDE.md (15 min)

> **Goal:** They understand the custom tooling layer that makes Claude Code
> powerful for teams.

### 4.1 — What is CLAUDE.md?

**SAY:** "Remember how Claude knew to run `npm test`? That's because of
CLAUDE.md. Let's look at it."

```
THEY TYPE:  Show me the CLAUDE.md file
```

**SAY:** "This is a small one. In our real codebase, we have 35+ CLAUDE.md files
— one at the root and one in each app/service/package. They tell Claude:
- What commands to run
- What conventions to follow
- What gotchas to watch for
- The verification priority order

Think of it as *institutional knowledge that Claude can read*."

### 4.2 — Improve the CLAUDE.md

**SAY:** "Let's make this one better. Ask Claude to add conventions."

```
THEY TYPE:  Update the CLAUDE.md to add: conventional commits required,
            tests must pass before committing, and note the validatePhone bug
            we just fixed as a gotcha
```

**POINT OUT:**
- Claude edited the existing CLAUDE.md (didn't create a new file)
- Future Claude sessions will now know about these conventions
- This is how we build up project knowledge over time

### 4.3 — Skills Demo

**SAY:** "Claude Code has 'skills' — custom workflows triggered by slash
commands. Watch this."

**YOU DEMO (screen share):** Open a terminal in Marcos-One and show:

```
EXPLAIN:  "When I type /commit, Claude stages changes, writes a conventional
           commit message, runs gitleaks for secrets, and commits. I don't type
           git commands anymore."

EXPLAIN:  "/commit-push-pr goes further — it commits, pushes, and opens a PR
           with a summary. One command."

EXPLAIN:  "/prd generates a Product Requirements Document — it explores the
           codebase, maps blast radius, and writes acceptance criteria before
           I write a line of code."
```

**SAY:** "These aren't built-in — they're custom skills our team added. Any
team member can create new ones."

### 4.4 — Hooks & Notifications

**SAY:** "Notice how you get a macOS notification when Claude finishes a task
or needs input? Those are hooks."

**EXPLAIN:**
- `Stop` hook → notification when task is complete
- `Notification` hook → sound when Claude needs your input
- This lets you run Claude in one tab while working in another

---

## Part 5 — Marcos-One Tour (15 min)

> **Goal:** They see how all this scales to a real monorepo.

### 5.1 — The Monorepo

**YOU DEMO (screen share your Marcos-One session):**

**SAY:** "Let me show you what this looks like at scale."

```
YOU TYPE:  What is the structure of this monorepo? Give me a high-level overview.
```

**POINT OUT:**
- 6 Next.js apps, 9 Go microservices, iOS apps, Android app
- Claude read the root CLAUDE.md and understood the whole structure
- Each app/service has its own CLAUDE.md with specific instructions

### 5.2 — Cross-Codebase Understanding

```
YOU TYPE:  How does a customer order flow from the web-ordering app through
           to the kitchen display? Trace the path.
```

**POINT OUT:**
- Claude traced across multiple services and languages (TS → Go → Node)
- This is one of the most powerful features — understanding *systems*, not just files

### 5.3 — CLAUDE.md Hierarchy

**SAY:** "Let's look at how CLAUDE.md files cascade."

```
YOU TYPE:  Show me the CLAUDE.md files in this repo — how many are there?
```

**EXPLAIN:**
- Root `.claude/CLAUDE.md` → global conventions, commands, gotchas
- Each `apps/*/CLAUDE.md` → app-specific build commands, deploy targets
- Each `services/*/CLAUDE.md` → service-specific testing, API contracts
- Claude reads the relevant ones based on which files you're working with

### 5.4 — The Developer Workflow

**SAY:** "Here's our standard workflow for any feature:"

```
Show on screen:
  1. /prd             → Generate requirements
  2. Implement        → Code with Claude
  3. Run tests        → Claude knows the verification order
  4. /precommit       → Lint, types, tests, build, secrets
  5. /commit-push-pr  → Ship it
```

**SAY:** "When you start contributing to Marcos-One, this is the loop you'll
follow. Claude handles the mechanical parts so you focus on the logic."

### 5.5 — Parallel Sessions

**SAY:** "One more power feature — I run up to 5 Claude sessions in parallel,
each in a separate clone of the repo. macOS notifications tell me when each
session needs input. That's how one person manages a monorepo this size."

---

## Wrap-Up (5 min)

### Key Takeaways

**SAY:**

1. **Claude reads your project** — CLAUDE.md is how you teach it your conventions
2. **Ask, don't grep** — Use Claude to navigate and understand unfamiliar code
3. **Debug by describing** — Tell Claude what's wrong, not how to fix it
4. **Skills automate workflows** — /commit, /prd, /precommit are team standards
5. **It scales** — Same patterns work on a 5-file demo and a 200-file monorepo

### Resources

- Repo they just worked in: `github.com/Ciaonet/marcos-training`
- Claude Code docs: `docs.anthropic.com/en/docs/claude-code`
- Our team CLAUDE.md: `Marcos-One/.claude/CLAUDE.md`

### Next Steps

**SAY:** "Your homework: open Claude Code in the training repo and try
building something on your own. Add a DELETE endpoint for orders, or add
order timestamps to the response. Get comfortable prompting before we
start pairing on Marcos-One."
