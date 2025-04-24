import type { Context } from "hono";
import { Expo } from "expo-server-sdk";

const expo = new Expo();

export const sendPushNotification = async (c: Context) => {
  const { token, title, body, data } = await c.req.json();

  if (!Expo.isExpoPushToken(token)) {
    return c.json({ error: "Invalid Expo push token" }, 400);
  }

  const messages = [
    {
      to: token,
      sound: "default",
      title,
      body,
      priority: "high" as "default" | "high" | "normal",
      channelId: "default",
      data
    },
  ];

  try {
    const ticketChunk = await expo.sendPushNotificationsAsync(messages);
    return c.json({ success: true, tickets: ticketChunk });
  } catch (error) {
    console.error("Error sending notification:", error);
    return c.json({ error: "Failed to send notification" }, 500);
  }
};
