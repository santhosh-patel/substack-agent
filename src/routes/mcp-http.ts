import { Router, Request, Response } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpServer } from '../mcp/create-server.js';

const router = Router();

router.all('/', async (req: Request, res: Response) => {
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'DELETE') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const server = createMcpServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err: any) {
    console.error('[MCP HTTP] Request failed:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message || 'MCP request failed' });
    }
  } finally {
    try {
      await transport.close();
    } catch {
      // ignore close errors on stateless requests
    }
  }
});

export default router;
