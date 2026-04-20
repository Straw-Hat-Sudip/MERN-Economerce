const Address = require("../models/address")

async function saveAddress(req, res){
    try {
        
        const address = await Address.create(req.body)
        res.json({message: "Address save succesfully", address})
    } catch (err) {
        
        res.status(500).json({ message: "server error", err })
    }
}

async function getAddress(req, res) {
    try {
        const addresses = await Address.find({
            userId: req.params.userId,
        })
        res.json(addresses)
    } catch (err) {
        res.status(500).json({ message: "server error", err })
    }
}


module.exports = {saveAddress, getAddress}