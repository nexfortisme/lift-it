import type { Context } from "hono";
import { Jwt } from "hono/utils/jwt";
import { sign } from "hono/utils/jwt/jwt";


let CLIENT_ID = Bun.env.DISCORD_CLIENT_ID;
let CLIENT_SECRET = Bun.env.DISCORD_CLIENT_SECRET;
let REDIRECT_URI = Bun.env.REDIRECT_URI;

let JWT_SECRET = Bun.env.JWT_SECRET ?? '';
let REFRESH_SECRET = Bun.env.REFRESH_SECRET ?? '';

let BASE_ROUTE = Bun.env.BASE_ROUTE;

export async function Login(c: Context) {

  let code = c.req.query("code");

  let params = new URLSearchParams();
  params.append("client_id", CLIENT_ID ?? "");
  params.append("client_secret", CLIENT_SECRET ?? "");
  params.append("grant_type", "authorization_code");
  params.append("code", code?.toString() || "");
  params.append("redirect_uri", REDIRECT_URI ?? "");

  try {
    let response = await fetch(`https://discord.com/api/oauth2/token`, {
      method: "POST",
      body: params,
    });

    let responseJson = await response.json();
    if (response.ok) {
      return c.redirect(`${BASE_ROUTE}/auth/callback?token=${responseJson.access_token}&refresh_token=${responseJson.refresh_token}`);
    } else {
      return c.text('Error in discord response')
    }
  } catch (error) {
    return c.text('Error in auth callback')
  }
}

export async function AuthCallback(c: Context) {

  console.log('auth callback', c.req.query("token"));

  let token = c.req.query("token");
  let refreshToken = c.req.query("refresh_token");

  let jwtToken;
  let jwtRefreshToken;

  try {
    let resp = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    let respData = await resp.json();
    console.log('respData', respData);
    if (resp.ok) {

      let authObject = {
        user: respData,
        discord_token: token,
        discord_refresh_token: refreshToken,
      };

      jwtToken = await Jwt.sign(authObject, JWT_SECRET);

      jwtRefreshToken = await Jwt.sign(authObject, REFRESH_SECRET);

      return c.redirect(
        `${Bun.env.AUTH_REDIRECT_BASE_URL}?token=${jwtToken ? encodeURIComponent(jwtToken) : ""}&refreshToken=${jwtRefreshToken ? encodeURIComponent(jwtRefreshToken) : ""}`,
      );
    } else {
      return c.json({ error: "Error in discord response" }, 400);
    }
  } catch (error) {
    return c.json({ error: "Error in auth callback" }, 400);
  }

}

export async function Logout(c: Context) {

  console.log('logout', c.req.header("authorization"))

  try {
    const authHeader = c.req.header("authorization");
    let token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return c.json({ error: "No token provided" }, 401 as const);
    }

    let params = new URLSearchParams();
    params.append("token", token);
    params.append("token_type_hint", "access_token");

    const response = await fetch(`https://discord.com/api/oauth2/token/revoke`, {
      method: "POST",
      body: JSON.stringify({
        token: token,
        token_type_hint: "access_token",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });

    console.log('logout response', response);

    if (!response.ok) {
      return c.json({ error: "Failed to revoke token" }, 400 as const);
    }

    return c.json({ message: "Logged out successfully" }, 200 as const);
  } catch (error) {
    console.error("Logout error:", error);
    return c.json({ error: "Internal server error during logout" }, 500 as const);
  }
}

export default { Login, Logout, AuthCallback };
