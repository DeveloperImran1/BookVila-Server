const express = require('express');
const { getAllUser, addeNewUser, getSingleUser, getMyProfileInfo, updateUserInfo, updatePass } = require('../../controller/user/user.controller');
const router = express.Router();


router.get('/getAllUser', getAllUser)
router.post('/addeNewUser', addeNewUser);
router.post('/getSingleUser', getSingleUser);
router.get('/getMyProfileInfo/:email', getMyProfileInfo);
router.patch('/updateUserInfo/:email', updateUserInfo);
router.put('/updatePass/:email', updatePass);


module.exports = router;