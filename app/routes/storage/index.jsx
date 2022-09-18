import {
  redirect,
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
} from "@remix-run/node";
import { getSession } from "../../session";
import DashLayout from "../../layouts/dash";
import { useState, useRef } from "react";
import StatsRingCard from "../../components/storage/stats.component";
import { Anchor, Breadcrumbs, Button } from "@mantine/core";
import StorageRef from "../../services/storage/index.server";
import { Form, useLoaderData } from "@remix-run/react";
import { IconFolderPlus, IconUpload } from "@tabler/icons";
import DropZone from "../../components/storage/dropzone.component";

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
  const { files } = await request.json();
  console.log(files);
  StorageRef.uploadFile({ account, files });
  return {};
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

const onHandleChange = (acceptedFiles) => {
  if (!acceptedFiles) return;
  const files = acceptedFiles.map((el) => el.name);
  console.log(files);
  fetch("/storage?index", {
    method: "POST",
    body: JSON.stringify({ files }),
  });
};

export default function StoragePage() {
  const data = useLoaderData();
  const form = useRef();
  return (
    <DashLayout>
      <StatsRingCard title="Storage Stats" />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Breadcrumbs style={{ margin: "15px" }}>{items}</Breadcrumbs>
        <Button style={{ margin: "15px" }}>
          {" "}
          <IconFolderPlus style={{ marginRight: "10px" }} /> Add Folder
        </Button>
      </div>
      <Form ref={form} method="post" encType="multipart/form-data">
        <DropZone onHandleChange={onHandleChange} />
      </Form>
    </DashLayout>
  );
}
