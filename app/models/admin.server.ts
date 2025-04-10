import type { Admin } from "@prisma/client";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";

export type { Admin } from "@prisma/client";


export async function getAdminById(id: Admin["id"]) {
  return prisma.admin.findUnique({ where: { id } })
}

export async function verifyAdmin(email: Admin["email"], password: Admin["hash"]) {
  const admin = await prisma.admin.findUnique({
    where: {
      email
    }
  })

  if (!admin) return null

  const isValid = await bcrypt.compare(
    password,
    admin.hash
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hash: _hash, ...adminWithoutPassword } = admin

  return adminWithoutPassword
}