import { LeaveReason } from "./types";

//export const apiUrl = "https://tranquil-cliffs-66769.herokuapp.com/generate";
export const apiUrl = 'http://localhost:3000/generate';

export const leaveReasonLabels: Record<LeaveReason, string> = {
  "enfants": "amener mon enfant à l'école",
  "travail": "aller travailler",
  "achats": "faire des courses",
  "sante": "me soigner",
  "famille": "s'occuper d'un proche",
  "handicap": "s'occuper d'une personne fragile",
  "sportAnimaux": "prendre l'air",
  "convocation": "se rendre à une convocation judicaire",
  "mission": "effectuer une mission officielle"
};

export const leaveReasons: LeaveReason[] = [
  "enfants",
  "travail",
  "achats",
  "sante",
  "famille",
  "handicap",
  "sportAnimaux",
  "convocation",
  "mission"
];
