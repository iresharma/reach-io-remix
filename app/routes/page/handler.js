import {redirect} from "@remix-run/node";
import {getSession} from "../../session";
import {updatePageData} from "~/database/page.database.server";

export const loader = () => {
    return redirect("/page");
};

export const action = async ({request}) => {
    switch (request.method) {
        case "POST":
            const session = await getSession(request.headers.get("Cookie"));
            const account = session.get("account");
            const {links} = await request.json();
            console.log(links)
            const pageData = await updatePageData(account.pageId, links);
            return {pageData};
    }
};
