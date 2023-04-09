import {redirect} from "@remix-run/node";
import {getPageData} from "~/database/page.database.server";
import {getSession} from "~/session";
import {PageToolbar} from "~/components/page/toolbar.component";
import LinkCard from "~/components/page/link.component"
import buttonStyles from "../../styles/components/page/buttons.css";
import toolBarStyles from "../../styles/components/page/pageToolbar.css";
import {useState} from "react";
import pageStyles from "../../styles/components/page/indexPage.css";
import {Card} from "@mantine/core"
import {IconRowInsertTop} from "@tabler/icons";

export const links = () => {
    return [
        {rel: "stylesheet", href: pageStyles},
        {rel: "stylesheet", href: buttonStyles},
        {rel: "stylesheet", href: toolBarStyles},
    ];
};

export const loader = async ({request}) => {
    const session = await getSession(request.headers.get("Cookie"));
    console.log(session.get("account"));
    const account = session.get("account");
    if (!account.pageId && request.url.split("/").pop() !== "new") {
        return redirect("/page/new");
    }
    return await getPageData(account.pageId);
};

const data = [
    {
        'link': 'https://iresharma.vercel.app',
        'name': 'website',
    },
    {
        'link': 'https://instagram.com/iresharma.py',
        'name': 'instagram',
    },
    {
        'link': 'https://linkedin.com/in/iresharma',
        'name': 'Linkedin',
    }]

export default function PageIndexContent() {

    const [active, setActive] = useState(0);

    return (
        <div>
            <PageToolbar active={active} updateActive={setActive}/>
            <main className="grid">
                <div className="preview"></div>
                <div className="links">
                    <h1>Links</h1>
                    <small>Here are the links that you want on the page</small>
                    <br/>
                    <br/>
                    <div className="links-list">
                        {data.map((el, index) => <LinkCard key={index} {...el} />)}
                        <Card shadow="sm" radius="lg" mt={10} withBorder
                              style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  color: 'gray',
                                  cursor: 'pointer'
                              }}>
                            <IconRowInsertTop/>&nbsp;
                            Add Link
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
