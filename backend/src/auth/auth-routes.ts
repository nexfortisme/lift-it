import { Hono } from "hono";
import { AuthCallback, Login } from "./login";

const app = new Hono();
const OAUTH_URL = Bun.env.OAUTH_URL || "";

app.get(`/discord`, (c) => {
    console.log('redirecting to discord oauth', OAUTH_URL);
    return c.redirect(OAUTH_URL);
});
app.get(`/discord/callback`, Login);
app.get(`/callback`, AuthCallback);
// app.get(`/refresh`, RefreshToken);

export default app;