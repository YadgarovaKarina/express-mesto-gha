import { constants } from 'http2';
import User from '../models/user.js';

const responseBadRequestError = (res, message) => res
  .status(constants.HTTP_STATUS_BAD_REQUEST)
  .send({ message: `Некорректные данные пользователя. ${message}` });

const responseServerError = (res, message) => res
  .status(constants.HTTP_STATUS_SERVICE_UNAVAILABLE)
  .send({ message: `На сервере произошла ошибка. ${message}` });

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const getUserById = (req, res) => {
  User.find({ _id: req.params.id })
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidatorError') {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};
