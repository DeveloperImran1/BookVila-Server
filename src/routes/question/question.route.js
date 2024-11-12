const express = require('express');
const { getSingleBookQuestion } = require('../../controller/questions/question.controller');
const router = express.Router();


router.get('/getSingleBookQuestion/:id', getSingleBookQuestion)


module.exports = router;