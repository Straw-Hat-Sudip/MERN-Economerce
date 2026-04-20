const userModel = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Crypto = require("crypto")

async function signupUser(req, res) {
    try {

        const { name, email, password } = req.body;

        // check user exists or not
        const userExists = await userModel.findOne({ email })

        if (userExists) {
            return res.status(409).json({ message: "User already exists" })
        }

        // password hashing
        const hashpassword = await bcrypt.hash(password, 10)

        // create user
        const user = await userModel.create({
            name,
            email,
            password: hashpassword,
        });

        res.json({
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({ message: "server error", error })
    }
}

async function loginUser(req, res){

    try {
        const {email, password} = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(409).json({ message: "User not found" })
        }

        //check password
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(409).json({message: "Invalid Crediantials"})
        }

        //generate JWT token
        const token = jwt.sign({
            id: user._id,
            
        },process.env.JWT_SECRET,)

        res.cookie("token", token) 

        res.json({
            message: "Login succesfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });


    } catch (error) {
        res.status(500).json({ message: "server error", error })
    }
}


module.exports = { signupUser, loginUser }