import { Router } from 'express';
import { check } from 'express-validator';
import {
  getUserById,
  loginController,
  signupController,
} from '../controllers/user.controller';

const router = Router();
// /api/users

router.get('/:id', getUserById);
router.post('/login', loginController);

router.post(
  '/signup',
  [
    check('email', 'Invalid email').isEmail(),
    check('name', 'Min length is 3 symbols').isLength({ min: 3 }),
    check('password', 'Min length is 6 symbols').isLength({ min: 6 }),
  ],
  signupController
);

export default router;
