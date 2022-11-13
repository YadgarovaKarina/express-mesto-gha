import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import { constants } from 'http2';
import { router as userRouter } from './routes/users.js';
import { router as cardsRouter } from './routes/cards.js';
import { login, createUser } from './controllers/users.js';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63668fc505b68f60bcb1c0d2',
  };
  if (req.headers.Authorization || req.headers.authorization) {
    req.user._id = req.headers.Authorization || req.headers.authorization;
  }

  next();
});

mongoose.set('runValidators', true);

app.use('/users', userRouter);

app.use('/cards', cardsRouter);

app.post('/signin', login);

app.post('/signup', createUser);

app.use((req, res) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
