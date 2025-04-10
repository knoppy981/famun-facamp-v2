import type { Delegation } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Delegation } from "@prisma/client";


export async function getDelegationById(id: Delegation["id"]) {
  return prisma.delegation.findUnique({
    where: { id },
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