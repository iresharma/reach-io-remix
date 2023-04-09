import {redirect} from "@remix-run/node";
import {getPageData} from "~/database/page.database.server";
import {getSession} from "~/session";
import {PageToolbar} from "~/components/page/toolbar.component";
import LinkCard from "~/components/page/link.component"
import buttonStyles from "../../styles/components/page/buttons.css";
import toolBarStyles from "../../styles/components/page/pageToolbar.css";
import {useState} from "react";
import pageStyles from "../../styles/components/page/indexPage.css";
import {Card, Text} from "@mantine/core"
import {IconGripVertical, IconRowInsertTop} from "@tabler/icons";
import {DragDropContext, Draggable, Droppable, resetServerContext} from "react-beautiful-dnd";
import {useListState} from "@mantine/hooks";

export const links = () => {
    return [{rel: "stylesheet", href: pageStyles}, {rel: "stylesheet", href: buttonStyles}, {
        rel: "stylesheet",
        href: toolBarStyles
    },];
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

const data = [{
    'link': 'https://iresharma.vercel.app', 'name': 'website',
}, {
    'link': 'https://instagram.com/iresharma.py', 'name': 'instagram',
}, {
    'link': 'https://linkedin.com/in/iresharma', 'name': 'Linkedin',
}]

const AddItem = () => (
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
);

export default function PageIndexContent() {

    const [active, setActive] = useState(0);
    const [state, handlers] = useListState(data);

    resetServerContext();

    const items = state.map((item, index) => (
        <Draggable key={item.name} index={index} draggableId={item.name}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <LinkCard {...item} dragHandleProps={{...provided.dragHandleProps}} />
                </div>
            )}
        </Draggable>
    ));

    return (<div>
        <PageToolbar active={active} updateActive={setActive}/>
        <main className="grid">
            <div className="preview">
                <iframe src={"https://www.globalsqa.com/demo-site/draganddrop/#Propagation"} />
            </div>
            <div className="links">
                <h1>Links</h1>
                <small>Here are the links that you want on the page</small>
                <br/>
                <br/>
                <div className="links-list">
                    <DragDropContext
                        onDragEnd={({ destination, source }) =>
                            handlers.reorder({ from: source.index, to: destination?.index || 0 })
                        }
                    >
                        <Droppable droppableId="dnd-list" direction="vertical">
                            {(provided1) => (
                                <div {...provided1.droppableProps} ref={provided1.innerRef}>
                                    {items}
                                    {provided1.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <AddItem />
                </div>
            </div>
        </main>
    </div>);
}
