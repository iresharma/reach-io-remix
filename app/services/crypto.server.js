const bcyrpt = require("bcrypt");
const SALT_ROUNDS = 10;

export const saltAndHash = (password) => {
  return new Promise((resolve, reject) => {
    bcyrpt
      .genSalt(SALT_ROUNDS)
      .then((salt) => {
        bcyrpt
          .hash(password, salt)
          .then((hash) => {
            resolve({ hash: hash, salt: salt });
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

export const verifyPassword = (password, passHash) => {
  return new Promise((resolve, reject) => {
    bcyrpt.compare(password, passHash).then(resolve).catch(reject);
  });
};
