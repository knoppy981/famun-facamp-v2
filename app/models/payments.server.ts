import type { Password, Prisma, User, Payment, Delegation } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { Payment } from "@prisma/client";

export async function getPaymentsByUserId(userId: string) {
  return prisma.payment.findMany({
    where: {
      userId
    },
  })
}