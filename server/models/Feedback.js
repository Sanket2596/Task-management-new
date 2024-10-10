import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  emotion: {
    type: String,
    enum: ['angry', 'sad', 'happy', 'inspired'],
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);