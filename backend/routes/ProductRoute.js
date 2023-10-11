const express = require('express');
const multer = require('multer');

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/Products');
const { verifyUser } = require('../middleware/AuthUser');
const storage = require('../config/Storage');

const router = express.Router();
const upload = multer({ storage });

router.get('/products', verifyUser, getProducts);
router.get('/products/:id', verifyUser, getProductById);
router.post('/products', verifyUser, upload.single('image'), createProduct);
router.patch('/products/:id', verifyUser, upload.single('image'), updateProduct);
router.delete('/products/:id', verifyUser, deleteProduct);

module.exports = router;