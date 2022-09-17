/* eslint-disable jsx-a11y/anchor-has-content */
import { Badge, Box, NavLink } from "@mantine/core";
import {
  IconHome2,
  IconFolders,
  IconAt,
  IconBrandEdge,
  IconAlien,
  IconFlame,
  IconCalendar,
  IconBrandShopee,
} from "@tabler/icons";
import { useLocation } from "@remix-run/react";

const sx = (theme) => ({
  "&:hover": {
    backgroundColor: theme.colors.brand[9],
    color: "white",
    ".mantine-NavLink-description": {
      color: "white",
    },
  },
  ".mantine-NavLink-description": {
    color: theme.colors.brand[8],
  },
  borderRadius: theme.radius.md,
  margin: '5px 0'
});

export default function Menu() {
  const location = useLocation().pathname.split("/");
  console.log(location);
  return (
    <Box sx={{ width: { sm: 200, lg: 300 } }}>
      <NavLink
        sx={sx}
        component="a"
        href="/"
        label="Home"
        icon={<IconHome2 size={16} stroke={1.5} />}
        active={location.every((val) => val === "")}
      />
      <NavLink
        sx={sx}
        component="a"
        href="/storage"
        label="Storage"
        icon={<IconFolders size={16} stroke={1.5} />}
        active={location.includes("storage")}
      />
      <NavLink
        sx={sx}
        component="a"
        href="/page"
        label="Page"
        icon={<IconBrandEdge size={16} stroke={1.5} />}
        active={location.includes("page")}
      />
      <NavLink
        sx={sx}
        component="a"
        href="/calendar"
        label="Calendar"
        icon={<IconCalendar size={16} stroke={1.5} />}
        active={location.includes("calendar")}
      />
      <NavLink
        label="Mails"
        description="These are taken from a custom list in your email"
        icon={
          Math.floor(Math.random() * 10) % 2 == 0 ? (
            <IconAt size={16} stroke={1.5} />
          ) : (
            <Badge
              size="xs"
              variant="filled"
              color="red"
              sx={{ width: 16, height: 16, padding: 0 }}
            >
              3
            </Badge>
          )
        }
        sx={sx}
        component="a"
        href="/mails"
        active={location.includes("mails")}
      />
      <NavLink
        sx={sx}
        component="a"
        href="/store"
        label="Store"
        icon={<IconBrandShopee size={16} stroke={1.5} />}
        active={location.includes("store")}
      />
      <NavLink
        sx={sx}
        component="a"
        href="/ai-tools"
        active={location.includes("ai-tools")}
        label="AI Tools"
        icon={<IconAlien size={16} stroke={1.5} />}
        rightSection={
          <Badge
            color="red"
            size="sm"
            variant="outline"
            leftSection={<IconFlame size={10} stroke={2.5} color="red" />}
          >
            Hot New
          </Badge>
        }
      />
    </Box>
  );
}
