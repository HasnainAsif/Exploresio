const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { isEmpty } = require("../../middleware/uploadfile-helper");
const auth = require("../../middleware/auth");
const CustomTour = require("../../models/CustomTour");
const fs = require("fs");
const multer = require("multer");
const nodemailer = require("nodemailer");
require("dotenv").config();

//@route GET admin/custom_tour
//@desc Get All Custom Tours
//@access private
router.get("/", (req, res) => {
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

//@route GET admin/custom_tour/:id
//@desc Get Custom Tour By Id
//@access public
router.get("/:id", (req, res) => {
  CustomTour.findById(req.params.id)
    .then((tour) => {
      res.json(tour);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Server Error in getting custom tour");
    });
});

//@route GET admin/custom_tour/:id/:destId
//@desc Get Single Destination of a Custom Tour By using Ids
//@access private
router.get("/:id/:destId", (req, res) => {
  CustomTour.findById(req.params.id)
    .then((tour) => {
      const destination = tour.destinations.filter(
        (destination) => destination._id == req.params.destId
      );
      if (!destination[0])
        return res.status(404).json({ msg: "Destination does not Exist" });
      res.json(destination[0]);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Server Error in getting custom tour");
    });
});

//@route POST admin/custom_tour/addImage
//@desc Add image in Super Destination
//@access private

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now}-${file.originalname}`);
  },
});

// const upload = multer({ storage });
var upload = multer({ storage: storage }); //.single('file')

let files = [];
router.post("/addImage", [auth, upload.single("file")], (req, res) => {
  if (files.length < 2) {
    if (!isEmpty(req.files)) {
      file = req.files.file;
      files.push(file);
      return res.json({ msg: "Image has Uploaded", alertType: "success" });
    }
  } else {
    return res.json({
      msg: "You cannot upload more than two images",
      alertType: "error",
    });
  }
  return res.json({ msg: "Due to some issue, Image cannot be uploaded" });
});

//@route POST admin/custom_tour
//@desc Create Main Destination
//@access private

router.post(
  "/",
  [
    auth,
    [
      check("superDestination", "Main Destination Name is required")
        .not()
        .isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { superDestination } = req.body;
    const newTour = new CustomTour({
      user: req.user.id,
      superDestination,
    });
    if (files.length > 0) {
      files.map((file) => {
        filename = Date.now() + "-" + file.name;
        file.mv("./public/" + filename, (err) => {
          if (err) throw err;
        });
        newTour.superFiles.push({ file: filename });
      });
    }

    newTour
      .save()
      .then((savedTour) => {
        res.json(savedTour);
        files = [];
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send("Server Error in creating a tour");
      });
  }
);

//@route DELETE admin/custom_tour/:id
//@desc Delete a Custom Tour
//@access Private
router.delete("/:id", (req, res) => {
  CustomTour.findById(req.params.id)
    .then((tour) => {
      if (!tour)
        return res
          .status(404)
          .json({ msg: "Tour Not Found", alertType: "warning" });

      tour.superFiles.map((file) => {
        fs.unlink("./public/" + file.file, (err) => {
          if (err) throw err;
        });
      });
      if (tour.destinations.length > 0) {
        tour.destinations.map((destination) => {
          destination.files.map((file) => {
            fs.unlink("./public/" + file.file, (err) => {
              if (err) throw err;
            });
          });
        });
      }

      tour.remove();
      res.json({ msg: "Tour Removed", alertType: "success" });
    })
    .catch((err) => {
      console.error(err.message);
      res.json({
        msg: "Error in Deleting Tour or No Tour Found",
        alertType: "danger",
      });
    });
});

//@route POST admin/custom_tour/destination
//@desc Create Custom Tour's Destination
//@access private

router.post(
  "/destination",
  [
    auth,
    [
      check("destinationName", "Destination Name is required").not().isEmpty(),
      check("destinationProvince", "Destination Province is required")
        .not()
        .isEmpty(),
      check("noOfDays", "No. of Days is required").notEmpty(),
      check("price", "Price is required").not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      destinationName,
      destinationProvince,
      destinationSlogan,
      noOfDays,
      price,
      description,
      dayDescriptions,
    } = req.body;

    const newDestination = {
      user: req.user.id,
      destinationName,
      destinationProvince,
      destinationSlogan,
      noOfDays,
      price,
      description,
    };

    newDestination.files = [];
    if (files.length > 0) {
      files.map((file) => {
        filename = Date.now() + "-" + file.name;
        file.mv("./public/" + filename, (err) => {
          if (err) throw err;
        });
        newDestination.files.push({ file: filename });
      });
    }

    newDestination.dayDescription = [];
    dayDescriptions.map((desp) => newDestination.dayDescription.push(desp));
    CustomTour.findById(req.body.id)
      .then((tour) => {
        tour.destinations.unshift(newDestination);

        tour.save().then((updatedTour) => {
          res.json(updatedTour);
          files = [];
        });
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send("Server Error in creating destination");
      });
  }
);

//@route DELETE admin/custom_tour/destination/:id/:dest_id
//@desc Delete Custom Tour's Destination
//@access Private

router.delete("/destination/:id/:dest_id", auth, (req, res) => {
  CustomTour.findById(req.params.id)
    .then((tour) => {
      //pull out destination
      const destination = tour.destinations.find(
        (destination) => destination._id == req.params.dest_id
      );
      //make sure destination exists
      if (!destination)
        return res.status(404).json({ msg: "Destination does not Exist" });

      destination.files.map((file) => {
        fs.unlink("./public/" + file.file, (err) => {
          if (err) throw err;
        });
      });

      //Get remove index
      const removeIndex = tour.destinations
        .map((destination) => destination._id)
        .indexOf(req.params.dest_id);
      tour.destinations.splice(removeIndex, 1);

      tour
        .save()
        .then((updatedTour) => {
          res.json(updatedTour.destiations);
        })
        .catch((err) => {
          console.error(err.message);
          res.status(400).json({ msg: "Error in deleting destination" });
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

//@route POST /admin/custom_tour/destination/isActive
//@desc Make/Remove a destination for active status
//@access private
router.post("/destination/isActive", auth, (req, res) => {
  CustomTour.findById(req.body.tourId)
    .then((tour) => {
      const destination = tour.destinations.filter(
        (destination) => destination._id == req.body.destId
      );
      if (!destination[0])
        return res.status(404).json({ msg: "Destination does not Exist" });

      destination[0].isActive = req.body.allowActive;
      tour
        .save()
        .then((updatedTour) => {
          res.json({
            destination: destination[0],
          });
        })
        .catch((err) => {
          console.error(err.message);
          res.status(500).send("Server Error in updating tour Active Status");
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Server Error");
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

//@route POST /admin/custom_tour/destination/joinTour/:tourId/:destId/:joiningId
//@desc Allow User to Join custom trip
//@access private
router.post(
  "/destination/joinTour/:tourId/:destId/:joiningId",
  auth,
  (req, res) => {
    CustomTour.findById(req.params.tourId)
      .then((tour) => {
        const destination = tour.destinations.filter(
          (destination) => destination._id == req.params.destId
        );
        if (!destination[0])
          return res.status(404).json({ msg: "Destination does not Exist" });

        const joining = destination[0].joinTour.filter(
          (join) => join._id == req.params.joiningId
        );
        if (!joining[0])
          return res.status(404).json({ msg: "Join Tour does not Exist" });
        joining[0].joinPrice = req.body.tourPrice;
        tour
          .save()
          .then((updatedTour) => {
            //Send Email to client

            var mailOptions = {
              from: '"Exploresio" <annonymousdude07@gmail.com>', //Sender Address
              to: joining[0].email, //list of receivers
              subject: `Trip To ${destination[0].destinationName} has confirmed`, //Email Subject
              html: `Hello ${joining[0].name},<br>
                      You request for trip to ${destination[0].destinationName} has been accepted<br>
                      It is ${destination[0].noOfDays} days tour having price ${joining[0].joinPrice}<br>
                      We will start our journey at ${joining[0].travelDate} from \'${joining[0].ridingArea}\' at ${joining[0].ridingTime}<br>
                      You have selected ${joining[0].noOfSeats} Number of Seats having seats types ${joining[0].seatsType}<br>
                      Your payment Method is ${joining[0].paymentType}<br>
                      Your address is ${joining[0].address} and phone number is ${joining[0].phoneNumber}<br>
                      <h4>We are Expecting a safe and memorable journey with you<h4><br>
                      Regards: Exploresio Team`,
            };
            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                res.json({
                  msg: "Error occured in sending confirmation email to client",
                });
              } else {
                res.json({
                  msg:
                    "Successfully subscribed to tour, Please Check Your Email",
                  joinTour: joining[0],
                });
              }
            });
          })
          .catch((err) => {
            console.error(err.message);
            res.status(500).send("Server Error in updating tour Active Status");
          });
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send("Server Error");
      });
  }
);

module.exports = router;
