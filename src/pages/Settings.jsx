import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const Settings = () => {
  const { getToken } = useUser();
  const [settings, setSettings] = useState({
    isProfilePrivate: false,
    notificationSettings: {
      taskReminders: true,
      pointsAndEncouragement: false,
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, [getToken]);

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.patch('http://localhost:5000/api/users/profile', settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSettingsUpdate}>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.isProfilePrivate}
              onChange={(e) => setSettings({ ...settings, isProfilePrivate: e.target.checked })}
              className="mr-2"
            />
            Make profile private
          </label>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Notification Settings</h2>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notificationSettings.taskReminders}
              onChange={(e) => setSettings({
                ...settings,
                notificationSettings: {
                  ...settings.notificationSettings,
                  taskReminders: e.target.checked,
                },
              })}
              className="mr-2"
            />
            Task Reminders
          </label>
          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={settings.notificationSettings.pointsAndEncouragement}
              onChange={(e) => setSettings({
                ...settings,
                notificationSettings: {
                  ...settings.notificationSettings,
                  pointsAndEncouragement: e.target.checked,
                },
              })}
              className="mr-2"
            />
            Points and Encouragement
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;