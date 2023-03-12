import { Router } from 'express';
import {
  createNoteHandler,
  deleteNoteHandler,
  getNoteById,
  getNotesByUserId,
  updateNoteHandler,
} from '../controllers/notes.controller';
import { verifyAuth } from '../middlewares/verifyAuth';

const router = Router();
// /api/notes

router.use(verifyAuth);

router.post('/', createNoteHandler);
router.get('/:id', getNoteById);
router.get('/user/:userId', getNotesByUserId);
router.patch('/:id', updateNoteHandler);
router.delete('/:id', deleteNoteHandler);

export default router;
