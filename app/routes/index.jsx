import { redirect } from "@remix-run/node";
import DashLayout from "../layouts/dash";
import { useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "../session";
import { getUserAccountById } from "../database/auth.database.server";
import SocialStats from "../components/home/social-stats.component";
import { json } from "@remix-run/node";
import { Blockquote } from "@mantine/core";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  let userData = session.get("account");
  if (!userData) {
    return redirect("/login");
  }
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
      <Blockquote cite="– Reach team">
        Welcome to the reach ecosystem, all your workflow needs to{" "}
        <strong
          style={{
            background: `linear-gradient(
    45deg,
    hsl(230, 92%, 85%) 0%,
    hsl(230, 57%, 53%) 25%,
    hsl(230, 92%, 85%) 50%,
    hsl(230, 69%, 61%) 75%,
    #bc1888 100%
  )`,
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            "font-family": `"Oleo Script Swash Caps", cursive`,
          }}
        >
          Reach
        </strong>{" "}
        new heights is here.
      </Blockquote>
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
