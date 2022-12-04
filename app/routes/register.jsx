import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Grid,
} from "@mantine/core";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import Logo from "../components/logo.component";
import { register } from "../services/auth.server";
import { getSession, commitSession } from "../session.js";
import PasswordStrengthInput from "../components/passwordStrengthInput.component";

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

const validateName = (name) => {
  if (!name) {
    return "Name is required";
  } else if (typeof name !== "string" || name.length < 3) {
    return `Name must be at least 3 characters long`;
  }
};

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
  } else if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "Confirm Password is required";
  } else if (password !== confirmPassword) {
    return "Password does not match";
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const formErrors = {
    fname: validateName(data.fname),
    lname: validateName(data.lname),
    email: validateEmail(data.email),
    password: validatePassword(data.password),
    confirmPassword: validateConfirmPassword(
      data.password,
      data["confirm-password"]
    ),
  };

  if (Object.values(formErrors).some(Boolean)) return { formErrors };
  try {
    const userId = await register(...Object.values(data));
    const session = await getSession(request.headers.get("Cookie"));
    session.set("userId", userId);
    return redirect("/register/ua", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (err) {
    if (err === 400) {
      formErrors["email"] = "Email id already registered.";
      return { formErrors };
    }
    return "hi";
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
          Welcome to <Logo />
        </Title>

        <Form method="post">
          <Grid>
            <Grid.Col xs={6}>
              <TextInput
                label="First Name"
                placeholder="Iresh"
                size="md"
                name="fname"
                error={actionData?.formErrors?.fname}
              />
            </Grid.Col>
            <Grid.Col xs={6}>
              <TextInput
                label="Last Name"
                placeholder="Sharma"
                size="md"
                name="lname"
                error={actionData?.formErrors?.lname}
              />
            </Grid.Col>
          </Grid>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            name="email"
            error={actionData?.formErrors?.email}
          />
          <PasswordStrengthInput error={actionData?.formErrors?.password} />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            mt="md"
            size="md"
            name="confirm-password"
            error={actionData?.formErrors?.confirmPassword}
          />
          <Checkbox
            label="I agree that I have accepted the terms and conditions and the privacy policy"
            mt="xl"
            size="xs"
          />
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
            type="submit"
            fullWidth
            mt="xl"
            size="md"
          >
            Register
          </Button>
          <small>Step 1 of 2</small>
        </Form>

        <Text align="center" mt="md">
          Already have an account?{" "}
          <Anchor href="/login" weight={700}>
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
