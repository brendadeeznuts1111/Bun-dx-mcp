# Watch vs Hot Mode – Field Manual

| Mode      | Restart | State | Use-case               |
|-----------|---------|-------|------------------------|
| `--watch` | hard    | wiped | CLI tools, tests       |
| `--hot`   | soft    | kept  | dev servers, dashboards|

## Copy-paste starters

**Hot mode server (state persists):**
```ts
globalThis.stats ??= { uptime: Date.now(), reqs: 0 };
Bun.serve({ fetch: () => Response.json(globalThis.stats) });
```
Run: `bun --hot server.ts`

**Watch mode (fresh state every save):**
```ts
let localCounter = 0;
```
Run: `bun --watch test.ts`

Full runnable examples:  
https://github.com/brendadeeznuts1111/Bun-dx-mcp/wiki/Watch-and-Hot-Mode
