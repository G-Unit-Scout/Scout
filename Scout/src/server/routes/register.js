import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../../database/db.js';

const router = express.Router();

// register a new user

router.post('/register', async (req, res) => {
    res.send('working');
});

export default router;