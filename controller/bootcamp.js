

//@desc  all bootCamps
//@route  GET /api/v1/bootCamps
//@access public

exports.getBootCamps = (req, res, next ) => {

    res.status(200).json({"SUCCESS" : true, "message" : "Show All BootCamps"});

};



//@desc Single bootCamp
//@route GET /api/v1/bootCamps/id
//@access public

exports.getBootCamp = (req, res, next ) => {

    res.status(200).json({"SUCCESS": true, "message": `Show BootCamp ${req.params.id}`});

};



//@desc Create bootCamps
//@route POST /api/v1/bootCamps
//@access private

exports.createBootCamp = (req, res, next ) => {

    res.status(201).json({"SUCCESS" : true, "message" : "Create New BootCamp"});

};



//@desc Update bootCamps
//@route  PUT /api/v1/bootCamps/id
//@access private

exports.updateBootCamp = (req, res, next ) => {

    res.status(201).json({"SUCCESS" : true, "message" : `Update BootCamp ${req.params.id}`});

};



//@desc DELETE bootCamps
//@route  DELETE /api/v1/bootCamps/id
//@access private

exports.deleteBootCamp = (req, res, next ) => {

    res.status(201).json({"SUCCESS" : true, "message" : `Update BootCamp ${req.params.id}`});

};
