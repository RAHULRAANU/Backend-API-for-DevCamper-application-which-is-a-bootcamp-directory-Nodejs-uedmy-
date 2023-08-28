const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// const logger = require("./middleware/logger");

const router = require("./routes/bootcamp");

// load env vars
dotenv.config({ path : './config/config.env'});

const app = express();

PORT = process.env.PORT || 5001;

// Development Logging Middleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
} 

// app.use(logger);


app.use('/', router);

// Call Server
app.listen(
    PORT,
    console.log(`Server Running on ${process.env.NODE_ENV} mode on port ${PORT}`)
     );
