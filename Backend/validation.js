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

const changeValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    newPassword: Joi.string().min(6).required(),
    repeatPassword: Joi.string().valid(Joi.ref('newPassword')).min(6).required(),
  });
  return schema.validate(data);
};

const formValidation = datacheck => {
  const schema = Joi.object({
    name: Joi.string().required(),
    data: Joi.required(),
    expirationTime: Joi.string().allow('').optional(),
    role: Joi.string().required(),
    author: Joi.required(),
  });
  return schema.validate(datacheck);
};

const authValidation = datacheck => {
  const schema = Joi.object({
    name: Joi.string().required(),
    author: Joi.string().required(),
  });
  return schema.validate(datacheck);
};

module.exports.authValidation = authValidation;
module.exports.changeValidation = changeValidation;
module.exports.formValidation = formValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
