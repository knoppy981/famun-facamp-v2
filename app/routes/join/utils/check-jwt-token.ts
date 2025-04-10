import { decodeJwt } from "~/lib/jwt";
import { getDelegationByCode } from "~/models/delegation.server";

export async function checkJwtToken(token: string) {
  const decoded: any = await decodeJwt(token)

  if (decoded.err) return false

  const { delegationCode } = decoded?.payload
  const delegation = await getDelegationByCode(delegationCode)
  if (!delegation) return false

  return delegation
}