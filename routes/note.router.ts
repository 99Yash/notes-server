import { Router } from 'express';
import { createNoteHandler } from '../controllers/notes.controller';

const router = Router();

router.post('/', createNoteHandler);

export default router;
