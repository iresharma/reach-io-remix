import { redirect } from "@remix-run/node";
import { getPageData } from "~/database/page.database.server";
import { getSession } from "~/session";
import { PageToolbar } from "~/components/page/toolbar.component";
import buttonStyles from "../../styles/components/page/buttons.css";
import toolBarStyles from "../../styles/components/page/pageToolbar.css";
import { useState } from "react";
import linkStyles from "../../styles/components/page/indexPage.css";
import { useLoaderData } from "@remix-run/react";
import Links from "~/components/page/links.component";
import DesignComponent from "~/components/page/design.component";
import designStyles from "~/styles/components/page/design.css"

export const links = () => {
  return [
    { rel: "stylesheet", href: linkStyles },
    { rel: "stylesheet", href: buttonStyles },
    { rel: "stylesheet", href: designStyles },
    {
      rel: "stylesheet",
      href: toolBarStyles,
    },
  ];
};

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  console.log(session.get("account"));
  const account = session.get("account");
  if (!account.pageId && request.url.split("/").pop() !== "new") {
    return redirect("/page/new");
  }
  return await getPageData(account.pageId);
};

export default function PageIndexContent() {
  const pageData = useLoaderData();

  const [active, setActive] = useState(0);

  return (
    <div>
      <PageToolbar active={active} updateActive={setActive} route={pageData.route} />
      {active === 0 && <Links pageData={pageData}/>}
      {active === 1 && <DesignComponent {...pageData.template} route={pageData.route}/>}
    </div>
  );
}
