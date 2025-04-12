import { McpServer } from "npm:@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk/server/stdio.js";

/**
 * MCPサーバーインスタンスとトランスポートを生成するファクトリ関数
 * @returns { server: McpServer, transport: StdioServerTransport }
 */
export function createServer() {
  const server = new McpServer({
    name: "fatebook-mcp-server",
    version: "0.1.0"
  });
  const transport = new StdioServerTransport();
  return { server, transport };
}