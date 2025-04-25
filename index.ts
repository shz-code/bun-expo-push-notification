import { Hono } from "hono";
import { logger } from "hono/logger";
import pushRoutes from "./routes/pushRoutes";
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.use("*", logger());

// Use the middleware to serve Swagger UI at /ui
app.get('/docs', swaggerUI({ url: '/doc' }))

app.doc('doc', {
  openapi: '3.0.0',
  info: {
    title: 'Expo Push Server',
    version: '1.0.0',
  },
})

app.get("/", (c) => c.text("Hello, World!"));

app.route("api/push", pushRoutes);

// Catch-all 404 handler
app.notFound((c) => {
  return c.json({ message: "Oops!", errorCode: 404 }, 404);
});

Bun.serve({
  port: 3000,
  fetch: app.fetch,
//   hostname: "0.0.0.0",
});

console.log("Server running on http://localhost:3000");
// console.log("Server running on http://192.168.68.106:3000");
