const order = require("../models/order")
const product = require("../models/product");
const cart = require("../models/cart");

async function placeOrder(req, res) {
    try {
        const {userId, address} = req.body;

        // get cart details
        const userCart = await cart.findOne({userId}).populate("items.productId");

        if (!userCart || userCart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // prepare order items
        const orderItems = userCart.items.map(i => ({
            productId: i.productId._id,
            quantity: i.quantity,
            price: i.productId.price,
        }));

        // calculate total amount
        const totalAmount = orderItems.reduce(
            (sum, i) => sum + (i.quantity * i.price), 
            0
        );

        // deduct stock
        for (let item of orderItems) {
            const prod = await product.findById(item.productId);

            if (!prod || prod.stock < item.quantity) {
                return res.status(400).json({ message: "Insufficient stock" });
            }

            prod.stock -= item.quantity;
            await prod.save();
        }

        // create order
        const newOrder = await order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: "COD",
        });

        // clear cart
        await cart.findOneAndUpdate({userId}, {items: []});

        res.status(201).json({
            message: "Order placed successfully",
            orderId: newOrder._id
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", err })
    }
}

module.exports = {
    placeOrder,
}