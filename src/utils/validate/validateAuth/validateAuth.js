const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(5).max(20).required()
    .messages({
      'string.base': 'Username harus berupa teks',
      'string.empty': 'Username tidak boleh kosong',
      'string.min': 'Username minimal 5 karakter',
      'string.max': 'Username maksimal 20 karakter',
      'any.required': 'Username wajib diisi'
    }),

  email: Joi.string().email().required()
    .messages({
      'string.email': 'Format email tidak valid',
      'string.empty': 'Email tidak boleh kosong',
      'any.required': 'Email wajib diisi'
    }),

  password: Joi.string().min(6).max(30).required()
    .messages({
      'string.min': 'Password minimal 6 karakter',
      'string.max': 'Password maximal 30 karakter',
      'string.empty': 'Password tidak boleh kosong',
      'any.required': 'Password wajib diisi'
    }),
 role: Joi.string().required().valid("admin","user")
    .messages({
      "any.required": "role wajib diisi",
      "any.valid": "role tidak valid"
    })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Format email tidak valid',
      'string.empty': 'Email tidak boleh kosong',
      'any.required': 'Email wajib diisi'
    }),

  password: Joi.string().min(6).required()
    .messages({
      'string.min': 'Password minimal 6 karakter',
      'string.empty': 'Password tidak boleh kosong',
      'any.required': 'Password wajib diisi'
    })
});


function validateUserRegister(data) {
  return registerSchema.validate(data, { abortEarly: false });
}

function validateUserLogin(data) {
  return loginSchema.validate(data, { abortEarly: false });
}

module.exports = {
  validateUserRegister,
  validateUserLogin
};
