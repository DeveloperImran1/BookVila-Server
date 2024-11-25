const express = require('express');
const { getMyAddToCart, addToCartBook, deleteCartBook } = require('../../controller/addToCart/addToCart.controller');
const router = express.Router();


router.get('/getMyAddToCart/:myEmail', getMyAddToCart);
router.post('/addToCartBook', addToCartBook);
router.delete('/deleteCartBook/:id', deleteCartBook);


module.exports = router;