import { prisma } from "./index.database.server";

export const createBucket = (id) => {
  return new Promise((resolve, reject) => {
    prisma.bucket
      .create({
        data: { files: [], userAccountId: id },
      })
      .then((data) => {
        console.log(data);
        prisma.userAccount
          .update({ where: { id: id }, data: { bucketId: data.id } })
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
