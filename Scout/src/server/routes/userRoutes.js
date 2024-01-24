import validInfo from '../middleware/validInfo.js';
import express from 'express';
const router = express.Router();

import userControllers from '../controllers/userControllers.js';

router.post('/register', validInfo, userControllers.registerUser);
router.post('/login', validInfo, userControllers.loginUser);

export default router;