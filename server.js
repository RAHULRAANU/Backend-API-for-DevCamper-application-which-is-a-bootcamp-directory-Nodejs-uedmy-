const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const dbConnection = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middleware/error");


// const logger = require("./middleware/logger");


// Connect to database
dbConnection();

// route files
const bootCamp = require("./routes/bootcamp");
const courses = require("./routes/courses");

const app = express();


// Body Parser
app.use(express.json());

// File uploading
app.use(fileUpload());

// Development Logging Middleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
} 

// app.use(logger);             // instead of logger morgan is used


app.use('/api/v1/bootCamp/', bootCamp);
app.use("/api/v1/course/", courses);

// error Handling
app.use(errorHandler);


PORT = process.env.PORT || 5001;


// Call Server
const server = app.listen(
    PORT, () => {
    console.log(`Server Running on ${process.env.NODE_ENV} mode on port ${PORT}`.white.bold)
    });


// Handle UnHandle promise rejection      

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.bgRed);
    //close server and exit process
    server.close(() => process.exit(1));
});
