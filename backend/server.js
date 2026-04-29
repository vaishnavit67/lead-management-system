const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const pool = require('./config/db');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running...")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB Error');
  }
});

const leadRoutes = require('./routes/leadRoutes');
app.use('/api/leads', leadRoutes);