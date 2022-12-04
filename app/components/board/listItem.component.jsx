import { Draggable } from "react-beautiful-dnd";
import { Box, Badge, Avatar, ActionIcon, Tooltip } from "@mantine/core";
import { timeSince } from "../../services/utils";
import {
  IconDotsVertical,
  IconFile,
  IconFolderX,
  IconLink,
} from "@tabler/icons";

const ListItem = ({ item, index, onClick }) => {
  return (
    <>
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
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6 style={{ margin: 0, fontWeight: "normal" }}>
                    {timeSince(Date.now(), item["created_at"])}
                  </h6>
                  <ActionIcon
                    sx={(theme) => ({
                      color: theme.colors.brand[5],
                    })}
                    onClick={onClick}
                  >
                    <IconDotsVertical size={15} />
                  </ActionIcon>
                </span>
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Badge color="green" size="sm" variant="filled">
                    Light
                  </Badge>
                  {item.script !== "" && (
                    <Tooltip label="link to script">
                      <ActionIcon
                        onClick={() => window.open(item.script, "_blank")}
                        color="primary"
                      >
                        <IconFile size={20} />
                      </ActionIcon>
                    </Tooltip>
                  )}
                  {item.storage !== "" && (
                    <Tooltip label="link to media in storage">
                      <ActionIcon
                        onClick={() => window.open(item.storage, "_blank")}
                        color="primary"
                      >
                        <IconFolderX size={20} />
                      </ActionIcon>
                    </Tooltip>
                  )}
                  {item.reference !== "" && (
                    <Tooltip label="link to reference">
                      <ActionIcon
                        onClick={() => window.open(item.reference, "_blank")}
                        color="primary"
                      >
                        <IconLink size={20} />
                      </ActionIcon>
                    </Tooltip>
                  )}
                </div>

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
    </>
  );
};

export default ListItem;
