
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user");


// Register user
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
     
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() });
      }

      const { name, email, password } = req.body;

      
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ message: "This email already exists" });
      }

      
      const hashPassword = await bcrypt.hash(password, 10);

      
      const newUser = new User({ name, email, password: hashPassword });
      await newUser.save();

      
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT,
        { expiresIn: "7d" }
      );

      
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      }).json({ status: "success", message: "Register success", token });

    } catch (error) {
      console.error("Error in register:", error);
      res.status(500).json({ status: "fail", message: "Something went wrong" });
    }
  }
);


// login user
router.post(
    "/login",
    [
      body("email").isEmail().withMessage("Invalid email format"),
      body("password").notEmpty().withMessage("Password is required"),
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ status: "error", errors: errors.array() });
        }
  
        const { email, password } = req.body;
  
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          return res.status(400).json({ status: "error", message: "Invalid email or password" });
        }
  
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
          return res.status(400).json({ status: "error", message: "Invalid email or password" });
        }
  
        const token = jwt.sign(
          { id: existingUser._id, email: existingUser.email, role:existingUser.role },
          process.env.JWT,
          { expiresIn: "7d" }
        );
  
        const userData = {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          role:existingUser.role,
        };
  
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .json({ status: "success", message: "Login success", token, user: userData });
  
      } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ status: "fail", message: "Something went wrong" });
      }
    }
  );
  


// logout
router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.json({ message: "logout success" })
  });


//   middleware
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data" });
    }
});


module.exports = router;