import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

export const urlSchema = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

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
      validator: (v) => isEmail(v),
      message: () => 'Почта должна быть вида a@b.c',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// userSchema.findOne({ email }).select('+password')
//   .then((user) => {
//     // здесь в объекте user будет хеш пароля
//   });

export default mongoose.model('user', userSchema);
