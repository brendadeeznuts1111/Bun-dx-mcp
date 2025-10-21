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

### [@bun-dx/mcp-server-bun](packages/mcp-server-bun/)
MCP server providing intelligent Bun project context and runtime diagnostics.

```bash
# Install globally
bun add -g @bun-dx/mcp-server-bun

# Run the server
bunx @bun-dx/mcp-server-bun
```

**Available Tools:**
- `get_project_info` - Project configuration and structure
- `get_runtime_info` - Bun runtime diagnostics
- `list_dependencies` - Dependency analysis
- `analyze_package` - Bun-DX specific insights

**Available Resources:**
- `package.json` - Project configuration
- `bunfig.toml` - Bun configuration
- `tsconfig.json` - TypeScript configuration

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
├── packages/mcp-client/       # TypeScript client library
├── packages/mcp-server-bun/   # Bun project MCP server
├── mcp-starter/              # Project template
├── demo.tape                 # Terminal demo recording
└── docs/                     # Documentation & assets
```

## 📋 MCP Server List

| Server | Package | Purpose |
|--------|---------|---------|
| `@bun/mcp-docs` | Documentation search | Access Bun docs instantly |
| `@bun-dx/mcp-server-bun` | Project intelligence | Bun project context & runtime diagnostics |
| `@dx/mcp-db` | Database operations | Query SQLite databases |
| `@dx/mcp-fs` | Filesystem tools | File operations with gitignore |

## 🤝 Contributing

See the main [Bun-DX repository](https://github.com/brendadeeznuts1111/Bun-dx-mcp) for contribution guidelines.

## 📄 License

MIT © [brendadeeznuts1111](https://github.com/brendadeeznuts1111)
