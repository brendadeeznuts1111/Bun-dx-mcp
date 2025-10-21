# Bun-DX MCP

**Model Context Protocol integration for Bun-DX** - AI-assisted development tools that work with Cursor, Windsurf, and other MCP-compatible assistants.

## 🚀 What is MCP?

The [Model Context Protocol](https://modelcontextprotocol.io/) enables AI assistants to access external tools and data sources. This repository provides MCP servers and clients that integrate Bun-DX's development tools with your AI coding assistant.

## 📦 Packages

### [@dx/mcp-client](packages/mcp-client/)
TypeScript client for programmatic MCP access. Provides typed interfaces to MCP servers.

```typescript
import { tools } from '@dx/mcp-client';

const results = await tools.search('bun features');
const users = await tools.db('SELECT * FROM users');
const content = await tools.fs('read', 'package.json');
```

## 🚀 Quick Start

### Install MCP Servers
```bash
bun add -g @bun/mcp-docs @dx/mcp-db @dx/mcp-fs
```

### Create MCP-Powered Project
```bash
bun create bun-dx/mcp-starter my-ai-app
cd my-ai-app
bun install
```

### Configure Your AI Assistant
Add to your MCP configuration (e.g., Cursor's `.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "bun-docs": {
      "command": "bun",
      "args": ["x", "@bun/mcp-docs"]
    },
    "sqlite-db": {
      "command": "bun",
      "args": ["x", "@dx/mcp-db", "--db", "path/to/database.db"]
    },
    "filesystem": {
      "command": "bun",
      "args": ["x", "@dx/mcp-fs"]
    }
  }
}
```

## 🎯 Features

- **📚 Documentation Search** - Instant access to Bun documentation
- **🗄️ Database Queries** - SQL access to your SQLite databases
- **📁 Filesystem Operations** - File operations with .gitignore awareness
- **🔧 TypeScript Client** - Programmatic access with full type safety

## 🏗️ Architecture

```
Bun-DX MCP
├── packages/mcp-client/     # TypeScript client library
├── mcp-starter/            # Project template
├── demo.tape              # Terminal demo recording
└── docs/                  # Documentation & assets
```

## 📋 MCP Server List

| Server | Package | Purpose |
|--------|---------|---------|
| `@bun/mcp-docs` | Documentation search | Access Bun docs instantly |
| `@dx/mcp-db` | Database operations | Query SQLite databases |
| `@dx/mcp-fs` | Filesystem tools | File operations with gitignore |

## 🤝 Contributing

See the main [Bun-DX repository](https://github.com/brendadeeznuts1111/bun-dx) for contribution guidelines.

## 📄 License

MIT © [brendadeeznuts1111](https://github.com/brendadeeznuts1111)
