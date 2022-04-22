const jwt = require('jsonwebtoken');

const adminRole = async (req, res, next) => {
    let authHeader = req.headers.authorization;

    console.log('authHeader', authHeader)
    if(!authHeader) {
        return res.sendStatus(403)
    }

    const token = authHeader.split(' ')[1];
    console.log('token :', token);
    console.log(token)
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if(err) {
            return res.sendStatus(403)
        }
        req.admin = decoded;
        return next();
    })
}

module.exports =  adminRole