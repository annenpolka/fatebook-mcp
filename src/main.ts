// MCPサーバー初期化: Deno + npm:@modelcontextprotocol/sdk + stdio
import { McpServer } from "npm:@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk/server/stdio.js";

// サーバー情報
const server = new McpServer({
  name: "fatebook-mcp-server",
  version: "0.1.0"
});

// stdioトランスポートで接続
const transport = new StdioServerTransport();
await server.connect(transport);