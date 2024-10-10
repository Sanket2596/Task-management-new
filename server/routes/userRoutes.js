import express from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.user.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.patch('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.user.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search users by username or location
router.get('/search', requireAuth, async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { 'location.city': { $regex: query, $options: 'i' } },
        { 'location.state': { $regex: query, $options: 'i' } },
        { 'location.country': { $regex: query, $options: 'i' } },
      ],
      isProfilePrivate: false,
    }).select('username location');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;