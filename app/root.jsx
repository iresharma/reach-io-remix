import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {
  MantineProvider,
} from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";

import styles from "~/styles/components/logo.css";

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
      crossOriginIsolated: true,
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export default function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <html lang="en">
        <head>
          <Meta />
          <Links />
          <StylesPlaceholder />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
