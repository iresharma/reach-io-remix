/* eslint-disable jsx-a11y/anchor-has-content */
import { Badge, Box, NavLink } from "@mantine/core";
import {
  IconHome2,
  IconFolders,
  IconAt,
  IconBrandEdge,
  IconAlien,
  IconFlame,
} from "@tabler/icons";
import { useLocation } from "@remix-run/react";
export default function Menu() {
  const location = useLocation().pathname.split("/");
  console.log(location);
  return (
    <Box sx={{ width: { sm: 200, lg: 300 } }}>
      <NavLink
        component="a"
        href="/"
        label="Home"
        icon={<IconHome2 size={16} stroke={1.5} />}
        active={location.every((val) => val === "")}
      />
      <NavLink
        component="a"
        href="/storage"
        label="Storage"
        icon={<IconFolders size={16} stroke={1.5} />}
        active={location.includes("storage")}
      />
      <NavLink
        component="a"
        href="/page"
        label="Page"
        icon={<IconBrandEdge size={16} stroke={1.5} />}
        active={location.includes("page")}
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
        component="a"
        href="/mails"
        active={location.includes("mails")}
      />
      <NavLink
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
