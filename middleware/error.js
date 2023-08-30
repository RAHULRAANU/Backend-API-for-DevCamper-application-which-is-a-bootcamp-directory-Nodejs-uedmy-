const errorHandler = (err, req, res, next) => {
    
    // log to console for dev
    console.log(err.stack.blue);
    
    res.status(500).json({
        success : false,
        error : err.message
    });
};

module.exports = errorHandler;