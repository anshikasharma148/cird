// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import nodemailer from "nodemailer";
import { createServer } from "http";
import { Server } from "socket.io";
import { cirdSystemPrompt } from "./data/cirdSystemPrompt.js"; // ✅ Imported system data

dotenv.config();

const app = express();

// ✅ Configure CORS for both development and production
const corsOptions = {
  origin: [
    "http://localhost:3001",   // Local development
    "http://localhost:3000",   // Alternative local port
    "https://cird.co.in",      // Main domain                                                                                         
    "https://www.cird.co.in",  // www subdomain
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};                                                                                                                                                          

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Create HTTP server and Socket.io server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
  transports: ["websocket", "polling"],
});

// ✅ Socket.io State Management
const state = {
  // Map: socketId -> { userId, type: 'user' | 'agent', roomId?, connectedAt }
  connectedUsers: new Map(),
  // Array of userIds waiting for an agent
  waitingQueue: [],
  // Map: agentId -> { socketId, activeRoomIds: [], connectedAt }
  connectedAgents: new Map(),
  // Map: userId -> roomId (private room for user-agent chat)
  roomMapping: new Map(),
  // Map: roomId -> { userId, agentId, messages: [], createdAt }
  activeRooms: new Map(),
};

// ✅ Valid agent IDs
const VALID_AGENT_IDS = ["agent1", "agent2", "agent3", "agent4"];

// ✅ Helper: Find first available agent (agents can handle multiple chats)
const findFreeAgent = () => {
  // Get all connected (live) agents
  const liveAgents = VALID_AGENT_IDS.filter(agentId => {
    const agentData = state.connectedAgents.get(agentId);
    return agentData; // Any connected agent can take chats
  });

  // If only one agent is live, return that agent
  if (liveAgents.length === 1) {
    return liveAgents[0];
  }

  // If multiple agents are live, return the one with least active chats (load balancing)
  if (liveAgents.length > 1) {
    return liveAgents.reduce((leastBusy, agentId) => {
      const leastBusyData = state.connectedAgents.get(leastBusy);
      const currentData = state.connectedAgents.get(agentId);
      const leastBusyCount = leastBusyData?.activeRoomIds?.length || 0;
      const currentCount = currentData?.activeRoomIds?.length || 0;
      return currentCount < leastBusyCount ? agentId : leastBusy;
    });
  }

  return null;
};

// ✅ Helper: Broadcast agent status to all agents
const broadcastAgentStatus = () => {
  const agentStatuses = VALID_AGENT_IDS.map(agentId => {
    const agentData = state.connectedAgents.get(agentId);
    const activeChatsCount = agentData?.activeRoomIds?.length || 0;
    return {
      agentId,
      isConnected: !!agentData,
      activeChatsCount: activeChatsCount,
      isBusy: activeChatsCount > 0, // Busy if has any active chats
    };
  });

  state.connectedAgents.forEach((agentData, agentId) => {
    const agentSocket = io.sockets.sockets.get(agentData.socketId);
    if (agentSocket) {
      agentSocket.emit("agent_status_update", { agents: agentStatuses });
    }
  });
};

// ✅ Helper: Generate unique room ID
const generateRoomId = (userId) => `room_${userId}_${Date.now()}`;

// ✅ Helper: Get user ID from socket
const getUserId = (socket) => socket.handshake.query.userId || socket.id;

// ✅ Socket.io Connection Handler
io.on("connection", (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  // ✅ User connects (from chatbot)
  socket.on("user_connect", (data) => {
    const userId = data.userId || socket.id;
    state.connectedUsers.set(socket.id, {
      userId,
      type: "user",
      connectedAt: Date.now(),
    });
    socket.data.userId = userId;
    socket.data.type = "user";
    console.log(`👤 User connected: ${userId} (socket: ${socket.id})`);
    console.log(`📊 Total connected users: ${Array.from(state.connectedUsers.values()).filter(u => u.type === 'user').length}`);
    console.log(`📊 Total connected agents: ${state.connectedAgents.size}`);
  });

  // ✅ Agent connects (from agent dashboard)
  socket.on("agent_connect", (data) => {
    const agentId = data.agentId;
    
    // Validate agent ID
    if (!agentId || !VALID_AGENT_IDS.includes(agentId)) {
      socket.emit("agent_connect_error", { message: "Invalid agent ID. Must be agent1, agent2, agent3, or agent4." });
      console.error(`❌ Invalid agent ID: ${agentId}`);
      return;
    }

    // Check if agent is already connected
    const existingAgent = state.connectedAgents.get(agentId);
    if (existingAgent) {
      // Check if the existing socket is still connected
      const oldSocket = io.sockets.sockets.get(existingAgent.socketId);
      if (oldSocket && oldSocket.connected) {
        // Agent is already logged in, reject this connection
        socket.emit("agent_connect_error", { message: `Agent ${agentId} is already Live. Please use a different agent ID or wait for the current session to end.` });
        console.log(`❌ Agent ${agentId} is already connected (socket: ${existingAgent.socketId}). Rejecting new connection from socket: ${socket.id}`);
        return;
      } else {
        // Old socket is disconnected, clean up and allow new connection
        console.log(`🧹 Cleaning up stale connection for agent ${agentId}`);
        state.connectedAgents.delete(agentId);
        state.connectedUsers.delete(existingAgent.socketId);
      }
    }

    state.connectedAgents.set(agentId, {
      socketId: socket.id,
      connectedAt: Date.now(),
      activeRoomIds: [], // Array to track multiple active chats
    });
    state.connectedUsers.set(socket.id, {
      userId: agentId,
      type: "agent",
      connectedAt: Date.now(),
    });
    socket.data.agentId = agentId;
    socket.data.type = "agent";
    console.log(`👨‍💼 Agent connected: ${agentId} (socket: ${socket.id})`);

    // Notify agent of waiting users (agents can handle multiple chats)
    const agentData = state.connectedAgents.get(agentId);
    if (agentData) {
      socket.emit("waiting_users", state.waitingQueue.map((uid) => {
        const userSocket = Array.from(state.connectedUsers.entries())
          .find(([_, data]) => data.userId === uid && data.type === "user")?.[0];
        return {
          userId: uid,
          waitingSince: state.connectedUsers.get(userSocket)?.connectedAt || Date.now(),
        };
      }));
    } else {
      socket.emit("waiting_users", []);
    }

    // Notify all agents about updated agent status
    broadcastAgentStatus();
  });

  // ✅ User requests human agent
  socket.on("user_request_agent", () => {
    console.log(`📥 Received user_request_agent from socket: ${socket.id}`);
    const userData = state.connectedUsers.get(socket.id);
    if (!userData || userData.type !== "user") {
      console.error(`❌ Invalid user connection for socket: ${socket.id}`);
      console.log(`📊 Connected users:`, Array.from(state.connectedUsers.entries()).map(([id, data]) => ({ id, ...data })));
      socket.emit("error", { message: "Invalid user connection" });
      return;
    }

    const userId = userData.userId;
    console.log(`🔍 Processing agent request for user: ${userId}`);

    // Check if already in queue
    if (state.waitingQueue.includes(userId)) {
      console.log(`⚠️ User ${userId} already in queue at position ${state.waitingQueue.indexOf(userId) + 1}`);
      socket.emit("queue_position", {
        position: state.waitingQueue.indexOf(userId) + 1,
        total: state.waitingQueue.length,
      });
      return;
    }

    // Check if already connected to an agent
    if (state.roomMapping.has(userId)) {
      console.log(`✅ User ${userId} already connected to agent in room: ${state.roomMapping.get(userId)}`);
      socket.emit("agent_connected", { roomId: state.roomMapping.get(userId) });
      return;
    }

    // Try to find a free agent and auto-assign
    const freeAgentId = findFreeAgent();
    if (freeAgentId) {
      const liveAgentsCount = state.connectedAgents.size;
      const agentActiveChats = freeAgentData.activeRoomIds?.length || 0;
      console.log(`✅ Found agent: ${freeAgentId}, auto-assigning to user ${userId} (${liveAgentsCount} live agent(s), agent has ${agentActiveChats} active chat(s))`);
      const freeAgentData = state.connectedAgents.get(freeAgentId);
      const freeAgentSocket = io.sockets.sockets.get(freeAgentData.socketId);
      
      if (freeAgentSocket) {
        // Auto-assign the chat to the free agent
        const roomId = generateRoomId(userId);
        
        // Create room
        state.activeRooms.set(roomId, {
          userId,
          agentId: freeAgentId,
          messages: [],
          createdAt: Date.now(),
        });

        // Add room to agent's active rooms
        if (!freeAgentData.activeRoomIds) {
          freeAgentData.activeRoomIds = [];
        }
        freeAgentData.activeRoomIds.push(roomId);
        state.connectedAgents.set(freeAgentId, freeAgentData);

        // Join both sockets to room
        socket.join(roomId);
        freeAgentSocket.join(roomId);

        // Update room mapping
        state.roomMapping.set(userId, roomId);

        // Notify user
        socket.emit("agent_connected", { roomId, agentId: freeAgentId });

        // Notify agent
        freeAgentSocket.emit("chat_started", {
          userId,
          roomId,
          autoAssigned: true,
        });

        // Notify other agents that user was taken
        state.connectedAgents.forEach((otherAgentData, otherAgentId) => {
          if (otherAgentId !== freeAgentId) {
            const otherAgentSocket = io.sockets.sockets.get(otherAgentData.socketId);
            if (otherAgentSocket) {
              otherAgentSocket.emit("user_taken", { userId });
            }
          }
        });

        // Broadcast agent status update
        broadcastAgentStatus();

        console.log(`✅ Auto-assigned user ${userId} to agent ${freeAgentId} (room: ${roomId})`);
        return;
      }
    }

    // No free agent available, add to waiting queue
    state.waitingQueue.push(userId);
    console.log(`⏳ User ${userId} added to waiting queue (position: ${state.waitingQueue.length})`);
    console.log(`📊 Current queue:`, state.waitingQueue);
    console.log(`📊 Available live agents: ${state.connectedAgents.size}`);

    socket.emit("queue_position", {
      position: state.waitingQueue.length,
      total: state.waitingQueue.length,
    });

    // Notify all live agents about waiting user (agents can handle multiple chats)
    let notifiedCount = 0;
    state.connectedAgents.forEach((agentData, agentId) => {
      const agentSocket = io.sockets.sockets.get(agentData.socketId);
      if (agentSocket) {
        console.log(`📤 Sending new_user_waiting to agent: ${agentId}`);
        agentSocket.emit("new_user_waiting", {
          userId,
          waitingSince: userData.connectedAt,
        });
        notifiedCount++;
      }
    });

    if (notifiedCount === 0) {
      console.log(`⚠️ No live agents available to notify about waiting user`);
    } else {
      console.log(`📢 Notified ${notifiedCount} live agent(s) about waiting user`);
    }
  });

  // ✅ Agent joins a user chat
  socket.on("agent_join", (data) => {
    const { userId } = data;
    const agentData = state.connectedAgents.get(socket.data.agentId);
    if (!agentData) {
      socket.emit("error", { message: "Agent not authenticated" });
      return;
    }

    // Agents can handle multiple chats, so no need to check if busy

    // Remove from waiting queue
    const queueIndex = state.waitingQueue.indexOf(userId);
    if (queueIndex !== -1) {
      state.waitingQueue.splice(queueIndex, 1);
    }

    // Create or get room
    let roomId = state.roomMapping.get(userId);
    if (!roomId) {
      roomId = generateRoomId(userId);
      state.roomMapping.set(userId, roomId);
    }

    // Create room if it doesn't exist
    if (!state.activeRooms.has(roomId)) {
      state.activeRooms.set(roomId, {
        userId,
        agentId: socket.data.agentId,
        messages: [],
        createdAt: Date.now(),
      });
    } else {
      // Update agent if room exists
      state.activeRooms.get(roomId).agentId = socket.data.agentId;
    }

    // Join room
    socket.join(roomId);
    // Add room to agent's active rooms
    if (!agentData.activeRoomIds) {
      agentData.activeRoomIds = [];
    }
    if (!agentData.activeRoomIds.includes(roomId)) {
      agentData.activeRoomIds.push(roomId);
    }
    state.connectedAgents.set(socket.data.agentId, agentData);

    // Find user socket and join them to room
    const userSocketEntry = Array.from(state.connectedUsers.entries())
      .find(([_, data]) => data.userId === userId && data.type === "user");
    
    if (userSocketEntry) {
      const [userSocketId] = userSocketEntry;
      const userSocket = io.sockets.sockets.get(userSocketId);
      if (userSocket) {
        // Join the room (multiple joins are safe)
        userSocket.join(roomId);
        userSocket.data.roomId = roomId;
        
        // Update userData with roomId
        const userData = state.connectedUsers.get(userSocketId);
        if (userData) {
          userData.roomId = roomId;
        }
        
        // Wait a bit for room to update, then verify room membership
        setTimeout(() => {
          const roomSockets = io.sockets.adapter.rooms.get(roomId);
          const userInRoom = roomSockets?.has(userSocketId);
          const agentInRoom = roomSockets?.has(socket.id);
          
          console.log(`✅ User ${userId} joined room ${roomId}`);
          console.log(`📊 Room membership - User: ${userInRoom ? 'YES' : 'NO'}, Agent: ${agentInRoom ? 'YES' : 'NO'}`);
          console.log(`📋 Total sockets in room: ${roomSockets?.size || 0}`);
          console.log(`📋 Socket IDs in room:`, roomSockets ? Array.from(roomSockets) : []);
          
          // If user not in room, try again
          if (!userInRoom) {
            console.log(`⚠️ User still not in room, rejoining...`);
            userSocket.join(roomId);
          }
        }, 100);
        
        // Notify user that agent connected
        userSocket.emit("agent_connected", { roomId, agentId: socket.data.agentId });
      } else {
        console.error(`❌ User socket not found for userId: ${userId}, socketId: ${userSocketId}`);
      }
    } else {
      console.error(`❌ User not found in connectedUsers: ${userId}`);
      console.log(`📊 Available users:`, Array.from(state.connectedUsers.values()).filter(u => u.type === 'user').map(u => u.userId));
    }

    // Update room mapping
    state.roomMapping.set(userId, roomId);

    // Notify agent
    socket.emit("chat_started", { roomId, userId });

    // Notify other agents that this user is no longer available
    state.connectedAgents.forEach((otherAgentData, otherAgentId) => {
      if (otherAgentId !== socket.data.agentId) {
        const otherAgentSocket = io.sockets.sockets.get(otherAgentData.socketId);
        if (otherAgentSocket) {
          otherAgentSocket.emit("user_taken", { userId });
        }
      }
    });

    // Broadcast agent status update
    broadcastAgentStatus();

    console.log(`✅ Agent ${socket.data.agentId} joined chat with user ${userId} (room: ${roomId})`);
  });

  // ✅ User sends message
  socket.on("user_message", (data) => {
    const { message, roomId } = data;
    const userData = state.connectedUsers.get(socket.id);
    if (!userData || userData.type !== "user") {
      console.error(`❌ Invalid user data for socket: ${socket.id}`);
      return;
    }

    const actualRoomId = roomId || userData.roomId || state.roomMapping.get(userData.userId);
    if (!actualRoomId) {
      console.error(`❌ No roomId found for user: ${userData.userId}`);
      return;
    }

    const room = state.activeRooms.get(actualRoomId);
    if (!room) {
      console.error(`❌ Room not found: ${actualRoomId}`);
      return;
    }

    const timestamp = Date.now();
    
    // Store message with read status
    const messageId = `msg_${timestamp}_${Math.random().toString(36).slice(2, 9)}`;
    room.messages.push({
      id: messageId,
      sender: "user",
      text: message,
      timestamp: timestamp,
      readBy: {
        user: true, // User always reads their own message
        agent: false,
      },
    });

    // Emit to ALL sockets in room (including sender, so both user and agent see it)
    io.to(actualRoomId).emit("new_message", {
      id: messageId,
      sender: "user",
      text: message,
      timestamp: timestamp,
      roomId: actualRoomId,
      readBy: {
        user: true,
        agent: false,
      },
    });

    console.log(`💬 User ${userData.userId} sent message in room ${actualRoomId} to ${io.sockets.adapter.rooms.get(actualRoomId)?.size || 0} socket(s)`);
  });

  // ✅ Agent sends message
  socket.on("agent_message", (data) => {
    const { message, roomId } = data;
    const agentData = state.connectedAgents.get(socket.data.agentId);
    if (!agentData) {
      console.error(`❌ Agent data not found for agentId: ${socket.data.agentId}`);
      return;
    }

    // roomId must be provided for agent messages (agents can have multiple chats)
    if (!roomId) {
      console.error(`❌ No roomId provided for agent message from agent: ${socket.data.agentId}`);
      socket.emit("error", { message: "Room ID is required for sending messages." });
      return;
    }
    const actualRoomId = roomId;

    const room = state.activeRooms.get(actualRoomId);
    if (!room) {
      console.error(`❌ Room not found: ${actualRoomId}`);
      return;
    }

    const timestamp = Date.now();

    // Store message with read status
    const messageId = `msg_${timestamp}_${Math.random().toString(36).slice(2, 9)}`;
    room.messages.push({
      id: messageId,
      sender: "agent",
      text: message,
      timestamp: timestamp,
      readBy: {
        user: false,
        agent: true, // Agent always reads their own message
      },
    });

    // Get all sockets in the room
    const roomSockets = io.sockets.adapter.rooms.get(actualRoomId);
    const socketCount = roomSockets ? roomSockets.size : 0;
    
    console.log(`📤 Broadcasting agent message to room ${actualRoomId}`);
    console.log(`📊 Room has ${socketCount} socket(s)`);
    if (roomSockets) {
      console.log(`📋 Socket IDs in room:`, Array.from(roomSockets));
    }

    // Find user socket first
    const userSocketEntry = Array.from(state.connectedUsers.entries())
      .find(([_, data]) => data.userId === room.userId && data.type === "user");
    
    let userSocket = null;
    if (userSocketEntry) {
      const [userSocketId] = userSocketEntry;
      userSocket = io.sockets.sockets.get(userSocketId);
      if (userSocket) {
        const userInRoom = roomSockets?.has(userSocketId);
        console.log(`👤 User socket ${userSocketId} in room: ${userInRoom ? 'YES' : 'NO'}`);
        if (!userInRoom) {
          console.log(`⚠️ User socket not in room! Joining now...`);
          userSocket.join(actualRoomId);
        }
      }
    }

    // Emit to ALL sockets in room
    io.to(actualRoomId).emit("new_message", {
      id: messageId,
      sender: "agent",
      text: message,
      timestamp: timestamp,
      roomId: actualRoomId,
      readBy: {
        user: false,
        agent: true,
      },
    });

      // Also directly emit to user socket as a fallback (in case room emit fails)
      if (userSocket) {
        console.log(`📤 Also sending directly to user socket as fallback`);
        userSocket.emit("new_message", {
          id: messageId,
          sender: "agent",
          text: message,
          timestamp: timestamp,
          roomId: actualRoomId,
          readBy: {
            user: false,
            agent: true,
          },
        });
      }

    console.log(`💬 Agent ${socket.data.agentId} sent message in room ${actualRoomId} to ${socketCount} socket(s)`);
  });

  // ✅ Typing indicators
  socket.on("user_typing", (data) => {
    const { roomId } = data;
    const userData = state.connectedUsers.get(socket.id);
    if (!userData || userData.type !== "user") return;

    const actualRoomId = roomId || state.roomMapping.get(userData.userId);
    if (actualRoomId) {
      socket.to(actualRoomId).emit("user_typing", { userId: userData.userId });
    }
  });

  socket.on("agent_typing", (data) => {
    const { roomId } = data;
    const agentData = state.connectedAgents.get(socket.data.agentId);
    if (!agentData) return;

    // roomId must be provided for typing indicator
    if (!roomId) return;
    const actualRoomId = roomId;
    const room = state.activeRooms.get(actualRoomId);
    if (!room) return;

    console.log(`⌨️ Agent typing in room ${actualRoomId}`);
      
      // Find user socket and emit directly
      const userSocketEntry = Array.from(state.connectedUsers.entries())
        .find(([_, data]) => data.userId === room.userId && data.type === "user");
      
      if (userSocketEntry) {
        const [userSocketId] = userSocketEntry;
        const userSocket = io.sockets.sockets.get(userSocketId);
        if (userSocket) {
          console.log(`📤 Sending typing indicator to user socket ${userSocketId}`);
          userSocket.emit("agent_typing", { agentId: socket.data.agentId, roomId: actualRoomId });
        }
      }
      
      // Also emit to room (for any other sockets)
      socket.to(actualRoomId).emit("agent_typing", { agentId: socket.data.agentId, roomId: actualRoomId });
  });

  socket.on("agent_stopped_typing", (data) => {
    const { roomId } = data;
    const agentData = state.connectedAgents.get(socket.data.agentId);
    if (!agentData) return;

    // roomId must be provided for typing indicator
    if (!roomId) return;
    const actualRoomId = roomId;
    const room = state.activeRooms.get(actualRoomId);
    if (!room) return;

    console.log(`⌨️ Agent stopped typing in room ${actualRoomId}`);
      
      // Find user socket and emit directly
      const userSocketEntry = Array.from(state.connectedUsers.entries())
        .find(([_, data]) => data.userId === room.userId && data.type === "user");
      
      if (userSocketEntry) {
        const [userSocketId] = userSocketEntry;
        const userSocket = io.sockets.sockets.get(userSocketId);
        if (userSocket) {
          console.log(`📤 Sending stop typing indicator to user socket ${userSocketId}`);
          userSocket.emit("agent_stopped_typing", { agentId: socket.data.agentId, roomId: actualRoomId });
        }
      }
      
      // Also emit to room
      socket.to(actualRoomId).emit("agent_stopped_typing", { agentId: socket.data.agentId, roomId: actualRoomId });
  });

  // ✅ Mark message as read
  socket.on("message_read", (data) => {
    const { messageId, roomId } = data;
    const userData = state.connectedUsers.get(socket.id);
    const agentData = state.connectedAgents.get(socket.data.agentId);
    
    if (!userData && !agentData) return;

    const actualRoomId = roomId || userData?.roomId || agentData?.currentRoomId;
    if (!actualRoomId) return;

    const room = state.activeRooms.get(actualRoomId);
    if (!room) return;

    // Find and update message
    const message = room.messages.find((msg) => msg.id === messageId);
    if (message) {
      if (userData && userData.type === "user") {
        message.readBy = message.readBy || { user: false, agent: false };
        message.readBy.user = true;
      } else if (agentData) {
        message.readBy = message.readBy || { user: false, agent: false };
        message.readBy.agent = true;
      }

      // Notify all sockets in room about read status update
      io.to(actualRoomId).emit("message_read_update", {
        messageId,
        roomId: actualRoomId,
        readBy: message.readBy,
      });

      console.log(`✅ Message ${messageId} marked as read in room ${actualRoomId}`);
    }
  });

  // ✅ Agent ends chat
  socket.on("agent_disconnect_chat", (data) => {
    const { roomId } = data;
    const agentData = state.connectedAgents.get(socket.data.agentId);
    if (!agentData) return;

    if (!roomId) {
      console.error(`❌ No roomId provided for agent_disconnect_chat from agent: ${socket.data.agentId}`);
      return;
    }
    const actualRoomId = roomId;

    const room = state.activeRooms.get(actualRoomId);
    if (room) {
      // Notify user
      io.to(actualRoomId).emit("agent_disconnected", {
        message: "The agent has disconnected. You may continue chatting with SARATHI.",
      });

      // Clean up
      state.roomMapping.delete(room.userId);
      state.activeRooms.delete(actualRoomId);
      
      // Remove room from agent's active rooms
      if (agentData.activeRoomIds) {
        agentData.activeRoomIds = agentData.activeRoomIds.filter(id => id !== actualRoomId);
      }
      state.connectedAgents.set(socket.data.agentId, agentData);

      // Remove user from room
      const userSocketEntry = Array.from(state.connectedUsers.entries())
        .find(([_, data]) => data.userId === room.userId && data.type === "user");
      if (userSocketEntry) {
        const [userSocketId] = userSocketEntry;
        const userSocket = io.sockets.sockets.get(userSocketId);
        if (userSocket) {
          userSocket.leave(actualRoomId);
          userSocket.data.roomId = null;
        }
      }

      // Broadcast agent status update
      broadcastAgentStatus();

      // Notify all live agents about any waiting users (agents can handle multiple chats)
      if (state.waitingQueue.length > 0) {
        const waitingUserId = state.waitingQueue[0];
        const waitingUserData = Array.from(state.connectedUsers.values())
          .find(u => u.userId === waitingUserId && u.type === "user");
        
        if (waitingUserData) {
          state.connectedAgents.forEach((otherAgentData, otherAgentId) => {
            const otherAgentSocket = io.sockets.sockets.get(otherAgentData.socketId);
            if (otherAgentSocket) {
              otherAgentSocket.emit("new_user_waiting", {
                userId: waitingUserId,
                waitingSince: waitingUserData.connectedAt,
              });
            }
          });
        }
      }

      socket.leave(actualRoomId);
      console.log(`🔌 Agent ${socket.data.agentId} ended chat in room ${actualRoomId}`);
    }
  });

  // ✅ User ends chat (explicit disconnect from chat)
  socket.on("user_disconnect_chat", (data) => {
    const { roomId } = data;
    const userData = state.connectedUsers.get(socket.id);
    if (!userData || userData.type !== "user") return;

    const userId = userData.userId;
    const actualRoomId = roomId || state.roomMapping.get(userId);
    if (!actualRoomId) return;

    const room = state.activeRooms.get(actualRoomId);
    if (room) {
      // Notify agent
      const agentData = state.connectedAgents.get(room.agentId);
      if (agentData) {
        const agentSocket = io.sockets.sockets.get(agentData.socketId);
        if (agentSocket) {
          agentSocket.emit("user_disconnected", { roomId: actualRoomId, userId });
        }
        
        // Remove room from agent's active rooms
        if (agentData.activeRoomIds) {
          agentData.activeRoomIds = agentData.activeRoomIds.filter(id => id !== actualRoomId);
        }
        state.connectedAgents.set(room.agentId, agentData);
        
        // Broadcast agent status update
        broadcastAgentStatus();
      }

      // Clean up room
      state.roomMapping.delete(userId);
      state.activeRooms.delete(actualRoomId);
      
      // Remove user from room
      socket.leave(actualRoomId);
      
      console.log(`🔌 User ${userId} ended chat in room ${actualRoomId}`);
    }
  });

  // ✅ User disconnects (socket disconnect)
  socket.on("disconnect", () => {
    const userData = state.connectedUsers.get(socket.id);
    if (!userData) return;

    if (userData.type === "user") {
      const userId = userData.userId;
      
      // Remove from waiting queue
      const queueIndex = state.waitingQueue.indexOf(userId);
      if (queueIndex !== -1) {
        state.waitingQueue.splice(queueIndex, 1);
        // Notify agents
        state.connectedAgents.forEach((agentData) => {
          const agentSocket = io.sockets.sockets.get(agentData.socketId);
          if (agentSocket) {
            agentSocket.emit("user_left_queue", { userId });
          }
        });
      }

      // Clean up room if exists
      const roomId = state.roomMapping.get(userId);
      if (roomId) {
        const room = state.activeRooms.get(roomId);
        if (room) {
          // Notify agent
          const agentSocket = io.sockets.sockets.get(room.agentId);
          if (agentSocket) {
            agentSocket.emit("user_disconnected", { roomId, userId });
          }
          state.activeRooms.delete(roomId);
        }
        state.roomMapping.delete(userId);
      }

      state.connectedUsers.delete(socket.id);
      console.log(`👤 User disconnected: ${userId}`);
    } else if (userData.type === "agent") {
      const agentId = socket.data.agentId;
      const agentData = state.connectedAgents.get(agentId);
      
      if (agentData?.currentRoomId) {
        const room = state.activeRooms.get(agentData.currentRoomId);
        if (room) {
          // Notify user
          io.to(agentData.currentRoomId).emit("agent_disconnected", {
            message: "The agent has disconnected. You may continue chatting with SARATHI.",
          });
          state.roomMapping.delete(room.userId);
          state.activeRooms.delete(agentData.currentRoomId);
        }
      }

      state.connectedAgents.delete(agentId);
      state.connectedUsers.delete(socket.id);
      console.log(`👨‍💼 Agent disconnected: ${agentId}`);
    }
  });
});

console.log("✅ Socket.io server initialized");

// ✅ Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("🔑 OpenAI API Key Loaded:", !!process.env.OPENAI_API_KEY);
console.log("🌍 Environment PORT:", process.env.PORT);

/**
 * /api/chat — Streams ChatGPT responses
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Missing 'question' field in request body." });
    }

    // 🧠 Configure server-sent events (SSE) headers for live streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // Ensures streaming starts immediately

    // 🧩 Chat completion with streaming enabled
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: cirdSystemPrompt }, // ✅ Using imported CIRD data
        ...(context ? [{ role: "system", content: context }] : []),
        { role: "user", content: question },
      ],
      max_tokens: 200, // Limit response length to ensure concise answers (5-6 lines)
    });

    // Stream each token as it comes in
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) res.write(`data: ${text}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("❌ Error in /api/chat:", err);
    res.status(500).json({
      error: err.message,
      details: err.response?.data || "Unknown error in /api/chat",
    });
  }
});

/**
 * /api/embed — Generate text embeddings for semantic FAQ search
 */
app.post("/api/embed", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "Missing 'text' field in request body." });

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    res.json({ embedding: embedding.data[0].embedding });
  } catch (err) {
    console.error("❌ Embedding Error:", err);
    res.status(500).json({
      error: err.message,
      details: err.response?.data || "Unknown error in /api/embed",
    });
  }
});
/**
 * /api/contact — Send contact form email (Enhanced Styled Email)
 */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "Name, email, subject, and message are required.",
      });
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Premium Styled Email Template
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; background:#f4f6fa; padding:30px;">
        <div style="
          max-width:600px;
          margin:auto;
          background:white;
          border-radius:12px;
          padding:30px;
          box-shadow:0 4px 20px rgba(0,0,0,0.08);
        ">
          
          <!-- Header -->
          <div style="text-align:center; margin-bottom:30px;">
            <h1 style="
              margin:0;
              font-size:26px;
              background: linear-gradient(90deg, #2563eb, #4f46e5);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            ">
              📩 New Contact Form Submission
            </h1>
            <p style="color:#6b7280; font-size:15px; margin-top:8px;">
              A new message has been received from the CIRD website.
            </p>
          </div>

          <!-- User Info Card -->
          <div style="
            background:#f0f4ff;
            padding:20px;
            border-radius:10px;
            border-left:4px solid #2563eb;
            margin-bottom:25px;
          ">
            <p style="margin:8px 0;"><b>Name:</b> ${name}</p>
            <p style="margin:8px 0;"><b>Email:</b> ${email}</p>
            ${phone ? `<p style="margin:8px 0;"><b>Phone:</b> ${phone}</p>` : ""}
            <p style="margin:8px 0;"><b>Subject:</b> ${subject}</p>
          </div>

          <!-- Message Box -->
          <div style="
            background:white;
            border-radius:10px;
            border:1px solid #e5e7eb;
            padding:20px;
          ">
            <h3 style="
              margin-top:0;
              color:#1e3a8a;
              font-size:18px;
            ">Message:</h3>

            <p style="line-height:1.7; font-size:15px; white-space:pre-line;">
              ${message}
            </p>
          </div>

          <hr style="margin:30px 0; border:none; border-top:1px solid #e5e7eb;" />

          <!-- Footer -->
          <div style="text-align:center; color:#6b7280; font-size:14px;">
            <p>This message was sent via the <b>CIRD Website Contact Form</b>.</p>
          </div>

        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"CIRD Website Contact" <support@cird.co.in>`,
      to: "support@cird.co.in",
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: emailHTML,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (err) {
    return res.status(500).json({
      error: "Failed to send message",
      details: err.message,
    });
  }
});

/**
 * /health — Simple uptime route for monitoring
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "CIRD backend is alive ✅" });
});

/**
 * 404 handler for undefined routes - return JSON instead of HTML
 */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
});

/**
 * Global error handler - ensure all errors return JSON
 */
app.use((err, req, res, next) => {
  console.error("❌ Global error handler:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

/**
 * 🚀 Start the Server
 * Render automatically injects its own PORT (usually 10000)
 */
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`✅ CIRD AI backend running on http://localhost:${PORT}`);
  console.log(`✅ Socket.io server ready for WebSocket connections`);
});

/* ------------------------------------------------------------------
   🟢 KEEP-ALIVE SELF-PING (prevents Render from sleeping)
------------------------------------------------------------------- */
if (process.env.RENDER === "true" || process.env.RENDER_EXTERNAL_URL) {
  const axios = await import("axios");
  const url =
    process.env.RENDER_EXTERNAL_URL || "https://cird.onrender.com";

  console.log("🔁 Keep-alive ping enabled for:", url);

  // Ping every 5 minutes to keep backend awake
  setInterval(async () => {
    try {
      await axios.default.get(`${url}/health`);
      console.log("💓 Keep-alive ping sent to", `${url}/health`);
    } catch (err) {
      console.log("⚠️ Keep-alive ping failed:", err.message);
    }
  }, 5 * 60 * 1000);
}
