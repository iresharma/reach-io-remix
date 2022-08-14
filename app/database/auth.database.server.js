import { prisma } from "./index.database.server";

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
          name: fname + " " + lname,
          authId: authId,
        },
      })
      .then(resolve)
      .catch(reject);
  });
};

export const createUserAccount = (account_name, links, user) => {
  return new Promise((resolve, reject) => {
    prisma.userAccount
      .create({
        data: {
          email: user.email,
          links: links,
          account_name: account_name,
          owner: user.id,
          created_at: new Date(),
        },
      })
      .then((data) => {
        prisma.user
          .update({
            where: { id: user.id },
            data: {
              userAccountId: data.id,
            },
          })
          .then((x) => resolve(data))
          .catch(reject);
      })
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

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    prisma.user
      .findUniqueOrThrow({ where: { id: id } })
      .then(resolve)
      .catch(reject);
  });
};

export const getUserAccountById = (id) => {
  return new Promise((resolve, reject) => {
    prisma.userAccount
      .findUniqueOrThrow({ where: { id: id } })
      .then(resolve)
      .catch(reject);
  });
};

export const listUserAccounts = () => {
  return new Promise((resolve, reject) => {
    prisma.userAccount.findMany({}).then(resolve).catch(reject);
  });
};
