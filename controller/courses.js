const Course = require("../models/Course");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorresponse");
const Bootcamp = require("../models/Bootcamp");


//@desc  Course
//@route GET /api/v1/Course
//@route GET /api/vi/bootCamp/:bootCampId/courses
//access Public

exports.getCourses = asyncHandler(async (req, res, next) => {

    let query;

    if(req.params.bootCampId){

        query = Course.find({ bootcamp : req.params.bootCampId });

    }else{
        query = Course.find();
    }

    const courses = await query;
    
    res.status(200).json({
        success : true,
        count : courses.length,
        data : courses
    });

});




//@desc  Single Course
//@route GET /api/v1/Course/:id
//access Public

exports.getCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id)

    if(!course){
        return next(new ErrorResponse(`No Course with this  id of ${req.params.id}`), 404);
    };
    
    res.status(200).json({
        success : true,
        data : course
    });

});




//@desc  Add Course
//@route POST /api/vi/bootCamp/:bootCampId/course
//access private

exports.AddCourse = asyncHandler(async (req, res, next) => {

    req.body.bootcamp = req.params.bootCampId;

    const bootcamp = await Bootcamp.findById(req.params.bootCampId);

    if(!bootcamp){
        return next(new ErrorResponse(`No Bootcamp with this  id of ${req.params.bootCampId}`), 404);
    };
    
    const course = await Course.create(req.body);

    res.status(200).json({
        success : true,
        data : course
    });

});



//@desc  Update Course
//@route PUT /api/v1/course/:Id
//access private

exports.updateCourse = asyncHandler(async (req, res, next) => {
     
    let course = await Course.findById(req.params.id);

    if(!course){
        return next(new ErrorResponse(`No Bootcamp with this  id of ${req.params.id}`), 404);
    };
    
    course = await Course.findByIdAndUpdate(req.params.id , req.body, {
        new : true,
        runValidators : true
    });

    res.status(200).json({
        success : true,
        data : course
    });

});


//@desc  Delete Course
//@route DELETE /api/v1/course/:Id
//access private

exports.deleteCourse = asyncHandler(async (req, res, next) => {
     
    const course = await Course.findById(req.params.id);

    if(!course){
        return next(new ErrorResponse(`No Bootcamp with this  id of ${req.params.id}`), 404);
    };
    
    await course.deleteOne();

    res.status(200).json({
        success : true,
        data : {}
    });

});


