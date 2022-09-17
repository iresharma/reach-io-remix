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
import { StylesPlaceholder } from "@mantine/remix";
import { getSession } from "./session";
import { redirect } from "@remix-run/node";
import GlobalProgress from "./components/globalProgress.component";
import { SpotlightProvider } from "@mantine/spotlight";

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
      <ColorSchemeProvider>
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
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ColorSchemeProvider>
        <SpotlightProvider shortcut={["mod + P", "mod + K", "/"]} actions={[]}>
          <html lang="en">
            <head>
              <Meta />
              <Links />
              <StylesPlaceholder />
            </head>
            <body>
              <Outlet />
              <ScrollRestoration />
              <GlobalProgress />
              <Scripts />
              <LiveReload />
            </body>
          </html>
        </SpotlightProvider>
      </ColorSchemeProvider>
    </MantineProvider>
  );
}
