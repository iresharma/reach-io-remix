import { redirect } from "@remix-run/node";
import { uploadFiles } from "../../services/storage.server";
import { getSession } from "../../session";

export const loader = () => {
  return redirect("/storage");
};

export const action = async ({ request }) => {
  switch (request.method) {
    case "POST":
      const session = await getSession(request.headers.get("Cookie"));
      const account = session.get("account");
      const { files } = await request.json();
      const links = await uploadFiles(account, files);
      return { links };
  }
};
