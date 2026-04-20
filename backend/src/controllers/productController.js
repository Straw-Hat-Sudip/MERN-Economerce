const productModel = require("../models/product")

async function createProduct(req, res) {
    
    try {


        const product = await productModel.create(req.body)
        res.json({
            message: "Product listed succesfully",
            product,
        })

        
    } catch (error) {
        res.status(500).json({message: "Server Error",error})
    }
}

async function getProduct(req, res) {
    
    try {

        const {search, category} = req.query;
        let filter = {};
        if(search){
            filter.title = {$regex: search, $options: 'i'};
        }
    

        if(category){
            filter.category = category;
        }




        const products = await productModel.find(filter).sort({created: -1});
        res.json(products)

    } catch (error) {
        res.status(500).json({message: "Server Error",error})
    }
}

async function updateProduct(req, res) {
    
    try {

        const updated = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json({
            message: "product updated successfully",
            updated,
        })

    } catch (error) {
        res.status(500).json({message: "Server Error",error})
    }
}

async function deleteProduct(req, res) {
    try {

        await productModel.findByIdAndDelete(req.params.id);
        res.json({message: "product deleted successfullt"});


    } catch (error) {
        res.status(500).json({message: "Server Error",error});
    }
}

module.exports = {createProduct, getProduct, updateProduct, deleteProduct}