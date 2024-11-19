const express = require('express');
const { getAllReviews, getMyReviews } = require('../../controller/reviews/review.controller');
const router = express.Router();


router.get('/getAllReviews', getAllReviews);
router.get('/getMyReviews/:email', getMyReviews);


module.exports = router;