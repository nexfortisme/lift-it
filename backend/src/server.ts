import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import authRoutes from "./auth/auth-routes";
let PORT = Bun.env.PORT || 3000;
let BASE_ROUTE = Bun.env.BASE_ROUTE;
let OAUTH_URL = Bun.env.OAUTH_URL || "";
let JWT_SECRET = Bun.env.JWT_SECRET || "";

if(!BASE_ROUTE) {
  console.error("BASE_ROUTE is not set");
  process.exit(1);
}

if(!OAUTH_URL) {  
  console.error("OAUTH_URL is not set");
  process.exit(1);
}

if(!JWT_SECRET) {
  console.error("JWT_SECRET is not set");
  process.exit(1);
}

let app = new Hono().basePath(BASE_ROUTE ?? "/api/v1");

app.use(logger())

/* Middleware to prevent cors errors*/
app.use("*", cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  allowMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// app.use("/", serveStatic({
//   root: "./public",
//   getContent: async (path, c) => {
//     return null;
//   }
// }));

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
