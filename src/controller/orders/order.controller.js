const { ObjectId } = require("mongodb");
const Order = require("../../models/Orders");
const { default: axios } = require("axios");

const getAllOrder = async (req, res) => {
  try {
    const result = await Order.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMyOrder = async (req, res) => {
  const myEmail = req.params.myEmail;
  try {
    const result = await Order.find({ "user.email": myEmail });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get order with orderId
const getMyOrderWithId = async (req, res) => {
  const orderId = req.params.orderId;
  const body = req.body;
  try {
    const result = await Order.find({ orderId: orderId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create new order
const createNewOrder = async (req, res) => {
  const newOrder = req.body;
  try {
    const result = await Order.create(newOrder);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// payment related api

const createPayment = async (req, res) => {
  const body = req.body;
  const transitionId = new ObjectId().toString();
  console.log("body is ", body);
  try {
    const initiateData = {
      store_id: "bookv676ed447503e4",
      store_passwd: "bookv676ed447503e4@ssl",
      total_amount: body?.hePay,
      currency: "BDT",
      tran_id: transitionId,
      success_url: "http://localhost:9000/successPayment",
      fail_url: "http://localhost:9000/fail",
      cancel_url: "http://localhost:9000/cancle",
      cus_name: body?.name,
      cus_email: body?.email,
      cus_add1: `District ${body?.district}`,
      cus_add2: `Thana ${body?.thana}`,
      cus_city: `address ${body?.address}`,
      cus_state: `address ${body?.address}`,
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: body?.contact,
      cus_fax: body?.contact,
      shipping_method: "NO",
      multi_card_name: "mastercard,visacard,amexcard",
      product_name: "Book",
      product_category: "Book",
      product_profile: "general",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
    };
    const responce = await axios.post(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      new URLSearchParams(initiateData).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("responce ", responce);

    const updateData = await Order.updateOne(
      { orderId: body?.orderId },
      {
        $set: {
          transitionId: transitionId,
          totalPayment: body?.totalPayment,
          hePay: body?.hePay,
          shippingMethod: body?.shippingMethod,
          cashOnDelivery: body?.cashOnDelivery,
          user: {
            name: body?.name,
            email: body?.email,
            contact: body?.contact,
            address: body?.address,
            thana: body?.thana,
            district: body?.district,
            note: body?.note,
          },
        },
      }
    );

    console.log("updateData", updateData);

    // if (data) {
    res.send({
      paymentUrl: responce.data.GatewayPageURL,
    });
    // }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const successPayment = async (req, res) => {
  try {
    const successData = req?.body; // Access req.body directly

    if (successData?.status !== "VALID") {
      throw new Error("Unauthorized payment, Invalid payment");
    }

    // success data status valid hole
    const updateData = await Order.updateOne(
      { transitionId: successData?.tran_id },
      {
        $set: {
          payment: "success",
          status: "Processing",
          hePayd: successData?.amount,
          cardType: successData?.card_type,
          transitionDate: successData?.tran_date,
        },
      }
    );
    console.log("success data", successData, "update data", updateData);

    // redirect success page
    res.redirect("http://localhost:3000/success");
  } catch (error) {
    console.error("Error in successPayment:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// fail page a redirect er post api
const fail = async (req, res) => {
  res.redirect("http://localhost:3000/fail");
};

// cancle page a redirect er post api
const cancle = async (req, res) => {
  res.redirect("http://localhost:3000/cancle");
};

module.exports = {
  getAllOrder,
  getMyOrder,
  getMyOrderWithId,
  createNewOrder,
  createPayment,
  successPayment,
  fail,
  cancle,
};
