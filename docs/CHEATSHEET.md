# Claude Code Cheat Sheet

## Basics

| Action | What to type |
|--------|-------------|
| Start Claude | `claude` |
| Ask about code | "What does this function do?" |
| Find something | "Where is the order validation logic?" |
| Explain a file | "Explain src/orders.ts" |

## Editing Code

| Action | What to type |
|--------|-------------|
| Fix a bug | "Fix the phone validation — it accepts invalid numbers" |
| Add a feature | "Add a GET /orders/:id endpoint that returns 404 if not found" |
| Refactor | "Extract the validation logic into a separate function" |
| Add tests | "Add tests for the new endpoint" |

## Team Skills (Marcos-One)

| Skill | What it does |
|-------|-------------|
| `/commit` | Stage, write commit message, commit |
| `/commit-push-pr` | Commit + push + open PR |
| `/prd` | Generate product requirements document |
| `/precommit` | Run lint, types, tests, build, secrets check |

## Key Concepts

**CLAUDE.md** — Project instructions Claude reads every session. Like a README
for AI. Lives at project root and in subdirectories.

**Skills** — Custom slash-command workflows. Type `/` to see available ones.

**Hooks** — Shell commands that run on events (task complete, needs input).
Configured in `~/.claude/settings.json`.

**MCP Servers** — External tool integrations (Figma, Vercel, Playwright, etc.)
that extend what Claude can do.

## Tips

- Be specific: "Add a 404 response" > "Handle errors"
- Give context: "In the Express routes file, add..." > "Add a route"
- Let Claude run commands: "Run the tests" > manually running npm test
- Review diffs: Always read what Claude changed before accepting
- Use CLAUDE.md: Add conventions as you discover them
