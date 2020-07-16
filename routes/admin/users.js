const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

//@route GET /admin/users/auth
//@desc Get Login Admin data
//@access private
router.get("/auth", auth, (req, res) => {
  User.findOne({ _id: req.user.id, isAdmin: true })
    .select("-password")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

//@route GET /admin/users
//@desc Get all users data
//@access private
//Only admin can access it
router.get("/", auth, (req, res) => {
  User.find({})
    .select("-password")
    .sort({ date: -1 })
    .then((user) => {
      res.json(user);
      console.log(user);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

//@route DELETE /admin/users/:id
//@desc Delete a user
//@access private
//Only admin can access it
router.delete("/:id", auth, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      res.json(deletedUser);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

//@route PUT /admin/users/isAdmin
//@desc Make/Remove a user for admin
//@access private
//Only admin can access it
router.put("/isAdmin", auth, (req, res) => {
  User.findById(req.body.id)
    .select("-password")
    .then((user) => {
      // console.log(req.body.allowAdmin)

      user.isAdmin = req.body.allowAdmin;

      user
        .save()
        .then((updatedUser) => {
          res.json(updatedUser);
        })
        .catch((err) => {
          console.error(err.message);
          res.status(500).send("Server Error in updating isAdmin");
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

module.exports = router;
