import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Search, UserPlus } from 'lucide-react';

const BuddySearch = ({ onBuddyAdded }) => {
  const { getToken } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const response = await axios.get(`http://localhost:5000/api/users/search?query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for buddies:', error);
    }
  };

  const handleAddBuddy = async (buddyId) => {
    try {
      const token = await getToken();
      await axios.post('http://localhost:5000/api/buddies/add', { buddyId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onBuddyAdded(buddyId);
      setSearchResults(searchResults.filter((buddy) => buddy._id !== buddyId));
    } catch (error) {
      console.error('Error adding buddy:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Find Buddies</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username or location"
            className="flex-grow px-3 py-2 border rounded-lg"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
            <Search size={20} />
          </button>
        </div>
      </form>
      <ul className="space-y-2">
        {searchResults.map((buddy) => (
          <li key={buddy._id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{buddy.username}</p>
              <p className="text-sm text-gray-600">{buddy.location.city}, {buddy.location.country}</p>
            </div>
            <button
              onClick={() => handleAddBuddy(buddy._id)}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            >
              <UserPlus size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuddySearch;