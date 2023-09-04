const express = require("express");

const  { 
    getCourses,
    getCourse,
    AddCourse,
    updateCourse,
    deleteCourse

 }  = require("../controller/courses");

const router = express.Router({ mergeParams: true });

const Course = require("../models/Course");

const advancedResult = require("../middleware/advancedResults");

router.route("/")
.get(advancedResult(Course , {path : "bootcamp", select : "name description"}), getCourses)
.post(AddCourse);


router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
