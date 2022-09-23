import { Draggable } from "react-beautiful-dnd";
import { Box, Badge, Avatar } from "@mantine/core";
import { timeSince } from "../../services/utils";

const ListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              cursor: "pointer",
              margin: theme.spacing.xs,

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
              },
            })}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ margin: 0 }}>{item.title}</h3>
              <h6 style={{ margin: 0, fontWeight: "normal" }}>
                {timeSince(new Date(Date.now()) - new Date(item["created_at"]))}
              </h6>
            </div>
            <h6 style={{ margin: 0, fontWeight: "normal" }}>
              {item.description}
            </h6>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1em",
              }}
            >
              <Badge color="green" size="sm" variant="filled">
                Light
              </Badge>

              <Badge
                sx={{ paddingLeft: 0 }}
                size="sm"
                radius="xl"
                color="teal"
                variant="outline"
                leftSection={
                  <Avatar
                    alt="Avatar for badge"
                    size={24}
                    mr={5}
                    src="https://avatars.dicebear.com/api/personas/hi.svg"
                  />
                }
              >
                Light
              </Badge>
            </div>
          </Box>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
