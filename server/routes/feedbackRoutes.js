import express from 'express';
import Feedback from '../models/Feedback.js';
import { requireAuth } from '../middleware/auth.js';
import { sendFeedbackEmail, sendConfirmationEmail } from '../utils/emailService.js';

const router = express.Router();

// Submit feedback
router.post('/', requireAuth, async (req, res) => {
  const feedback = new Feedback({
    ...req.body,
    userId: req.user.id,
  });

  try {
    const newFeedback = await feedback.save();
    await sendFeedbackEmail(newFeedback, req.user);
    await sendConfirmationEmail(req.user.email, newFeedback);
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;