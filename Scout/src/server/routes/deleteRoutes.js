import validInfo from "../middleware/validInfo.js";
import express from 'express';

const router = express.Router();

import deleteControllers from '../controllers/deleteControllers.js'

router.delete('/job/:id', deleteControllers.deleteJob )

export default router