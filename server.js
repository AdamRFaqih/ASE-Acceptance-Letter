const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8080;

// Create a MySQL connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost', // Change this to your MySQL host (e.g., localhost)
  user: 'root', // Change this to your MySQL username
  password: '', // Change this to your MySQL password
  database: 'students_db', // Change this to your database name
});

// Endpoint to check acceptance status
app.get('/check-status', (req, res) => {
  const studentId = req.query.studentId;
  const password = req.query.password;

  // Query the database for the student ID and unique code
  const sql = 'SELECT * FROM students WHERE student_id = ? AND password = ?';
  db.query(sql, [studentId, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      res.json({ success: false, message: 'An error occurred while checking the status. Please try again.' });
    } else {
      if (results.length > 0) {
        const student = results[0];
        if (student.accepted) {
          res.json({ success: true, message: 'Congratulations! You have been accepted.' });
        } else {
          res.json({ success: false, message: 'We regret to inform you that you have been rejected.' });
        }
      } else {
        res.json({ success: false, message: 'Invalid Student ID or incorrect unique code. Please try again.' });
      }
    }
  });
});

// Default route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
