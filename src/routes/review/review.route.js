const express = require('express');
const { getAllReviews } = require('../../controller/reviews/review.controller');
const router = express.Router();


router.get('/getAllReviews', getAllReviews)


module.exports = router;