import type { Delegation, Languages, ParticipantType, Payment, Prisma, User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Delegation } from "@prisma/client";


export async function getDelegationById(id: Delegation["id"]) {
  return prisma.delegation.findUnique({ where: { id }, include: { users: true, payments: true } });
}

export async function getDelegationByCode(code: Delegation["code"]) {
  return prisma.delegation.findUnique({ where: { code }, include: { users: true, payments: true } });
}

export async function deleteDelegationById(id: Delegation["id"]) {
  return prisma.delegation.delete({ where: { id } });
}

export async function createDelegation(data: Prisma.DelegationCreateInput) {
  return prisma.delegation.create({ data, include: { users: true } })
}

export async function getExistingDelegation({
  delegationId,
  ...values
}: {
  delegationId?: Delegation["id"],
  [key: string]: any;
}) {
  const checkableValues = Object.entries(values).map(entry => {
    return { [entry[0]]: entry[1] };
  })

  let delegation

  try {
    delegation = await prisma.delegation.findFirstOrThrow({
      where: {
        OR: checkableValues,
        NOT: { id: delegationId }
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

export async function checkDelegationPayments(
  id: Delegation["id"],
  _delegation?: {
    maxAdvisors: number,
    maxDelegates: number,
    payments: {
      delegatesPayments: number,
      advisorsPayments: number
    }[],
    paymentExpirationDate: Date,
    [key: string]: any
  }
) {
  const delegation = _delegation ?
    _delegation :
    await prisma.delegation.findUnique({
      where: { id },
      select: {
        maxAdvisors: true,
        maxDelegates: true,
        payments: {
          select: {
            delegatesPayments: true,
            advisorsPayments: true
          }
        },
        paymentExpirationDate: true
      }
    })

  if (!delegation) return null

  const maxDelegates = delegation.maxDelegates
  const maxAdvisors = delegation.maxAdvisors

  let delegatesPaid = 0, advisorsPaid = 0

  for (const payment of delegation.payments) {
    delegatesPaid += payment.delegatesPayments
    advisorsPaid += payment.advisorsPayments
  }

  const isDelegatesPaid = maxDelegates === delegatesPaid
  const isAdvisorsPaid = maxAdvisors === advisorsPaid
  const status: "paid" | "pending" | "expired" =
    isDelegatesPaid && isAdvisorsPaid
      ? "paid"
      : (new Date() >= new Date(delegation.paymentExpirationDate)
        ? "expired"
        : "pending");

  return {
    delegates: {
      paid: isDelegatesPaid,
      remaining: maxDelegates - delegatesPaid
    },
    advisors: {
      paid: isAdvisorsPaid,
      remaining: maxAdvisors - advisorsPaid
    },
    status,
    totalNumberPayments: delegatesPaid + advisorsPaid
  }
}

export type filesType = "Position Paper" | "Liability Waiver" // | "Payment Voucher"
export const documentsType = [
  { value: "Position Paper" as filesType, label: "Position Paper", type: "delegate" as "both" | "delegate" | "advisor" },
  { value: "Liability Waiver" as filesType, label: "Termo de Responsabilidade (Liability Waiver)", type: "both" as "both" | "delegate" | "advisor" }
  // { value: "Payment Voucher" as filesType, label: "Comprovante de pagamento", type: "both" as "both" | "delegate" | "advisor" },
]

export async function checkDelegationParticipants(
  id: Delegation["id"],
  _delegation?: {
    maxAdvisors: number,
    maxDelegates: number,
    [key: string]: any
    users: {
      type: ParticipantType,
      files: {
        contentType: string,
        type: string,
        fileName: string,
        size: number,
        createdAt: Date
      }[]
      [key: string]: any
    }[]
  }
) {
  const delegation = _delegation ?
    _delegation :
    await prisma.delegation.findUnique({
      where: { id },
      select: {
        maxAdvisors: true,
        maxDelegates: true,
        users: {
          select: {
            type: true,
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
      }
    })

  if (!delegation) return null

  const maxDelegates = delegation.maxDelegates
  const maxAdvisors = delegation.maxAdvisors

  let delegates = 0, advisors = 0

  for (const user of delegation.users) {
    // Check if user has files array
    if (user.files && Array.isArray(user.files)) {
      // Check for required file types
      const hasPositionPaper = user.files.some(file => file.type === "Position Paper");
      const hasLiabilityWaiver = user.files.some(file => file.type === "Liability Waiver");

      if (user.type === "delegate") {
        // Count delegate only if they have both Position Paper and Liability Waiver
        if (hasPositionPaper && hasLiabilityWaiver) {
          delegates += 1;
        }
      } else {
        // Count advisor only if they have Liability Waiver
        if (hasLiabilityWaiver) {
          advisors += 1;
        }
      }
    }
  }

  const isDelegatesComplete = maxDelegates === delegates
  const isAdvisorsComplete = maxAdvisors === advisors

  const status: "completed" | "pending" | "expired" =
    isDelegatesComplete && isAdvisorsComplete
      ? "completed"
      : (new Date() >= new Date(2025, 8, 1)
        ? "expired"
        : "pending");

  return {
    delegates: {
      completed: isDelegatesComplete,
      remaining: maxDelegates - delegates
    },
    advisors: {
      completed: isAdvisorsComplete,
      remaining: maxAdvisors - advisors
    },
    status,
    totalNumberSubscriptions: delegates + advisors
  }
}

export async function checkDelegationIsDelegated(
  id: Delegation["id"],
  _delegation?: {
    maxDelegates: number,
    [key: string]: any
    users: {
      type: ParticipantType,
      councilPreference: ({
        council: string;
        language: Languages;
        id: number;
        description: string;
      } & {})[],
      [key: string]: any
    }[]
  }
) {
  const delegation = _delegation ?
    _delegation :
    await prisma.delegation.findUnique({
      where: { id },
      select: {
        maxDelegates: true,
        users: {
          where: {
            type: "delegate"
          },
          select: {
            type: true,
            councilPreference: true
          }
        },
      }
    })

  if (!delegation) return null

  const maxDelegates = delegation.maxDelegates

  let delegates = delegation.users.filter(u => u.councilPreference.length > 0 && u.type === "delegate").length

  const isDelegatesComplete = maxDelegates === delegates

  const status: "completed" | "pending" | "expired" =
    isDelegatesComplete
      ? "completed"
      : (new Date() >= new Date(2025, 8, 8)
        ? "expired"
        : "pending");

  return {
    delegates: {
      completed: isDelegatesComplete,
      remaining: maxDelegates - delegates
    },
    status,
    totalNumberDelegated: delegates
  }
}

export async function getDelegationStatus(
  id: Delegation["id"],
  _delegation?: {
    maxAdvisors: number,
    maxDelegates: number,
    [key: string]: any
    users: {
      type: ParticipantType,
      files: {
        contentType: string,
        type: string,
        fileName: string,
        size: number,
        createdAt: Date
      }[]
      [key: string]: any
    }[],
    payments: {
      delegatesPayments: number,
      advisorsPayments: number
    }[],
    paymentExpirationDate: Date,
  }
): Promise<"participants" | "payments" | "delegate" | "completed" | null> {
  const delegation = _delegation ?
    _delegation :
    await prisma.delegation.findUnique({
      where: { id },
      include: {
        payments: true,
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
        }
      }
    })

  if (!delegation) return null

  const paymentStatus = await checkDelegationPayments(id, delegation)
  if (!paymentStatus) return null

  if (
    paymentStatus.status === "pending" ||
    (paymentStatus.status === "expired" && paymentStatus.totalNumberPayments === 0)
  ) return "payments"

  const participantsStatus = await checkDelegationParticipants(id, delegation)
  if (!participantsStatus) return null

  if (
    participantsStatus.status === "pending" ||
    (paymentStatus.status === "expired" && participantsStatus.totalNumberSubscriptions === 0)
  ) return "participants"

  return "delegate"
}