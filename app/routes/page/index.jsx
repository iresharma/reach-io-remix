import { redirect } from "@remix-run/node";
import { getPageData } from "~/database/page.database.server";
import { getSession } from "../../session";
import { PageToolbar } from "../../components/page/toolbar.component";
import buttonStyles from "../../styles/components/page/buttons.css";
import toolBarStyles from "../../styles/components/page/pageToolbar.css";

export const links = () => {
  return [
    { rel: "stylesheet", href: buttonStyles },
    { rel: "stylesheet", href: toolBarStyles },
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
  return (
    <div>
      <PageToolbar />
    </div>
  );
}
