const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');


/**
 * @name registerUserController
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    const isUserAlreadyExists = await userModel.findOne({ $or: [{ username }, { email }] });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign(
        { id: user._id, username: user.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );

    res.cookie("token",token)

    res.status(201).json({
         message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });




}

/**
 * @name loginUserController
 * @desc Login a user, expects username and password in the request body, returns a JWT token if successful
 * @access Public
 */

async function loginUserController(req, res) {
    const {email, password} = req.body; 

    const user = await userModel.findOne({email});

    if(!user) {
        return res.status(400).json({message: 'User not found'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({message: 'Invalid password'});
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token: req.cookies.token });

    if(isTokenBlacklisted){
        return res.status(401).json({ message: 'Token is invalid' });
    }

    const token  = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )
    res.cookie ("token", token)

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}
/**
 * @name logoutUserController
 * @desc Logout a user by blacklisting the JWT token
 * @access Public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({token});
    }
    res.clearCookie("token");

    res.status(200).json({message: 'User logged out successfully'});


}

/**
 * @name getMeController
 * @desc Get the currently logged-in user's information
 * @access Private
 */

async function getMeController(req, res){
    const user = await userModel.findById(req.user.id).select('-password');

    res.status(200).json({
        message: 'User information retrieved successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
    