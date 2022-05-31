const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/config');

exports.signup = async (req, res) => {
    const {username, password} = req.body;


    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({username, password: hashPassword});
        //todo: handle user session
        const token = jwt.sign({data: newUser}, TOKEN_SECRET, {expiresIn: '1h'});
        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
                token
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Bad request"
        })
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});

        if(!user) {
            return res.status(404).json({
                status: "fail",
                message: "Username or password is incorrect"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(isPasswordCorrect) {
            //todo: user session
            const token = jwt.sign({ data: user }, TOKEN_SECRET, { expiresIn: '1h' });
            res.status(200).json({
                status: "success",
                token
            })
        }else{
            res.status(400).json({
                status: "fail",
                message: "Username or password is incorrect"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Bad request"
        })
    }
}