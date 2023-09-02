const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const asyncHandler =  require("./middleware/async");

// Load env vars
const dotenv = require("dotenv").config();


// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require("./models/Course");


// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Read JSON files for bootcamps
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'),
  // console.log("bootcamps")

);

// Read Json File for Course
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'),
  // console.log("Course file reading")
);


// Import into DB
const importData = asyncHandler (async () => {
 
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log('Data Imported...'.green.inverse);
    process.exit();

});


// Delete data
const deleteData = asyncHandler( async () => {

    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();

});


// Calling
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
};

