import express from 'express';
import cors from 'cors';

import noteRouter from './routes/note.router';

const app = express();
const port = process.env.PORT || 5000;

app.set('trust proxy', 1); // trust first proxy
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/api/notes', noteRouter);

app.listen(port, () => {
  console.log('Server is running on port 5000');
});
