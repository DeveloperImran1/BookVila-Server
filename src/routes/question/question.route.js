const express = require('express');
const { getSingleBookQuestion, questionBookID } = require('../../controller/questions/question.controller');
const router = express.Router();


router.get('/getSingleBookQuestion/:id', getSingleBookQuestion)
router.get('/question/:bookID', questionBookID)


module.exports = router;