import { Button } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons"

export function PageToolbar({ updateActive, active }) {
  return (
    <nav className="page-toolBar">
      <div className="left">
        <Button
          variant="subtle"
          size="sm"
          color={active === 0 ? "brand" : "gray"}
          onClick={() => updateActive(0)}
        >
          Links
        </Button>
        <Button
          variant="subtle"
          size="sm"
          color={active === 1 ? "brand" : "gray"}
          onClick={() => updateActive(1)}
        >
          Design
        </Button>
      </div>

      <div className="right">
        <Button variant="subtle" size="sm" color="gray">
          Visit <IconExternalLink size={12} />
        </Button>
      </div>
    </nav>
  );
}
