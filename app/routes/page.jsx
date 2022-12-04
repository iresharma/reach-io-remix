import { Outlet } from "@remix-run/react";
import DashLayout from "../layouts/dash";

export default function PageIndex() {
  return (
    <DashLayout>
      <Outlet />
    </DashLayout>
  );
}
