const Joi = require("joi");

module.exports = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  birthday: Joi.string().required(),
  placeofbirth: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  zipcode: Joi.string().required(),
  date: Joi.string().required(),
  heuresortie: Joi.string().required(),
});
