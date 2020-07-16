const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Newsletter = require('../../models/Newsletter')
const nodemailer = require("nodemailer")
const auth = require('../../middleware/auth')
require('dotenv').config()

//Step 1
let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
});

//@route POST /admin/newsletter
//@desc Send message to Saved Emails in Newsletter
//@access private
router.post('/',[
    auth,
    [
        check('subject' , 'Subject is Required').notEmpty(),
        check('body', 'Body is required').notEmpty()
    ]
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Newsletter.find({}).then(emails => {

        //Send Message to All Emails
        var mailOptions={
            from: '"Exploresio" <annonymousdude07@gmail.com>',//Sender Address
            //to : mailList,//list of receivers --> Its showing all receipents emails to receivers
            subject : req.body.subject,//Email Subject
            html : req.body.body //Email Message
        }

        var mailList = emails.map(email => email.email)
        mailList.forEach(email => {
            mailOptions.to = email
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                    res.json({msg : "Error occured in sending message,Please try again",
                              alertType : 'danger'});
                }
                else{
                    // console.log("Message sent: " + response.message);
                    res.json({msg : 'Message has successfully sent to all Emails',
                              alertType : 'success'})
                }
            });
        })
    }).catch(err => {
        console.error(err.message)
        res.status(500).send('Server Error in sending message')
    })

})

module.exports = router