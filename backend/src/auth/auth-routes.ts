import { Hono } from "hono";
import { AuthCallback, Login, Logout } from "./login";

const app = new Hono();
const OAUTH_URL = Bun.env.OAUTH_URL || "";

app.get(`/discord`, (c) => {
    return c.redirect(OAUTH_URL);
});
app.get(`/discord/callback`, Login);
app.get(`/callback`, AuthCallback);


app.get(`/logout`, Logout);

// TODO: Figure out Token Refresh
// app.get(`/refresh`, RefreshToken);

export default app;