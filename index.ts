import express from 'express';
import cors from 'cors';

import userRouter from './routes/user.router';
import noteRouter from './routes/note.router';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => {
  console.log('Server is running on port 5000');
});
