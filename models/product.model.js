const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter product name"],
        },

        description: {
            type: String,
            required: [false, ""],
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        stock: {
         type: Number,
         required: true,
            default: 0,

        },

        image: {
        type: String,
        required: false,
        },
    },
    {timestamps:true}
)
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;