// // -------------------------------- Payment With SSL Commerse ---------------------

// const { ObjectId } = require("mongodb");
// const Order = require("../../models/Orders");
// const { default: axios } = require("axios");
// const sendEmail = require("../../lib/sendEmail");

// const getAllOrder = async (req, res) => {
//   try {
//     const result = await Order.find();
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// const getMyOrder = async (req, res) => {
//   const myEmail = req.params.myEmail;
//   try {
//     const result = await Order.find({ "user.email": myEmail });
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // get order with orderId
// const getMyOrderWithId = async (req, res) => {
//   const orderId = req.params.orderId;
//   const body = req.body;
//   try {
//     const result = await Order.find({ orderId: orderId });
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // create new order
// const createNewOrder = async (req, res) => {
//   const newOrder = req.body;
//   try {
//     const result = await Order.create(newOrder);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // payment related api
// const createPayment = async (req, res) => {
//   const body = req.body;
//   const transitionId = new ObjectId().toString();
//   try {
//     const initiateData = {
//       store_id: "bookv676ed447503e4",
//       store_passwd: "bookv676ed447503e4@ssl",
//       total_amount: body?.hePay,
//       currency: "BDT",
//       tran_id: transitionId,
//       success_url: "https://book-vila-server.vercel.app/successPayment",
//       fail_url: "https://book-vila-server.vercel.app/fail",
//       cancel_url: "https://book-vila-server.vercel.app/cancle",
//       cus_name: body?.name,
//       cus_email: body?.email,
//       cus_add1: `District ${body?.district}`,
//       cus_add2: `Thana ${body?.thana}`,
//       cus_city: `address ${body?.address}`,
//       cus_state: `address ${body?.address}`,
//       cus_postcode: "1000",
//       cus_country: "Bangladesh",
//       cus_phone: body?.contact,
//       cus_fax: body?.contact,
//       shipping_method: "NO",
//       multi_card_name: "mastercard,visacard,amexcard",
//       product_name: "Book",
//       product_category: "Book",
//       product_profile: "general",
//       value_a: "ref001_A",
//       value_b: "ref002_B",
//       value_c: "ref003_C",
//       value_d: "ref004_D",
//     };
//     const responce = await axios.post(
//       "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
//       new URLSearchParams(initiateData).toString(),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     const updateData = await Order.updateOne(
//       { orderId: body?.orderId },
//       {
//         $set: {
//           transitionId: transitionId,
//           totalPayment: body?.totalPayment,
//           hePay: body?.hePay,
//           shippingMethod: body?.shippingMethod,
//           cashOnDelivery: body?.cashOnDelivery,
//           user: {
//             name: body?.name,
//             email: body?.email,
//             contact: body?.contact,
//             address: body?.address,
//             thana: body?.thana,
//             district: body?.district,
//             note: body?.note,
//           },
//         },
//       }
//     );

//     // if (data) {
//     res.send({
//       paymentUrl: responce.data.GatewayPageURL,
//     });
//     // }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const successPayment = async (req, res) => {
//   try {
//     const successData = req?.body; // Access req.body directly

//     if (successData?.status !== "VALID") {
//       throw new Error("Unauthorized payment, Invalid payment");
//     }

//     // success data status valid hole
//     const updateData = await Order.updateOne(
//       { transitionId: successData?.tran_id },
//       {
//         $set: {
//           payment: "success",
//           status: "Processing",
//           hePayd: successData?.amount,
//           cardType: successData?.card_type,
//           transitionDate: successData?.tran_date,
//         },
//       }
//     );

//     const currentUser = await Order.find({
//       transitionId: successData?.tran_id,
//     });

//     // order confirmation email send to user
//     await sendEmail(currentUser?.[0]?.user?.email, {
//       subject: "Your Order is Confirmed - Readora",
//       message: `
//     <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
//       <h1 style="font-size: 24px; font-weight: bold; color: #160078;">Order Confirmed!</h1>
//       <p style="font-size: 16px; font-weight: 600;">Dear ${currentUser?.[0]?.user?.name},</p>
//       <p style="font-size: 14px; line-height: 1.6;">
//         Thank you for shopping with Readora! Your order has been successfully placed and is now being processed.
//       </p>
//       <div style="margin: 20px 0;">
//         <p style="font-size: 14px;">Order Details:</p>
//         <ul style="list-style-type: disc; padding-left: 20px; font-size: 14px; line-height: 1.6;">
//           <li><strong>Order ID:</strong> ${currentUser?.[0]?.orderId}</li>
//           <li><strong>Transition ID:</strong> ${currentUser?.[0]?.transitionId}</li>
//           <li><strong>Items:</strong> ${currentUser?.[0]?.items?.length} book(s)</li>
//           <li><strong>Total Amount:</strong> ${currentUser?.[0]?.totalPayment} BDT</li>
//           <li><strong>You have already pay:</strong> ${currentUser?.[0]?.hePay} BDT</li>
//           <li><strong>Shiping Method:</strong> ${currentUser?.[0]?.shippingMethod}</li>
//         </ul>
//       </div>
//       <p style="font-size: 14px;">You can track your order status from your dashboard:</p>
//       <p style="font-size: 14px;"><a href="https://www.readora.shop/my-order" style="color: #2332c4; text-decoration: none;">View Order</a></p>
//       <p style="font-size: 14px;">For any assistance, feel free to contact us at <a href="mailto:readora.shop@gmail.com" style="color: #2332c4; text-decoration: none;">readora.shop@gmail.com</a>.</p>
//       <p style="font-size: 14px; margin-top: 20px;">
//         We appreciate your trust in Readora and look forward to serving you again!
//       </p>
//       <p style="font-size: 14px;">Sincerely,</p>
//       <p style="font-size: 14px; font-weight: bold;">The Readora Team</p>
//       <img src="https://res.cloudinary.com/dqdircc96/image/upload/v1745676518/Logo_R1_T_kqgxb4.png" alt="Readora logo" width="200" height="200" />
//     </div>
//     `,
//     });

//     // redirect success page
//     res.redirect("https://www.readora.shop/success");
//   } catch (error) {
//     console.error("Error in successPayment:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

// // fail page a redirect er post api
// const fail = async (req, res) => {
//   res.redirect("https://www.readora.shop/fail");
// };

// // cancle page a redirect er post api
// const cancle = async (req, res) => {
//   res.redirect("https://www.readora.shop/cancle");
// };

// const statusUpdate = async (req, res) => {
//   const { id } = req.params;
//   const status = req.body?.status;
//   try {
//     const result = await Order.updateOne(
//       { _id: new ObjectId(id) },
//       {
//         $set: {
//           status,
//         },
//       }
//     );

//     res.status(200).json(result); // Send the updated book as a response
//   } catch (error) {
//     res.status(500).json({ message: error.message }); // Send error message
//   }
// };

// module.exports = {
//   getAllOrder,
//   getMyOrder,
//   getMyOrderWithId,
//   createNewOrder,
//   createPayment,
//   successPayment,
//   fail,
//   cancle,
//   statusUpdate,
// };

// -------------------------------- Payment With Uddoktapay ---------------------

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
      full_name: body?.name,
      email: body?.email,
      amount: body?.hePay,
      metadata: {
        user_id: "10",
        order_id: "50",
        tran_id: transitionId,
        cus_add1: `District ${body?.district}`,
        cus_add2: `Thana ${body?.thana}`,
        cus_city: `address ${body?.address}`,
        cus_state: `address ${body?.address}`,
        cus_phone: body?.contact,
        cus_fax: body?.contact,
        product_name: "Book",
        product_category: "Book",
        product_profile: "general",
      },
      redirect_url: "https://book-vila-server.vercel.app/successPayment",
      cancel_url: "https://www.readora.shop/cancle",
      webhook_url: "https://book-vila-server.vercel.app/handleWebhook",
    };

    const response = await axios.post(
      // "https://sandbox.uddoktapay.com/api/checkout-v2",   // demo link
      "https://readora.paymently.io/api/checkout-v2", // live link
      initiateData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "RT-UDDOKTAPAY-API-KEY": "982d381360a69d419689740d9f2e26ce36fb7a50",  // demo key
          "RT-UDDOKTAPAY-API-KEY": "naaw3ARu8AioZCtwd8gvKtfKoR8Wj6Riloz1yf5d", // live key
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

    console.log("updateData iss", updateData);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("error iss", error.response?.data || error.message);
    res.status(500).json({ message: error.message });
  }
};

const successPayment = async (req, res) => {
  const { invoice_id } = req?.body;
  console.log(invoice_id);
  try {
    const responce = await axios.post(
      // "https://sandbox.uddoktapay.com/api/verify-payment",   //demo verify link
      "https://readora.paymently.io/api/verify-payment", // live verify link
      { invoice_id },
      {
        headers: {
          accept: "application/json",
          // "RT-UDDOKTAPAY-API-KEY": "982d381360a69d419689740d9f2e26ce36fb7a50", // your demo key
          "RT-UDDOKTAPAY-API-KEY": "naaw3ARu8AioZCtwd8gvKtfKoR8Wj6Riloz1yf5d", // my live key
          "content-type": "application/json",
        },
      }
    );

    const successData = responce.data;
    console.log("successData", successData);

    // success data status valid hole
    await Order.updateOne(
      { transitionId: successData?.metadata?.tran_id },
      {
        $set: {
          payment: "success",
          status: "Processing",
          hePay: successData?.metadata?.amount,
          cardType: successData?.payment_method,
          transitionDate: successData?.metadata?.tran_date,
        },
      }
    );

    const currentUser = await Order.find({
      transitionId: successData?.metadata?.tran_id,
    });

    // order confirmation email send to user
    await sendEmail(currentUser?.[0]?.user?.email, {
      subject: "Your Order is Confirmed - Readora",
      message: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
      <h1 style="font-size: 24px; font-weight: bold; color: #160078;">Order Confirmed!</h1>
      <p style="font-size: 16px; font-weight: 600;">Dear ${currentUser?.[0]?.user?.name},</p>
      <p style="font-size: 14px; line-height: 1.6;">
        Thank you for shopping with Readora! Your order has been successfully placed and is now being processed.
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
      <p style="font-size: 14px;"><a href="https://www.readora.shop/my-order" style="color: #2332c4; text-decoration: none;">View Order</a></p>
      <p style="font-size: 14px;">For any assistance, feel free to contact us at <a href="mailto:readora.shop@gmail.com" style="color: #2332c4; text-decoration: none;">readora.shop@gmail.com</a>.</p>
      <p style="font-size: 14px; margin-top: 20px;">
        We appreciate your trust in Readora and look forward to serving you again!
      </p>
      <p style="font-size: 14px;">Sincerely,</p>
      <p style="font-size: 14px; font-weight: bold;">The Readora Team</p>
      <img src="https://res.cloudinary.com/dqdircc96/image/upload/v1745676518/Logo_R1_T_kqgxb4.png" alt="Readora logo" width="230" height="150" />
    </div>
    `,
    });

    //  ------------------------------ It is updated order data ----------------

    // redirect success page
    res.redirect("https://www.readora.shop/success");
  } catch (error) {
    console.error("Error in successPayment:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// webhook er data get
const handleWebhook = async (req, res) => {
  console.log("handleWebhook er moddhe data webhook url er", req.body);
};

// cancle page a redirect er post api
const cancle = async (req, res) => {
  res.redirect("https://www.readora.shop/cancle");
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
  handleWebhook,
  cancle,
  statusUpdate,
};
