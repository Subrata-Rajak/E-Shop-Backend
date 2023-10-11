const Product = require('../models/product_model');
const User = require('../models/user_model')

const addProduct = async (req, res) => {
    const { email, name, desc, price, category, subCategory, brand, imageUrl, stock } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ message: "User with this email not found" });
        }

        const newProduct = new Product({
            owner_info: {
                email
            },
            name,
            description: desc,
            price,
            category,
            sub_category: subCategory,
            brand,
            image_url: imageUrl,
            stock_quantity: stock,
        });

        const product = await newProduct.save();
        res.status(201).send({ message: "Product added successfully", product: { ...product._doc } });
    } catch (error) {
        console.log(`Error while adding product ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).send({ products: allProducts });
    } catch (error) {
        console.log(`Error while fetching all products ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getProductById = async (req, res) => {
    const { productId } = req.query;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send({ message: "No Product Found with this id" });
        }

        res.status(200).send(product);
    } catch (error) {
        console.log(`Error while fetching product details by id: ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getProductsByOwner = async (req, res) => {
    const { email } = req.query;

    try {
        const product = await Product.find({ 'owner_info.email': email });

        if (!product) {
            return res.status(404).send({ message: "No Product Found with this owner" });
        }

        res.status(200).send(product);
    } catch (error) {
        console.log(`Error while fetching product details by id: ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getProductsByBrand = async (req, res) => {
    const { brand } = req.query;

    try {
        const product = await Product.find({ brand });

        if (!product) {
            return res.status(404).send({ message: "No Product Found with this id" });
        }

        res.status(200).send(product);
    } catch (error) {
        console.log(`Error while fetching product details by id: ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getProductByCategory = async (req, res) => {
    const { category } = req.query;

    try {
        const products = await Product.find({ category });

        if (!products) {
            return res.status(404).send({ message: "No product found of this category" });
        }

        res.status(200).send({ products });
    } catch (error) {
        console.log(`Error while fetching products by category ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const searchProduct = async (req, res) => {
    const { tag } = req.query;

    try {
        const products = await Product.find({ 'search_tags': tag });

        if (!products) {
            return res.status(404).send({ message: "No product found with this tag" });
        }

        res.status(200).send({ products });
    } catch (error) {
        console.log(`Error while searching products ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

module.exports = { addProduct, getAllProducts, getProductById, getProductsByOwner, getProductsByBrand, getProductByCategory, searchProduct };