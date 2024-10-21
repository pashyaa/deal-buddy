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
const createCouponTableQuery=`
CREATE TABLE IF NOT EXISTS coupons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  discountType ENUM('Percentage', 'Flat') NOT NULL,
  discountValue DECIMAL(10, 2) NOT NULL,
  expiryDate DATE NOT NULL,
  status ENUM('Active', 'Inactive') NOT NULL
);
`;
async function createTable() {
  try {
    await db.execute(dropUserTableQuery);
    console.log('Table dropped successfully');

    await db.execute(createUserTableQuery);
    console.log('User table created successfully');

    await db.execute(createCouponTableQuery);
    console.log('Coupon table created successfully');

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

app.get('/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const query = 'SELECT id, firstName, lastName, email, mobile, country FROM users WHERE id = ?';
    
    db.execute(query, [userId])
      .then(([user]) => {
        if (!user || user.length === 0) {
          return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ user: user[0] });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve user profile.' });
      });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
});

app.put('/coupons/:id', async (req, res) => {
  const { code, description, discountType, discountValue, expiryDate } = req.body;
  const { id } = req.params;

  // Log the incoming data
  console.log('Updating coupon with data:', {
    code,
    description,
    discountType,
    discountValue,
    expiryDate,
    id
  });

  const query = `
    UPDATE coupons SET code = ?, description = ?, discountType = ?, discountValue = ?, expiryDate = ?, status = 'Active'
    WHERE id = ?
  `;
  const values = [
    code,
    description,
    discountType,
    discountValue,
    expiryDate,
    id
  ];

  try {
    await db.execute(query, values);
    res.json({ message: 'Coupon updated successfully.' });
  } catch (error) {
    console.error('Error updating coupon:', error.message);
    res.status(500).json({ error: 'Failed to update coupon.' });
  }
});


app.post('/coupons', async (req, res) => {
  const { code, description, discountType, discountValue, expiryDate, status } = req.body;
  const query = `
    INSERT INTO coupons (code, description, discountType, discountValue, expiryDate, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [code, description, discountType, discountValue, expiryDate, status];

  try {
    await db.execute(query, values);
    res.json({ message: 'Coupon added successfully.' });
  } catch (error) {
    console.error('Error adding coupon:', error.message);
    res.status(500).json({ error: 'Failed to add coupon.' });
  }
});

app.get('/coupons', async (req, res) => {
  const query = 'SELECT * FROM coupons';
  try {
    const [coupons] = await db.execute(query);
    res.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error.message);
    res.status(500).json({ error: 'Failed to fetch coupons.' });
  }
});

app.put('/coupons/:id', async (req, res) => {
  const { code, description, discountType, discountValue, expiryDate, status } = req.body;
  const { id } = req.params;

  console.log('Updating coupon with data:', {
    code,
    description,
    discountType,
    discountValue,
    expiryDate,
    status,
    id
  });

  const query = `
    UPDATE coupons SET code = ?, description = ?, discountType = ?, discountValue = ?, expiryDate = ?, status = ?
    WHERE id = ?
  `;
  const values = [code, description, discountType, discountValue, expiryDate, status, id];

  try {
    await db.execute(query, values);
    res.json({ message: 'Coupon updated successfully.' });
  } catch (error) {
    console.error('Error updating coupon:', error.message);
    res.status(500).json({ error: 'Failed to update coupon.' });
  }
});

app.delete('/coupons/:id', async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM coupons WHERE id = ?`;

  try {
    await db.execute(query, [id]);
    res.json({ message: 'Coupon deleted successfully.' });
  } catch (error) {
    console.error('Error deleting coupon:', error.message);
    res.status(500).json({ error: 'Failed to delete coupon.' });
  }
});


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
