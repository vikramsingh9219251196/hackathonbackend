import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/user', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Exit process on MongoDB connection failure
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend origin
    credentials: true,
  },
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Example socket event handlers
  socket.on("add-user", (userId) => {
    console.log(`User added with ID: ${userId}`);
    // Implement logic to store user in onlineUsers map or database
  });

  socket.on("send-msg", (data) => {
    console.log(`Message sent to ${data.to}: ${data.msg}`);

    socket.emit("msg-received", "Message received!"); 
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
