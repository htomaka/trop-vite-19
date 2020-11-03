const { generateAttestation } = require("./generate-attestation");

const now = new Date();

generateAttestation({
  firstname: "Honoré",
  lastname: "Tomaka",
  birthday: "26/02/1981",
  placeofbirth: "Roubaix",
  address: "44, rue Gustave Scrive",
  city: "La Madeleine",
  zipcode: "59110",
  date: dateFormat(now, "dd/mm/yyyy"),
  heuresortie: dateFormat(now, "hh:MMTT"),
});
