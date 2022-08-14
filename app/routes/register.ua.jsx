import { useState } from "react";
import {
  SegmentedControl,
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Avatar,
} from "@mantine/core";
import instaLogo from "../assets/images/instagram.png";
import youtubeLogo from "../assets/images/youtube.png";
import twitch from "../assets/images/twitch.png";
import {
  getUserById,
  createUserAccount,
} from "../database/auth.database.server";
import { getSession, commitSession } from "../session";
import { useLoaderData, Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  try {
    return await getUserById(userId);
  } catch (err) {
    return redirect("/login");
  }
};

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  let user = null;
  try {
    user = await getUserById(userId);
  } catch (err) {
    return redirect("/login");
  }
  const formData = await request.formData();
  const links = {
    instagram: formData.get("instagram"),
    twitch: formData.get("twitch"),
    youtube: formData.get("youtube"),
  };
  console.log(user);
  try {
    const accountData = await createUserAccount(
      formData.get("account_name"),
      links,
      user
    );
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession("account", accountData),
      },
    });
  } catch (err) {
    console.log(err);
    return "error";
  }
};

function UserInfoAction({ name, email, seed }) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      m="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar
        src={`https://avatars.dicebear.com/api/micah/${seed}.svg`}
        size={120}
        radius={120}
        mx="auto"
      />
      <Text align="center" size="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {email}
      </Text>

      <Button
        component="a"
        href="/profile/edit"
        variant="default"
        fullWidth
        mt="md"
      >
        Edit Profile
      </Button>
    </Paper>
  );
}

function JoinExistingAccount() {
  const { classes } = useStyles();

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Trying to join an account?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter the joining code provided by the owner
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Joining Code"
          placeholder="34nui4529375bj45n"
          required
        />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
            className={classes.control}
          >
            Join Account
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}

const CreateAccount = () => {
  const { classes } = useStyles();
  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Create a new account
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter the following information
      </Text>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Form method="post">
          <TextInput
            label="Account Name"
            name="account_name"
            placeholder="@iresharma"
            required
          />
          <Title
            className={classes.title}
            style={{ fontSize: "1em", marginTop: "1em" }}
          >
            Social Links
          </Title>
          <Text color="dimmed" size="xs" align="center">
            Only below mentioned platforms are supported,
            <br /> each of the platform has extra setup steps
          </Text>

          <TextInput
            rightSection={
              <img
                style={{ height: "30px" }}
                src={instaLogo}
                alt="brand logo"
              />
            }
            label="Instagram"
            placeholder="@iresharma"
            required
            name="instagram"
          />
          <TextInput
            rightSection={
              <img
                style={{ height: "30px" }}
                src={youtubeLogo}
                alt="brand logo"
              />
            }
            label="Youtube"
            placeholder="@iresharma"
            required
            name="youtube"
          />
          <TextInput
            rightSection={
              <img style={{ height: "30px" }} src={twitch} alt="brand logo" />
            }
            label="Twitch"
            placeholder="@iresharma"
            required
            name="twitch"
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              className={classes.control}
            >
              Create Account
            </Button>
          </Group>
        </Form>
      </Paper>
    </Container>
  );
};

export default function RegisterUserAccount() {
  const [value, setValue] = useState("create");
  const userData = useLoaderData();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "40px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SegmentedControl
        value={value}
        onChange={setValue}
        data={[
          { label: "Create", value: "create" },
          { label: "Join", value: "join" },
        ]}
        style={{ width: "300px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <UserInfoAction
          seed={userData.id}
          email={userData.email}
          name={userData.name}
        />

        {value === "create" ? (
          <div>
            <CreateAccount />
          </div>
        ) : (
          <div>
            <JoinExistingAccount />
          </div>
        )}
      </div>
    </div>
  );
}
