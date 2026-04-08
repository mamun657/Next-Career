const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role || 'user',
      permissions: user.permissions || [],
    },
    config.jwtSecret,
    { expiresIn: '30d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, education, experienceLevel, preferredTrack, interests } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    const user = await User.create({
      name,
      email,
      password,
      role: 'user',
      permissions: [],
      education: education || '',
      experienceLevel: experienceLevel || 'Fresher',
      preferredTrack: preferredTrack || 'Web',
      interests: interests || [],
    });
    res.status(201).json({
      user,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Registration failed.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    // Remove password before sending response
    const userResponse = user.toJSON();
    res.json({
      user: userResponse,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Login failed.' });
  }
};
