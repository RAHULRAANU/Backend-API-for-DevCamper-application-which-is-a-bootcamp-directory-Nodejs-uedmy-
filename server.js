const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/db");
const colors = require("colors");

// const logger = require("./middleware/logger");

    
// load env vars
dotenv.config({ path : './config/config.env'});

// Connect to database
dbConnection();

// route files
const router = require("./routes/bootcamp");

const app = express();


// Body Parser
app.use(express.json());

PORT = process.env.PORT || 5001;

// Development Logging Middleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
} 

// app.use(logger);             // instead of logger morgan is used

app.use('/', router);


// Call Server
const server = app.listen(
    PORT,
    console.log(`Server Running on ${process.env.NODE_ENV} mode on port ${PORT}`.white.bold)
     );

// Handle UnHandle promise rejection      

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.bgRed);
    //close server and exit process
    server.close(() => process.exit(1));
});
