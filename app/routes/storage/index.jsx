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
import { IconFolderPlus, IconError404 } from "@tabler/icons";
import DropZone from "../../components/storage/dropzone.component";
import { showNotification } from "@mantine/notifications";
import Axios from "axios";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const account = session.get("account");
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
  const data = useLoaderData();
  const form = useRef();

  const onHandleChange = async (acceptedFiles) => {
    if (!acceptedFiles) return;
    const files = acceptedFiles.map((el) => el.name);
    const resp = await fetch("/storage/handler", {
      method: "POST",
      body: JSON.stringify({ files }),
    });
    const data = await resp.json();
    console.log(data);
    data.links.forEach((amz, index) => {
      let form = new FormData();
      Object.entries(amz.fields).forEach(([field, value]) => {
        form.append(field, value);
      });
      form.append("key", acceptedFiles[index].name);
      form.append("file", acceptedFiles[index]);
      Axios.post(amz.url, form)
        .then(console.log)
        .catch((err) => {
          console.error(err);
          showNotification({
            color: "danger",
            icon: <IconError404 />,
            title: "Error uploading file",
            message: `Failed to upload ${acceptedFiles[index].name}`,
          });
        });
    });
  };

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
