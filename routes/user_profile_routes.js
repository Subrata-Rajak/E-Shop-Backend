const express = require('express');
const authMiddleware = require('../middlewares/auth_middleware');
const { getUserInfo, addAddress, updateProfileImageUrl } = require('../controllers/user_profile_controller');

const userProfileRouter = express.Router();

userProfileRouter.get('/user/info', authMiddleware, getUserInfo);
userProfileRouter.post('/user/address', authMiddleware, addAddress);
userProfileRouter.post('/user/profileImageUrl', authMiddleware, updateProfileImageUrl)

module.exports = userProfileRouter;