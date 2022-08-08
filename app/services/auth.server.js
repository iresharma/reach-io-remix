import * as db from "../database/auth.database.server";
import { saltAndHash, verifyPassword } from "./crypto.server";

export const signIn = async (email, password) => {
  const { passHash } = await db.getAuth(email).catch((err) => err);
  if (await verifyPassword(password, passHash)) {
    const { id } = await db.getUser(email);
    return id;
  } else {
    return "Invalid Credentials";
  }
};

export const register = async (fname, lname, email, password) => {
  const { hash, salt } = await saltAndHash(password);
  const { id: authId } = await db.createAuth(email, hash, salt);
  const { id: userId } = await db.createUser(fname, lname, email, authId);
  return userId;
};
