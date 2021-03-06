const path = require("path");

const profileSelectors = {
  firstname: "#field-firstname",
  lastname: "#field-lastname",
  birthday: "#field-birthday",
  placeofbirth: "#field-placeofbirth",
  address: "#field-address",
  city: "#field-city",
  zipcode: "#field-zipcode",
  date: "#field-datesortie",
  heuresortie: "#field-heuresortie",
};

const reasonsSelectors = {
  enfants: "#checkbox-enfants",
  travail: "#checkbox-travail",
  achats: "#checkbox-achats_culturel_cultuel",
  sante: "#checkbox-sante",
  famille: "#checkbox-famille",
  handicap: "#checkbox-handicap",
  sportAnimaux: "#checkbox-sport_animaux",
  convocation: "#checkbox-convocation",
  mission: "#checkbox-missions",
};

const submitSelector = "#generate-btn";
const tmpFolder = path.join(__dirname, "../server/tmp");
const pageUrl = "https://media.interieur.gouv.fr/deplacement-covid-19/";

module.exports = {
  profileSelectors,
  reasonsSelectors,
  submitSelector,
  tmpFolder,
  pageUrl,
};
