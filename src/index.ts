import http from 'http';
import app from './app';
import { initializeWebSocket } from './sockets/stock.socket';

const server = http.createServer(app);
initializeWebSocket(server);

const PORT = process.env.PORT ?? 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
