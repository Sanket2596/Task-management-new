import express from 'express';
import Tag from '../models/Tag.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all tags for a user
router.get('/', requireAuth, async (req, res) => {
  try {
    const tags = await Tag.find({ userId: req.user.id });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new tag
router.post('/', requireAuth, async (req, res) => {
  const tag = new Tag({
    ...req.body,
    userId: req.user.id,
  });

  try {
    const newTag = await tag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a tag
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const tag = await Tag.findOne({ _id: req.params.id, userId: req.user.id });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    Object.assign(tag, req.body);
    const updatedTag = await tag.save();
    res.json(updatedTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a tag
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const tag = await Tag.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;