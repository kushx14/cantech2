const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const fetch = require('../middleware/fetchdetails');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Use consistent variable naming for the JWT secret
const jwtSecret = "HaHa"; // You can replace this with an environment variable for better security

// Route to create a new user
router.post(
  "/createuser",
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, message: "Error creating user" });
    }
  }
);

// Route to log in a user
router.post(
  "/loginuser",
  body('email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      const pwdcompare = await bcrypt.compare(password, userData.password);
      console.log("Password comparison result:", pwdcompare);

      if (!pwdcompare) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      // Fixed jwtSecret variable name
      const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });

      return res.json({ success: true, authToken });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ success: false, message: "Error logging in" });
    }
  }
);

// Route to fetch user details
router.post('/getuser', fetch, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // Exclude password from the response
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
