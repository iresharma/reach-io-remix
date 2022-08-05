/* eslint-disable jsx-a11y/anchor-has-content */
import { Badge, Box, NavLink } from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconChevronRight,
  IconActivity,
  IconCircleOff,
} from "@tabler/icons";
export default function Menu() {
  return (
    <Box sx={{ width: { sm: 200, lg: 300 } }}>
      <NavLink label="Home" icon={<IconHome2 size={16} stroke={1.5} />} />
      <NavLink
        label="With right section"
        icon={<IconGauge size={16} stroke={1.5} />}
        rightSection={<IconChevronRight size={12} stroke={1.5} />}
      />
      <NavLink
        label="Disabled"
        icon={<IconCircleOff size={16} stroke={1.5} />}
        disabled
      />
      <NavLink
        label="With description"
        description="Additional information"
        icon={
          <Badge
            size="xs"
            variant="filled"
            color="red"
            sx={{ width: 16, height: 16, padding: 0 }}
          >
            3
          </Badge>
        }
      />
      <NavLink
        label="Active subtle"
        icon={<IconActivity size={16} stroke={1.5} />}
        rightSection={<IconChevronRight size={12} stroke={1.5} />}
        variant="subtle"
        active
      />
      <NavLink
        label="Active light"
        icon={<IconActivity size={16} stroke={1.5} />}
        rightSection={<IconChevronRight size={12} stroke={1.5} />}
        active
      />
      <NavLink
        label="Active filled"
        icon={<IconActivity size={16} stroke={1.5} />}
        rightSection={<IconChevronRight size={12} stroke={1.5} />}
        variant="filled"
        active
      />
    </Box>
  );
}
