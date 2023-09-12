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

const Bootcamp = require("../models/Bootcamp");

const advancedResult = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");


// Include other resource data
const CourseRouter = require("./courses");
const reviewRouter = require("./review");


// Re-route into other resources router
router.use('/:bootCampId/course', CourseRouter);
router.use("/:bootCampId/reviews", reviewRouter);


router.route('/radius/:zipcode/:distance').get(getBootCampInRadius);

router.route('/:id/photo').put(protect, authorize("publisher", "admin"), BootCampPhotoUpload);

router.route('/')
.get(advancedResult(Bootcamp, 'courses'), getBootCamps)
.post(protect, authorize("publisher", "admin"), createBootCamp);

router.route('/:id').get(getBootCamp)
.put(protect, authorize("publisher", "admin"), updateBootCamp)
.delete(protect, authorize("publisher", "admin"), deleteBootCamp);


module.exports = router;
