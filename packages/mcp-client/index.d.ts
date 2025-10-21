// TypeScript declarations for @dx/mcp-client
// Provides typed access to Bun-DX MCP tools

export declare const tools: {
  /**
   * Search Bun documentation via MCP
   * @param query - Search query for Bun documentation
   * @returns Array of search results
   */
  search: (query: string) => Promise<string[]>;

  /**
   * Execute SQL queries on the project database via MCP
   * @param sql - SQL query string
   * @returns Query results as unknown array
   */
  db: (sql: string) => Promise<unknown[]>;

  /**
   * Filesystem operations via MCP
   * @param operation - Operation type: "read", "write", or "list"
   * @param path - File or directory path
   * @param content - Content for write operations
   * @returns File content or operation result
   */
  fs: (operation: "read" | "write" | "list", path: string, content?: string) => Promise<string>;
};
