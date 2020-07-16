const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Newsletter = require('../../models/Newsletter')

//@route POST /newsletter
//@desc Save Emails to database for sending Company's emails
//@access public
router.post('/',[
    check('email', 'Please include a valid Email').isEmail()
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Newsletter.findOne({email : req.body.email})
    .then(newsletter => {
        if(newsletter){
            res.status(400).json({errors : [{msg : 'Email Already Exists'}]})
            //redirect to home page if required
          }
        else{
            const newNewsletter = new Newsletter({
                email : req.body.email
            })

            newNewsletter.save().then(saved => {
                res.json({msg : 'Email has successfully added to newsletter',
                          alertType : 'success'})//make it flash
                //or
                //return res.json(saved)
                //res.redirect('/home') i.e; redirect to homepage
            }).catch(err => {
                console.error(err.message)
                res.json({errors : [{msg : "Newsletter save Error...Something gets Wrong..."}]})
            })
        }
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).send('Server Error')
    })

})

module.exports = router