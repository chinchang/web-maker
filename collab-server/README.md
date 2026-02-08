# Web Maker Collab Server

WebSocket server for Web Maker's real-time collaboration feature using y-websocket.

## Deploy to Railway

1. **Create a new project on Railway**

   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repo and set the **root directory** to `collab-server`

2. **Get your deployment URL**

   - Railway will provide a URL like `your-app.up.railway.app`
   - Railway provides WSS (secure WebSocket) automatically

3. **Update Web Maker**
   - Edit `src/constants.js` in the main Web Maker project
   - Set `COLLAB_SERVER_URL` to `wss://your-app.up.railway.app`

## Local Development

```bash
cd collab-server
npm install
npm start
```

Server runs on `ws://localhost:1234` (default y-websocket port)

Or from the main project root:

```bash
npm run start:collab
```

## Environment Variables

- `PORT` - Server port (Railway sets this automatically)
- `HOST` - Bind address (set to 0.0.0.0 for Railway)
