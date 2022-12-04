import { redirect } from "@remix-run/node";
import { getSession } from "../../session";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  console.log(session.get("account"));
  const account = session.get("account");
  if (!account.mailId && request.url.split("/").pop() !== "new") {
    return redirect("/mails/new");
  }
};

export default function PageIndexContent() {
  return <h1>Hi</h1>;
}
