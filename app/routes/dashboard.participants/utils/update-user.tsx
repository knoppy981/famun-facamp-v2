import { ParticipantDataType } from "../route";
import { updateUser as _updateUser } from "~/models/user.server";


export async function updateUser(data: ParticipantDataType, userId: string) {
  return _updateUser(
    { ...data },
    userId
  )
}