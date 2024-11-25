const express = require('express');
const { getAllOrder, getMyOrder, createNewOrder } = require('../../controller/orders/order.controller');
const router = express.Router();


router.get('/getAllOrder', getAllOrder);
router.get('/getMyOrder/:myEmail', getMyOrder);
router.post('/createNewOrder', createNewOrder);


module.exports = router;