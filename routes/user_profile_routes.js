const express = require('express');
const authMiddleware = require('../middlewares/auth_middleware');
const { getUserInfo, addAddress, updateProfileImageUrl, getUserAddresses, getSelectedAddress, updateUserInfo, editAddress } = require('../controllers/user_profile_controller');

const userProfileRouter = express.Router();

userProfileRouter.get('/user/info', authMiddleware, getUserInfo);
userProfileRouter.post('/user/address', authMiddleware, addAddress);
userProfileRouter.post('/user/profileImageUrl', authMiddleware, updateProfileImageUrl)
userProfileRouter.get('/user/address', authMiddleware, getUserAddresses);
userProfileRouter.get('/user/address/selected', authMiddleware, getSelectedAddress);
userProfileRouter.post('/user/update', authMiddleware, updateUserInfo);
userProfileRouter.post('/user/address/edit', authMiddleware, editAddress);

module.exports = userProfileRouter;