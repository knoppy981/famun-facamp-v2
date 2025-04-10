import bcrypt from "bcryptjs";

import { AccountStepType } from "../steps/account";
import { createUser } from "~/models/user.server";
import { DataStepType } from "../steps/data";
import { DelegateStepType } from "../steps/delegate";
import { AdvisorStepType } from "../steps/advisor";

type ParticipantDataType = DelegateStepType | AdvisorStepType
type UserType = AccountStepType & DataStepType & ParticipantDataType


export async function createUserAndJoin(userData: UserType & { stripeCustomerId: string }, code: string) {
  let { confirmPassword, password, ...rest } = userData

  return createUser({
    ...rest,

    password: {
      create: {
        hash: await bcrypt.hash(password, 10)
      }
    },

    delegation: {
      connect: {
        code
      }
    }
  })
}