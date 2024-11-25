const express = require('express');
const { getAllReviews, getMyReviews, getReview, addNewReview } = require('../../controller/reviews/review.controller');
const router = express.Router();


router.get('/getAllReviews', getAllReviews);
router.get('/getMyReviews/:email', getMyReviews);
router.get('/getReview/:id', getReview);
router.post('/addNewReview/:id', addNewReview);


module.exports = router;