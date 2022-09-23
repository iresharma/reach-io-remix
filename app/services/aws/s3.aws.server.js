import AWS from "aws-sdk";
const REGION = "ap-south-1"; //Mumbai

const client = new AWS.S3({
  accessKeyId: process.env.REACH_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACH_AWS_SECRET_ACCESS_KEY,
  apiVersion: '2006-03-01',
  region: REGION,
});

export const createBucket = async ({ id }) => {
  const bucketName = `customer-${id.toLowerCase().replace('@', '')}`;
  return new Promise((resolve, reject) => {
    var req = client.createBucket({ Bucket: bucketName });
    req.send((err, data) => {
      if (err) {
        console.log(err);
        reject(`Failed to create bucket: ${err.message}`);
      } else {
        resolve(data.Location);
      }
    })
  });
};

export const putPresignedURL = (bucketName, file) => {
  const Conditions = [{ acl: "public-read" }, { bucket: bucketName }, ["starts-with", "$key", file]];
  return new Promise((resolve, reject) => {
    client.createPresignedPost({
      Bucket: bucketName, Key: file, Conditions, Fields: {
        acl: "public-read",
      }
    }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  });
};
