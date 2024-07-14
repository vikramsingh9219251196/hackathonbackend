// routes/userRoutes.js

import express from 'express';
import { registerUser, loginUser, getAllUsers, setAvatar } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/allusers/:id', getAllUsers);
router.post('/setavatar/:id', setAvatar);

export default router;
