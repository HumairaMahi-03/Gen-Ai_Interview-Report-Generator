const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

async function authUser(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: 'No token provided' });
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

    if(isTokenBlacklisted){
        return res.status(401).json({ message: 'Token is invalid' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
}

module.exports = {authUser};