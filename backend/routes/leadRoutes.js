const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Add lead
router.post('/', async (req, res) => {
  try {
    const { name, phone, car_model, source, email, budget } = req.body;

    const result = await pool.query(
      `INSERT INTO leads (name, phone, car_model, source, email, budget)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        name,
        phone,
        car_model,
        source,
        email || null,
        budget ? parseInt(budget) : null
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding lead');
  }
});

// Get all leads
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching leads');
  }
});

// Update lead status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE leads SET status=$1 WHERE id=$2 RETURNING *',
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating lead');
  }
});

// Delete lead
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM leads WHERE id=$1', [id]);

    res.send('Lead deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting lead');
  }
});

module.exports = router;