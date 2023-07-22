const express = require('express');
const app = express();
const port = 8080; // You can change the port number if needed

// Sample student ID and acceptance status data (replace this with your actual data or integrate with a database)
const studentData = {
    "12345": { accepted: true, password: "password123" },
    "67890": { accepted: false, password: "mypassword" },
    // Add more student ID-password pairs as needed
};

// Endpoint to check acceptance status
app.get('/check-status', (req, res) => {
    const studentId = req.query.studentId;
    const student = studentData[studentId];

    if (!student) {
        res.json({ message: "Invalid Student ID. Please check and try again." });
    } else {
        const enteredPassword = req.query.password;
        if (enteredPassword === student.password) {
            if (student.accepted) {
                res.json({ message: "Congratulations! You have been accepted." });
            } else {
                res.json({ message: "We regret to inform you that you have been rejected." });
            }
        } else {
            res.json({ message: "Incorrect password. Please try again." });
        }
    }
});

// Default route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
