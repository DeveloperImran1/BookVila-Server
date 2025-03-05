const express = require("express");
const {
  getAllBanner,
  addNewBanner,
  deleteBanner,
} = require("../../controller/banner/banner.controller");

const router = express.Router();

router.get("/getAllBanner", getAllBanner);
router.post("/addNewBanner", addNewBanner);
router.delete("/deleteBanner/:id", deleteBanner);

module.exports = router;
