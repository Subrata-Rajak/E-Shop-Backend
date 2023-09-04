const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateOtp = require('../utils/generate_otp');
const Otp = require('../models/otp_model');
const transporter = require('../config/nodemailer_config');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gender: "",
            phone: ""
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

        res.status(201).send({ message: "Registration Successful", token, user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened while registering the user" });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.status(200).send({ message: 'Login successful', user, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while logging in' });
    }
}

const sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const otp = generateOtp();

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify your Email",
            html: `<p>Your otp is ${otp}</p>`
        };

        const hashedOtp = await bcrypt.hash(otp, 10);

        const newOtp = new Otp({
            userEmail: user.email,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiredAt: Date.now() + 3600000,
        });

        await newOtp.save();
        await transporter.sendMail(mailOptions);
        res.status(201).send({
            message: "Otp sent successfully",
            data: {
                userId: user._id,
                email,
                newOtp,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something wrong happened while sending otp",
        });
    }
}

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const userOtpRecords = await Otp.find({ userEmail: email });

        if (userOtpRecords.length <= 0) {
            return res.status(404).send({ message: "No otp records found for the user" });
        } else {
            const { expiredAt } = userOtpRecords[0];
            const hashedOtp = userOtpRecords[0].otp;

            if (expiredAt < Date.now()) {
                await Otp.deleteMany({ userEmail: email });
                return res.status(401).send({ message: "Otp expired already" });
            } else {
                const valid = await bcrypt.compare(otp, hashedOtp);

                if (!valid) {
                    return res.status(401).send({ message: "Invalid Otp" });
                } else {
                    await Otp.deleteMany({ userEmail: email });
                    return res.status(200).send({ message: "Otp verified" });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something wrong happened while verifying otp",
        });
    }
}

const resendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        await Otp.deleteMany({ userEmail: email });

        const otp = generateOtp();

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify your Email",
            html: `<p>Your otp is ${otp}</p>`
        };

        const hashedOtp = await bcrypt.hash(otp, 10);

        const newOtp = new Otp({
            userEmail: email,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiredAt: Date.now() + 3600000,
        });

        await newOtp.save();
        await transporter.sendMail(mailOptions);
        res.status(201).send({
            message: "Otp sent successfully",
            data: {
                userId: user._id,
                email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something wrong happened while resending otp",
        });
    }
}

const updatePassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid current password' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something wrong happened while updating password",
        });
    }
}

module.exports = { registerUser, loginUser, sendOtp, verifyOtp, resendOtp, updatePassword }