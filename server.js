const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path : './config/config.env'});
const app = express();
PORT = process.env.PORT || 5001;

app.listen(
    PORT,
    console.log(`Server Running on ${process.env.NODE_ENV} mode on port ${PORT}`)
     );
