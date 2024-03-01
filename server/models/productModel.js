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
    categorie:{
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;