const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomTourSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  superDestination: {
    type: String,
    required: true,
  },
  superFiles: [
    {
      file: {
        type: String,
      },
    },
  ],
  destinations: [
    {
      destinationName: {
        type: String,
        required: true,
      },
      destinationProvince: {
        type: String,
        required: true,
      },
      destinationSlogan: {
        type: String,
      },
      noOfDays: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
      },
      files: [
        {
          file: {
            type: String,
          },
        },
      ],
      description: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      dayDescription: [
        {
          subject: {
            type: String,
          },
          body: {
            type: String,
          },
        },
      ],
      isActive: {
        type: Boolean,
        default: false,
      },
      joinTour: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          phoneNumber: {
            type: Number,
            required: true,
          },
          noOfSeats: {
            type: String,
            required: true,
          },
          seatsType: {
            type: [String],
          },
          paymentType: {
            type: String,
            required: true,
          },
          address: {
            type: String,
            required: true,
          },
          joiningDate: {
            type: Date,
            default: Date.now,
          },
          travelDate: {
            type: Date,
            required: true,
          },
          ridingTime: {
            type: String,
            default: "07:00 AM",
          },
          ridingArea: {
            type: String,
            default: "UET Taxila infront of library",
          },
          joinPrice: {
            type: String,
          },
        },
      ],
    },
  ],

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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = CustomTour = mongoose.model("custom_tour", CustomTourSchema);
