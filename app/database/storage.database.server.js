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
          .then((user) => resolve({ ...data, ...user }))
          .catch(reject);
      })
      .catch(reject);
  });
};
