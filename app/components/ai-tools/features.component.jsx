import {
  createStyles,
  Text,
  SimpleGrid,
  Container,
  Indicator,
} from "@mantine/core";
import {
  IconHash,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBulb,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

function Feature({ icon: Icon, title, description, className, href, beta }) {
  const { classes, cx } = useStyles();

  const children = (
    <div className={cx(classes.feature, className)}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} stroke={1.5} />
        <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text color="dimmed" size="sm">
          {description}
        </Text>
      </div>
    </div>
  );
  return (
    <a href={href} style={{ textDecoration: "none" }}>
      {beta ? (
        <Indicator
          size={0}
          style={{ color: "red" }}
          inline
          label="beta"
          color="red"
        >
          {children}
        </Indicator>
      ) : (
        children
      )}
    </a>
  );
}

const mockdata = [
  {
    icon: IconHash,
    title: "HashTag Generator",
    href: "/ai-tools/hashtag",
    description:
      "Use artificial intelligence to generate hash tags for your posts",
  },
  {
    icon: IconBrandTwitter,
    title: "Tweet Sentiment Analysis",
    href: "/ai-tools/tweet-sentiment-analysis",
    description:
      "Provides sentiment analysis (positive or negative) feedback about a tweet(any text).",
  },
  {
    icon: IconBulb,
    title: "Idea brainstorming",
    href: "/ai-tools/idea-brainstorming",
    description: "Generates ideas based on topics and description.",
  },
  {
    icon: IconBulb,
    title: "Grammar Correction",
    href: "/ai-tools/idea-brainstorming",
    description: "Grammar corrects a paragraph or caption.",
  },
  {
    icon: IconBrandInstagram,
    title: "Instagram Caption generator",
    href: "/ai-tools/instagram-caption",
    description: "Generates basic instagram captions based on key inputs.",
    beta: true,
  },
];

export default function FeaturesAsymmetrical() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}
