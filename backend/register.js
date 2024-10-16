const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const loggedUsers = []; 

const SECRET_KEY = 'Vedant@123'; 

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Vedant@123',
  database: 'demo'
});

const dropUserTableQuery = `
  DROP TABLE IF EXISTS users;
`;

const createUserTableQuery = `
  CREATE TABLE users (
    id INT AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    country VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );
`;

async function createTable() {
  try {
    await db.execute(dropUserTableQuery);
    console.log('Table dropped successfully');

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
  const { firstName, lastName, email, mobile, country, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (firstName, lastName, email, mobile, country, password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [firstName, lastName, email, mobile, country, hashedPassword];

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

    const token = jwt.sign({ id: user[0].id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    const loggedUser = loggedUsers.find(u => u.email === email);
    if (!loggedUser) {
      loggedUsers.push({
        id: user[0].id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        mobile: user[0].mobile,
        country: user[0].country
      });
    }

    res.json({
      token,
      user: {
        id: user[0].id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        mobile: user[0].mobile,
        country: user[0].country,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login.' });
  }
});

app.get('/loggedUsers', (req, res) => {
  res.json(loggedUsers); 
});

app.get('/registeredUsers', async (req, res) => {
  try {
    const query = `SELECT * FROM users`;
    const [users] = await db.execute(query);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve registered users.' });
  }
});
 
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  const deleteUserQuery = `DELETE FROM users WHERE id = ?`;

  try {
    const [result] = await db.execute(deleteUserQuery, [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});



app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
