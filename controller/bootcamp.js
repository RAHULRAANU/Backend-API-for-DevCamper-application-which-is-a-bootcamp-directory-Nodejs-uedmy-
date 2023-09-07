const path = require('path');
const BootCamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");


//@desc  all bootCamps
//@route  GET /api/v1/bootCamps
//@access public

exports.getBootCamps = asyncHandler( async (req, res, next ) => {
    // console.log(req.query);
    // const fetchBootCamp = await BootCamp.find() ;
    // res.status(200).json({SUCCESS : true, count : fetchBootCamp.length, data : fetchBootCamp });
    res.status(200).json(res.advancedResults);
    
});



//@desc Single bootCamp
//@route GET /api/v1/bootCamps/id
//@access public

exports.getBootCamp = asyncHandler( async (req, res, next ) => {


    const fetchBootCampId = await BootCamp.findById(req.params.id);

    if(!fetchBootCampId){

        return next(new ErrorResponse(`BootCamp not found with this id of ${req.params.id}`, 404));
        //  return res.status(400).json({Success: false, message: "Data Not found"});
    }

    res.status(200).json({SUCCESS: true, message: fetchBootCampId });

        
});



//@desc Create bootCamps
//@route POST /api/v1/bootCamps
//@access private

exports.createBootCamp = asyncHandler( async (req, res, next ) => {

        // Add user to req,body
        req.body.user = req.user.id;

        // Check for published bootcamp
        const publishedBootcamp = await BootCamp.findOne({ user: req.user.id });

        // If the user is not an admin, they can only add one bootcamp
        if (publishedBootcamp && req.user.role !== 'admin') {
          return next(
            new ErrorResponse(
              `The user with ID ${req.user.id} has already published a bootcamp`,
              400
            )
          );
        }

        const createBootCamp = await BootCamp.create(req.body);
        console.log("Created Body is :",req.body);

        res.status(201).json({SUCCESS : true, data : createBootCamp});
              
    
});



//@desc Update bootCamps
//@route  PUT /api/v1/bootCamps/id
//@access private

exports.updateBootCamp = asyncHandler( async (req, res, next ) => {

     let updateBootCamp = await BootCamp.findById(req.params.id);

    if(!updateBootCamp){
        return next(new ErrorResponse(`BootCamp not found with this id of ${req.params.id}`, 404));
    }

    // Make sure User is BootCamp owner
    if(updateBootCamp.user.toString() !== req.user.id && req.user.role !== "admin"){
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this bootCamp`, 404));
    }

    updateBootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body,{
      new : true,
      runValidators:true
    });

    res.status(201).json({SUCCESS : true, message : updateBootCamp});


});




//@desc DELETE bootCamps
//@route  DELETE /api/v1/bootCamps/id
//@access private

exports.deleteBootCamp = asyncHandler( async (req, res, next ) => {

        let deleteBootCamp = await BootCamp.findById(req.params.id);

        if(!deleteBootCamp){
        return next(new ErrorResponse(`BootCamp not found with this id of ${req.params.id}`, 404));
        };

        // Make sure User is BootCamp owner
        if(deleteBootCamp.user.toString() !== req.user.id && req.user.role !== "admin"){
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to Delete this bootCamp`, 404));
    }

        // console.log("enter in controller");
        deleteBootCamp.deleteOne();

        res.status(201).json({SUCCESS : true, data : {}});


});


//@desc BootCamps within radius
//@route  DELETE /api/v1/bootCamp/:zipcode/:distance
//@access private

// exports.getBootCampInRadius = asyncHandler( async (req, res, next ) => {

exports.getBootCampInRadius = asyncHandler(async (req, res, next) => {
    
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await BootCamp.find({ 

    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }

  });

  res.status(200).json({

    success: true,
    count: bootcamps.length,
    data: bootcamps

  });
});





// @desc      Upload photo for bootcamp
// @route     PUT /api/v1/bootcamps/:id/photo
// @access    Private

exports.BootCampPhotoUpload = asyncHandler(async (req, res, next) => {

  const bootcamp = await BootCamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404));
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

    // Make sure User is BootCamp owner
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== "admin"){
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this bootCamp`, 404));
    }


  const file = req.files.file;

  // Make sure the image is a photo

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }


  // Check file size

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }


  // Create custom filename

  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {

    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await BootCamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    console.log(file);
    res.status(200).json({
      success: true,
      data: file.name

    });
  });
});


