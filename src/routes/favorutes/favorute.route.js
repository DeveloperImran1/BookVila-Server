const express = require('express');
const { getMyFavorutes, addFavoruteBook, deleteFavoruteBook } = require('../../controller/favorutes/favorutes.controller');
const router = express.Router();


router.get('/getMyFavorutes/:myEmail', getMyFavorutes);
router.post('/addFavoruteBook', addFavoruteBook);
router.delete('/deleteFavoruteBook/:id', deleteFavoruteBook);


module.exports = router;