// app/sessions.js
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
let { COOKIE_SECRET_KEY } = process.env;

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      maxAge: 30 * 86400,
      path: "/",
      sameSite: "lax",
      secrets: [COOKIE_SECRET_KEY],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
