//import dependencies
import express from 'express';
import pool from '../database/db.js';
import cors from 'cors';
import cron from 'node-cron';

//import routes
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import fetchRoutes from './routes/fetchRoutes.js';
import createUpdateRoutes from './routes/createUpdateRoutes.js';
import deleteRoutes from './routes/deleteRoutes.js';
//server instance
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', fetchRoutes);
app.use('/api', createUpdateRoutes);
app.use('/api', deleteRoutes);

cron.schedule(' 0 0 * * *', () => {
  fetch(`http://localhost:3000/api/dbcleanup`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
  .then(response => {
    if(response.ok) {
      console.log(`Successfully ran cleanup script`);
    } else {
      console.error(`Failed to run cleanup script`)
    }
  })
  .catch(error => {
    console.error(`Error: ${error}`)
  })
});


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