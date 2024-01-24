/* eslint-disable no-unused-vars */
//import dependencies
import express from 'express';
import pool from '../database/db.js';
import cors from 'cors';

//import routes here, each route will be a separate file inside the routes folder
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

//server instance
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes get invoked here with the app.use middleware function
//example http://localhost:3000/api (this is the base url)
//inside of the userRoutes file, the route is defined as /register
//example http://localhost:3000/api/register (this is the full url)
app.use('/api', userRoutes);
app.use('/api', adminRoutes);

//test connection in postman
//example http://localhost:3000/
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