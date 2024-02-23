const express = require('express');
const router = express.Router();
const {
    allCategorieController,
    singleCategorieController,
    addCategorieController,
    updateCategorieController,
    deleteCategorieController
} = require('../controllers/categorieController');


router.get('/categorie',allCategorieController);
router.get('/categorie/:id',singleCategorieController);
router.post('/categorie',addCategorieController);
router.put('/categorie/:id',updateCategorieController);
router.delete('/categorie/:id',deleteCategorieController);


module.exports = router;
