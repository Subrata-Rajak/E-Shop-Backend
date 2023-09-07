const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
    category_name: {
        type: String,
        required: true,
    },
    category_image_url: {
        type: String,
        required: true
    },
    sub_categories: [
        {
            sub_category_name: {
                type: String,
            }
        }
    ],
});

const ProductCategory = mongoose.model("Product Category", productCategorySchema);
module.exports = ProductCategory;