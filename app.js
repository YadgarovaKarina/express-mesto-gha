import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { constants } from 'http2';
import { router as userRouter } from './routes/users.js';
import { router as cardsRouter } from './routes/cards.js';
import { login, createUser } from './controllers/users.js';
import { auth } from './middlewares/auth.js';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

mongoose.set('runValidators', true);

app.use(auth);

app.use(errors());

app.use('/users', auth, userRouter);

app.use('/cards', auth, cardsRouter);

app.post('/signin', login);

app.post('/signup', createUser);

app.use((req, res) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
