// // src/server.js
// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./src/config/db');
// const socketManager = require('./src/sockets/socketManager');
// const { Server } = require('socket.io');
// // Load environment variables
// dotenv.config();

// // Connect to Database
// connectDB();

// const app = express();
// const server = http.createServer(app);

// // Middlewares
// app.use(cors());
// app.use(express.json()); // Parses incoming JSON requests

// // Routes (Inhe hum baad mein banayenge)
// app.use('/api/auth', require('./src/routes/authRoutes'));
// app.use('/api/projects', require('./src/routes/projectRoutes'));
// app.use('/api/execute', require('./src/routes/executeRoutes'));
// app.use('/api/invitations', require('./src/routes/invitationRoutes'));
// // Initialize Socket.io
// socketManager(server);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Development ke liye sabko allow kar rahe hain
//     methods: ["GET", "POST"]
//   }
// });

// // 3. ASLI MAGIC: Real-time Connection & Room Logic
// io.on('connection', (socket) => {
//   console.log('⚡ Naya user connect hua:', socket.id);

//   // A. Jab koi user kisi project workspace mein enter kare
//   socket.on('join-project', (projectId) => {
//     socket.join(projectId); // Us project ko ek "Room" bana diya
//     console.log(`User ${socket.id} ne Project Room joina kiya: ${projectId}`);
//   });

//   // B. Jab koi user code me type kare
//   socket.on('code-change', ({ projectId, code }) => {
//     // "socket.to().emit" ka matlab hai ki mere alawa room ke BAAKI sabhi users ko bhej do
//     socket.to(projectId).emit('receive-code-change', code);
//   });

//   // C. Jab user tab band kar de ya nikal jaye
//   socket.on('disconnect', () => {
//     console.log('❌ User disconnect hua:', socket.id);
//   });
// });
// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// src/server.js
// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./src/config/db');
// // const socketManager = require('./src/sockets/socketManager'); // Isko comment kar dijiye agar aap socket logic yahi likh rahe hain, warna 2 baar initialize hone par clash hoga.
// const { Server } = require('socket.io');

// // Load environment variables
// dotenv.config();

// // Connect to Database
// connectDB();

// const app = express();
// const server = http.createServer(app);

// // Middlewares
// app.use(cors());
// app.use(express.json()); // Parses incoming JSON requests

// // Routes 
// app.use('/api/auth', require('./src/routes/authRoutes'));
// app.use('/api/projects', require('./src/routes/projectRoutes'));
// app.use('/api/execute', require('./src/routes/executeRoutes'));
// app.use('/api/invitations', require('./src/routes/invitationRoutes'));

// // Initialize Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "*", 
//     methods: ["GET", "POST"]
//   }
// });

// // 3. ASLI MAGIC: Real-time Connection & Room Logic
// io.on('connection', (socket) => {
//   console.log('⚡ Naya user connect hua:', socket.id);

//   // A. Jab koi user kisi project workspace mein enter kare
//   socket.on('join-project', (projectId) => {
//     socket.join(projectId); 
//     console.log(`User ${socket.id} ne Project Room join kiya: ${projectId}`);
//   });

//   // 👇 FIX YAHAN HAI: 'code' ko 'newCode' kiya, aur emit mein 'receive-code' kar diya
//   // B. Jab koi user code me type kare
//   socket.on('code-change', ({ projectId, newCode }) => {
//     // "socket.to().emit" ka matlab hai ki mere alawa room ke BAAKI sabhi users ko bhej do
//     socket.to(projectId).emit('receive-code', newCode);
//   });
// socket.on('send-message', ({ projectId, sender, text }) => {
//     // Ye message bhejne wale ko chhodkar baki sabko 'receive-message' bhej dega
//     socket.to(projectId).emit('receive-message', { sender, text, timestamp: new Date() });
//   });
//   // C. Jab user tab band kar de ya nikal jaye
//   socket.on('disconnect', () => {
//     console.log('❌ User disconnect hua:', socket.id);
//   });
// });

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// src/server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { Server } = require('socket.io');

// 👇 1. YJS KE LIYE NAYE IMPORTS 👇
const WebSocket = require('ws');
const { setupWSConnection } = require('y-websocket/bin/utils');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes 
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/projects', require('./src/routes/projectRoutes'));
app.use('/api/execute', require('./src/routes/executeRoutes'));
app.use('/api/invitations', require('./src/routes/invitationRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
// ----------------------------------------------------
// 2. SOCKET.IO (Chat aur Room Logic ke liye - AS IT IS RAHEGA)
// ----------------------------------------------------
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('⚡ Naya user connect hua:', socket.id);

  socket.on('join-project', (projectId) => {
    socket.join(projectId); 
  });

  // Dhyan dein: 'code-change' wala event ab humne hata diya hai, 
  // kyunki ab code sync karne ka poora kaam Yjs sambhalega!

  // Chat message logic
  socket.on('send-message', (data) => {
    socket.to(data.projectId).emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnect hua:', socket.id);
  });
});

// ----------------------------------------------------
// 👇 3. YJS WEBSOCKET (Code Syncing aur Cursors ke liye) 👇
// ----------------------------------------------------
const wss = new WebSocket.Server({ noServer: true });

// HTTP request ko upgrade karke WebSockets par bhejna (Socket.io aur Yjs dono ke liye)
server.on('upgrade', (request, socket, head) => {
  // Agar request Socket.io ki hai, toh use bypass kar do (io khud handle karega)
  if (request.url.startsWith('/socket.io')) {
    return;
  }
  
  // Agar request Yjs (Code editor) ki hai, toh custom WebSocket handle karega
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws, req) => {
  // setupWSConnection Yjs ki taraf se automatically conflict resolve karta hai
  setupWSConnection(ws, req);
});

// ----------------------------------------------------

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});