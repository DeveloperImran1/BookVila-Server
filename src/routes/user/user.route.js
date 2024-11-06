const express = require('express');
const { getAllUser } = require('../../controller/user/user.controller');
const router = express.Router();


router.get('/getAllUser', getAllUser)


module.exports = router;