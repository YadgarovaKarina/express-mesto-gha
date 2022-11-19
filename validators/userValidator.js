import { Joi, celebrate } from 'celebrate';
import { urlSchema } from '../models/user.js';

export const userIdValidator = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }).required(),
});

export const userBodyValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlSchema).uri({ scheme: ['http', 'https'] }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const userProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

export const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlSchema).uri({ scheme: ['http', 'https'] }).required(),
  }),
});

export const userLoginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
