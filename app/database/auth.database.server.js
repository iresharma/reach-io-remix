import { client as prisma } from "./index.database.server";

export const createAuth = (email, passHash, salt) => {
  return new Promise((resolve, reject) => {
    prisma.auth
      .findUnique({ where: { email: email } })
      .then((data) => {
        if (data !== null) return reject(400);
        prisma.auth
          .create({
            data: {
              email: email,
              passHash: passHash,
              salt: salt,
            },
          })
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};

export const createUser = (fname, lname, email, authId) => {
  return new Promise((resolve, reject) => {
    prisma.user
      .create({
        data: {
          email: email,
          name: fname + lname,
          authId: authId,
        },
      })
      .then(resolve)
      .catch(reject);
  });
};

export const getAuth = (email) => {
  return new Promise((resolve, reject) => {
    console.log(email);
    prisma.auth
      .findUnique({
        where: { email: email },
      })
      .then((data) => {
        if (data === null) return reject(404);
        return resolve(data);
      })
      .catch(reject);
  });
};

export const getUser = (email) => {
  return new Promise((resolve, reject) => {
    prisma.user
      .findUniqueOrThrow({
        where: {
          email: email,
        },
      })
      .then(resolve)
      .catch(reject);
  });
};
