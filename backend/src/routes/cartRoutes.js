const express = require("express")
const cartController = require("../controllers/cartController")

const router = express.Router();

router.post("/add", cartController.addToCart)

router.post("/remove",cartController.removeItem)

router.post("/update", cartController.updateQuantity)

router.get("/:userId", cartController.getCartByUserId)

module.exports = router