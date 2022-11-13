import { constants } from 'http2';
import { jwt } from 'jsonwebtoken';
import { bcrypt } from 'bcryptjs';
import User from '../models/user.js';

const responseBadRequestError = (res) => res
  .status(constants.HTTP_STATUS_BAD_REQUEST)
  .send({ message: 'Некорректные данные пользователя.' });

const responseServerError = (res) => res
  .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
  .send({ message: 'На сервере произошла ошибка.' });

const responseNotFound = (res) => res
  .status(constants.HTTP_STATUS_NOT_FOUND)
  .send({ message: 'Данные не найдены.' });

const responseUnauthorized = (res) => res
  .status(constants.HTTP_STATUS_UNAUTHORIZED)
  .send({ message: 'Требуется авторизация.' });

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      responseServerError(res, err.message);
    });
};

export const getUserById = (req, res) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        responseNotFound(res, '');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }));
  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const login = (req, res) => {
  User.findOneAndValidatePassword(req.body)
    .then((userData) => {
      const token = jwt.sign({ _id: userData._id }, jwt.JWT_SALT, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        responseUnauthorized(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};
