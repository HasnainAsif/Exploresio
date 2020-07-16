const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TourSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    destinationName : {
        type : String,
        required : true
    },
    destinationProvince : {
        type : String,
        required : true
    },
    destinationSlogan : {
        type : String
    },
    noOfDays : {
        type : Number,
        required : true
    },
    files : [{
        file : {
        type : String
        }
    }],
    price : {
        type : Number,
        required : true
    },
    travelDate : {
        type : Date,
        required : true
    },
    description : {
        type : String
    },
    dayDescription : [{
        subject : {
            type : String
        },
        body : {
            type : String
        }
    }],
    isActive : {
        type : Boolean,
        default : false
    },
    isCurrent : {
        type : Boolean,
        default : false
    },
    isFinished : {
        type : Boolean,
        default : false
    },
    ridingArea : {
        type : String,
        default : 'UET Taxila infront of library'
    },
    ridingTime : {
        type : String,
        default : '07:00 AM'
    },
    joinTour : [{
        user : {
            type : Schema.Types.ObjectId,
            ref : 'user'
        },
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        phoneNumber : {
            type : Number,
            required : true
        },
        noOfSeats : {
            type : String,
            required : true
        },
        seatsType : {
            type : [String]
        },
        paymentType : {
            type : String,
            required : true
        },
        address : {
            type : String,
            required : true
        },
        joiningDate : {
            type : Date,
            default : Date.now
        }
    }],
    // comments : [
    //     {
    //         user : {
    //             type : Schema.Types.ObjectId,
    //             ref : 'user'
    //         },
    //         text : {
    //             type : String,
    //             required : true
    //         },
    //         date : {
    //             type : Date,
    //             default : Date.now
    //         }
    //     }
    // ],
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = Tour = mongoose.model('tour' , TourSchema)