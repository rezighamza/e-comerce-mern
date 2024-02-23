const express = require('express');
const router = express.Router();
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
//protected routes
//router.use(isAuth);
//router.use(isAdmin);
router.post('/product',addProductController);
router.get('/product/:id/image',getSingleProductImgController);
router.put('/product/:id',updateProductController);
router.delete('/product/:id',deleteProductController);


module.exports = router;