import { Box, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import ItemModal from "./itemModal.component";

export default function AddItem() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <>
      <ItemModal
        opened={opened}
        theme={theme}
        onClose={() => setOpened(false)}
      />
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
