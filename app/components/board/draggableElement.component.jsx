import { Droppable } from "react-beautiful-dnd";
import ListItem from "./listItem.component";
import { Box } from "@mantine/core";

const DraggableElement = ({ prefix, elements }) => (
  <Box
    p="md"
    sx={(theme) => ({
      borderRadius: theme.radius.md,
      background: theme.colors.brand[1],
    })}
  >
    <div
      style={{
        textTransform: "uppercase",
        marginBottom: "20px",
      }}
    >
      {prefix}
    </div>
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </Box>
);

export default DraggableElement;
