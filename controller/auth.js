
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorresponse");


// @desc    User Register
// @route   POST api/v1/auth/register
// @access  Public

exports.register = asyncHandler(async (req, res, next) => {
    const { name , email, password, role } = req.body;

    //Create User
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    // Create token 
    const token = user.getSignedWebToken();

    res.status(200).json({ "Success" : true, token});

});



// @desc    User Login
// @route   POST api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    // Validate email and password
    if(!email || !password){
        return  next(new ErrorResponse("Please Provide an Email And Password", 400));
    };

    // Check for User
    const user = await User.findOne( { email } ).select("+password");

    if(!user){
        return next(new ErrorResponse("Invalid Credentials", 401));
    };

    // Check if password matches
    const isMatch = await user.matchPassword(password); 
    
    if(!isMatch){
        return next(new ErrorResponse("Invalid Credentials", 401));
    };

    // Create Token
    const token = user.getSignedWebToken();

    res.status(200).json({ "Success" : true, token});
});

