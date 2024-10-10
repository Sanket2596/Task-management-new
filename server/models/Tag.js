import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  color: {
    type: String,
    enum: ['green', 'red', 'blue', 'purple', 'yellow', 'orange'],
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Tag', tagSchema);