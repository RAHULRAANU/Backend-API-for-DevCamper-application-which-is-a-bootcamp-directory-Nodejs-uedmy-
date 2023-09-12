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
const { protect, authorize } = require("../middleware/auth");  

const advancedResults = require("../middleware/advancedResults");

router.route("/")
.get(advancedResults(Course, 
    {
        path : "bootcamp", 
        select : "name description"
    }), 
 getCourses
 ).post(protect, authorize("publisher", "admin"), AddCourse);


router.route("/:id").get(getCourse)
.put(protect, authorize("publisher", "admin"), updateCourse)
.delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
