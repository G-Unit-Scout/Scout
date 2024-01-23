//import dependencies
import express from 'express';
import pool from '../database/db.js';
import cors from 'cors';

//import routes
// import authRouter from './routes/auth.js';
import registerRouter from './routes/register.js';

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api', registerRouter);
// app.use('/api', authRouter);

//test connection in postman
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users;');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error', error);
    res.status(400).send('Bad Request');
  }
});

//start server
const port = pool.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});