const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");


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

    // // Create token 
    // const token = user.getSignedJwtToken();
    // res.status(200).json({ "Success" : true, token});

    sendTokenResponse(user, 200, res);

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

    // // Create Token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({ "Success" : true, token});

    sendTokenResponse(user, 200, res);

});


// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});




// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  // const options = {
  //   maxAge: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true
  // };

  const options = {
  httpOnly: true,
  // secure: true,
  maxAge: 24 * 60 * 60 * 1000,
  // signed: true
};

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

    res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
   });
};


