import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons";
import insta from "../../assets/images/instagram.png";
import youtube from "../../assets/images/youtube.png";
import twitch from "../../assets/images/twitch.png";

const useStyles = createStyles((theme) => ({
  root: {},

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  instagram: {
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    "-webkit-background-clip": "text",
    /* Also define standard property for compatibility */
    "background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  youtube: {
    color: "#FF0000",
  },
  twitch: {
    color: "#6441a5",
  },
}));

export default function StatsGridIcons({ data }) {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper
        withBorder
        shadow="lg"
        p="md"
        radius="md"
        key={stat.title}
        sx={(theme) => ({
          boxShadow: theme.shadows.md,
        })}
      >
        <Group position="apart">
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ height: "20px", marginRight: "5px" }}
                src={
                  stat.title === "Instagram"
                    ? insta
                    : stat.title === "Twitch"
                    ? twitch
                    : youtube
                }
                alt="brand logo"
              />
              <Text
                color="dimmed"
                transform="uppercase"
                weight={700}
                size="xs"
                className={
                  stat.title === "Instagram"
                    ? classes.instagram
                    : stat.title === "Twitch"
                    ? classes.twitch
                    : classes.youtube
                }
              >
                {stat.title}
              </Text>
            </div>
            <Text weight={700} size="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={stat.diff > 0 ? "teal" : "red"}
            weight={700}
          >
            {stat.diff}%
          </Text>{" "}
          {stat.diff > 0 ? "increase" : "decrease"} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
}
