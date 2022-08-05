import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { Outlet } from "@remix-run/react";
import Logo from "../components/logo.component";
import Menu from "../components/menu.component";

import { useState } from "react";

export default function Home({ children }) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Menu />
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Logo />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
