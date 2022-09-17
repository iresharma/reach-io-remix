import {
  redirect,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { getSession } from "../../session";
import DashLayout from "../../layouts/dash";
import { Dropzone } from "@mantine/dropzone";
import { useState, useRef } from "react";
import StatsRingCard from "../../components/storage/stats.component";
import { Anchor, Breadcrumbs, Button } from "@mantine/core";
import StorageRef from "../../services/storage/index.server";
import { Form, useLoaderData } from "@remix-run/react";
import { IconFolderPlus, IconUpload } from "@tabler/icons";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const account = session.get("account");
  if (!account.bucketId && request.url.split("/").pop() !== "new") {
    return redirect("/storage/new");
  }
  return StorageRef.getStorageInfo(account);
};

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const account = session.get("account");
  switch (request.method) {
    case "POST":
      const formData = await unstable_parseMultipartFormData(
        request,
        unstable_composeUploadHandlers(async ({ data, filename }) => {
          StorageRef.uploadFile({ account, data, filename });
        }, unstable_createMemoryUploadHandler()) // <-- we'll look at this deeper next
      );
      return "hi";
    default:
      break;
  }
  return "hi";
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

const sx = (theme) => ({
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
});

export default function StoragePage() {
  const data = useLoaderData();
  const form = useRef();
  return (
    <DashLayout>
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <StatsRingCard title="Storage Stats" />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Breadcrumbs style={{ margin: "15px" }}>{items}</Breadcrumbs>
        <Button style={{ margin: "15px" }}>
          {" "}
          <IconFolderPlus style={{ marginRight: "10px" }} /> Add Folder
        </Button>
      </div>
      <Form ref={form} method="post" encType="multipart/form-data">
        <Dropzone sx={sx} name="files" onDrop={() => form.current.submit()}>
          <Dropzone.Accept>
            <IconUpload size={50} stroke={1.5} />
          </Dropzone.Accept>
        </Dropzone>
      </Form>
    </DashLayout>
  );
}
