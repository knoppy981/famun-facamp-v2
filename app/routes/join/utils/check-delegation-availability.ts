import { prisma } from "~/db.server";

export async function checkDelegationAvailability(code: string, participantType: "delegate" | "advisor") {
  const delegation = await prisma.delegation.findUnique({
    where: { code },
    select: {
      maxAdvisors: true,
      maxDelegates: true,
      users: true,
    }
  })

  if (!delegation) return null

  const maxDelegates = delegation.maxDelegates
  const maxAdvisors = delegation.maxAdvisors

  let delegates = 0, advisors = 0

  for (const user of delegation.users) {
    if (user.type === "delegate") {
      delegates += 1
    } else {
      advisors += 1
    }
  }

  const isDelegatesComplete = maxDelegates <= delegates
  const isAdvisorsComplete = maxAdvisors <= advisors

  if (!isDelegatesComplete && !isAdvisorsComplete) { return true }
  else if (!isAdvisorsComplete && participantType === "advisor") { return true }
  else if (!isDelegatesComplete && participantType === "delegate") { return true }
  else { return false }
}

