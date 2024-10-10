import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  reminderFrequency: {
    type: String,
    enum: ['once', 'daily', 'weekly', 'monthly', 'custom'],
  },
  customReminderInterval: { type: Number },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);