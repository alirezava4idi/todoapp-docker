const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/config');
const protect = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).json({
            status: "fail"
        })
    }else{
        try {
            const isValid = jwt.verify(token, TOKEN_SECRET);
            if(!isValid) {
                res.status(400).json({
                    status: "fail"
                })
            }else{
                req.user = isValid.data.username;
                next();
            }
        } catch (e) {
            res.status(400).json({
                status: "fail",
                message: e.message
            })
        }
    }
}

module.exports = protect