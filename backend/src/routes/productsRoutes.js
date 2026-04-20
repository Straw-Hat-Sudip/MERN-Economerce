const express = require('express')
const productsController = require('../controllers/productController')

const router = express.Router();

router.post("/add", productsController.createProduct)

router.get("/", productsController.getProduct)

router.put("/update/:id", productsController.updateProduct)

router.delete("/delete/:id", productsController.deleteProduct)

module.exports = router