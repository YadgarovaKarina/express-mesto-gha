import { Router } from 'express';

import {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users.js';

export const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
