import { client as prisma } from "./index.database.server";

export const authenticate = (email, passwordHash) => {
  return new Promise((resolve, reject) => {
    console.log(email, passwordHash)
    console.log(typeof email)
    console.log(typeof passwordHash)
    prisma.auth
      .create({
        data: {
          email: email,
          passHash: passwordHash,
          salt: "abc",
        },
      })
      .then(console.log)
      .then(resolve);
  });
};
