const express = require('express');
const { getAllUser, addeNewUser, getSingleUser } = require('../../controller/user/user.controller');
const router = express.Router();


router.get('/getAllUser', getAllUser)
router.post('/addeNewUser', addeNewUser);
router.post('/getSingleUser', getSingleUser);


module.exports = router;