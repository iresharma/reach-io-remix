import Dash from "../../layouts/dash";
import { getSession } from "../../session";
import { redirect } from "@remix-run/node";
import { getKanbanData, addItem } from "../../database/board.database.server";
import { useLoaderData } from "@remix-run/react";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DragList from "../../components/board/dragList.component";
// import { ObjectId } from "bson";
import { useMemo, useState } from "react";

// https://codesandbox.io/s/small-hooks-3jy33t?file=/src/ListItem.js:0-49

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const account = session.get("account");
  if (!account.boardId && request.url.split("/").pop() !== "new") {
    return redirect("/board/new");
  }
  const kanban = await getKanbanData(account.boardId);
  return { kanban };
};

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const account = session.get("account");
  const kanBan = account.boardId;
  const formData = Object.fromEntries(await request.formData());
  console.log(formData);
  formData["boardId"] = kanBan;
  formData["prefix"] = "todo";
  formData["created_at"] = Date.now().toString();
  await addItem(formData);
  return {};
};

export default function Board() {
  const loader = useLoaderData();
  const [elements, setElement] = useState({});
  useMemo(() => {
    const todo = loader.kanban.items.filter((item) => item.prefix === "todo");
    const progress = loader.kanban.items.filter(
      (item) => item.prefix === "progress"
    );
    const done = loader.kanban.items.filter((item) => item.prefix === "done");
    setElement({
      todo: todo,
      progress: progress,
      done: done,
    });
  }, [loader]);
  return (
    <Dash>
      <h1>Kanban Board</h1>
      <DragList items={elements} />
    </Dash>
  );
}
