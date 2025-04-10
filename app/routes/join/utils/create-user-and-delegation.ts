import jwt from "jsonwebtoken";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";

import { generateString } from "~/lib/utils";
import { createDelegation } from "~/models/delegation.server"
import { AccountStepType } from "../steps/account"
import { CreateDelegationStepType } from "../steps/create-delegation"
import { DataStepType } from "../steps/data";
import { DelegateStepType } from "../steps/delegate";
import { AdvisorStepType } from "../steps/advisor";


type ParticipantDataType = DelegateStepType | AdvisorStepType
type UserType = AccountStepType & DataStepType & ParticipantDataType


export async function createUserAndDelegation(
  delegationData: CreateDelegationStepType,
  userData: UserType & { stripeCustomerId: string }
) {
  let { confirmPassword, password, ...user } = userData
  let { delegationPhoneNumber, ...delegation } = delegationData
  const code = await generateDelegationCode()

  return createDelegation({
    ...delegation,
    phoneNumber: delegationPhoneNumber,

    code,
    inviteLink: await generateDelegationInviteLink(code),
    paymentExpirationDate: generatePaymentExpirationDate(),

    users: {
      create: {
        ...user,
        leader: true,

        password: {
          create: {
            hash: await bcrypt.hash(password, 10)
          }
        }
      }
    }
  })
}


function generatePaymentExpirationDate() {
  // generate date 5 business days from now
  let currentDate = new Date();
  let dayOfWeek = currentDate.getDay();
  let daysToAdd = (dayOfWeek >= 2 && dayOfWeek <= 5) ? 7 : 5;
  let newDate = new Date(currentDate.setDate(currentDate.getDate() + daysToAdd));

  return newDate
}


async function generateDelegationCode() {
  // generate bullet proof unique delegation code
  let code;
  let isUnique = false;

  while (!isUnique) {
    // Generate a new 6-digit string
    code = generateString(6);

    try {
      // Try to find a delegation with the generated code
      await prisma.delegation.findFirstOrThrow({
        where: {
          code,
        },
      });

      // If no error is thrown, the code exists, so continue looping
    } catch (e) {
      // If an error is thrown, the code does not exist, so it's unique
      isUnique = true;
    }
  }

  if (!code) throw new Error("Error generating delegation code")

  return code;
}


async function generateDelegationInviteLink(code: string) {
  const { JSON_WEB_TOKEN_SECRET, WEBSITE_URL } = process.env;

  const token = jwt.sign(
    { delegationCode: code },
    JSON_WEB_TOKEN_SECRET as jwt.Secret,
    { expiresIn: 60 * 60 * 24 * 30 }
  );

  return `${WEBSITE_URL}/i/${token}`
}