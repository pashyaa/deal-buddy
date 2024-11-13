const express = require('express');
const multer = require('multer');
const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryContoller');

const router = express.Router();
const upload = multer(); 


router.post('/', upload.single('image'), createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', upload.single('image'), updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
