const express = require("express");

const  { 
    getCourses,
    getCourse,
    AddCourse,
    updateCourse,
    deleteCourse

 }  = require("../controller/courses");

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses).post(AddCourse);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
