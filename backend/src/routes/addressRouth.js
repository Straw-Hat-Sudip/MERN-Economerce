const express = require("express")
const addrressController = require("../controllers/addressController")

const router = express.Router()

router.post("/add", addrressController.saveAddress)

router.get("/:userId", addrressController.getAddress)

module.exports = router