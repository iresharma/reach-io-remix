// app/sessions.js
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
let { COOKIE_SECRET_KEY } = process.env;

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      domain: "reach.io",
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: [COOKIE_SECRET_KEY],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
