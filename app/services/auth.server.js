import * as db from "../database/auth.database.server";
import { saltAndHash, verifyPassword } from "./crypto.server";

export const signIn = async (email, password) => {
  const auth = await db.getAuth(email).catch((err) => err);
  if (auth === 404) {
    return "Invalid username or password";
  }
  try {
    console.log(auth);
    if (await verifyPassword(password, auth.passHash)) {
      const { id, userAccountId } = await db.getUser(email);
      const userData = await db.getUserAccountById(userAccountId);
      return { id, userData };
    } else {
      return "Invalid Credentials";
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const register = async (fname, lname, email, password) => {
  const { hash, salt } = await saltAndHash(password);
  const { id: authId } = await db.createAuth(email, hash, salt);
  const { id: userId } = await db.createUser(fname, lname, email, authId);
  return userId;
};
