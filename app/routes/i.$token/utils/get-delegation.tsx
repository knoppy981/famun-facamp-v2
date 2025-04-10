import type { Delegation } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Delegation } from "@prisma/client";


export async function getDelegationByCode(code: Delegation["code"]) {
  return prisma.delegation.findUnique({
    where: { code },
    include: {
      users: {
        include: {
          files: {
            select: {
              contentType: true,
              type: true,
              fileName: true,
              size: true,
              createdAt: true
            }
          }
        }
      },
      payments: true
    }
  });
}