const { ObjectId } = require("mongodb");
const Order = require("../../models/Orders");
const { default: axios } = require("axios");
const sendEmail = require("../../lib/sendEmail");

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
  try {
    const initiateData = {
      store_id: "bookv676ed447503e4",
      store_passwd: "bookv676ed447503e4@ssl",
      total_amount: body?.hePay,
      currency: "BDT",
      tran_id: transitionId,
      success_url: "https://book-vila-server.vercel.app/successPayment",
      fail_url: "https://book-vila-server.vercel.app/fail",
      cancel_url: "https://book-vila-server.vercel.app/cancle",
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

    const currentUser = await Order.find({
      transitionId: successData?.tran_id,
    });

    // order confirmation email send to user
    await sendEmail(currentUser?.[0]?.user?.email, {
      subject: "Your Order is Confirmed - Book Vila",
      message: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
      <h1 style="font-size: 24px; font-weight: bold; color: #160078;">Order Confirmed!</h1>
      <p style="font-size: 16px; font-weight: 600;">Dear ${currentUser?.[0]?.user?.name},</p>
      <p style="font-size: 14px; line-height: 1.6;">
        Thank you for shopping with Book Vila! Your order has been successfully placed and is now being processed.
      </p>
      <div style="margin: 20px 0;">
        <p style="font-size: 14px;">Order Details:</p>
        <ul style="list-style-type: disc; padding-left: 20px; font-size: 14px; line-height: 1.6;">
          <li><strong>Order ID:</strong> ${currentUser?.[0]?.orderId}</li>
          <li><strong>Transition ID:</strong> ${currentUser?.[0]?.transitionId}</li>
          <li><strong>Items:</strong> ${currentUser?.[0]?.items?.length} book(s)</li>
          <li><strong>Total Amount:</strong> ${currentUser?.[0]?.totalPayment} BDT</li>
          <li><strong>You have already pay:</strong> ${currentUser?.[0]?.hePay} BDT</li>
          <li><strong>Shiping Method:</strong> ${currentUser?.[0]?.shippingMethod}</li>
        </ul>
      </div>
      <p style="font-size: 14px;">You can track your order status from your dashboard:</p>
      <p style="font-size: 14px;"><a href="https://book-vila-client.vercel.app/my-order" style="color: #2332c4; text-decoration: none;">View Order</a></p>
      <p style="font-size: 14px;">For any assistance, feel free to contact us at <a href="mailto:bookvilabd@gmail.com" style="color: #2332c4; text-decoration: none;">bookvilabd@gmail.com</a>.</p>
      <p style="font-size: 14px; margin-top: 20px;">
        We appreciate your trust in Book Vila and look forward to serving you again!
      </p>
      <p style="font-size: 14px;">Sincerely,</p>
      <p style="font-size: 14px; font-weight: bold;">The Book Vila Team</p>
      <img src="https://i.postimg.cc/PxpwHK1k/Book-Vila-logo-removebg-preview.png" alt="Book Vila logo" width="200" height="200" />
    </div>
    `,
    });

    // redirect success page
    res.redirect("https://book-vila-client.vercel.app/success");
  } catch (error) {
    console.error("Error in successPayment:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// fail page a redirect er post api
const fail = async (req, res) => {
  res.redirect("https://book-vila-client.vercel.app/fail");
};

// cancle page a redirect er post api
const cancle = async (req, res) => {
  res.redirect("https://book-vila-client.vercel.app/cancle");
};

const statusUpdate = async (req, res) => {
  const { id } = req.params;
  const status = req.body?.status;
  try {
    const result = await Order.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
        },
      }
    );

    res.status(200).json(result); // Send the updated book as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error message
  }
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
  statusUpdate,
};
