import DashLayout from "../layouts/dash";
import { useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "../session";
import { getUserAccountById } from "../database/auth.database.server";
import SocialStats from "../components/home/social-stats.component";
import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  let userData = session.get("account");
  const userAccountId = userData.id;
  userData = await getUserAccountById(userAccountId);
  session.set("account", userData);
  return json(
    { userData },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export default function HomePage() {
  const data = useLoaderData();
  return (
    <DashLayout>
      <h1>Team: {data.userData.account_name}</h1>
      <SocialStats
        data={[
          {
            title: "Instagram",
            value: 500,
            diff: 30,
          },
          {
            title: "Twitch",
            value: 500,
            diff: -30,
          },
          {
            title: "Youtube",
            value: 500,
            diff: 790,
          },
        ]}
      />
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <h3>Current Plans</h3>
      <ul>
        <li>Welcome message</li>
      </ul>
    </DashLayout>
  );
}
