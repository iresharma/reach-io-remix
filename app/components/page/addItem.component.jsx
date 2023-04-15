import {Card, Group} from "@mantine/core";
import {IconApps, IconRowInsertTop} from "@tabler/icons";

const AddItem = ({ addLink, addWidget }) => (
    <Group position="apart" mt="xs" mb="xs" align="center">
        <Card
            onClick={addLink}
            shadow="sm"
            radius="sm"
            mt={10}
            withBorder
            sx={(theme) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "gray",
                cursor: "pointer",
                width: "48%",
                transition: "all 100ms linear",
                "&:hover": {
                    borderColor: theme.colors.blue[9],
                    color: theme.colors.blue[9],
                    fontWeight: "bold",
                },
            })}
        >
            <IconRowInsertTop />
            &nbsp; Add Link
        </Card>
        <Card
            onClick={addWidget}
            shadow="sm"
            radius="sm"
            mt={10}
            withBorder
            sx={(theme) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "gray",
                cursor: "pointer",
                width: "48%",
                transition: "all 100ms linear",
                "&:hover": {
                    borderColor: theme.colors.blue[9],
                    color: theme.colors.blue[9],
                    fontWeight: "bold",
                },
            })}
        >
            <IconApps />
            &nbsp; Add Widget
        </Card>
    </Group>
);

export default AddItem;
