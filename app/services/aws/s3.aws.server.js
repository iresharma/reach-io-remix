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

export const uploadFile = (bucketName, path, file, filename) => {
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
