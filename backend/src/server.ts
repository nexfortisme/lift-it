import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { cors } from "hono/cors";
import GetDBConnection from "./database/database";
import authRoutes from "./auth/auth-routes";
import GetUserInfo from "./users/users";
import GetUserActivity from "./users/activity";
import { serveStatic } from "hono/serve-static";

let PORT = Bun.env.PORT || 3000;
let BASE_ROUTE = Bun.env.BASE_ROUTE;
let OAUTH_URL = Bun.env.OAUTH_URL || "";
let JWT_SECRET = Bun.env.JWT_SECRET || "";

console.log("BASE_ROUTE", BASE_ROUTE);
console.log("OAUTH_URL", OAUTH_URL);
console.log("JWT_SECRET", JWT_SECRET); 

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

/* Middleware to prevent cors errors*/
app.use("*", async (c, next) => {
  await cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    allowMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
    credentials: true,
  })(c, await next);
});

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
