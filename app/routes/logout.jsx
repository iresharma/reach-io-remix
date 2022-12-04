import { redirect } from "@remix-run/node";
import { getSession, destroySession } from "../session";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", null);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
