const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Vedant@123',
  database: 'demo'
});
const createUserTableQuery = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)`;

async function createTable() {
  try {
    await db.execute(createUserTableQuery);
    console.log('Table created successfully');
  } catch (error) {
    console.error(`Error creating table: ${error.message}`);
  }
}

createTable();
app.use(express.json());
app.use(cors());
app.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
  const values = [email, hashedPassword];

  try {
    await db.execute(query, values);
    res.json({ message: 'User created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;
  const values = [email];

  try {
    const [user] = await db.execute(query, values);
    if (!user || user.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const jwt = require('jsonwebtoken');

    process.env.SECRET_KEY = 'Vedant@123';
    
    function generateToken(id) {
      const token = jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      return token;
    }

    const token = generateToken(user[0].id); 

    res.json({ token, email: user[0].email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login.' });
  }
});
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
