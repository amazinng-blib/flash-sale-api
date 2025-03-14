import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: SocketIOServer;

export const initializeWebSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: { origin: '*' },
  });

  console.log('✅ WebSocket server initialized');

  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};

/**
 * Emits an event to all connected clients.
 * @param event - The event name
 * @param data - The event payload
 */
export const emitFlashSaleEvent = (event: string, data: any) => {
  if (io) {
    console.log(`📢 Emitting WebSocket event: ${event}`, data);
    io.emit(event, data);
  }
};

export { io };
