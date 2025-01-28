const { User } = require("../models/User")
const { hashPassword, comparePassword, generateOTP, sendOTPEmail, } = require("../helpers/authHelper.js");
const JWT = require("jsonwebtoken");

// Controller for handling user signup
const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Validate
    if (!name) {
      return res.send({ error: "Name is required" });
    }

    if (!email) {
      return res.send({ error: "Email is required" });
    }

    if (!password) {
      return res.send({ error: "Password is required" });
    }

    // Check if the email is already associated with an existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    // Securely hash the user's password before storing it
    const hashedPassword = await hashPassword(password);

    // Create a new User instance with the provided data
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password, not the plain text one
      address,
      phone,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with a success message and the newly created user data
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);

    // Return a 500 status code indicating a server-side error
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Login controller to handle user login requests
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
     if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password", 
      });
    }

    // Find the user by email in the database
    const user = await User.findOne({ email });
    
    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered.",
      });
    }

    // Compare the provided password with the stored hashed password
    const match = await comparePassword(password, user.password);
    
    // If the passwords don't match, return a 401 error
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate a JWT token with the user's ID and a secret key
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5d",
    });

    // Respond with a success message, user details and token
    res.status(200).send({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id, 
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone
      },
      token, // JWT token
    });
  } catch (error) {
    // Log any errors and respond with a 500 Internal Server Error
    console.error("Error logging in user:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found.' });

      const otp = generateOTP();
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000; // Valid for 10 minutes
      await user.save();

      await sendOTPEmail(user.email, otp);

      res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (err) {
      res.status(500).json({ message: 'Server error.' });
  }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({
            email,
            otp,
            otpExpires: { $gt: Date.now() }, // Ensure OTP is not expired
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired OTP.' });

        res.status(200).json({ message: 'OTP verified successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

const setNewPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        user.password = await hashPassword(password); // Assuming `hashPassword` hashes the password
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};


module.exports = {registerController, loginController, requestPasswordReset,verifyOTP,setNewPassword };