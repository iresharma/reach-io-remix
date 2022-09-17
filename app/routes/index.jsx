import DashLayout from "../layouts/dash";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "../session";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userData = session.get("account");
  return { userData };
};

export default function HomePage() {
  const data = useLoaderData();
  return (
    <DashLayout>
      <h1>Team: {data.userData.account_name}</h1>
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <h3>Current Plans</h3>
      <ul>
        <li>Welcome message</li>
      </ul>
    </DashLayout>
  );
}
