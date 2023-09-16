const ProductCategory = require("../models/product_category_model");

const addProductCategory = async (req, res) => {
    const { categoryName, categoryImageUrl } = req.body;

    try {
        const newCategory = new ProductCategory({ category_name: categoryName, category_image_url: categoryImageUrl });
        const category = await newCategory.save();

        res.status(201).send({ message: "Category Added Successfully", product_category: { ...category._doc } });
    } catch (error) {
        console.log(`Error while adding product category ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getAllProductCategories = async (req, res) => {
    try {
        const allProductCategories = await ProductCategory.find();
        res.status(200).send({ product_categories: allProductCategories });
    } catch (error) {
        console.log(`Error while fetching all product categories ${error}`);
        res.status(500).send({ message: "Something Wrong happened" });
    }
}

const addSubCategory = async (req, res) => {
    const { categoryId, subCategoryName } = req.body;

    try {
        const existingCategory = await ProductCategory.findById(categoryId);

        if (!existingCategory) {
            return res.status(404).send({ message: "Category not found" });
        }

        existingCategory.sub_categories.push(subCategoryName);
        const updatedCategory = await existingCategory.save();
        res.status(201).send({ message: "Successfully added sub category", category: { ...updatedCategory._doc } });
    } catch (error) {
        console.log(`Error while adding sub category ${error}`);
        res.status(500).send({ message: "Something Wrong happened" });
    }
}

module.exports = { addProductCategory, getAllProductCategories, addSubCategory }