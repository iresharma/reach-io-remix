import { redirect } from "@remix-run/node";
import { getSession } from "../../session";
import DashLayout from "../../layouts/dash";
import { Dropzone } from "@mantine/dropzone";
import { useState } from "react";
import StatsRingCard from "../../components/storage/stats.component";
import { useMantineTheme, Anchor, Breadcrumbs } from "@mantine/core";
import StorageRef from "../../services/storage/index.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const account = session.get("account");
  console.log(account);
  if (!account.bucketId && request.url.split("/").pop() !== "new") {
    return redirect("/storage/new");
  }
  return StorageRef.getStorageInfo(account);
};

const items = [
  { title: "Mantine", href: "#" },
  { title: "Mantine hooks", href: "#" },
  { title: "use-id", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default function StoragePage() {
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();
  const data = useLoaderData();
  return (
    <DashLayout>
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <StatsRingCard
        title="Storage Stats"
        used={945}
        total={15 * 1024}
        stats={[
          {
            label: "Photos",
            value: 245,
            color: theme.colors.red[6],
          },
          {
            label: "Documents",
            value: 17,
            color: theme.colors.yellow[6],
          },
          {
            label: "Videos",
            value: 34,
            color: theme.colors.blue[6],
          },
          {
            label: "Project Files",
            value: 150,
            color: theme.colors.green[6],
          },
          {
            label: "Presentations",
            value: 34,
            color: theme.colors.pink[6],
          },
          {
            label: "SpreadSheets",
            value: 78,
            color: theme.colors.grape[6],
          },
          {
            label: "photos",
            value: 123,
            color: theme.colors.teal[6],
          },
        ]}
      />

      <Breadcrumbs style={{ margin: "15px" }}>{items}</Breadcrumbs>
      <Dropzone
        loading={loading}
        onDrop={() => setLoading(!loading)}
        sx={(theme) => ({
          minHeight: "70vh",
          height: "100%",
          border: 0,
          backgroundColor: "transparent",

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
          },

          "&[data-accept]": {
            border: `2px dashed ${theme.colors.blue[9]}`,
          },

          "&[data-reject]": {
            color: theme.white,
            backgroundColor: theme.colors.red[6],
          },
        })}
      >
        hi
      </Dropzone>
    </DashLayout>
  );
}
