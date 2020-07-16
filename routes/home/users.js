const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const config = require('config')
const User = require('../../models/User');
const Newsletter = require('../../models/Newsletter')
const auth = require('../../middleware/auth')
require('dotenv').config()

//@route GET users/auth
//@desc Get Login User data
//@access private
router.get('/auth', auth , (req,res) => {
    User.findById(req.user.id).select('-password')
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).send('Server Error')  
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

var rand,mailOptions,host,link,newsEmail;
var newUser,newNewsletter = {}

//@route POST /users/register
//@desc Register User
//@access public
router.post('/register' ,[
    check('name' , 'name is required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please Enter a Password with 6 or more characters').isLength({ min: 6 })
    //Check in front end...Email should not be of Admin
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name,email,password} = req.body
    userEmail = email
    //See if User Exists
    User.findOne({email})
    .then(user => {
      if(user){
        res.status(400).json({errors : [{msg : 'User Already Exists'}]})
        //res.redirect('/login')
      }
      else{
        newUser = new User({
            name,
            email,
            password
        })

        Newsletter.findOne({email}).then(newsletter => {
            if(newsletter)
                //res.status(400).json({errors : [{msg : 'Email in newsletter Already Exists'}]})
                console.log('Email in newsletter Already Exists')
            else{
                newNewsletter = new Newsletter({
                    email
                })
            }
        }).catch(err => {
            console.error('Error in saving email to newsletter:' + err);
            
        })

        //Encrypt Password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                newUser.password = hash

                //Send verification Email
                rand=Math.floor((Math.random() * 100) + 54);
                host=req.get('host');
                //console.log(host)
                //despite of localhost, it will be req.get('host')
                link="http://"+"localhost:3000"+"/verify?id="+rand;
                mailOptions={
                    from: '"Exploresio" <annonymousdude07@gmail.com>',//Sender Address
                    to : email,//list of receivers
                    subject : "Please confirm your Email account",//Email Subject
                    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a><br><h3>If it\'s not you, ignore this message</h3>"
                }
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        //Enable less secure apps on sender Email and
                        //Enable display unlock captcha
                        console.log(error);
                        res.json({msg : "Error occured in email verification or Check your Internet",
                                  alertType : 'danger'});
                    }
                    else{
                        // console.log("Message sent: " + response.message);
                        res.json({msg : 'Please check your email to verify your email address',
                                  alertType : 'success'})
                    }
                });
            });
        });    
      }
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send('Server Error') 
    })
})

//@route GET /users/verify
//@desc Verify User Email and save data
//@access public
router.get(`/verify`,function(req,res){
    //Create this page in react. Add button which will redirect to '/login' or add simple redirect to '/login'
    //console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        //console.log("Domain is matched. Information is from Authentic email");

        // if(req.query.id===rand)
        // {
            // console.log("email is verified");
            //add in frontend:res.json({msg : "<h1>Email "+mailOptions.to+" is been Successfully verified"});
            //create a button and on clicking redirect('/login')
            
            User.findOne({email : userEmail}).then(emailExixts => {
                if(emailExixts)
                    res.json({msg : 'User already Registered'})
                else{
                    newUser.save()
                    .then(savedUser => {
                        res.json({msg : 'User has successfully registered'})//make it flash
                        //or
                        // res.json(savedUser)
                        //res.redirect('/login')
                        // res.redirect('localhost:3000/verify'+req.query)
                    })
                    .catch(err => {
                        //console.log(`User save Error...${err}`)
                        res.json({msg : "User save Error...Something gets Wrong..."})
            })
                }
            })

            Newsletter.findOne({email : userEmail}).then(emailExixts => {
                if(emailExixts)
                    console.log('Email in Newsletter Already Exists')
                else{
                    newNewsletter.save().then(saved => {
                        //res.json({msg : 'Email in newsletter has successfully saved'})//make it flash
                        console.log('Email in newsletter has successfully saved')
                    })
                    .catch(err => {
                        console.log(`Email save Error in Newsletter...${err}`)
                    })
                }
            })

        // }
        // else
        // {
        //     //console.log("email is not verified");
        //     res.status(400).json({msg : "Email is not verified",
        //                           alertType : 'danger'})
        // }
    }
    else
    {
        res.json({msg : `Request from Unknown source`})
    }
});

//@route POST users/login
//@desc Authenticate User & Get Token
//@access public
//Login User
router.post('/login' ,[
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password is Required').notEmpty()
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //In redux: err.response.data.errors

    const {email,password} = req.body
    //See if User Exists
    User.findOne({email})
    .then(user => {
      if(!user){
        res.status(400).json({errors : [{msg : 'Invalid Email...'}]})
      }
      else{
        bcrypt.compare(password, user.password , (err, matched) => {
            if(err) return err;
            if(matched){
                const payload = {
                    user:{
                    id : user.id
                    }
                }
                //Return JsonWebToken
                jwt.sign(payload, 
                    config.get('jwtSecret'), 
                    {expiresIn : 360000},
                    (err , token) => {
                    if(err) throw err
                    res.json({ token })
                    })
            }
            else 
                return res.status(400).json({errors : [{msg : 'Invalid Password'}]})
        });
           
        }

    }).catch(err => {
        console.error(err.message)
        res.status(500).json({msg : 'Server Error', alertType : 'danger'})
    })
  })

//@route POST /users/forget-password
//@desc Forget Password functionality // Reset Password
//@access public
router.post('/forget-password' ,[
    check('email', 'Please include a valid Email').isEmail()
    //Check in front end...Email should not be of admin
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email} = req.body
    //See if User Exists
    User.findOne({email})
    .then(user => {
      if(!user){
        res.status(400).json({errors : [{msg : 'Email Not Found'}]})
        //res.redirect('/forget-password')
      }
      else{
                //Send verification Email
                rand=Math.floor((Math.random() * 100) + Math.random());
                host=req.get('host');
                //console.log(host)
                link="http://"+req.get('host')+"/users/update-password?id="+rand+"&&email_id="+user._id
                mailOptions={
                    from: '"Exploresio" <annonymousdude07@gmail.com>',//Sender Address
                    to : email,//list of receivers
                    subject : "Reset Password",//Email Subject
                    html : "Hello,<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to verify</a><br><h3>If it\'s not you, ignore this message</h3>"
                }
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                        res.json({errors : [{msg : "Error occured in email verification"}]});
                    }
                    else{
                        //console.log("Message sent: " + response.message);
                        res.json({msg : 'Please check your email to verify your email address'})
                    }
                });
            }
        });
    })
    
//@route GET /users/update-password
//@desc Verify Email in case of forget password
//@access public
router.get('/update-password',function(req,res){
    //Add name field as text field but not as input field
    //create update-password page as form just like register user page.Donot add email field
    //create a hidden field and assign it email_id as an attribute so that we can access it as req.body.email_id
    //console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            // console.log("email is verified");
            //add in frontend:res.json({msg : "<h1>Email "+mailOptions.to+" is been Successfully verified"});
            //create a button and on clicking redirect('/login')
            //res.status(400).json({msg : 'Email is Verified'})//make it flash
            User.findById(req.query.email_id).select('-password')
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                console.error(err.message)
                res.status(500).send('Server Error')
            })
        }
        else
        {
            //console.log("email is not verified");
            res.status(400).json({errors : [{msg : "Email is not verified"}]})
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});

//@route POST /users/update-password
//@desc Update User password
//@access public
router.put('/update-password' ,[
    check('password', 'Please Enter a Password with 6 or more characters').isLength({ min: 6 })
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //See if User Exists
    if(req.query.id == rand){
            //Update
            User.findById(req.body.email_id)
            .then(user => {
                user.password = req.body.password
                //Encrypt Password
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(user.password, salt, function(err, hash) {
                        user.password = hash
                        user.save()
                        .then(updatedUser => {
                            res.json(updatedUser)
                        })
                        .catch(err => {
                        console.log(`User save Error...${err}`)
                        })
                    });
                });
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).send('Updating Server Error...') 
            })
            //res.redirect('/login')
    }
    else{
        res.status(400).json({errors : [{msg : "Email is not verified"}]})
    }
})

module.exports = router