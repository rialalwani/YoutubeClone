// ─────────────────────────────────────────────────────────────
// livekitRoutes.js  –  add this file to your backend
// Then in your main server file (e.g. index.js / app.js) add:
//
//   import livekitRoutes from "./livekitRoutes.js";
//   app.use("/livekit", livekitRoutes);
//
// ─────────────────────────────────────────────────────────────

import express from "express";
import { AccessToken } from "livekit-server-sdk";
import dotenv from "dotenv"

const router = express.Router();
dotenv.config()
// These match LiveKit's --dev mode defaults. Change them in production!
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;

/**
 * GET /livekit/token?room=<groupId>&username=<name>
 * Returns a short-lived JWT the frontend passes to <LiveKitRoom token={...}>
 */
router.get("/token", async (req, res) => {
  const { room, username } = req.query;

  if (!room || !username) {
    return res.status(400).json({ error: "room and username are required" });
  }

  try {
    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity: username,
      // Token expires in 6 hours
      ttl: "6h",
    });

    at.addGrant({
      roomJoin: true,
      room,
      canPublish: true,       // can send audio/video/screenshare
      canSubscribe: true,     // can receive others' streams
      canPublishData: true,   // can send data channel messages
    });

    const token = await at.toJwt();
    return res.json({ token });
  } catch (err) {
    console.error("LiveKit token error:", err);
    return res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;
