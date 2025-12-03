# Debugging: Chat Requests Not Appearing in Agent Dashboard

## ✅ Quick Checks

### 1. Backend Server Status
- ✅ Backend is running (verified)
- Check backend terminal for logs when user requests agent

### 2. Browser Console Checks

**In the Chatbot Window (User Side):**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for these logs when you click "Connect to Human Agent":
   - `✅ Socket.io connected: [socket-id]`
   - `📤 Emitting user_request_agent for userId: [user-id]`
   - `⏳ Queue position: 1/1`

**In the Agent Dashboard Window:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for these logs:
   - `✅ Agent socket connected: [socket-id]`
   - `👥 Waiting users: [array]`
   - `🆕 New user waiting: {userId: "...", waitingSince: ...}`

### 3. Network Tab Checks

**In the Chatbot Window:**
1. Open DevTools → Network tab
2. Filter by "WS" (WebSocket)
3. You should see a WebSocket connection to `ws://localhost:5000/socket.io/`
4. Check if it shows "101 Switching Protocols" (connected)

**In the Agent Dashboard:**
1. Same check - should see WebSocket connection

### 4. Backend Terminal Logs

When user clicks "Connect to Human Agent", you should see:
```
📥 Received user_request_agent from socket: [socket-id]
🔍 Processing agent request for user: [user-id]
⏳ User [user-id] added to waiting queue (position: 1)
📊 Current queue: [array]
📊 Available agents: [number]
📢 Notifying [number] agent(s) about waiting user
📤 Sending new_user_waiting to agent: [agent-id]
```

---

## 🔧 Common Issues & Fixes

### Issue 1: Socket.io Not Connecting

**Symptoms:**
- No "Socket.io connected" log in browser console
- WebSocket shows "failed" or "pending" in Network tab

**Fix:**
1. Check backend server is running: `curl http://localhost:5000/health`
2. Check CORS settings in `backend/server.js` include `http://localhost:3001`
3. Check firewall/port blocking
4. Try refreshing the page

### Issue 2: Events Not Being Received

**Symptoms:**
- Socket connects but no events received
- Backend logs show events but frontend doesn't

**Fix:**
1. Check event names match exactly (case-sensitive)
2. Check socket is in the same namespace
3. Verify socket connection state before emitting

### Issue 3: Agent Dashboard Not Showing Users

**Symptoms:**
- User requests agent successfully
- Backend logs show user in queue
- Agent dashboard shows "No users waiting"

**Fix:**
1. Make sure agent dashboard is connected (check console for "Agent socket connected")
2. Check if agent received `waiting_users` event on connect
3. Check if agent received `new_user_waiting` event
4. Refresh agent dashboard page

### Issue 4: User Not Added to Queue

**Symptoms:**
- User clicks "Connect to Human Agent"
- No backend logs about queue
- Socket might not be connected

**Fix:**
1. Check browser console for connection errors
2. Verify socket is connected before emitting `user_request_agent`
3. Check backend logs for "user_connect" event
4. Make sure chat window is open (socket only connects when chat is open)

---

## 🧪 Step-by-Step Test

1. **Open Chatbot:**
   - Go to `http://localhost:3001`
   - Open SARATHI chatbot
   - Open browser console (F12)

2. **Check Socket Connection:**
   - Look for: `✅ Socket.io connected: [id]`
   - If not present, check Network tab for WebSocket connection

3. **Request Agent:**
   - Click "Connect to Human Agent"
   - Check console for: `📤 Emitting user_request_agent`
   - Check backend terminal for: `📥 Received user_request_agent`

4. **Open Agent Dashboard:**
   - Go to `http://localhost:3001/agent` in NEW window/tab
   - Login with PIN: `1234`
   - Open browser console (F12)

5. **Check Agent Connection:**
   - Look for: `✅ Agent socket connected: [id]`
   - Check if `waiting_users` event is received

6. **Verify Queue:**
   - User should appear in "Waiting Users" panel
   - If not, check both browser consoles for errors

---

## 📝 Expected Flow

```
User Side:
1. Chat opens → Socket connects → "user_connect" emitted
2. User clicks "Connect to Human Agent" → "user_request_agent" emitted
3. Backend adds user to queue → "queue_position" received
4. User sees "Connecting to agent..."

Agent Side:
1. Agent dashboard opens → Socket connects → "agent_connect" emitted
2. Backend sends "waiting_users" with current queue
3. When new user joins → "new_user_waiting" received
4. Agent sees user in "Waiting Users" panel
5. Agent clicks "Join Chat" → "agent_join" emitted
6. Backend creates room → "chat_started" received
7. Both sides can now chat
```

---

## 🐛 Still Not Working?

1. **Check all console logs** (user and agent browsers)
2. **Check backend terminal logs** for all events
3. **Verify Socket.io version compatibility** (should be 4.x)
4. **Try restarting both servers**:
   ```bash
   # Stop backend (Ctrl+C)
   cd backend && npm start
   
   # In another terminal, restart frontend
   npm run dev
   ```
5. **Clear browser cache** and try again
6. **Check for CORS errors** in browser console

---

## 📞 Quick Test Commands

```bash
# Check backend is running
curl http://localhost:5000/health

# Check if port is in use
lsof -i :5000

# Check backend logs
# (should see Socket.io connection logs)
```

