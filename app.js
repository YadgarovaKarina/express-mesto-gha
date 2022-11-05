import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import { router as userRouter } from './routes/users.js';
import { router as cardsRouter } from './routes/cards.js';

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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
