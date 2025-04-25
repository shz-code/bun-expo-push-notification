
# Expo Push Server

A lightweight server built with [Bun](https://bun.sh/) and [Hono](https://honojs.dev/) to send push notifications to devices using Expo's push notification system. Now featuring **OpenAPI (Swagger UI) documentation** and robust input validation with [Zod](https://github.com/colinhacks/zod) and [zod-openapi](https://github.com/asteasolutions/zod-to-openapi).

Useful for testing, prototyping, or as a backend service to trigger push notifications from your applications.

## Features

- Simple HTTP API to trigger Expo push notifications
- **Interactive API docs via Swagger UI** (`/docs`)
- Input validation using [Zod](https://github.com/colinhacks/zod) and [zod-openapi](https://github.com/asteasolutions/zod-to-openapi)
- **Optional `data` object** in payload for sending extra information (e.g., deeplinks)
- Built with fast, modern tools: Bun, TypeScript, Hono

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation (Swagger UI)](#api-documentation-swagger-ui)
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

## API Documentation (Swagger UI)

Interactive API documentation is available at:

- [http://localhost:3000/docs](http://localhost:3000/docs)

You can explore, test, and view schemas for all endpoints directly in your browser.

---

## API Routes

### `POST /api/push/send`

Send a push notification to an Expo device token.

- **URL:** `/api/push/send`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Body Parameters:**  
  Validated using a [Zod](https://github.com/colinhacks/zod) schema (see [Payload Example](#payload-example)).

#### Example Request

```bash
curl -X POST http://localhost:3000/api/push/send \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello from server!",
    "body": "This is a test push notification",
    "token": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
    "data": {
      "deeplink": "myapp://profile/123"
    }
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
| data    | object | No       | Optional. Extra data (e.g., deeplinks) |

#### Example JSON

```json
{
  "title": "Sample Notification",
  "body": "This is a sample push notification for Expo!",
  "token": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "data": {
    "deeplink": "myapp://profile/123"
  }
}
```

#### Using the `data` Object

The optional `data` object can be used to send additional information with your push notification.  
A common use case is to send a **deeplink** so that your app can navigate to a specific screen when the notification is tapped.

Example:

```json
"data": {
  "deeplink": "myapp://profile/123"
}
```

Your app can read this `deeplink` value and handle navigation accordingly.


## Development

- Code lives in `/controllers`, `/routes`, and `/dtos`
- Entry point: `index.ts`
- API routes are defined using `@hono/zod-openapi` for automatic OpenAPI docs
- You can extend DTOs in `/dtos/pushDTO/` for more payload options

---

## License

MIT

---

This project was created using `bun init` in bun v1.2.6. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
