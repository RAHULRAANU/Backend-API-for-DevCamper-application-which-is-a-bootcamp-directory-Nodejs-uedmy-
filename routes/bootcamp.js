const express = require("express");
const router = express.Router();

const {
    getBootCamps,
    getBootCamp,
    createBootCamp,
    updateBootCamp,
    deleteBootCamp

} = require("../controller/bootcamp");



router.route('/api/v1/bootCamp/').get(getBootCamps).post(createBootCamp);

router.route('/api/v1/bootCamp/:id').get(getBootCamp).put(updateBootCamp).delete(deleteBootCamp);


module.exports = router;
