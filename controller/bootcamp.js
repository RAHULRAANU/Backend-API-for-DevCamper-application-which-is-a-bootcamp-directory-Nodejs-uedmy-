const BootCamp = require("../models/Bootcamp");

//@desc  all bootCamps
//@route  GET /api/v1/bootCamps
//@access public

exports.getBootCamps = async (req, res, next ) => {

const fetchBootCamp = await BootCamp.find() ;
res.status(200).json({SUCCESS : true, count : fetchBootCamp.length, data : fetchBootCamp });

};



//@desc Single bootCamp
//@route GET /api/v1/bootCamps/id
//@access public

exports.getBootCamp = async (req, res, next ) => {

    const fetchBootCampId = await BootCamp.findById(req.params.id);

    if(!fetchBootCampId){
    res.status(400).json({Success: false, message: "Data Not found"});
    }
    res.status(200).json({SUCCESS: true, message: fetchBootCampId });

};



//@desc Create bootCamps
//@route POST /api/v1/bootCamps
//@access private

exports.createBootCamp = async (req, res, next ) => {
        
    const createBootCamp = await BootCamp.create(req.body);
    console.log("Created Body is :",req.body);
    res.status(201).json({SUCCESS : true, data : createBootCamp});

};



//@desc Update bootCamps
//@route  PUT /api/v1/bootCamps/id
//@access private

exports.updateBootCamp = async (req, res, next ) => {

    const updateBootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
     new : true,
     runValidators: true    
    });

    if(!updateBootCamp){
        return res.status(400).json({success : false });
    }

    res.status(201).json({SUCCESS : true, message : updateBootCamp});

};



//@desc DELETE bootCamps
//@route  DELETE /api/v1/bootCamps/id
//@access private

exports.deleteBootCamp = async (req, res, next ) => {

    const deleteBootCamp = await BootCamp.findByIdAndDelete(req.params.id);

    if(!deleteBootCamp){
        return res.status(400).json({success : false});
    };

    res.status(201).json({SUCCESS : true, data : {}});

};
