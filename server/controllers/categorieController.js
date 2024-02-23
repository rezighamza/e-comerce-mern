const Categorie = require('../models/categorieModel');

const allCategorieController = async (req, res) => {
    try {
        const categories = await Categorie.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const singleCategorieController = async (req, res) => {
    try {
        const categorie = await Categorie.findById(req.params.id);
        res.json(categorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const addCategorieController = async (req, res) => {
    const { name } = req.body;
    try {
        const categorie = new Categorie({ name });
        await categorie.save();
        res.json({ message: 'Categorie added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCategorieController = async (req, res) => {
    const { name } = req.body;
    try {
        await Categorie.findByIdAndUpdate(req.params.id, { name });
        res.json({ message: 'Categorie updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCategorieController = async (req, res) => {
    try {
        await
            Categorie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Categorie deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    allCategorieController,
    singleCategorieController,
    addCategorieController,
    updateCategorieController,
    deleteCategorieController
}
