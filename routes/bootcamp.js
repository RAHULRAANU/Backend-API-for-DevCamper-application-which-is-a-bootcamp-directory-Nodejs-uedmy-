const express = require("express");
const router = express.Router();

const {

    getBootCamps,
    getBootCamp,
    createBootCamp,
    updateBootCamp,
    deleteBootCamp,
    getBootCampInRadius,
    BootCampPhotoUpload

} = require("../controller/bootcamp");


// Include other resource data
const CourseRouter = require("./courses");

// Re-route into other resources router
router.use('/:bootCampId/course', CourseRouter);

router.route('/radius/:zipcode/:distance').get(getBootCampInRadius);

router.route('/:id/photo').put(BootCampPhotoUpload);

router.route('/').get(getBootCamps).post(createBootCamp);

router.route('/:id').get(getBootCamp).put(updateBootCamp).delete(deleteBootCamp);


module.exports = router;
