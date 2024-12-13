const mongoose = require('mongoose');
const { Schema } = mongoose;

//create a schema object for menu items
const menuSchema =  new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    recipe: String,
    image: String,
    category: String,
    price: Number

});







