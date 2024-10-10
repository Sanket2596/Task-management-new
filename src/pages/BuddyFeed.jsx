import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const BuddyFeed = () => {
  const { getToken } = useUser();
  const [buddies, setBuddies] = useState([]);

  useEffect(() => {
    const fetchBuddyFeed = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://localhost:5000/api/buddies/feed', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBuddies(response.data);
      } catch (error) {
        console.error('Error fetching buddy feed:', error);
      }
    };

    fetchBuddyFeed();
    const interval = setInterval(fetchBuddyFeed, 180000); // Refresh every 3 minutes
    return () => clearInterval(interval);
  }, [getToken]);

  const handleEncourage = async (buddyId) => {
    try {
      const token = await getToken();
      await axios.post('http://localhost:5000/api/buddies/encourage', { buddyId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update UI to show encouragement sent
    } catch (error) {
      console.error('Error sending encouragement:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">Buddy Feed</h1>
      <ul className="space-y-4">
        {buddies.map((buddy) => (
          <li key={buddy.username} className="border-b pb-4">
            <h2 className="text-xl font-semibold">{buddy.username}</h2>
            <p className="text-gray-600">{buddy.location.city}, {buddy.location.country}</p>
            <p className="text-green-600 font-semibold">Completed {buddy.completedTasksToday} tasks today</p>
            <button
              onClick={() => handleEncourage(buddy.id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Encourage
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuddyFeed;