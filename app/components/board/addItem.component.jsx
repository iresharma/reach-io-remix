import {
  Box,
  Modal,
  TextInput,
  Textarea,
  Text,
  Select,
  Badge,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { Form } from "@remix-run/react";

const PriorityChip = ({ label }) => (
  <Badge
    m={12}
    color={
      label.toLowerCase() === "light"
        ? "green"
        : label.toLowerCase() === "mid"
        ? "yellow"
        : "red"
    }
    size="md"
    variant="light"
  >
    {label}
  </Badge>
);

export default function AddItem() {
  const data = [
    { label: "Light", value: "light" },
    { label: "Mid", value: "mid" },
    { label: "High", value: "high" },
  ];
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Item"
        centered
        size="xl"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Form method="post">
          <TextInput name="title" placeholder="Item title" variant="filled" />
          <br />
          <Textarea
            name="description"
            placeholder="Some info about the task"
            variant="filled"
          />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Select
              label="Priority"
              searchable
              clearable
              data={data}
              itemComponent={PriorityChip}
              sx={{ width: "120px" }}
              name="priority"
            />
            <Select label="Assign" searchable clearable data={data} />
          </div>
          <br />
          <table
            style={{
              width: "100%",
              border: `1px solid ${theme.colors.brand[1]}`,
              borderSpacing: 0,
            }}
          >
            <tr style={{ border: `1px solid ${theme.colors.brand[1]}` }}>
              <td
                style={{ border: `1px solid ${theme.colors.brand[1]}` }}
                colSpan={1}
              >
                <Text size="xs" color="blue">
                  Script Link
                </Text>
              </td>
              <td
                style={{ border: `1px solid ${theme.colors.brand[1]}` }}
                colSpan={3}
              >
                <TextInput
                  name="script"
                  placeholder="Script link"
                  variant="unstyled"
                />
              </td>
            </tr>
            <tr style={{ border: `1px solid ${theme.colors.brand[1]}` }}>
              <td
                style={{ border: `1px solid ${theme.colors.brand[1]}` }}
                colSpan={1}
              >
                <Text size="xs" color="blue">
                  Reference Link
                </Text>
              </td>
              <td
                style={{ border: `1px solid ${theme.colors.brand[1]}` }}
                colSpan={3}
              >
                <TextInput
                  name="reference"
                  placeholder="Reference link"
                  variant="unstyled"
                />
              </td>
            </tr>
            <tr style={{ border: `1px solid ${theme.colors.brand[1]}` }}>
              <td
                style={{ border: `1px solid ${theme.colors.brand[1]}` }}
                colSpan={1}
              >
                <Text size="xs" color="blue">
                  Storage Link
                </Text>
              </td>
              <td
                style={{ border: `1px solid ${theme.colors.brand[1]}` }}
                colSpan={3}
              >
                <TextInput
                  name="storage"
                  placeholder="Storage link"
                  variant="unstyled"
                />
              </td>
            </tr>
          </table>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button radius="md" uppercase type="submit">
              Add
            </Button>
          </div>
        </Form>
      </Modal>
      <Box
        onClick={() => setOpened(true)}
        sx={(theme) => ({
          "&:hover": {
            backgroundColor: theme.colors.brand[2],
          },
          padding: theme.spacing.sm,
        })}
      >
        <h6>+ Add Item</h6>
      </Box>
    </>
  );
}
