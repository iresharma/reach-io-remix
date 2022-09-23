import { Droppable } from "react-beautiful-dnd";
import ListItem from "./listItem.component";
import AddItem from "./addItem.component";
import { Box, ActionIcon, Tooltip } from "@mantine/core";
import { IconClearAll } from "@tabler/icons";

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
        display: prefix.toUpperCase() === "DONE" ? "flex" : "block",
        justifyContent: "space-between",
        textTransform: "uppercase",
        marginBottom: "20px",
      }}
    >
      <span>{prefix}</span>
      {prefix.toUpperCase() === "DONE" && (
        <span>
          <Tooltip label="Clear All">
            <ActionIcon>
              <IconClearAll size={18} />
            </ActionIcon>
          </Tooltip>
        </span>
      )}
    </div>
    <Droppable
      style={{ height: "100%", minHeight: "200px" }}
      droppableId={`${prefix}`}
    >
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.length === 0 && <h6>No items </h6>}
          {elements.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} />
          ))}
          {prefix.toUpperCase() === "TODO" && <AddItem />}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </Box>
);

export default DraggableElement;
