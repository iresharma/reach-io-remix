import { createStyles, Title, Text, Button, Container } from "@mantine/core";
import { getSession, commitSession } from "../../session";
import { Form, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { initializePage } from "~/database/page.database.server";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.xl,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  let userData = session.get("account");
  const data = await initializePage(userData);
  session.set("account", data);
  await fetch("reach-page-server.vercel.app/api/revalidate",{
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ route: userData.account_name })
  })
  return redirect("/page", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function NewStoragePage() {
  const { classes } = useStyles();
  const action = useActionData();

  useEffect(() => {
    console.error("hi hi hi hi hi hi hi hi hi hi hi hi");
    if (action) {
      const { error } = action;
      if (error) {
        showNotification({
          title: "Error",
          message: error,
          color: "red",
        });
      }
    }
  }, [action]);

  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Everything you are.{" "}
          <Text component="span" className={classes.highlight} inherit>
            In one simple link.
          </Text>
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            share everything you create, curate and sell online. All from the
            one link in bio.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Form method="post">
            <Button type="submit" className={classes.control} size="lg">
              Start new
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}
