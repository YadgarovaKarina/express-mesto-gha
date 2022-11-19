import { Router } from 'express';

import {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  readOne,
} from '../controllers/users.js';

import {
  userIdValidator,
  userBodyValidator,
  userProfileValidator,
  userAvatarValidator,
} from '../validators/userValidator.js';

export const router = Router();

router.get('/', userBodyValidator, getUsers);
router.get('/:userId', userIdValidator, getUserById);
router.get('/me', userProfileValidator, readOne);
router.patch('/me', userProfileValidator, updateUserProfile);
router.patch('/me/avatar', userAvatarValidator, updateUserAvatar);
