const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/config');
const protect = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.send(401).json({
            status: "fail"
        })
    }else{
        const isValid = jwt.verify(token, TOKEN_SECRET);
        if(!isValid) {
            res.status(400).json({
                status: "fail"
            })
        }else{
            req.user = isValid.data.username;
            next();
        }
    }
}

module.exports = protect