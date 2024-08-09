const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'signup')));
app.use(express.static(path.join(__dirname, 'login')));

app.post('/submit', (req, res) => {
    const data = req.body;
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10).replace(/-/g, '');

    fs.readFile('data.json', 'utf8', (err, jsonData) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        const parsedData = jsonData ? JSON.parse(jsonData) : [];
        const userCount = parsedData.length + 1;
        const userId = `${dateString}-${userCount}`;
        const newData = { ...data, id: userId };

        parsedData.push(newData);

        fs.writeFile('data.json', JSON.stringify(parsedData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data file' });
            }
            res.json({ message: 'Data saved successfully', id: userId });
        });
    });
});

app.post('/login', (req, res) => {
    const { mail, password } = req.body;

    fs.readFile('data.json', 'utf8', (err, jsonData) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        const users = JSON.parse(jsonData);
        const user = users.find(user => (user.mail === mail || user.name === mail) && user.password === password);

        if (user) {
            res.json({ message: 'Login successful', id: user.id });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
