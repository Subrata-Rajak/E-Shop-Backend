const Cart = require("../models/cart_model");
const Product = require("../models/product_model");

const getAllCartItems = async (req, res) => {
    const { email } = req.query;

    try {
        const cartItems = await Cart.findOne({ user_email: email });
        if (!cartItems) {
            return res.status(404).send({ message: "Cart items not found of this user" });
        }
        res.status(200).send(cartItems);
    } catch (error) {
        console.log(`Error while getting all cart items ${error}`)
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const addToCart = async (req, res) => {
    const { email, productId, } = req.body;

    try {
        let cartItems = await Cart.findOne({ user_email: email });
        let product = await Product.findById(productId);

        if (!cartItems) {
            cartItems = new Cart({
                user_email: email,
                products: [],
            });
        }

        if (!product) {
            return res.status(404).send({ message: "No product found with this id" });
        }

        const existingProduct = cartItems.products.find(product => product.product_id === productId);

        if (!existingProduct) {
            cartItems.products.push({
                product_id: productId,
                product_name: product.name,
                product_description: product.description,
                product_price: product.price,
                product_image_url: product.image_url[0],
                product_stock: product.stock_quantity,
                cart_quantity: 1,
            });

            await cartItems.save();
            return res.status(201).json({ message: 'Product added to cart successfully' });
        } else {
            return res.status(400).json({ message: 'Product already exists in the cart' });
        }
    } catch (err) {
        console.error(`Error while adding to wishlist ${err}`);
        return res.status(500).json({ message: 'Something wrong happened' });
    }
}

const increaseProductQuantity = async (req, res) => {
    const { email, productId } = req.body;

    try {
        let cartItems = await Cart.findOne({ user_email: email });
        let product = await Product.findById(productId);

        if (!cartItems) {
            return res.status(404).send({ message: "Cart not found" });
        }

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const existingProduct = cartItems.products.find(product => product.product_id === productId);

        if (!existingProduct) {
            return res.status(404).send({ message: "Product is not in cart" });
        }

        if (existingProduct.product_stock > existingProduct.cart_quantity) {
            existingProduct.cart_quantity += 1;
        }

        await cartItems.save();
        res.status(201).send({ message: "Product quantity increased successfully", existingProduct });
    } catch (error) {
        console.log(`Error while increasing product quantity ${error}`)
        res.status(500).send({ message: "Something Wrong happened" });
    }
}

const decreaseProductQuantity = async (req, res) => {
    const { email, productId } = req.body;

    try {
        let cartItems = await Cart.findOne({ user_email: email });
        let product = await Product.findById(productId);

        if (!cartItems) {
            return res.status(404).send({ message: "Cart not found" });
        }

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const existingProduct = cartItems.products.find(product => product.product_id === productId);

        if (!existingProduct) {
            return res.status(404).send({ message: "Product is not in cart" });
        }

        if (existingProduct.cart_quantity > 0) {
            existingProduct.cart_quantity -= 1;
        }

        await cartItems.save();
        res.status(201).send({ message: "Product quantity decreased successfully", existingProduct });
    } catch (error) {
        console.log(`Error while increasing product quantity ${error}`)
        res.status(500).send({ message: "Something Wrong happened" });
    }
}

const removeFromCart = async (req, res) => {
    const { email, productId } = req.body;
    try {
        const cartItems = await Cart.findOne({ user_email: email });

        if (!cartItems) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cartItems.products.findIndex(item => item.product_id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the wishlist' });
        }

        cartItems.products.splice(productIndex, 1);

        await cartItems.save();

        return res.status(201).json({ message: 'Product removed from cart successfully' });
    } catch (err) {
        console.error(`Error while removing from cart: ${err}`);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const isProductInCart = async (req, res) => {
    const { email, productId } = req.query;

    try {
        const cartItems = await Cart.findOne({ user_email: email });

        if (!cartItems) {
            return res.status(404).send({ message: "No Cart found of this user" });
        }

        const productIndex = cartItems.products.findIndex(item => item.product_id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the Cart' });
        }

        res.status(200).send({ message: "Product is in Cart" });
    } catch (error) {
        console.log(`Error while checking if product already in Cart: ${error}`)
        res.status(500).send({ message: "Something wrong happened" });
    }
}

module.exports = { getAllCartItems, addToCart, increaseProductQuantity, decreaseProductQuantity, removeFromCart, isProductInCart };