// Runtime implementation for @dx/mcp-client
// Provides programmatic access to Bun-DX MCP tools

import { spawn } from "bun";

export const tools = {
  /**
   * Search Bun documentation via MCP
   */
  search: async (query: string): Promise<string[]> => {
    const proc = spawn(["dx", "mcp", "search", query], {
      stdout: "pipe",
      stderr: "pipe"
    });

    const output = await new Response(proc.stdout).text();
    const error = await new Response(proc.stderr).text();

    if (proc.exitCode !== 0) {
      throw new Error(`MCP search failed: ${error}`);
    }

    // Parse the output into results array
    return output.trim().split('\n').filter(line => line.length > 0);
  },

  /**
   * Execute SQL queries on the project database via MCP
   */
  db: async (sql: string): Promise<unknown[]> => {
    const proc = spawn(["dx", "mcp", "db", sql], {
      stdout: "pipe",
      stderr: "pipe"
    });

    const output = await new Response(proc.stdout).text();
    const error = await new Response(proc.stderr).text();

    if (proc.exitCode !== 0) {
      throw new Error(`MCP database query failed: ${error}`);
    }

    try {
      return JSON.parse(output);
    } catch {
      // If not JSON, return as string array
      return output.trim().split('\n').filter(line => line.length > 0);
    }
  },

  /**
   * Filesystem operations via MCP
   */
  fs: async (operation: "read" | "write" | "list", path: string, content?: string): Promise<string> => {
    const args = ["dx", "mcp", "fs"];

    switch (operation) {
      case "read":
        args.push("read", path);
        break;
      case "write":
        if (!content) throw new Error("Content required for write operation");
        // Note: This is a simplified implementation
        // Real implementation would need to handle content passing
        throw new Error("Write operation not implemented in this stub");
      case "list":
        args.push("ls", path);
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }

    const proc = spawn(args, {
      stdout: "pipe",
      stderr: "pipe"
    });

    const output = await new Response(proc.stdout).text();
    const error = await new Response(proc.stderr).text();

    if (proc.exitCode !== 0) {
      throw new Error(`MCP filesystem operation failed: ${error}`);
    }

    return output.trim();
  }
};
