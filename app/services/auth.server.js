import { authenticate } from "../database/auth.database.server";

export const signIn = (email, passwordHash) => {
  authenticate(email, passwordHash);
};
