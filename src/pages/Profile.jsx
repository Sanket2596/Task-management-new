import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const Profile = () => {
  const { user, getToken } = useUser();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [getToken]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    // Implement profile update logic here
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <form onSubmit={handleProfileUpdate}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">City</label>
          <input
            type="text"
            id="city"
            value={profile.location.city}
            onChange={(e) => setProfile({ ...profile, location: { ...profile.location, city: e.target.value } })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 font-bold mb-2">State</label>
          <input
            type="text"
            id="state"
            value={profile.location.state}
            onChange={(e) => setProfile({ ...profile, location: { ...profile.location, state: e.target.value } })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Country</label>
          <input
            type="text"
            id="country"
            value={profile.location.country}
            onChange={(e) => setProfile({ ...profile, location: { ...profile.location, country: e.target.value } })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;