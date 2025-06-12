const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'inf_user',
  password: 'your_password', // Replace with your MySQL password
  database: 'informaticki_projekt',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get books with pagination
app.get('/books', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const [totalResult] = await pool.query('SELECT COUNT(*) as total FROM books');
    const total = totalResult[0].total;

    const [books] = await pool.query(
      'SELECT * FROM books ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    res.json({ total, books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a book
app.post('/books', async (req, res) => {
  const { title, author, description, year } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO books (title, author, description, year) VALUES (?, ?, ?, ?)',
      [title, author, description, year]
    );
    const insertedId = result.insertId;
    const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [insertedId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit a book
app.put('/books/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, description, year } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE books SET title = ?, author = ?, description = ?, year = ? WHERE id = ?',
      [title, author, description, year, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [result] = await pool.query('DELETE FROM books WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
