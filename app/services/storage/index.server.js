import { createClient, createBucket } from "../aws/s3.aws.server";
import * as db from "../../database/storage.database.server";

const StorageRef = (function () {
  var client;

  return {
    getInstance: () => {
      if (!client) {
        client = createClient();
      }
      return client;
    },
    initializeStorage: async (userAccount) => {
      const storageBucket = await createBucket(
        StorageRef.getInstance(),
        userAccount
      ).catch(console.error);
      console.log(storageBucket);
      const { user } = await db.createBucket(
        userAccount.id,
        `reach-io-customer-${userAccount.id}-${userAccount.account_name}`
      );
      return user;
    },
  };
})();

export default StorageRef;
