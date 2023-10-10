const Review = require('../models/review_model')

const addReview = async (req, res) => {
    const { email, profileImageUrl, productId, imageUrls, rating, comment } = req.body;

    try {
        const review = await Review.findOne({ 'user.email': email });

        if (review) {
            return res.status(400).send({ message: "Review already exist" });
        }

        const newReview = new Review({
            user: {
                email: email,
                profile_image_url: profileImageUrl,
            },
            product_id: productId,
            image_urls: imageUrls,
            rating,
            comment,
            date: Date.now(),
        });

        await newReview.save();
        res.status(201).send({ message: "Successfully added review" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const deleteReview = async (req, res) => {
    const { reviewId } = req.body;

    try {
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).send({ message: "Review with this id not found" })
        }

        await Review.findByIdAndDelete(reviewId);

        res.status(201).send({ message: "Successfully deleted the review" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getReviewsOfProduct = async (req, res) => {
    const { productId } = req.query;

    try {
        const reviews = await Review.find({ product_id: productId });

        if (!reviews) {
            return res.status(404).send({ message: "No reviews found for the product" });
        }

        res.status(200).send({ reviews });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getReviewsOfUser = async (req, res) => {
    const { email } = req.query;

    try {
        const reviews = await Review.find({ 'user.email': email });

        if (!reviews) {
            return res.status(404).send({ message: "No reviews found for the user" });
        }

        res.status(200).send({ reviews });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getProductRating = async (req, res) => {
    const { productId } = req.query;

    try {
        const reviews = await Review.find({ product_id: productId });

        if (!reviews) {
            return res.status(404).send({ message: "No reviews found of this product" });
        }

        const length = reviews.length;
        let totalRating = 0;

        for (let i = 0; i < length; i++) {
            totalRating += reviews[i].rating;
        }

        const finalRating = totalRating / length;
        res.status(200).send({ rating: finalRating });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

module.exports = { addReview, deleteReview, getReviewsOfProduct, getReviewsOfUser, getProductRating }