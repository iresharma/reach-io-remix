import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { StylesPlaceholder } from "@mantine/remix";
import { getSession } from "./session";
import { redirect } from "@remix-run/node";
import { SpotlightProvider } from "@mantine/spotlight";
import {
  IconHome,
  IconSearch,
  IconLayoutKanban,
  IconFolders,
  IconBrandEdge,
} from "@tabler/icons";

import styles from "~/styles/components/logo.css";

import NotFoundPage from "./error/404";
import ServerOverload from "./error/503";
import OtherError from "./error/other";

export const meta = () => ({
  charset: "utf-8",
  title: "Reach io",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  console.log(session.get("userId"));
  if (!session.has("userId")) {
    if (
      ["login", "register", "forgot-password"].includes(
        request.url.split("/").pop()
      )
    ) {
      return "hi";
    }
    return redirect("/login");
  }

  return session.get("userId");
};

const retComponent = (caught) => {
  console.log(caught)
  if (caught.status === 404) return <NotFoundPage error={caught} />;
  else if (caught.status === 503) return <ServerOverload error={caught} />;
  else return <OtherError error={caught} />;
};

export const CatchBoundary = () => {
  const caught = useCatch();
  return (
    <MantineProvider
      theme={{
        colorScheme: "light",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ColorSchemeProvider colorScheme="light">
        <StylesPlaceholder />
      </ColorSchemeProvider>
      {retComponent(caught)}
    </MantineProvider>
  );
};

export const ErrorBoundary = ({ error }) => {
  return (
    <MantineProvider
      theme={{
        colorScheme: "light",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ColorSchemeProvider>
        <StylesPlaceholder />
      </ColorSchemeProvider>
      {retComponent(error)}
    </MantineProvider>
  );
};

export default function App() {
  return (
    <MantineProvider
      theme={{
        colorScheme: "light",
        colors: {
          brand: [
            "#eff6ff",
            "#dbeafe",
            "#bfdbfe",
            "#93c5fd",
            "#60a5fa",
            "#3b82f6",
            "#2563eb",
            "#1d4ed8",
            "#1e40af",
            "#1e3a8a",
          ],
        },
        primaryColor: "brand",
        defaultRadius: "md",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ColorSchemeProvider>
        <NotificationsProvider>
          <SpotlightProvider
            shortcut={["mod + P", "mod + K", "/"]}
            actions={actions}
            searchIcon={<IconSearch />}
          >
            <html lang="en">
              <head>
                <StylesPlaceholder />
                <Meta />
                <Links />
              </head>
              <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
              </body>
            </html>
          </SpotlightProvider>
        </NotificationsProvider>
      </ColorSchemeProvider>
    </MantineProvider>
  );
}

const actions = [
  {
    title: "Home",
    description: "Get to home page",
    onTrigger: () => (window.location.pathname = "/"),
    icon: <IconHome size={18} />,
  },
  {
    title: "Board",
    description: "Access to your kanban board.",
    onTrigger: () => (window.location.pathname = "/board"),
    icon: <IconLayoutKanban size={18} />,
  },
  {
    title: "Storage",
    description: "Your remote storage",
    onTrigger: () => (window.location.pathname = "/storage"),
    icon: <IconFolders size={18} />,
  },
  {
    title: "Page",
    description: "Manage your starter page",
    onTrigger: () => console.log("Documentation"),
    icon: <IconBrandEdge size={18} />,
  },
];
