const User = require("../models/user_model");

const getUserInfo = async (req, res) => {
    const { email } = req.query;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ message: "User with this email  not found" });
        }

        res.status(200).send({ user: { ...existingUser._doc } });
    } catch (error) {
        console.log(`Error while getting user info: ${error}`);
        res.status(500).send({ message: "Something went wrong" });
    }
}

const addAddress = async (req, res) => {
    const { email, country, state, city, landmark, pincode, area, selected } = req.body;

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
            selected,
        };

        if (selected) {
            const addressIndex = existingUser.address.findIndex(item => item.selected == true);

            if (addressIndex >= 0) {
                existingUser.address[addressIndex].selected = false;
                await existingUser.save()
            }
        }

        existingUser.address.push(newAddress);

        const updatedUser = await existingUser.save();

        res.status(201).send({ message: "Successfully updated address", addresses: updatedUser.address });
    } catch (error) {
        console.log(`Error while adding address, ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const editAddress = async (req, res) => {
    const { email, pincode } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ message: "User with this email not found" });
        }

        const addressIndex = existingUser.address.findIndex(item => item.pincode === pincode);

        if (addressIndex === -1) {
            return res.status(404).send({ message: "Address not found" });
        }

        if (req.body.country) {
            existingUser.address[addressIndex].country = req.body.country;
        }
        if (req.body.state) {
            existingUser.address[addressIndex].state = req.body.state;
        }
        if (req.body.city) {
            existingUser.address[addressIndex].city = req.body.city;
        }
        if (req.body.landmark) {
            existingUser.address[addressIndex].landmark = req.body.landmark;
        }
        if (req.body.pincode) {
            existingUser.address[addressIndex].pincode = req.body.pincode;
        }
        if (req.body.area) {
            existingUser.address[addressIndex].area = req.body.area;
        }
        if (req.body.selected) {

            const address2Index = existingUser.address.findIndex(item => item.selected == true);

            if (address2Index >= 0) {
                existingUser.address[address2Index].selected = false;
                await existingUser.save()
            }

            existingUser.address[addressIndex].selected = req.body.selected;
        }

        const updatedUser = await existingUser.save();

        res.status(201).send({ message: "Successfully updated address", addresses: updatedUser.address });
    } catch (error) {
        console.log(`Error while adding address: ${error}`);
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

        res.status(201).send({ message: "Profile Image updated successfully", user: { ...updatedUser._doc } });
    } catch (error) {
        console.log(`Error while updating profile image url, ${error}`);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getUserAddresses = async (req, res) => {
    const { email } = req.query;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ message: "User not found with this email" });
        }

        res.status(200).send({ addresses: existingUser.address });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getSelectedAddress = async (req, res) => {
    const { email } = req.query;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ message: "User not found with this email" });
        }

        const selectedAddress = existingUser.address.find(address => address.selected == true);

        res.status(200).send({ selected_address: selectedAddress });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const updateUserInfo = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not found with this email" });
        }

        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.bio) {
            user.bio = req.body.bio;
        }
        if (req.body.gender) {
            user.gender = req.body.gender;
        }
        if (req.body.phone) {
            user.phone = req.body.phone;
        }

        const updatedUser = await user.save();

        res.status(201).send(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

module.exports = { getUserInfo, addAddress, updateProfileImageUrl, getUserAddresses, getSelectedAddress, updateUserInfo, editAddress }