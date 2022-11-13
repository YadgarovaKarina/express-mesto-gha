import mongoose from 'mongoose';
import { Joi } from 'celebrate';

const emailSchema = Joi.string().email().required();
const urlSchema = Joi.string().uri({ scheme: ['http', 'https'] }).required(); // дописать валидацию

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => !urlSchema.validate(value).error,
      message: () => 'Аватар должен быть http(s)-URL',
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => !emailSchema.validate(value).error,
      message: () => 'Почта должна быть вида a@b.c',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model('user', userSchema);
