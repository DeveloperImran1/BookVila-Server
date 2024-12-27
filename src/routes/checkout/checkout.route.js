const express = require('express');
const { createPayment } = require('../../controller/checkout/checkout.controller');
const router = express.Router();


router.post('/createPayment', createPayment);


module.exports = router;