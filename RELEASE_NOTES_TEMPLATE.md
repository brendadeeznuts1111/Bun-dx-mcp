# Bun-DX v1.4.0 - MCP Integration Release

<img src="docs/mcp-demo.gif" alt="MCP Demo" width="600">

## 🚀 What's New

**Built-in MCP Server Integration** - AI assistants now have native access to your Bun-DX development environment.

### ✨ MCP Servers Auto-Installed
- `@bun/mcp-docs` - Search Bun documentation instantly
- `@dx/mcp-db` - Query your SQLite databases
- `@dx/mcp-fs` - Filesystem operations with .gitignore awareness

### 🛠️ New CLI Commands
```bash
dx mcp status     # Check MCP server status
dx mcp search     # Search Bun documentation
dx mcp db         # Query project databases
dx mcp fs         # Filesystem operations
dx mcp tools      # List available tools
```

### 📦 New Packages
- `@dx/mcp-client` - TypeScript client for programmatic MCP access
- `bun-dx/mcp-starter` - Template for MCP-powered projects

## 🎯 Quick Start

```bash
# Install Bun-DX (MCP servers install automatically)
curl -fsSL https://github.com/brendadeeznuts1111/Bun-dx-mcp/raw/main/install.sh | bash

# Create MCP-powered project
bun create bun-dx/mcp-starter my-ai-app
cd my-ai-app

# Experience the magic
dx mcp status
dx mcp tools
```

## 🔧 AI Assistant Integration

Your AI assistant (Cursor, Windsurf, etc.) now automatically detects:
- Bun documentation search
- Project database access
- File operations with proper .gitignore handling

## 📝 Migration Guide

Existing projects get MCP servers installed automatically on next `dx update`.

## 🙏 Acknowledgments

Special thanks to the MCP community and Bun team for making AI-assisted development accessible.
