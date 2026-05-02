# Human Agent Live Chat - Setup & Testing Guide

## ✅ What's Been Implemented

1. **Backend (Express + Socket.io)**: Real-time WebSocket server for live chat
2. **Frontend Chatbot**: Human handoff functionality with 3 modes (bot, waiting, connected)
3. **Agent Dashboard**: `/agent` page for agents to manage live chats

---

## 🚀 Quick Start

### Step 1: Start Backend Server
```bash
cd backend
npm start
```
The server should start on `http://localhost:5000` (or PORT from .env)

**Expected output:**
```
✅ CIRD AI backend running on http://localhost:5000
✅ Socket.io server ready for WebSocket connections
```

### Step 2: Start Frontend (Next.js)
```bash
# In the root directory
npm run dev
```
The frontend should start on `http://localhost:3001` (or 3000)

### Step 3: Test the Flow

#### **As a User (Chatbot):**
1. Open `http://localhost:3001` in your browser
2. Click the SARATHI chatbot button (bottom right)
3. Click **"Connect to Human Agent"** button OR type:
   - "connect to a human"
   - "talk to support"
   - "need agent"
   - "human please"
4. You should see: "Connecting you to a human agent..."
5. Wait for an agent to join

#### **As an Agent (Dashboard):**
1. Open `http://localhost:3001/agent` in a **new browser window/tab** (or incognito)
2. Enter PIN: `1234` (default)
3. You should see the waiting user in the left panel
4. Click **"Join Chat"** next to the waiting user
5. Start chatting in real-time!

---

## 🔧 Configuration

### Change Agent PIN
Create/update `.env.local` in the root directory:
```env
NEXT_PUBLIC_AGENT_PIN=your-secure-pin-here
```

### API & Socket (same-origin)
All API and Socket.io connections use the same domain as the frontend (e.g. `https://cird.co.in/api/*`). No backend URL or environment variable is required. Ensure your deployment serves the backend at the same host under `/api/*` and that WebSocket is available for Socket.io.

---

## 🧪 Testing Checklist

### ✅ User Side (Chatbot)
- [ ] Chatbot opens and shows "Connect to Human Agent" button
- [ ] Clicking button switches to "human_waiting" mode
- [ ] Typing handoff phrases triggers human mode
- [ ] Shows "Connecting to agent..." message
- [ ] Shows queue position if multiple users waiting
- [ ] Input is disabled while waiting
- [ ] When agent connects, switches to "human_connected" mode
- [ ] Can send messages to agent
- [ ] Receives messages from agent
- [ ] Shows "Agent is typing..." indicator
- [ ] When agent disconnects, falls back to bot mode

### ✅ Agent Side (Dashboard)
- [ ] Can login with PIN
- [ ] Sees waiting users list
- [ ] Can click "Join Chat" to connect
- [ ] Chat interface opens
- [ ] Can send messages
- [ ] Receives user messages
- [ ] Shows "User is typing..." indicator
- [ ] Can end chat session
- [ ] After ending, can join another user

### ✅ Backend (Server)
- [ ] Server starts without errors
- [ ] Socket.io connection works
- [ ] Users are added to queue
- [ ] Agents receive notifications
- [ ] Rooms are created correctly
- [ ] Messages are delivered in real-time
- [ ] Disconnections are handled properly

---

## 🐛 Troubleshooting

### "Connecting to agent..." but no agent available
- **Solution**: Open `/agent` page and login as an agent

### Socket.io connection fails
- **Check**: Backend server is running on correct port
- **Check**: CORS settings in `backend/server.js` include your frontend URL
- **Check**: Browser console for connection errors

### Agent can't see waiting users
- **Check**: User has clicked "Connect to Human Agent"
- **Check**: Agent dashboard is connected (check for "Live Support" status)
- **Check**: Browser console for Socket.io errors

### Messages not appearing
- **Check**: Both user and agent are in the same room
- **Check**: Browser console for Socket.io event errors
- **Check**: Network tab for WebSocket connection

---

## 📝 Features Summary

### Chat Modes
1. **`bot`**: Default AI streaming mode (ChatGPT)
2. **`human_waiting`**: User requested agent, waiting in queue
3. **`human_connected`**: Real-time chat with human agent

### Socket.io Events

**User Events:**
- `user_connect` - User connects to Socket.io
- `user_request_agent` - User requests human agent
- `user_message` - User sends message
- `user_typing` - User typing indicator
- `user_disconnect` - User disconnects

**Agent Events:**
- `agent_connect` - Agent connects to Socket.io
- `agent_join` - Agent joins a user's chat
- `agent_message` - Agent sends message
- `agent_typing` - Agent typing indicator
- `agent_disconnect_chat` - Agent ends chat session

**Server Events:**
- `queue_position` - User's position in queue
- `agent_connected` - Agent joined the chat
- `agent_not_available` - No agents available
- `new_message` - New message received
- `waiting_users` - List of waiting users (for agents)
- `new_user_waiting` - New user joined queue (for agents)

---

## 🎯 Next Steps

1. **Test the complete flow** with the steps above
2. **Customize the PIN** for production use
3. **Add more features** if needed:
   - Chat history persistence
   - Multiple agents per chat
   - File sharing
   - Chat transcripts
   - Agent availability status

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Check backend server logs
3. Verify Socket.io connection in Network tab
4. Ensure both frontend and backend are running

Happy testing! 🚀

