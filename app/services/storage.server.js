import * as db from "../database/storage.database.server";
const { Storage } = require("@google-cloud/storage");

const st = new Storage({ keyFilename: "gcp-service-account-key.json" });

const createBucket = async (name) => {
  const bucketData = await st.createBucket(name);
  await st.bucket(name).setCorsConfiguration({
    "origin": ["*"],
    "method": ["GET", "POST", "DELETE", "PUT"],
    "maxAgeSeconds": 6789012345
  });
  return bucketData;
};

export const getStorageInfo = async ({ bucketId }) => {
  const bucket = await db.fetchBucket(bucketId);
  return bucket;
};

export const createNewStorageBucket = async (account) => {
  const bucketName = `customer-${account.id.toLowerCase().replace("@", "-")}`;
  const bucket = await createBucket(bucketName);
  const { user } = await db.createBucket(account.id, bucket[0].id);
  return user;
};

export const uploadFiles = async ({ bucketId }, files) => {
  const options = {
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: "application/octet-stream",
  };

  // Get a v4 signed URL for uploading file
  const promises = files.map((el) =>
    st
      .bucket(bucketId)
      .file(el)
      .getSignedUrl(options)
      .then(([url]) => url)
  );
  const links = await Promise.all(promises);
  return links;
};
