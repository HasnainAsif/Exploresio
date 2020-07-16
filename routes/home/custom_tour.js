const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const CustomTour = require("../../models/CustomTour");
const nodemailer = require("nodemailer");
require("dotenv").config();

//@route GET /custom_tour
//@desc Get All Custom Tours
//@access private
router.get("/", auth, (req, res) => {
  CustomTour.find({})
    .sort({ date: -1 })
    .then((tour) => {
      if (!tour)
        return res.status(400).json({ msg: "There is no custom tour" });
      res.json(tour);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Server Error in getting all custom tours");
    });
});

//NODEMAILER EMAIL VERIFICATION
//Step 1
let smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// var rand,mailOptions,host,link,newsEmail

//@route POST /custom_tour/:tourId/:destId
//@desc Subscribe to a Custom Tour
//@access private

router.post(
  "/:tourId/:destId",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Email is required").isEmail(),
      check("phoneNumber", "Phone Number is required").notEmpty(),
      check("travelDate", "Travel Date is required").notEmpty(),
      check("noOfSeats", "No Of Seats are required").not().isEmpty(),
      check("seatsType", "Seats Types are required").not().isEmpty(),
      check("paymentType", "Payment Method is required").not().isEmpty(),
      check("address", "Address is required").not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phoneNumber,
      noOfSeats,
      seatsType,
      paymentType,
      address,
      travelDate,
    } = req.body;
    const seatsTypes = seatsType.split(",").map((seatType) => seatType.trim());
    ///////////////////////////////////////////
    CustomTour.findById(req.params.tourId)
      .then((tour) => {
        //pull out destination
        const destination = tour.destinations.find(
          (destination) => destination._id == req.params.destId
        );
        //make sure destination exists
        if (!destination)
          return res.status(404).json({ msg: "Destination does not Exist" });

        destination.joinTour.unshift({
          user: req.user.id,
          name,
          email,
          phoneNumber,
          travelDate,
          noOfSeats,
          seatsType: seatsTypes,
          paymentType,
          address,
        });

        tour
          .save()
          .then((updatedTour) => {
            var mailOptions = {
              from: '"Exploresio" <annonymousdude07@gmail.com>', //Sender Address
              to: "hasnainasif52@gmail.com", //list of receivers
              subject: `Custom Tour Joining request from ${name}`, //Email Subject
              html: `Some One is trying to create a custom tour,Plz review it<br>
                      Tour main area is <b> ${updatedTour.superDestination}</b><br>
                      Tour destination is <b> ${destination.destinationName}</b><br>
                      Regards:From Exploresio Team to Admin`,
            };
            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                res.json({
                  msg:
                    "Successfully application submitted for tour but Error occured, Please send custom message to our team",
                });
              } else {
                res.json({
                  msg:
                    "Successfully application Submitted for tour, You will receive a confirmation Email soon with details",
                });
              }
            });
          })
          .catch((err) => {
            console.error(err.message);
            res.json({ msg: "Error in Adding user to tour" });
          });
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send("Server Error in application submittion for tour");
      });
  }
);

module.exports = router;
