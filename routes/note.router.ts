import { Router } from 'express';
import { getNote } from '../controllers/notes.controller';

const router = Router();

router.post('/', getNote);

export default router;
