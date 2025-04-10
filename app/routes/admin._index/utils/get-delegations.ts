import { prisma } from "~/db.server";
export type { Delegation } from "@prisma/client";


export async function getDelegations() {
  return prisma.delegation.findMany({
    select: {
      id: true,
      school: true,
      maxAdvisors: true,
      maxDelegates: true,
      createdAt: true,
      payments: {
        select: {
          delegatesPayments: true,
          advisorsPayments: true
        }
      },
      _count: {
        select: {
          users: true
        }
      }
    }
  });
}