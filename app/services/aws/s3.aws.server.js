import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
const REGION = "ap-south-1"; //Mumbai

export const createClient = () => new S3Client({ region: REGION });

export const createBucket = async (client, { account_name, id }) => {
  const bucketName = `reach-io-customer-${id}-${account_name}`;
  return new Promise((resolve, reject) => {
    client
      .send(new CreateBucketCommand({ Bucket: bucketName }))
      .then(resolve)
      .catch(reject);
  });
};
