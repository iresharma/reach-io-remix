import { redirect } from "@remix-run/node";
import { getSession } from "../../session";
import DashLayout from "../../layouts/dash";
import { useState, useRef } from "react";
import StatsRingCard from "../../components/storage/stats.component";
import { Anchor, Breadcrumbs, Button } from "@mantine/core";
import { getStorageInfo } from "../../services/storage.server";
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
  return await getStorageInfo(account);
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
    if (!acceptedFiles || acceptedFiles.length == 0) return;
    const files = acceptedFiles.map((el) => el.name);
    const resp = await fetch("/storage/handler", {
      method: "POST",
      body: JSON.stringify({ files }),
    });
    const data = await resp.json();
    data.links.forEach((gcp, index) => {
      let form = new FormData();
      form.append("key", acceptedFiles[index].name);
      form.append("file", acceptedFiles[index]);
      Axios.request({
        method: "PUT",
        url: gcp,
        data: form,
        headers: {
          "Content-Type": "application/octet-stream",
        },
        onUploadProgress: (p) => {},
      })
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
      <pre>{JSON.stringify(data, null, 4)}</pre>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Breadcrumbs style={{ margin: "15px" }}>{items}</Breadcrumbs>
        <Button style={{ margin: "15px" }}>
          {" "}
          <IconFolderPlus style={{ marginRight: "10px" }} /> Add Folder
        </Button>
      </div>
      <div>
      </div>
      <Form ref={form} method="post" encType="multipart/form-data">
        <DropZone onHandleChange={onHandleChange} />
      </Form>
    </DashLayout>
  );
}
