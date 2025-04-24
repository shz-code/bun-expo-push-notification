import { Hono } from "hono";
import { logger } from "hono/logger";
import pushRoutes from "./routes/pushRoutes";

const app = new Hono();

app.use("*", logger());

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
