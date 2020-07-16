const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const {isEmpty} = require('../../middleware/uploadfile-helper')
const auth = require('../../middleware/auth')
const Tour = require('../../models/Tour')
const fs = require('fs')
const multer = require('multer')

///////////////
//Get all Active Tours
//Get all Current Tours
//Get all finished Tours

//@route GET admin/tour
//@desc Get All Tours
//@access private
router.get('/' , auth , (req,res) => {
    Tour.find({}).sort({date : -1})
    .then(tour => {
        if(!tour)
            return res.status(400).json({msg : 'There is no tour.'})
        res.json(tour)
    })
    .catch(err => {
        console.error(err.message)
        res.status(500).send('Server Error in getting all tours')
    })
})

//@route POST admin/tour/addImage
//@desc Add image in tour
//@access private

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
      },
    filename: function (req, file, cb) {
      cb(null, `${Date.now}-${file.originalname}`);
    },
  });
  
// const upload = multer({ storage });
var upload = multer({ storage: storage })//.single('file')

let files = []
router.post('/addImage' , [
    auth,
    upload.single('file')
  ],(req,res) => {
        if(files.length < 2){
            if(!isEmpty(req.files)){
                file = req.files.file
                files.push(file)
                return res.json({msg : 'Image has Uploaded',alertType : 'success'})    
            }
        }
        else{
            return res.json({msg : 'You cannot upload more than two images',alertType : 'error'})
        }
    return res.json({msg : 'Due to some issue, Image cannot be uploaded'})

})

//@route POST admin/tour
//@desc Create a Tour
//@access private

router.post('/' , [
    auth,
    [
        check('destinationName' , 'Destination Name is required').not().isEmpty(),
        check('destinationProvince' , 'Destination Province is required').not().isEmpty(),
        check('noOfDays' , 'No. of Days is required').notEmpty(),
        check('price' , 'Price is required').not().isEmpty(),
        check('travelDate' , 'Date to Travel is required').not().isEmpty()
    ]
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {destinationName,destinationProvince,destinationSlogan,noOfDays,price,
            description,dayDescriptions,travelDate} = req.body
    const newTour = new Tour({
        user : req.user.id,
        destinationName,
        destinationProvince,
        destinationSlogan,
        noOfDays,
        price,
        travelDate,
        description
    })
    if(files.length > 0){
        files.map(file => {
            filename = Date.now() + '-' + file.name
            file.mv('./public/'+filename , (err) => {
                if (err) throw err
            })
            newTour.files.push({file : filename})
        })
    }

    dayDescriptions.map(desp => newTour.dayDescription.push(desp))

    newTour.save().then(savedTour => {
        res.json(savedTour)
        files = []
    }).catch(err => {
        console.error(err.message);
        res.status(500).send('Server Error in creating a tour')
    })

})

//@route PUT admin/tour/dayDescription/:id
//@desc Add Day Description to a Tour
//@access private
router.post('/dayDescription/:id', [
    auth,
    [
    check('body' , 'Body is required').not().isEmpty(),
    ]
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {subject,body} = req.body

    const newDayDescription = {
        subject,
        body
    }

    Tour.findById(req.params.id).then(tour => {
        tour.dayDescription.push(newDayDescription)

        tour.save().then(savedTour => {
            res.json(savedTour)
        }).catch(err => {
            console.error(err.message)
            res.json({msg : "Error in Adding Day Description"})
        })

    }).catch(err => {
        console.error(err.message);
        res.status(400).json({msg : "No Tour Found. Plz Add a Tour Frist"})
    })

})

//@route PUT admin/tour/:id
//@desc Update tour by id
//@access Private
router.put('/:id' , [
    auth,
    [
    check('destinationName' , 'Destination Name is required').not().isEmpty(),
    check('destinationProvince' , 'Destination Province is required').not().isEmpty(),
    check('noOfDays' , 'No. of Days is required').notEmpty(),
    check('price' , 'Price is required').not().isEmpty()
    ]
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let filename = '';//Default file
    if(!isEmpty(req.files)){
        let file = req.files.file;
        filename = Date.now() + '-' + req.files.file.name;

        file.mv('./public/'+filename , (err) => {
            if (err) throw err;
        });
    }

    const {destinationName,destinationProvince,destinationSlogan,noOfDays,price,
            description,subject,body} = req.body
    
    Tour.findById(req.params.id)
    .then(tour => {
        tour.user = req.user.id
        tour.destinationName = destinationName
        tour.destinationProvince = destinationProvince,
        tour.destinationSlogan = destinationSlogan,
        tour.noOfDays = noOfDays,
        tour.file = filename,
        tour.price = price,
        tour.description = description

        tour.save().then(updatedTour => {
            res.json(updatedTour)
        }).catch(err => {
            console.error(err.message);
            res.status(500).send('Server Error in creating a tour')
        })
    })
    .catch(err => {
        console.error(err.message)
        res.json({msg : 'Some Error Occurred or no tour found to update'})
    })

})

//@route DELETE admin/tour/:id
//@desc Delete a Tour
//@access Private
router.delete('/:id' , (req,res) => {
    Tour.findById(req.params.id)
    .then(tour => {
        tour.files.map(file => {
            fs.unlink('./public/' + file.file , (err) => {
                if (err) throw err
            })
        })

        if(!tour)
            return res.status(404).json({msg : 'Tour Not Found',alertType:'warning'})
        
        tour.remove()
        res.json({msg : 'Tour Removed',alertType : 'success'})

    })
    .catch(err => {
        console.error(err.message)
        res.json({msg : "Error in Deleting Tour or No Tour Found"})
    })
})

//@route POST /admin/tour/isActive
//@desc Make/Remove a Tour for active status
//@access private
router.post('/isActive' ,auth, (req,res) => {
    Tour.findById(req.body.id)
    .then(tour => {

        tour.isActive = req.body.allowActive

        tour.save()
        .then(updatedTour => {
            res.json(updatedTour)
        })
        .catch(err => {
            console.error(err.message)
            res.status(500).send('Server Error in updating tour Active Status')
        })
    })
    .catch(err => {
        console.error(err.message)
        res.status(500).send('Server Error')
    })
})

//@route POST /admin/tour/isCurrent
//@desc Make/Remove a Tour for current status
//@access private
router.post('/isCurrent' ,auth, (req,res) => {
    Tour.findById(req.body.id)
    .then(tour => {

        tour.isCurrent = req.body.allowCurrent

        tour.save()
        .then(updatedTour => {
            res.json(updatedTour)
        })
        .catch(err => {
            console.error(err.message)
            res.status(500).send('Server Error in updating tour Active Status')
        })
    })
    .catch(err => {
        console.error(err.message)
        res.status(500).send('Server Error')
    })
})

//@route POST /admin/tour/isFinished
//@desc Make/Remove a Tour for Finished status
//@access private
router.post('/isFinished' ,auth, (req,res) => {
    Tour.findById(req.body.id)
    .then(tour => {

        tour.isFinished = req.body.allowFinished

        tour.save()
        .then(updatedTour => {
            res.json(updatedTour)
        })
        .catch(err => {
            console.error(err.message)
            res.status(500).send('Server Error in updating tour Active Status')
        })
    })
    .catch(err => {
        console.error(err.message)
        res.status(500).send('Server Error')
    })
})

module.exports = router