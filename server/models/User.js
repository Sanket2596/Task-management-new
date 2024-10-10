import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  location: {
    city: String,
    state: String,
    country: String,
  },
  isSubscriber: { type: Boolean, default: false },
  isProfilePrivate: { type: Boolean, default: false },
  buddies: [{ type: String }], // Array of Clerk user IDs
  notificationSettings: {
    taskReminders: { type: Boolean, default: true },
    pointsAndEncouragement: { type: Boolean, default: false },
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);