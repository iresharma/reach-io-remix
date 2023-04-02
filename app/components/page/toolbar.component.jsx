import { Button } from "@mantine/core";
import { useState } from "react";

export function PageToolbar() {
  const [active, setActive] = useState(0);
  return (
    <nav className="page-toolBar">
      <div className="left">
        <Button
          variant="subtle"
          size="sm"
          color={active === 0 ? "brand" : "gray"}
        >
          Preview
        </Button>
        <Button
          variant="subtle"
          size="sm"
          color={active === 1 ? "brand" : "gray"}
        >
          Links
        </Button>
        <Button
          variant="subtle"
          size="sm"
          color={active === 2 ? "brand" : "gray"}
        >
          Design
        </Button>
      </div>

      <div className="right">
        <Button variant="subtle" size="sm" color="gray">
          Visit
        </Button>
      </div>
    </nav>
  );
}
