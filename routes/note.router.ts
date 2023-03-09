import { Router } from 'express';
import {
  createNoteHandler,
  deleteNoteHandler,
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
router.get('/:id', getNoteById);
router.patch('/:id', updateNoteHandler);
router.delete('/:id', deleteNoteHandler);
router.get('/user/:userId', getNotesByUserId);

export default router;
