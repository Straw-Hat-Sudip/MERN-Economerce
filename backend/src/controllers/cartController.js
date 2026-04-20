const Cart = require("../models/cart")


async function addToCart(req, res) {
  try {

    const { userId, productId } = req.body

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }]
      })
    } else {

      const item = cart.items.find(
        i => i.productId.toString() === productId
      )

      if (item) {
        item.quantity += 1
      } else {
        cart.items.push({ productId, quantity: 1 })
      }

    }

    await cart.save()

    res.json({
      message: "Item added to cart",
      cart
    })

  } catch (err) {
    res.status(500).json({ message: "Server Error", err })
  }
}

async function removeItem(req, res) {
  try {

    const { userId, productId } = req.body

    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    cart.items = cart.items.filter(
      i => i.productId.toString() !== productId
    )

    await cart.save()

    res.json({
      message: "Item removed from cart",
      cart
    })

  } catch (err) {
    res.status(500).json({ message: "Server Error", err })
  }
}

async function updateQuantity(req, res) {
  try {

    const { userId, productId, quantity } = req.body

    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const item = cart.items.find(
      i => i.productId.toString() === productId
    )

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" })
    }

    item.quantity = quantity

    await cart.save()

    res.json({
      message: "Item quantity updated",
      cart
    })

  } catch (err) {
    res.status(500).json({ message: "Server Error", err })
  }
}

async function getCartByUserId(req, res) {
  try {

    const { userId } = req.params

    const cart = await Cart
      .findOne({ userId })
      .populate("items.productId")

    res.json(cart)

  } catch (err) {
    res.status(500).json({ message: "Server Error", err })
  }
}

module.exports = {
  addToCart,
  removeItem,
  updateQuantity,
  getCartByUserId
}