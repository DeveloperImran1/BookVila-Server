const express = require('express');
const { getAllOrder, getMyOrder } = require('../../controller/orders/order.controller');
const router = express.Router();


router.get('/getAllOrder', getAllOrder);
router.get('/getMyOrder/:myEmail', getMyOrder);


module.exports = router;