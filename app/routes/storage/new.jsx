import DashLayout from "../../layouts/dash";
import { createStyles, Title, Text, Button, Container } from "@mantine/core";
import DriveIcon from "../../assets/images/google-drive.png";
import DropBoxIcon from "../../assets/images/dropbox.png";
import OnDriveIcon from "../../assets/images/onedrive.png";
import Storage from "../../services/storage/index.server";
import { getSession, commitSession } from "../../session";
import { Form, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";

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
  userData = await Storage.initializeStorage(userData);
  console.log(userData);
  if (!userData) {
    return {
      error: "Failed to create bucket",
    };
  }
  session.set("account", userData);
  return redirect("/storage", {
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
    <DashLayout>
      <Container className={classes.wrapper} size={1400}>
        <div className={classes.inner}>
          <Title className={classes.title}>
            Fully managed, secure and{" "}
            <Text component="span" className={classes.highlight} inherit>
              Unlimited
            </Text>{" "}
            cloud storage for your use.
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" color="dimmed" className={classes.description}>
              No more worry about storage, no more multi hard drive setup. Now
              you get your whole fully managed cloud storage sever.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Form method="post" action="/storage/import">
              <Button
                className={classes.control}
                size="lg"
                variant="default"
                color="gray"
              >
                Import from &nbsp;&nbsp;
                <img
                  style={{
                    width: "25px",
                    height: "25px",
                    margin: "5px",
                  }}
                  src={DriveIcon}
                  alt="google-drive"
                />
                <img
                  style={{
                    width: "25px",
                    height: "25px",
                    margin: "5px",
                  }}
                  src={DropBoxIcon}
                  alt="DropBox"
                />
                <img
                  style={{
                    width: "25px",
                    height: "25px",
                    margin: "5px",
                  }}
                  src={OnDriveIcon}
                  alt="Onedrive"
                />
              </Button>
            </Form>
            <Form method="post">
              <Button type="submit" className={classes.control} size="lg">
                Start new
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </DashLayout>
  );
}
