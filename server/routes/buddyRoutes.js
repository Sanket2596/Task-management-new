import express from 'express';
import User from '../models/User.js';
import Task from '../models/Task.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Add a buddy
router.post('/add', requireAuth, async (req, res) => {
  const { buddyId } = req.body;
  try {
    const user = await User.findOne({ clerkId: req.user.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.buddies.length >= 10) {
      return res.status(400).json({ message: 'You can have a maximum of 10 buddies' });
    }

    if (!user.buddies.includes(buddyId)) {
      user.buddies.push(buddyId);
      await user.save();
    }

    res.json({ message: 'Buddy added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a buddy
router.post('/remove', requireAuth, async (req, res) => {
  const { buddyId } = req.body;
  try {
    const user = await User.findOne({ clerkId: req.user.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.buddies = user.buddies.filter(id => id !== buddyId);
    await user.save();

    res.json({ message: 'Buddy removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get buddy feed
router.get('/feed', requireAuth, async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.user.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const buddyFeed = await Promise.all(user.buddies.map(async (buddyId) => {
      const buddy = await User.findOne({ clerkId: buddyId });
      if (!buddy) return null;

      const completedTasksToday = await Task.countDocuments({
        userId: buddyId,
        completed: true,
        completedAt: { $gte: today },
      });

      return {
        username: buddy.username,
        location: buddy.location,
        completedTasksToday,
      };
    }));

    const filteredBuddyFeed = buddyFeed.filter(buddy => buddy && buddy.completedTasksToday >= 3);

    res.json(filteredBuddyFeed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Encourage a buddy
router.post('/encourage', requireAuth, async (req, res) => {
  const { buddyId } = req.body;
  try {
    // Here you would implement the logic to send an encouragement notification
    // This could involve updating a notification collection in the database
    // and triggering a push notification if implemented

    res.json({ message: 'Encouragement sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;