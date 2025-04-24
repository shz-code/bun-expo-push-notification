import { z } from "zod";

export const sendPushNotificationDTO = z.object({
    title: z.string(),
    body: z.string(),
    token: z.string(),
})

export type SendPushNotificationDTO = z.infer<typeof sendPushNotificationDTO>;