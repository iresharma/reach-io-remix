import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  createStyles,
  Menu,
  Text,
  Avatar,
  UnstyledButton,
  Group,
  TextInput,
  Kbd,
  Box,
} from "@mantine/core";
import {
  IconLogout,
  IconStar,
  IconSettings,
  IconPlayerPause,
  IconSwitchHorizontal,
  IconChevronDown,
  IconBrandEdge,
  IconSearch,
} from "@tabler/icons";
import Logo from "../components/logo.component";
import NavMenu from "../components/menu.component";
import Footer from "../components/footer.component";
import { openSpotlight } from "@mantine/spotlight";

import { useState } from "react";

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

export default function Home({ children }) {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const user = {
    name: "Iresh Sharma",
    image: "",
  };
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
          sx={(theme) => ({
            background: theme.colors.brand[4],
            borderColor: theme.colors.brand[9],
          })}
        >
          <NavMenu />
        </Navbar>
      }
      header={
        <Header
          height={70}
          p="md"
          sx={(theme) => ({
            background: theme.colors.brand[4],
            borderColor: theme.colors.brand[9],
          })}
        >
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Logo />
              <MediaQuery largerThan="lg" styles={{ display: "none" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TextInput
                    sx={(theme) => ({
                      backgroundColor: theme.colors.brand[2],
                      borderRadius: theme.radius.md,
                      ".mantine-Input-wrapper": {
                        width: "30ch",
                      },
                      "input[type=text]": {
                        backgroundColor: theme.colors.brand[2],
                      },
                      ".mantine-TextInput-rightSection": {
                        width: "7ch",
                        paddingRight: "1ch",
                      },
                    })}
                    placeholder="Search"
                    icon={<IconSearch size={14} />}
                    onClick={openSpotlight}
                    onChange={openSpotlight}
                    rightSection={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Kbd>⌘ + K</Kbd>
                      </div>
                    }
                  />
                  <Menu
                    width={260}
                    position="bottom-end"
                    transition="pop-top-right"
                    onClose={() => setUserMenuOpened(false)}
                    onOpen={() => setUserMenuOpened(true)}
                    sx={theme => ({marginLeft: theme.spacing.md})}
                  >
                    <Menu.Target>
                      <UnstyledButton
                        className={cx(classes.user, {
                          [classes.userActive]: userMenuOpened,
                        })}
                      >
                        <Group spacing={7}>
                          <Avatar
                            src={user.image}
                            alt={user.name}
                            radius="xl"
                            size={20}
                            color="brand"
                          />
                          <Text
                            weight={500}
                            size="sm"
                            sx={theme => ({ lineHeight: 1, color: theme.colors.brand[9] })}
                            mr={3}
                          >
                            {user.name}
                          </Text>
                          <IconChevronDown size={12} stroke={1.5} />
                        </Group>
                      </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        icon={
                          <IconBrandEdge
                            size={14}
                            stroke={1.5}
                            color={theme.colors.red[6]}
                          />
                        }
                      >
                        Go to page
                      </Menu.Item>
                      <Menu.Item
                        icon={
                          <IconStar
                            size={14}
                            stroke={1.5}
                            color={theme.colors.yellow[6]}
                          />
                        }
                      >
                        Stared Storage
                      </Menu.Item>

                      <Menu.Label>Settings</Menu.Label>
                      <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
                        Account settings
                      </Menu.Item>

                      <Menu.Item
                        icon={<IconPlayerPause size={14} stroke={1.5} />}
                      >
                        Pause subscription
                      </Menu.Item>
                      <Menu.Item
                        icon={<IconSwitchHorizontal size={14} stroke={1.5} />}
                      >
                        Change account
                      </Menu.Item>
                      <Menu.Item
                        component="a"
                        href="/logout"
                        icon={<IconLogout size={14} stroke={1.5} />}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              </MediaQuery>
            </div>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <span>
                <IconSearch size={16} />
                <Kbd>⌘</Kbd> <Kbd>K</Kbd>
              </span>
            </MediaQuery>
          </div>
        </Header>
      }
      footer={<Footer />}
    >
      <Box
        sx={(theme) => ({ backgroundColor: theme.colors.brand[1], margin: '0', padding: theme.spacing.sm })}
        style={{ overflow: "scroll" }}
      >
        {children}
      </Box>
    </AppShell>
  );
}
