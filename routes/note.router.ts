import { Router } from 'express';
import {
  createNoteHandler,
  getNoteById,
  getNotesByUserId,
  getNotesHandler,
  updateNoteHandler,
} from '../controllers/notes.controller';
import { verifyAuth } from '../middlewares/verifyAuth';

const router = Router();
// /api/notes
router.get('/', getNotesHandler);

// router.use(verifyAuth);
router.post('/', createNoteHandler);
router.patch('/:id', updateNoteHandler);
router.get('/:id', getNoteById);
router.get('/user/:id', getNotesByUserId);

export default router;
