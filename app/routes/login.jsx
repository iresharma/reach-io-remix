import { signIn } from "../services/auth.server";
import Logo from "../components/logo.component";
import { Form, useActionData } from "@remix-run/react";
import {
  Paper,
  createStyles,
  TextInput,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import PasswordInput from "../components/passwordInput.component";
import { getSession, commitSession } from "../session";
import { redirect } from "@remix-run/node";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const validateEmail = (email) => {
  if (!email) {
    return "Email is Required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email address";
  }
};

const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }
};

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const formErrors = {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };
  if (Object.values(formErrors).some(Boolean)) return { formErrors };
  const auth = await signIn(formData.email, formData.password);
  if (auth === 404) {
    formErrors.email = "Email not found";
    return { formErrors };
  } else if (auth === "Invalid Credentials") {
    console.log(auth);
    formErrors.password = "Invalid Credentials";
    return { formErrors };
  } else {
    const session = await getSession(request.headers.get("Cookie"));
    session.set("userId", auth);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export default function AuthenticationImage() {
  const { classes } = useStyles();
  const actionData = useActionData();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome back to <Logo />
        </Title>
        <Form method="post">
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            name="email"
            error={actionData?.formErrors?.email}
          />
          <PasswordInput error={actionData?.formErrors?.password} />
          <Button type="submit" fullWidth mt="xl" size="md">
            Login
          </Button>
        </Form>

        <Text align="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor href="/register" weight={700}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
