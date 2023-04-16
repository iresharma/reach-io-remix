import {redirect} from "@remix-run/node";
import {getSession} from "../../session";
import {updatePageLinks, updatePageTemplete} from "~/database/page.database.server";

export const loader = () => {
    return redirect("/page");
};

export const action = async ({request}) => {
    switch (request.method) {
        case "PATCH":
            const session = await getSession(request.headers.get("Cookie"));
            const account = session.get("account");
            const req = await request.json();
            let pageData;
            if(Object.keys(req).includes("links")) {
                const {links} = req;
                pageData = await updatePageLinks(account.pageId, links);
            } else if (Object.keys(req).includes("template")) {
                const {template} = req;
                pageData = await updatePageTemplete(account.pageId, template);
            }
            return { pageData };
    }
};
