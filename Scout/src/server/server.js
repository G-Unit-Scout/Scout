//import dependencies
import express from 'express';
import pool from '../database/db.js';
import cors from 'cors';

//import routes
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import testRoutes from './routes/testRoutes.js';

//server instance
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', testRoutes);


//test connection in postman
app.get('/', async (req, res) => {
  try {
    console.log(req.body);
    const result = await pool.query('SELECT * FROM users;');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error', error);
    res.status(400).send('Bad Request');
  }
});


//server error handling
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});

//start server
const port = pool.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});