# @dx/mcp-client

TypeScript client for Bun-DX MCP servers. Provides typed programmatic access to MCP tools that AI assistants use.

## Installation

```bash
bun add @dx/mcp-client
```

## Usage

```typescript
import { tools } from '@dx/mcp-client';

// Search Bun documentation
const results = await tools.search('stripANSI');
console.log(results);

// Query your database
const users = await tools.db('SELECT * FROM users LIMIT 5');
console.log(users);

// Read files
const content = await tools.fs('read', 'package.json');
console.log(content);

// List directories
const files = await tools.fs('list', 'src/');
console.log(files);
```

## API

### `tools.search(query: string): Promise<string[]>`
Search Bun documentation via MCP servers.

### `tools.db(sql: string): Promise<unknown[]>`
Execute SQL queries on your project database.

### `tools.fs(operation, path, content?): Promise<string>`
Filesystem operations:
- `"read"` - Read file contents
- `"list"` - List directory contents
- `"write"` - Write to file (content parameter required)

## Requirements

- Bun-DX installed (`bun add bun-dx`)
- MCP servers configured (`dx mcp status`)

This package provides the same interface that AI assistants (Cursor, Windsurf, etc.) use when accessing your project's MCP tools.
