import Dash from "../../layouts/dash";
import { getSession } from "../../session";
import { redirect } from "@remix-run/node";
import { getKanbanData } from "../../database/board.database.server";
import { useLoaderData } from "@remix-run/react";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

export default function Board() {
  const loader = useLoaderData();
  return (
    <Dash>
      <h1>hi</h1>
      <pre>{JSON.stringify(loader, null, 4)}</pre>
    </Dash>
  );
}
