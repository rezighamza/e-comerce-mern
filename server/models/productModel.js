const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image :{
        data : Buffer,
        contentType : String
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;