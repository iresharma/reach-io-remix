import {
  createStyles,
  Text,
  Card,
  RingProgress,
  Group,
  ColorSwatch,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan(350)]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

export default function StatsRingCard({ title, used, total, stats }) {
  const { classes, theme } = useStyles();
  const items = stats.map((stat) => (
    <div style={{ display: "flex" }} key={stat.label}>
      <ColorSwatch color={stat.color} sx={{ transform: "scale(0.5)" }} />
      <div style={{ width: "80px" }}>
        <Text className={classes.label}>
          {stat.value > 1024 ? stat.value / 1024 : stat.value}{" "}
          <small>{stat.value > 1024 ? "GB" : "MB"}</small>
        </Text>
        <Text size="xs" color="dimmed">
          {stat.label}
        </Text>
      </div>
    </div>
  ));

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text size="xl" className={classes.label}>
            {title}
          </Text>
          <div style={{ display: "flex" }}>
            <div style={{ width: "110px" }}>
              <Text className={classes.lead} mt={30}>
                {used > 1024 ? used / 1024 : used}{" "}
                <small>{used > 1024 ? "GB" : "MB"}</small>
              </Text>
              <Text size="xs" color="dimmed">
                Used
              </Text>
            </div>
            <div style={{ marginLeft: "5px", width: "100px" }}>
              <Text className={classes.lead} mt={30}>
                15 <small>GB</small>
              </Text>
              <Text size="xs" color="dimmed">
                Total
              </Text>
            </div>
          </div>
          <Group mt="lg">{items}</Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={stats.map((stat) => ({
              value: (stat.value / total) * 100,
              color: stat.color,
            }))}
            label={
              <div>
                <Text
                  align="center"
                  size="lg"
                  className={classes.label}
                  sx={{ fontSize: 22 }}
                >
                  {((used / total) * 100).toFixed(0)}%
                </Text>
                <Text align="center" size="xs" color="dimmed">
                  Used
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}
