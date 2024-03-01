const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');
const {
    allProductController,
    singleProductController,
    addProductController,
    updateProductController,
    deleteProductController,
    getSingleProductImgController
} = require('../controllers/productController');
const {isAuth , isAdmin} = require('../middleware/accessControle');


router.get('/product',allProductController);
router.get('/product/:id',singleProductController);
router.get('/product/image/:id',getSingleProductImgController);
//protected routes
router.use(isAuth);
router.use(isAdmin);
router.post('/product',formidableMiddleware(),addProductController);
router.put('/product/:id',updateProductController);
router.delete('/product/:id',deleteProductController);


module.exports = router;