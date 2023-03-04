import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import config from 'config';
import helmet from 'helmet';
import mongoose from 'mongoose';
import noteRouter from './routes/note.router';
import userRouter from './routes/user.router';

const app = express();
const port = process.env.PORT || config.get<number>('port');

app.set('trust proxy', 1); // trust first proxy
app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found');
  res.status(404);
  next(error);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

mongoose
  .connect('mongodb://127.0.0.1:27017/notesy')
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
