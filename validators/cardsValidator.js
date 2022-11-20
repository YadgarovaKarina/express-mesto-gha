import { Joi, celebrate, Segments } from 'celebrate';
import { urlSchema } from './userValidator';

export const cardIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }).required(),
});

export const cardBodyValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlSchema).uri({ scheme: ['http', 'https'] }).required(),
  }),
});
