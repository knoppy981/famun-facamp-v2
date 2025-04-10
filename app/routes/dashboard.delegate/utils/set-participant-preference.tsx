import { PreferenceSchema } from "../route";
import { updateUser as _updateUser } from "~/models/user.server";


export async function setParticipantPreference(data: PreferenceSchema, userId: string) {
  return _updateUser(
    { ...data },
    userId
  )
}