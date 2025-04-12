// Fatebook MCPサーバー: エントリーポイント
import { createServer } from "./src/server.ts";

const { server, transport } = createServer();

await server.connect(transport);