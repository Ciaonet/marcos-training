# Pizza Tracker API

Express + TypeScript API for tracking pizza orders.

## Commands

```bash
npm run dev     # Start dev server (port 3456)
npm test        # Run tests
npm run build   # Compile TypeScript
```

## Structure

- `src/index.ts` — Express routes
- `src/orders.ts` — Order CRUD logic (in-memory)
- `src/types.ts` — TypeScript interfaces
- `src/utils.ts` — Helpers (formatting, validation)
- `tests/` — Vitest tests
