#!/usr/bin/env bun

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Bun-DX MCP Server
// Provides project context, runtime diagnostics, and Bun-specific capabilities

class BunDXMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "bun-dx-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "get_project_info",
            description: "Get information about the current Bun project (package.json, bunfig.toml, etc.)",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "get_runtime_info",
            description: "Get Bun runtime information and diagnostics",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "list_dependencies",
            description: "List project dependencies from package.json",
            inputSchema: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["all", "dependencies", "devDependencies", "peerDependencies"],
                  default: "all",
                  description: "Type of dependencies to list",
                },
              },
            },
          },
          {
            name: "analyze_package",
            description: "Analyze package.json for Bun-DX specific configurations",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "get_project_info":
            return await this.getProjectInfo();

          case "get_runtime_info":
            return await this.getRuntimeInfo();

          case "list_dependencies":
            return await this.listDependencies(args?.type || "all");

          case "analyze_package":
            return await this.analyzePackage();

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const resources = [];

      // Add package.json as a resource
      if (await this.fileExists("package.json")) {
        resources.push({
          uri: "file://package.json",
          mimeType: "application/json",
          name: "package.json",
          description: "Project package.json file",
        });
      }

      // Add bunfig.toml as a resource
      if (await this.fileExists("bunfig.toml")) {
        resources.push({
          uri: "file://bunfig.toml",
          mimeType: "application/toml",
          name: "bunfig.toml",
          description: "Bun configuration file",
        });
      }

      // Add tsconfig.json as a resource
      if (await this.fileExists("tsconfig.json")) {
        resources.push({
          uri: "file://tsconfig.json",
          mimeType: "application/json",
          name: "tsconfig.json",
          description: "TypeScript configuration file",
        });
      }

      return { resources };
    });

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      if (!uri.startsWith("file://")) {
        throw new Error("Only file:// URIs are supported");
      }

      const filePath = uri.substring(7); // Remove "file://" prefix

      try {
        const content = await Bun.file(filePath).text();
        return {
          contents: [
            {
              uri,
              mimeType: this.getMimeType(filePath),
              text: content,
            },
          ],
        };
      } catch (error) {
        throw new Error(`Failed to read file ${filePath}: ${error.message}`);
      }
    });
  }

  private async getProjectInfo() {
    const info: any = {
      cwd: process.cwd(),
      nodeVersion: process.version,
    };

    // Try to read package.json
    if (await this.fileExists("package.json")) {
      try {
        const packageJson = await Bun.file("package.json").json();
        info.packageJson = {
          name: packageJson.name,
          version: packageJson.version,
          description: packageJson.description,
          scripts: packageJson.scripts,
          bun: packageJson.bun,
        };
      } catch (error) {
        info.packageJsonError = error.message;
      }
    }

    // Try to read bunfig.toml
    if (await this.fileExists("bunfig.toml")) {
      try {
        const bunfigContent = await Bun.file("bunfig.toml").text();
        info.bunfigExists = true;
        // Note: We can't easily parse TOML without additional dependencies
        info.bunfigRaw = bunfigContent.substring(0, 500) + (bunfigContent.length > 500 ? "..." : "");
      } catch (error) {
        info.bunfigError = error.message;
      }
    }

    // Check for common Bun project files
    const projectFiles = [
      "src/index.ts",
      "src/index.js",
      "index.ts",
      "index.js",
      "app.ts",
      "app.js",
      "server.ts",
      "server.js",
    ];

    info.detectedEntryPoints = [];
    for (const file of projectFiles) {
      if (await this.fileExists(file)) {
        info.detectedEntryPoints.push(file);
      }
    }

    return {
      content: [
        {
          type: "text",
          text: `## Bun Project Information\n\n${JSON.stringify(info, null, 2)}`,
        },
      ],
    };
  }

  private async getRuntimeInfo() {
    const runtimeInfo = {
      bunVersion: Bun.version,
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || "development",
      cwd: process.cwd(),
      pid: process.pid,
      uptime: process.uptime(),
    };

    // Check for Bun-specific environment variables
    const bunEnvVars: any = {};
    for (const [key, value] of Object.entries(process.env)) {
      if (key.startsWith("BUN_")) {
        bunEnvVars[key] = value;
      }
    }
    runtimeInfo.bunEnvVars = bunEnvVars;

    return {
      content: [
        {
          type: "text",
          text: `## Bun Runtime Information\n\n${JSON.stringify(runtimeInfo, null, 2)}`,
        },
      ],
    };
  }

  private async listDependencies(type: string = "all") {
    if (!(await this.fileExists("package.json"))) {
      throw new Error("No package.json found in current directory");
    }

    const packageJson = await Bun.file("package.json").json();
    const deps: any = {};

    if (type === "all" || type === "dependencies") {
      deps.dependencies = packageJson.dependencies || {};
    }

    if (type === "all" || type === "devDependencies") {
      deps.devDependencies = packageJson.devDependencies || {};
    }

    if (type === "all" || type === "peerDependencies") {
      deps.peerDependencies = packageJson.peerDependencies || {};
    }

    return {
      content: [
        {
          type: "text",
          text: `## Dependencies (${type})\n\n${JSON.stringify(deps, null, 2)}`,
        },
      ],
    };
  }

  private async analyzePackage() {
    if (!(await this.fileExists("package.json"))) {
      throw new Error("No package.json found in current directory");
    }

    const packageJson = await Bun.file("package.json").json();
    const analysis: any = {
      name: packageJson.name,
      version: packageJson.version,
      hasBunScripts: false,
      hasBunConfig: false,
      recommendedScripts: [],
    };

    // Check for Bun-specific scripts
    if (packageJson.scripts) {
      const scripts = Object.keys(packageJson.scripts);
      analysis.hasBunScripts = scripts.some(script =>
        script.includes("bun") || packageJson.scripts[script].includes("bun")
      );

      // Check for common recommended scripts
      const recommendedScripts = ["build", "dev", "test", "lint"];
      analysis.missingRecommendedScripts = recommendedScripts.filter(
        script => !scripts.includes(script)
      );
    }

    // Check for bunfig.toml
    analysis.hasBunConfig = await this.fileExists("bunfig.toml");

    // Check for Bun-specific fields
    analysis.bunSpecificFields = {
      hasBunField: !!packageJson.bun,
      hasTrustedDependencies: !!packageJson.trustedDependencies,
      hasWorkspaceConfig: !!packageJson.workspaces,
    };

    return {
      content: [
        {
          type: "text",
          text: `## Package Analysis\n\n${JSON.stringify(analysis, null, 2)}`,
        },
      ],
    };
  }

  private async fileExists(path: string): Promise<boolean> {
    try {
      await Bun.file(path).stat();
      return true;
    } catch {
      return false;
    }
  }

  private getMimeType(filePath: string): string {
    const ext = filePath.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "json":
        return "application/json";
      case "toml":
        return "application/toml";
      case "ts":
        return "application/typescript";
      case "js":
        return "application/javascript";
      case "md":
        return "text/markdown";
      default:
        return "text/plain";
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Bun-DX MCP server running on stdio");
  }
}

// Start the server
const server = new BunDXMCPServer();
server.run().catch(console.error);
