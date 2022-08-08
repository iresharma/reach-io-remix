import DashLayout from "../layouts/dash";
import { Outlet } from "@remix-run/react";

export default function AiToolsWrapper() {
  return (
    <DashLayout>
      <Outlet />
    </DashLayout>
  );
}
