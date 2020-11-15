const Joi = require("joi");

const requiredString = Joi.string().required();

module.exports = Joi.object({
  firstname: requiredString,
  lastname: requiredString,
  birthday: requiredString,
  placeofbirth: requiredString,
  address: requiredString,
  city: requiredString,
  zipcode: requiredString,
  date: requiredString,
  heuresortie: requiredString,
  leavereason: requiredString
});
