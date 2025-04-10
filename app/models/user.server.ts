import type { Password, Prisma, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";


export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id }, include: { delegation: true } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data, include: { delegation: true } })
}

export async function updateUser(data: Prisma.UserUpdateInput, userId: User["id"]) {
  return prisma.user.update({ where: { id: userId }, data })
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function getExistingUser({
  userId,
  ...values
}: {
  userId?: User["id"],
  [key: string]: any;
}) {
  const checkableValues = Object.entries(values).map(entry => {
    return { [entry[0]]: entry[1] };
  })

  let delegation

  try {
    delegation = await prisma.user.findFirstOrThrow({
      where: {
        OR: checkableValues,
        NOT: { id: userId }
      },
      select: {
        id: true
      }
    })
  } catch (e) {
    return false
  }

  return true
}