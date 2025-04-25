import { z } from '@hono/zod-openapi';

export const sendPushNotificationDTO = z
  .object({
    title: z.string().openapi({
      description: 'The title of the push notification',
      example: 'New Message',
    }),
    body: z.string().openapi({
      description: 'The body content of the push notification',
      example: 'You have a new message from John.',
    }),
    token: z.string().openapi({
      description: 'The recipient device token',
      example: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxxx]',
    }),
    data: z.object({
      deepLink: z.string().openapi({
        description: 'The deep link to open when the notification is tapped',
        example: 'myapp://chat/123',
      }),
    }).optional()
  })
  .openapi('SendPushNotificationDTO');

export type SendPushNotificationDTO = z.infer<typeof sendPushNotificationDTO>;
