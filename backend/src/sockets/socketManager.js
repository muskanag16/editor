// src/sockets/socketManager.js
const socketIo = require('socket.io');

const socketManager = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*", // Production mein isko frontend URL se replace karein
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a specific project room
    socket.on('join-room', ({ roomId, userName }) => {
      socket.join(roomId);
      console.log(`${userName} joined room ${roomId}`);
      
      // Notify others in the room
      socket.to(roomId).emit('user-joined', { userName, socketId: socket.id });
    });

    // Handle code changes (Delta sync for Monaco)
    socket.on('code-change', (data) => {
      // Broadcast changes to everyone else in the room
      socket.to(data.roomId).emit('receive-code-change', {
        changes: data.changes,
        userName: data.userName
      });
    });

    // Handle cursor movements
    socket.on('cursor-change', (data) => {
      socket.to(data.roomId).emit('remote-cursor-change', data);
    });

    // Handle Project Chat messages
    socket.on('send-message', (data) => {
      socket.to(data.roomId).emit('receive-message', data);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketManager;