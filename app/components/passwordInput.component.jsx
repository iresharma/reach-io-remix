import { PasswordInput, Text, Group, Anchor } from "@mantine/core";

export default function ForgotPasswordInput({ className, style, error }) {
  return (
    <div className={className} style={style}>
      <Group position="apart" mb={5}>
        <Text component="label" htmlFor="your-password" size="sm" weight={500}>
          Your password
        </Text>

        <Anchor
          href="/forgot-password"
          sx={(theme) => ({
            paddingTop: 2,
            color:
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ],
            fontWeight: 500,
            fontSize: theme.fontSizes.xs,
          })}
        >
          Forgot your password?
        </Anchor>
      </Group>
      <PasswordInput
        name="password"
        placeholder="Your password"
        id="your-password"
        error={error}
      />
    </div>
  );
}
