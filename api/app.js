const express = require('express');
const app = express()
const http = require('http');
const cors = require('cors');
require("dotenv").config();
const mongoose = require("mongoose");
const port = 9000;


// Routes imports
const userRoute = require("../src/routes/user/user.route")
const booksRoute = require("../src/routes/books/books.route");
const reviewsRoute = require("../src/routes/review/review.route");
const questionRoute = require("../src/routes/question/question.route");
const authorRoute = require("../src/routes/authors/autrhor.route");
const publicationRoute = require("../src/routes/publication/publication.route");
const favoruteRoute = require("../src/routes/favorutes/favorute.route");
const addToCartRoute = require("../src/routes/addToCart/addToCart.route");
const orderRoute = require("../src/routes/orders/order.route");


// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://book-vila-client.vercel.app"],
    credentials: true,
}))


// MongoDB Connectionn
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qnwtz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x89fm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(uri, {dbName: process.env.DB_NAME})
.then(()=> console.log("Connected to MondoDB"))
.catch((err)=> console.error(err));


// Application route
app.use("/", userRoute)
app.use("/", booksRoute)
app.use("/", reviewsRoute)
app.use("/", questionRoute)
app.use("/", authorRoute)
app.use("/", publicationRoute)
app.use("/", favoruteRoute)
app.use("/", addToCartRoute)
app.use("/", orderRoute)


app.get("/", (req, res)=> {
    res.send("Welcome to BookVila Platform!")
});

app.all('*', (req, res)=> {
    res.status(404).send({
        message: "Page Not Found- 404"
    });
})


// Listening on server instead of app
app.listen(port, ()=> {
    console.log(`BookVila App is Listening on port ${port}`)
})