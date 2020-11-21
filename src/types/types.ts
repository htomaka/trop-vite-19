import { User } from "../registerUser/user";
import { LeaveReason } from "../types";

export interface AppState {
  user: User,
  attestationLoading: boolean
}

export interface AttestationFormData extends User {
  date: string,
  heuresortie: string,
  leavereason: LeaveReason
}
