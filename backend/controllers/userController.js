const User = require('../models/User');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 



// Create new user
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

       
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ 
            token, 
            userId: user.id 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

