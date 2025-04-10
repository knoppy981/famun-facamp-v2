import { Session, SessionData } from "@remix-run/node"

export async function getSessionData(LAST_STEP: number, session: Session<SessionData | SessionData>) {
  const { step, joinType, participantType }: { step: number, joinType: "join" | "create", participantType: "advisor" | "delegate" } = {
    ...session.get("step"),
    ...session.get("join-type"),
    ...session.get("participant-type"),
  }

  let data

  switch (step) {
    case LAST_STEP:
      data = {
        ...session.get(`user-data-2`),
        ...session.get(`user-data-3`),
        ...session.get(`user-data-4`),
        ...session.get(`user-data-6`)
      }
      break;
    default:
      data = session.get(`user-data-${step}`) ?? {}
      break;
  }

  return { data, step, joinType, participantType }
}