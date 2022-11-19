import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { constants } from 'http2';
import { NotFoundError } from './errors/NotFoundError.js';
import { router as userRouter } from './routes/users.js';
import { router as cardsRouter } from './routes/cards.js';
import { login, createUser } from './controllers/users.js';
import { auth } from './middlewares/auth.js';
import { userBodyValidator, userLoginValidator } from './validators/userValidator.js';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

mongoose.set('runValidators', true);

app.use(auth);

app.use('/users', auth, userRouter);

app.use('/cards', auth, cardsRouter);

app.post('/signin', userLoginValidator, login);

app.post('/signup', userBodyValidator, createUser);

app.use(errors());

app.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

app.use((err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.message || 'Неизвестная ошибка';
  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
