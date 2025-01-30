import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { cors } from "hono/cors";
import GetDBConnection from "./database/database";
import authRoutes from "./auth/auth-routes";
import GetUserInfo from "./users/users";
import GetUserActivity from "./users/activity";

let PORT = Bun.env.PORT || 3000;
let BASE_ROUTE = Bun.env.BASE_ROUTE;
let OAUTH_URL = Bun.env.OAUTH_URL || "";
let JWT_SECRET = Bun.env.JWT_SECRET || "";

let app = new Hono().basePath(BASE_ROUTE ?? "/api/v1");

/* Middleware to prevent cors errors*/
app.use("*", async (c, next) => {
  await cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    allowMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
    credentials: true,
  })(c, await next);
});

/* Routes */
app.route("/auth", authRoutes);

/* Test Route for jwt middleware */
// app.get(`/test`, jwt({ secret: JWT_SECRET }), (c) => {
//   return c.text("Hello World");
// });

// app.get("/user/info", jwt({ secret: JWT_SECRET }), GetUserInfo);
// app.get("/user/activity", jwt({ secret: JWT_SECRET }), GetUserActivity);

app.notFound((c) => {
  return c.text(`Not Found: ${c.req.url}`);
});

// let db = await GetDBConnection();

// console.log("Server listening on http://localhost:" + PORT);

export default {
  port: PORT,
  fetch: app.fetch,
};
