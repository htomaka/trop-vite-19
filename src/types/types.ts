import { User } from "./user";
import { LeaveReason } from "../types";

export interface AppState {
  user: User,
  attestationLoading: boolean,
  pageTitle: string
}

export interface AttestationFormData {
  firstname: string,
  lastname: string,
  birthday: string,
  placeofbirth: string,
  address: string,
  zipcode: string,
  city: string,
  date: string,
  heuresortie: string,
  leavereason: LeaveReason
}
