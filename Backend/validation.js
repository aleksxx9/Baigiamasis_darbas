const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    role: Joi.string().required(),
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  });
  return schema.validate(data);
};

const formValidation = datacheck => {
  const schema = Joi.object({
    name: Joi.string().required(),
    data: Joi.required(),
    expirationTime: Joi.string().allow('').optional(),
    role: Joi.string().required(),
  });
  return schema.validate(datacheck);
};

module.exports.formValidation = formValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
