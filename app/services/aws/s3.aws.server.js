import AWS from "aws-sdk";
import fs from "fs";
const REGION = "ap-south-1"; //Mumbai

const client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  apiVersion: '2006-03-01',
});

export const createBucket = async ({ account_name, id }) => {
  const bucketName = `customer-${account_name.toLowerCase().replace('@', '')}`;
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
  return new Promise((resolve, reject) => {
  client.createPresignedPost({ Bucket: bucketName,  }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  });
};
