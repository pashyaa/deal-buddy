const Store = require('../models/Store');

// Create a new store
exports.createStore = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file ? req.file.buffer : null; 
        const store = await Store.create({ name, image });
        res.status(201).json(store);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all stores
exports.getStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        const storesWithImages = stores.map(store => ({
            ...store.toJSON(),
            image: store.image ? `data:image/png;base64,${store.image.toString('base64')}` : null
        }));
        res.status(200).json(storesWithImages);
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
        const { name } = req.body;
        const image = req.file ? req.file.buffer : null; 
        const [updated] = await Store.update({ name, image }, {
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
