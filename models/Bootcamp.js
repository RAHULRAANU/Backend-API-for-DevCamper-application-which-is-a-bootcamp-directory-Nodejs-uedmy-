const mongoose = require("mongoose");

const BootCampSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true, "Please add the name"],
        maxLength : [50, "Name Cannot be more than 50 character "],
        unique : true,
        trim : true
    },
    slug : String,
    description : {
        type: String,
        required : [true, "please add a description"],
        maxLength : [500, " description cannot be more than 500 character"]
    },
    website : {
        type : String,
        // required : true, 
        match : [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            "please add a valid URL with HTTP or HTTPS "

        ]
    },          
    phone : {
        type : String,
        required : true,
        maxLength : [15, "Phone number cannot be longer than 15 character"]
    },
    email : {
        type : String,
        required : true,
        match :  [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please add a valid Email"
        ]
    }, 
    address : {
        type : String,
        required : [true, "please add an address"]

    },
    location : {
        // GeoJSON Point
        type : {
        type : String,
        enum : ['Point']
    },
    coordinates :
    {
        type : [Number],
        index : "2dsphere"
    },
    formattedAddress : String,
    street : String,
    city : String,
    state : String,
    zipCode : String,
    country : String   
    },
    careers : {
        type : [String],
        required : true,
        enum : ["Web Development", "Mobile Development", "UI/UX", "Data Science", "Business", "others"]
    },
    averageRating : {
        type : Number,
        min : [1, "Rating must be at least 1"],
        max : [10, "maximum rating will be 10"]        
    },
    averageCost : Number,
    photo : {
        type : String,
        default : "no-photo.jpg"
    },
    housing : {
        type : Boolean,
        default : false
    },
    jobAssistance : {
        type : Boolean,
        default : false
    },
    jobGuarantee : {
        type : Boolean,
        default : false
    },
    acceptGi : {
        type : String,
        default : false
    },
    createdAt : {
        type :Date,
        default : Date.now
    }
});


module.exports = mongoose.model("Bootcamp", BootCampSchema);