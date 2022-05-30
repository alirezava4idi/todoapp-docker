const User = require('../models/userModel');

const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    const {username, password} = req.body;


    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({username, password: hashPassword});
        //todo: handle user session
        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Bad request"
        })
    }
}