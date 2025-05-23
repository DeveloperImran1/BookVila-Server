const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const port = 9000;

// Routes imports
const userRoute = require("../src/routes/user/user.route");
const booksRoute = require("../src/routes/books/books.route");
const reviewsRoute = require("../src/routes/review/review.route");
const questionRoute = require("../src/routes/question/question.route");
const authorRoute = require("../src/routes/authors/autrhor.route");
const publicationRoute = require("../src/routes/publication/publication.route");
const favoruteRoute = require("../src/routes/favorutes/favorute.route");
const addToCartRoute = require("../src/routes/addToCart/addToCart.route");
const orderRoute = require("../src/routes/orders/order.route");
const categoryRoute = require("../src/routes/category/category.route");
const subjectRoute = require("../src/routes/subject/subject.route");
const subCategoryRoute = require("../src/routes/subCategory/subCategory.route");
const bannerRoute = require("../src/routes/banner/banner.route");

// Middleware
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://www.readora.shop",
      "http://localhost:3001",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// MongoDB Connectionn
// previewus database bookvila uri
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x89fm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// current database bookvilabd uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bkrwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri, { dbName: process.env.DB_NAME })
  .then(() => console.log("Connected to MondoDB"))
  .catch((err) => console.error(err));

// Application route
app.use("/", userRoute);
app.use("/", booksRoute);
app.use("/", reviewsRoute);
app.use("/", questionRoute);
app.use("/", authorRoute);
app.use("/", publicationRoute);
app.use("/", favoruteRoute);
app.use("/", addToCartRoute);
app.use("/", orderRoute);
app.use("/", categoryRoute);
app.use("/", subCategoryRoute);
app.use("/", subjectRoute);
app.use("/", bannerRoute);

app.get("/", (req, res) => {
  res.send("Welcome to BookVila Platform!");
});

app.all("*", (req, res) => {
  res.status(404).send({
    message: "Page Not Found- 404",
  });
});

// Listening on server instead of app
app.listen(port, () => {
  console.log(`BookVila App is Listening on port ${port}`);
});
