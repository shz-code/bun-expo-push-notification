# Expo Push Server

A lightweight server built with [Bun](https://bun.sh/) and [Hono](https://honojs.dev/) to send push notifications to devices using Expo's push notification system. Useful for testing, prototyping, or as a backend service to trigger push notifications from your applications.

## Features

- Simple HTTP API to trigger Expo push notifications
- Input validation using [Zod](https://github.com/colinhacks/zod)
- Built with fast, modern tools: Bun, TypeScript, Hono

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
  - [POST /api/push/send](#post-apipushsend)
- [Payload Example](#payload-example)
- [Development](#development)
- [License](#license)

---

## Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/shz-code/bun-expo-push-notification.git
    cd bun-expo-push-notification
    ```
2. **Install Dependencies**  
    Ensure you have [Bun](https://bun.sh/) installed (v1.2.6 or higher).
    ```bash
    bun install
    ```

---

## Usage

To start the server (default port is **3000**):

```bash
bun start
```

The server will be available at [http://localhost:3000](http://localhost:3000).

---

## API Routes

### `POST /api/push/send`

Send a push notification to an Expo device token.

- **URL:** `/api/push/send`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Body Parameters:**
  - `title` (string): Notification title (required)
  - `body` (string): Notification body/message (required)
  - `token` (string): Expo push token, e.g. `"ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"` (required)

#### Example Request

```bash
curl -X POST http://localhost:3000/api/push/send \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello from server!",
    "body": "This is a test push notification",
    "token": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"
  }'
```

#### Success Response

- **Code:** `200 OK`
- **Content:**
    ```json
    {
      "success": true,
      "tickets": [
        {
          "status": "ok",
          "id": "...",
          "...": "..."
        }
      ]
    }
    ```

#### Error Responses

- **Invalid Token**
    - **Code:** `400 Bad Request`
    - **Content:**
        ```json
        {
          "error": "Invalid Expo push token"
        }
        ```

- **Server Error**
    - **Code:** `500 Internal Server Error`
    - **Content:**
        ```json
        {
          "error": "Failed to send notification"
        }
        ```

---

## Payload Example

| Field   | Type   | Required | Description                       |
|---------|--------|----------|-----------------------------------|
| title   | string | Yes      | Title of the notification         |
| body    | string | Yes      | Body text of the notification     |
| token   | string | Yes      | Expo push token (device token)    |

#### Example JSON

```json
{
  "title": "Sample Notification",
  "body": "This is a sample push notification for Expo!",
  "token": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"
}
```

---

## Development

- Code lives in `/controllers`, `/routes`, and `/dtos`
- Entry point: `index.ts`
- You can extend DTOs in `/dtos/pushDTO/` for more payload options

---

## License

MIT

---

This project was created using `bun init` in bun v1.2.6. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
