import { Hono } from "hono";
import { sendPushNotification } from "../controllers/pushControllers";
import { zValidator } from "@hono/zod-validator";
import { sendPushNotificationDTO } from "../dtos/pushDTO/sendPushNotificationDTO";

const pushRoutes = new Hono();

pushRoutes.post(
  "/send",
  zValidator("json", sendPushNotificationDTO),
  sendPushNotification
);

export default pushRoutes;
