const Product = require('../models/productModel');
const fs = require('fs');

function allProductController(req,res){
    Product.find()
    .then(products => res.status(200).json(products))
    .catch(err => res.status(500).json({message:'Server error'}));
}

async function singleProductController(req,res){
    const {id} = req.params;
    try {
        const product = await Product.findOne({_id:id});
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:'Server error'});
    }
}

async function getSingleProductImgController(req,res){
    const {id} = req.params;
    try {
        const product = await Product.findOne({_id:id}); 
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        res.set('Content-Type',product.image.contentType);
        res.send(product.image.data);
    }
    catch (error) {
        res.status(500).json({message:'Server error'});
    }
}

async function addProductController(req,res){
    const {name,price} = req.fields;
    const {path} = req.files.image;
    console.log(req.files.image);
    try {
        const imagedata = fs.readFileSync(path);
        const contentType = req.files.image.type;
        if (!imagedata || !contentType) {
            return res.status(400).json({message:'Image is required'});
        }
        if(imagedata.length > 1000000){
            return res.status(400).json({message:'Image size should not exceed 1mb'});
        }
        const product = new Product({name,price,image:{data:imagedata,contentType:contentType}});
        await product.save();
        res.status(201).json({message:'Product added successfully'});
    } catch (error) {
        res.status(500).json({message:'Server error'});
    }
}

function updateProductController(req,res){
    const {id} = req.params;
    const {name,price,category} = req.body;
    Product.findByIdAndUpdate(id,{name,price,category})
    .then(() => res.status(200).json({message:'Product updated successfully'}))
    .catch(err => res.status(500).json({message:'Server error'}));
}

function deleteProductController(req,res){
    const {id} = req.params;
    Product.findByIdAndDelete(id)
    .then(() => res.status(200).json({message:'Product deleted successfully'}))
    .catch(err => res.status(500).json({message:'Server error'}));
}


module.exports = {allProductController,singleProductController,addProductController,updateProductController,deleteProductController,getSingleProductImgController}; 