import { Router } from 'express';
import {
  createNoteHandler,
  getNotesHandler,
} from '../controllers/notes.controller';
import { verifyAuth } from '../middlewares/verifyAuth';

const router = Router();

router.get('/', getNotesHandler);

// router.use(verifyAuth);
router.post('/', createNoteHandler);

export default router;
