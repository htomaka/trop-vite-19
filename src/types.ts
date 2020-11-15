export interface FormData {
  "firstname": string,
  "lastname": string,
  "birthday": string,
  "placeofbirth": string,
  "address": string,
  "city": string,
  "zipcode": string,
  "date": string,
  "heuresortie": string,
  reason: LeaveReason
}

export type LeaveReason =
  "enfants"
  | "travail"
  | "achats"
  | "sante"
  | "famille"
  | "handicap"
  | "sportAnimaux"
  | "convocation"
  | "mission";
