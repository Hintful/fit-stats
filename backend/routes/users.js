const router = require('express').Router();
const User = require("../models/user.model");

// GET request
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// POST request
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser.save()
  .then(() => res.json("User added!"))
  .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;