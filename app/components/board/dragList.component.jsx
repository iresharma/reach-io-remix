import React, { useEffect } from "react";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
import DraggableElement from "./draggableElement.component";

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["todo", "progress", "done"];

function DragList({ items }) {
  const [elements, setElements] = React.useState(items);

  useEffect(() => {
    setElements(items);
    console.log(elements);
  }, []);
  resetServerContext();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "8px",
          }}
        >
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default DragList;
