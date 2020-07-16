const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')
const nodemailer = require("nodemailer");
const Tour = require('../../models/Tour');
require('dotenv').config()

//@route GET /tour
//@desc Get All Tours
//@access public
router.get('/' , (req,res) => {
    Tour.find({}).sort({date : -1})
    .then(tour => {
        if(!tour)
            return res.status(400).json({msg : 'No Tour Found'})
        res.json(tour)
    })
    .catch(err => {
        console.error(err.message)
        res.status(500).send('Server Error in getting all tours')
    })
})

//@route GET /tour/:id
//@desc Get tour by id
//@access public
router.get('/:id' , (req,res) => {
    Tour.findById(req.params.id)
    .then(tour => {
        if(!tour)
            return res.status(400).json({msg : 'No Tour Found'})
        res.json(tour)
    })
    .catch(err => {
        console.error(err.message)
        res.status(500).json({msg : 'Server Error or No Tour Found'})
    })
})

//NODEMAILER EMAIL VERIFICATION
//Step 1
let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
});

// var rand,mailOptions,host,link,newsEmail

//@route POST /tour/:id
//@desc Subscribe to a Tour
//@access private

router.post('/:id' , [
    auth,
    [
        check('name' , 'Name is required').not().isEmpty(),
        check('email' , 'Email is required').isEmail(),
        check('phoneNumber' , 'Phone Number is required').notEmpty(),
        check('noOfSeats' , 'No Of Seats are required').not().isEmpty(),
        check('seatsType' , 'Seats Types are required').not().isEmpty(),
        check('paymentType' , 'Payment Method is required').not().isEmpty(),
        check('address' , 'Address is required').not().isEmpty()
    ]
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, phoneNumber, noOfSeats, seatsType, paymentType,address} = req.body
    const seatsTypes = seatsType.split(',').map(seatType => seatType.trim())

    Tour.find({isActive : true}).then(activeTours => {
        const alreadySubscribed = activeTours.map(activeTour => {

            if(activeTour._id != req.body.tourId && activeTour.joinTour.length > 0){
                const matched = activeTour.joinTour.map(joining => {
                    if(joining.user == req.user.id)
                        return res.json({msg : 'You have already subscribed to a tour which is not yet finished'})
                })
            }
        })

        Tour.findById(req.body.tourId).then(tour => {

            const subscribedUser = tour.joinTour.filter(joining => joining.user == req.user.id)
                if(subscribedUser.length > 0){
                    return res.json({msg : 'You have already Subscribed to tour, Review your Email'})
                }
    
            tour.joinTour.unshift({
                user : req.user.id,
                name,
                email,
                phoneNumber,
                noOfSeats,
                seatsType : seatsTypes ,
                paymentType,
                address
            })
    
            tour.save().then(updatedTour => {
                var mailOptions={
                    from: '"Exploresio" <annonymousdude07@gmail.com>',//Sender Address
                    to : email,//list of receivers
                    subject : `Trip To ${updatedTour.destinationName}`,//Email Subject
                    html : `Hello ${updatedTour.joinTour[0].name},<br>
                            You have successfully subscribed for trip to ${updatedTour.destinationName}<br>
                            It is ${updatedTour.noOfDays} days tour having price ${updatedTour.price}<br>
                            We will start our journey at ${updatedTour.travelDate} from \'${updatedTour.ridingArea}\' at ${updatedTour.ridingTime}<br>
                            You have selected ${updatedTour.joinTour[0].noOfSeats} Number of Seats having seats types ${updatedTour.joinTour[0].seatsType}<br>
                            Your payment Method is ${updatedTour.joinTour[0].paymentType}<br>
                            Your address is ${updatedTour.joinTour[0].address} and phone number is ${updatedTour.joinTour[0].phoneNumber}<br>
                            <h4>We are Expecting a safe and memorable journey with you<h4><br>
                            Regards: Exploresio Team`
                }
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        res.json({msg : "Successfully subscribed to tour but Error in Sending Email, Please Contact with our team"});
                    }
                    else{
                        res.json({msg : 'Successfully subscribed to tour, Please Check Your Email'})
                    }
                });
            }).catch(err => {
                console.error(err.message);
                res.json({msg : 'Error in Adding user to tour'})
            })
    
            
        })
        .catch(err => {
                console.error(err.message);
                res.status(500).send('Server Error in subscribing to tour')
            })

    }).catch(err => {
        console.error(err.messages);
        res.status(500).send('Server Error in subscribing')
    })

})

module.exports = router