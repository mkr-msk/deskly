import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type FindUserByEmail = (email: string) => Promise<{ id: string; email: string } | null>;
type CreateUser = (data: {
  email: string;
  passwordHash: string;
}) => Promise<{ id: string; email: string }>;

type RegisterUserDeps = {
  findUserByEmail: FindUserByEmail;
  createUser: CreateUser;
};

export async function registerUser(
  email: string,
  password: string,
  deps?: RegisterUserDeps
) {
  const findUserByEmail =
    deps?.findUserByEmail ??
    (async (email: string) =>
      prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true },
      }));

  const createUser =
    deps?.createUser ??
    (async (data: { email: string; passwordHash: string }) =>
      prisma.user.create({
        data,
        select: { id: true, email: true },
      }));

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return createUser({
    email,
    passwordHash,
  });
}