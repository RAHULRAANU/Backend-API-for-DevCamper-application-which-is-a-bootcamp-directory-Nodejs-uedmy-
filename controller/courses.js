const Course = require("../models/Course");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");


//@desc  Course
//@route GET /api/v1/Course
//@route GET /api/vi/bootCamp/:bootCampId/courses
//access Public

exports.getCourses = asyncHandler(async (req, res, next) => {

    if(req.params.bootCampId){

        const courses = await Course.find({ bootcamp : req.params.bootCampId });

        return  res.status(200).json({
        success : true,
        count : courses.length,
        data : courses
    });

    }else{
        return res.status(200).json(res.advancedResults);
    }

});




//@desc  Single Course
//@route GET /api/v1/Course/:id
//access Public

exports.getCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id).populate({
        path : "bootcamp",
        select : "name description"
    });

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
    req.body.user =  req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootCampId);

    if(!bootcamp){
        return next(new ErrorResponse(`No BootCamp with this  id of ${req.params.bootcampId}`), 404);
    };

      // Make sure User is BootCamp owner
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== "admin"){
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a course to bootCamp ${bootcamp._id}`, 404));
    }

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

    // Make sure User is Course owner
    if(course.user.toString() !== req.user.id && req.user.role !== "admin"){
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to Update the Course ${course._id}`, 404));
    }
    
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

    // Make sure User is Course owner
    if(course.user.toString() !== req.user.id && req.user.role !== "admin"){
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to Delete the Course ${course._id}`, 404));
    }
    
    await course.deleteOne();

    res.status(200).json({
        success : true,
        data : {}
    });

});


