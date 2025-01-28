const express = require("express");
const {
  getAllOrder,
  getMyOrder,
  createNewOrder,
  createPayment,
  successPayment,
  fail,
  cancle,
  getMyOrderWithId,
  statusUpdate,
} = require("../../controller/orders/order.controller");
const router = express.Router();

router.get("/getAllOrder", getAllOrder);
router.get("/getMyOrder/:myEmail", getMyOrder);
router.get("/getMyOrderWithId/:orderId", getMyOrderWithId);
router.post("/createNewOrder", createNewOrder);

// payment related route
router.post("/createPayment", createPayment);
router.post("/successPayment", successPayment);
router.post("/fail", fail);
router.post("/cancle", cancle);
router.put("/statusUpdate/:id", statusUpdate);

module.exports = router;
