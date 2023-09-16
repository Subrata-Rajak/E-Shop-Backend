const Product = require("../models/product_model");
const WishList = require("../models/wish_list_model");

const addToWishlist = async (req, res) => {
    const { email, productId, } = req.body;

    try {
        let wishlist = await WishList.findOne({ user_email: email });
        let product = await Product.findById(productId);

        if (!wishlist) {
            wishlist = new WishList({
                user_email: email,
                products: [],
            });
        }

        if (!product) {
            return res.status(404).send({ message: "No product found with this id" });
        }

        const existingProduct = wishlist.products.find(product => product.product_id === productId);

        if (!existingProduct) {
            wishlist.products.push({
                product_id: productId,
                product_name: product.name,
                product_description: product.description,
                product_price: product.price,
                product_image_url: product.image_url[0],
                product_stock: product.stock_quantity,
            });

            await wishlist.save();
            return res.status(201).json({ message: 'Product added to wishlist successfully' });
        } else {
            return res.status(400).json({ message: 'Product already exists in the wishlist' });
        }
    } catch (err) {
        console.error(`Error while adding to wishlist ${err}`);
        return res.status(500).json({ message: 'Something wrong happened' });
    }
}

const getWishlist = async (req, res) => {
    const { email } = req.query;

    try {
        const existingWishlist = await WishList.find({ user_email: email });

        if (!existingWishlist) {
            return res.status(404).send({ message: "No wishlist found of this user" });
        }

        res.status(200).send(existingWishlist);
    } catch (error) {
        console.log(`Error while getting wishlist ${error}`);
        res.status(500).send({ message: 'Something wrong happened' });
    }
}

module.exports = { addToWishlist, getWishlist };