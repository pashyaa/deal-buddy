const express = require('express');
const multer = require('multer');
const {
    createStore,
    getStores,
    getStoreById,
    updateStore,
    deleteStore
} = require('../controllers/storeController');

const router = express.Router();
const upload = multer(); 

router.post('/', upload.single('image'), createStore);
router.get('/', getStores);
router.get('/:id', getStoreById);
router.put('/:id', upload.single('image'), updateStore);
router.delete('/:id', deleteStore);

module.exports = router;