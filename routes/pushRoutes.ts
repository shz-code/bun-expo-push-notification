import { sendPushNotification } from "../controllers/pushControllers";
import { sendPushNotificationDTO } from "../dtos/pushDTO/sendPushNotificationDTO";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

const pushRoutes = new OpenAPIHono();

pushRoutes.openapi(
  createRoute({
    method: "post",
    path: "/send",
    summary: "Send a push notification",
    description:
      "Send a push notification to a device using Expo Push Notifications.",
    tags: ["Push Notifications"],
    responses: {
      200: {
        description:
          "Responds with the ticket chunk of the sent notification and status.",
      },
    },
    request: {
      body: {
        content: {
          "application/json": {
            schema: sendPushNotificationDTO,
          },
        },
      },
    },
  }),
  sendPushNotification
);

export default pushRoutes;
