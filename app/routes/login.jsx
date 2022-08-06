import { TextInput, Button } from "@mantine/core";
import { redirect } from "@remix-run/node";
import { IconAt } from "@tabler/icons";
import { Form } from "@remix-run/react";
import { signIn } from "../services/auth.server";

export const action = async ({ request }) => {
  return new Promise((resolve, reject) => {
    request.formData().then((data) => {
      signIn(data.get("email"), data.get("password")); //email is required
      resolve("hi");
    });
  });
};

export default function Login() {
  return (
    <>
      <Form method="post">
        <TextInput
          icon={<IconAt />}
          variant="filled"
          placeholder="Your email"
          radius="md"
          name="email"
        />
        <input type="text" name="password" />
        <Button type="submit" color="green" radius="md" size="lg">
          Login
        </Button>
      </Form>
    </>
  );
}
