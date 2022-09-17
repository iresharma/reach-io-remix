import AWS from "aws-sdk";
import fs from "fs";
const REGION = "ap-south-1"; //Mumbai

export const createClient = () =>
  new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

export const createBucket = async (client, { account_name, id }) => {
  const bucketName = `reach-io-customer-${id}-${account_name}`;
  return new Promise((resolve, reject) => {
    client.createBucket({ bucket: bucketName }).then(resolve).catch(reject);
  });
};

export const uploadFile = (client, bucketName, path, file, filename) => {
  return new Promise((resolve, reject) => {
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
      console.log('File Error', err);
    });
    client.putObject(
      {
        Bucket: bucketName,
        Key: `${path}${filename}`,
        Body: fileStream,
      },
      (err, result) => {
        console.log(err);
        console.log(result);
        resolve();
      }
    );
  });
};
