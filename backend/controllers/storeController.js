const Store = require('../models/Store');

// Create a new store
exports.createStore = async (req, res) => {
    try {
        const store = await Store.create(req.body);
        res.status(201).json(store);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all stores
exports.getStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json(stores);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a store by ID
exports.getStoreById = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.status(200).json(store);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a store
exports.updateStore = async (req, res) => {
    try {
        const [updated] = await Store.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.status(200).json({ message: 'Store updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a store
exports.deleteStore = async (req, res) => {
    try {
        const deleted = await Store.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.status(200).json({ message: 'Store deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
