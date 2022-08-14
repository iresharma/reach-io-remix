import { redirect } from "@remix-run/node";
import { getSession } from "../../session";
import DashLayout from "../../layouts/dash";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const account = session.get("account");
  console.log(account);
  if (!account.bucketId && request.url.split("/").pop() !== "new") {
    return redirect("/storage/new");
  }
  return "hi";
};

export default function StoragePage() {
  return (
    <DashLayout>
      <h1>hi</h1>
    </DashLayout>
  );
}
