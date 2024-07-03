const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define User schema and model
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
});

// Route to handle user signup
app.post('/api/auth/signup', [
  // Validate and sanitize input
  body('username').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: 'Validation error', errors: errors.array() });
  }

  // Destructure username, email, password from request body
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user instance
    user = new User({
      username,
      email,
      password, // Note: You should hash the password before saving it
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Respond with success message
    res.json({ msg: 'User signed up successfully' });
  } catch (err) {
    console.error('MongoDB Error:', err);
    res.status(500).send('Server Error');
  }
});

// Route to handle user login
app.post('/api/auth/login', [
  // Validate and sanitize input
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().trim().escape(),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: 'Validation error', errors: errors.array() });
  }

  // Destructure email and password from request body
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Respond with success message
    res.json({ msg: 'User logged in successfully' });
  } catch (err) {
    console.error('MongoDB Error:', err);
    res.status(500).send('Server Error');
  }
});

// Route to fetch user profile
app.get('/api/auth/profile', async (req, res) => {
  try {
    const userId = req.query.userId;

    // Find user by ID
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Respond with user data
    res.json(user);
  } catch (err) {
    console.error('MongoDB Error:', err);
    res.status(500).send('Server Error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
