const User = require("../models/user_model");

const getUserInfo = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ message: "User with this email" });
        }

        res.status(200).send({ user: { ...existingUser._doc } });
    } catch (error) {
        console.log(`Error while getting user info: ${error}`);
        res.status(500).send({ message: "Something went wrong" });
    }
}

const addAddress = async (req, res) => {
    const { email, country, state, city, landmark, pincode, area } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ message: "User with this email not found" });
        }

        const newAddress = {
            country,
            state,
            city,
            area,
            landmark,
            pincode,
        };

        existingUser.address.push(newAddress);

        const updatedUser = await existingUser.save();

        res.status(200).send({ message: "Successfully updated address", user: { ...updatedUser._doc } });
    } catch (error) {
        console.log(`Error while adding address, ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const updateProfileImageUrl = async (req, res) => {
    const { email, url } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({ email }, { profile_image_url: url }, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: "User with this email not found" });
        }

        res.status(200).send({ message: "Profile Image updated successfully", user: { ...updatedUser._doc } });
    } catch (error) {
        console.log(`Error while updating profile image url, ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

module.exports = { getUserInfo, addAddress, updateProfileImageUrl }