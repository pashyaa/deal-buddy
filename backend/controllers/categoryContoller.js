const Category = require('../models/Category');

// Create new category with optional image
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file ? req.file.buffer : null;
        const category = await Category.create({ name, image });
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all categories, with images in base64 format
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        const categoriesWithImages = categories.map(category => ({
            ...category.toJSON(),
            image: category.image ? `data:image/png;base64,${category.image.toString('base64')}` : null
        }));
        res.status(200).json(categoriesWithImages);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get category by ID, with image in base64 format if available
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const categoryWithImage = {
            ...category.toJSON(),
            image: category.image ? `data:image/png;base64,${category.image.toString('base64')}` : null
        };
        res.status(200).json(categoryWithImage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update category with optional new image
exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file ? req.file.buffer : null;
        const [updated] = await Category.update({ name, image }, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
