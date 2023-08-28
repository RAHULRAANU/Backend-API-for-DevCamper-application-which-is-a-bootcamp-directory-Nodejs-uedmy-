const express = require("express");
const router = express.Router();

const {
    getBootCamps,
    getBootCamp,
    createBootCamp,
    updateBootCamp,
    deleteBootCamp

} = require("../controller/bootcamp");



router.route('/api/v1/bootCamps/').get(getBootCamps).post(createBootCamp);

router.route('/api/v1/bootCamps/:id').get(getBootCamp).put(updateBootCamp).delete(deleteBootCamp);


module.exports = router;
