# @bun-dx/mcp-server-bun

A Model Context Protocol (MCP) server that provides intelligent, context-aware integration with Bun-DX projects. This server enhances AI assistants with deep understanding of your Bun project's configuration, runtime environment, and capabilities.

## 🚀 Features

### **Project Intelligence**
- **Package Analysis**: Deep insights into `package.json`, dependencies, and scripts
- **Configuration Discovery**: Automatic detection of `bunfig.toml`, `tsconfig.json`
- **Project Structure**: Entry points, workspace configuration, and build setup

### **Runtime Diagnostics**
- **Bun Environment**: Version info, platform details, and runtime configuration
- **Environment Variables**: Bun-specific environment variables and settings
- **Process Information**: PID, uptime, and execution context

### **Dependency Management**
- **Dependency Listing**: Filter by type (dependencies, devDependencies, peerDependencies)
- **Version Analysis**: Current versions and potential updates
- **Security Insights**: Trusted dependencies and workspace configurations

## 🛠️ Installation

```bash
# Install the MCP server globally
bun add -g @bun-dx/mcp-server-bun

# Or run directly
bunx @bun-dx/mcp-server-bun
```

## ⚙️ Configuration

Add to your MCP configuration (e.g., Cursor's `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "Bun-DX": {
      "command": "bunx",
      "args": ["@bun-dx/mcp-server-bun"],
      "env": {
        "BUN_PROJECT_ROOT": "/path/to/your/bun/project"
      }
    }
  }
}
```

## 🛠️ Available Tools

### `get_project_info`
Returns comprehensive information about the current Bun project including package.json, configuration files, and detected entry points.

### `get_runtime_info`
Provides detailed Bun runtime information including version, environment variables, and process details.

### `list_dependencies`
Lists project dependencies filtered by type (all, dependencies, devDependencies, peerDependencies).

### `analyze_package`
Analyzes package.json for Bun-DX specific configurations and provides recommendations.

## 📁 Available Resources

The server exposes the following project files as readable resources:
- `package.json` - Project configuration
- `bunfig.toml` - Bun configuration
- `tsconfig.json` - TypeScript configuration

## 🔧 Development

```bash
# Build the server
bun run build

# Run in development mode
bun run dev

# Start the MCP server
bun run start
```

## 🤝 Integration with Official Bun MCP

This server complements the official Bun MCP server (`https://bun.com/docs/mcp`) by providing:

- **Documentation Search**: Official server handles docs
- **Project Context**: This server provides project-specific intelligence
- **Runtime Diagnostics**: This server offers environment insights

Use both servers together for comprehensive Bun development support:

```json
{
  "mcpServers": {
    "Bun-Docs": {
      "name": "Bun",
      "url": "https://bun.com/docs/mcp",
      "headers": {}
    },
    "Bun-DX": {
      "command": "bunx",
      "args": ["@bun-dx/mcp-server-bun"]
    }
  }
}
```

## 📄 License

MIT © [brendadeeznuts1111]
