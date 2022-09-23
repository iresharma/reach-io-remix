import Dash from "../../layouts/dash";
import { getSession } from "../../session";
import { redirect } from "@remix-run/node";
import { getKanbanData, addItem } from "../../database/board.database.server";
import { useLoaderData } from "@remix-run/react";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DragList from "../../components/board/dragList.component";
import { ObjectId } from "bson";
import { useMemo } from "react";

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
  formData["prefix"] = "todo";
  formData["id"] = new ObjectId();
  formData["created_at"] = new Date().getUTCSeconds();
  await addItem(kanBan, formData);
  return {};
};

export default function Board() {
  const loader = useLoaderData();
  let elements = useMemo(() => {
    const todo = loader.kanban.items.filter((item) => item.prefix === "todo");
    const progress = loader.kanban.items.filter(
      (item) => item.prefix === "progerss"
    );
    const done = loader.kanban.items.filter((item) => item.prefix === "done");
    return {
      todo: todo,
      progress: progress,
      done: done,
    };
  }, []);
  return (
    <Dash>
      <h1>Kanban Board</h1>
      <pre>{JSON.stringify(elements, null, 4)}</pre>
      <DragList items={elements} />
    </Dash>
  );
}
