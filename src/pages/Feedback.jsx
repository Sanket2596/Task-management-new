import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const Feedback = () => {
  const { getToken } = useUser();
  const [feedback, setFeedback] = useState({
    subject: '',
    body: '',
    emotion: 'happy',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.post('http://localhost:5000/api/feedback', feedback, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-4">Your feedback has been submitted successfully.</p>
        <p className="text-gray-600">We appreciate your input and will review it shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadowrounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
          <input
            type="text"
            id="subject"
            value={feedback.subject}
            onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700 font-bold mb-2">Feedback</label>
          <textarea
            id="body"
            value={feedback.body}
            onChange={(e) => setFeedback({ ...feedback, body: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="emotion" className="block text-gray-700 font-bold mb-2">Emotion</label>
          <select
            id="emotion"
            value={feedback.emotion}
            onChange={(e) => setFeedback({ ...feedback, emotion: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="inspired">Inspired</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;