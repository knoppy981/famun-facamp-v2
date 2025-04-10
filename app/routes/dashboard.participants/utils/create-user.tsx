import { ParticipantDataType } from "../route";
import { createUser as _createUser } from "~/models/user.server";


export async function createUser(data: ParticipantDataType & { stripeCustomerId: string }, delegationId: string) {
  return _createUser({
    ...data,
    delegation: {
      connect: {
        id: delegationId,
      }
    }
  })
}