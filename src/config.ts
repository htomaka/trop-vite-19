import { LeaveReason } from "./types";

const getApiUrl = () => {
  let apiUrl;

  if (process.env.NODE_ENV === "production") {
    apiUrl = "https://tranquil-cliffs-66769.herokuapp.com/generate";
  } else {
    apiUrl = "http://localhost:3000/generate";
  }

  return apiUrl;
};

const getGeocodingApiUrl = () => {
  return `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}`;
}

export const apiUrl = getApiUrl();
export const geocodingApiUrl = getGeocodingApiUrl();

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
