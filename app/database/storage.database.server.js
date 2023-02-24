import { prisma } from "./index.database.server";

export const createBucket = (userId, bucketRef) => {
  return new Promise((resolve, reject) => {
    prisma.bucket
      .create({
        data: { files: [], userAccountId: userId, bucketRef: bucketRef },
      })
      .then((data) => {
        console.log(data);
        prisma.userAccount
          .update({ where: { id: userId }, data: { bucketId: data.id } })
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};

export const fetchBucket = (id) => {
  return new Promise((resolve, reject) => {
    prisma.bucket
      .findUnique({ where: { id: id } })
      .then(resolve)
      .catch(reject);
  });
};
