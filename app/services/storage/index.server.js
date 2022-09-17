import * as s3 from "../aws/s3.aws.server";
import * as db from "../../database/storage.database.server";

const StorageRef = (function () {
  var client;

  return {
    getInstance: () => {
      if (!client) {
        client = s3.createClient();
      }
      return client;
    },
    initializeStorage: async (userAccount) => {
      const storageBucket = await s3
        .createBucket(StorageRef.getInstance(), userAccount)
        .catch(console.error);
      console.log(storageBucket);
      const { user } = await db.createBucket(
        userAccount.id,
        `reach-io-customer-${userAccount.id}-${userAccount.account_name}`
      );
      return user;
    },
    getStorageInfo: async ({ bucketId }) => {
      const bucket = await db.fetchBucket(bucketId);
      return bucket;
    },
    uploadFile: async ({ account, file, filename }) => {
      const bucketName = `reach-io-customer-${account.id}-${account.account_name}`;
      console.log(bucketName);
      const fileUploadOutput = await s3.uploadFile(
        StorageRef.getInstance(),
        bucketName,
        '/',
        file,
        filename
      );
      console.log(fileUploadOutput);
    },
  };
})();

export default StorageRef;
