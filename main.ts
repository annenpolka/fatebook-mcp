// Fatebook MCPサーバー: エントリーポイント
import { createServer } from "./src/server.ts";

const { server, transport } = createServer();

console.log("Fatebook MCP Server started.");
await server.connect(transport);