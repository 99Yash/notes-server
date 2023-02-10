import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('Hello World');
});

export default router;
