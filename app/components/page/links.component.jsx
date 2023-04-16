import {DragDropContext, Draggable, Droppable, resetServerContext} from "react-beautiful-dnd";
import {useListState} from "@mantine/hooks";
import {useEffect, useState} from "react";
import Axios from "axios";
import {showNotification} from "@mantine/notifications";
import LinkCard from "~/components/page/link.component";
import AddItem from "~/components/page/addItem.component";

const Links = ({ pageData }) => {
    const [saving, setSaving] = useState(false);
    const [state, handlers] = useListState(pageData.links ?? []);

    useEffect(() => {
        setSaving(true);
        const updateData = async () => {
            Axios.patch("/page/handler", { links: state })
                .then(() => setSaving(false))
                .catch((error) => {
                    setSaving(false);
                    showNotification({
                        title: "Error",
                        message: error,
                        color: "red",
                    });
                });
        };
        updateData();
    }, [state]);

    resetServerContext();

    const items = state.map((item, index) => (
        <Draggable key={item.name} index={index} draggableId={item.name}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                    <LinkCard
                        {...item}
                        dragHandleProps={{ ...provided.dragHandleProps }}
                        onChange={(e) => handlers.setItem(index, e)}
                        deleteLink={() => handlers.remove(index)}
                    />
                </div>
            )}
        </Draggable>
    ));
    return (
        <main className="grid">
            <div className="preview">
                <iframe src={`https://reach-page-server.vercel.app/${pageData.route}`} />
            </div>
            <div className="links">
                <h1>Links</h1>
                <small>Here are the links that you want on the page</small>
                <br />
                <br />
                <div className="links-list">
                    <DragDropContext
                        onDragEnd={({ destination, source }) =>
                            handlers.reorder({
                                from: source.index,
                                to: destination?.index || 0,
                            })
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
                    <AddItem
                        addLink={() =>
                            handlers.append({ name: "Link", link: "https://reach.io" })
                        }
                    />
                </div>
            </div>
        </main>
    )
}

export default Links;
