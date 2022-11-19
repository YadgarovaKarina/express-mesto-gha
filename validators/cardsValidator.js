import { Joi, celebrate } from 'celebrate';
import { urlSchema } from '../models/user.js';

export const cardIdValidator = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }).required(),
});

export const cardBodyValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlSchema).uri({ scheme: ['http', 'https'] }).required(),
  }),
});
