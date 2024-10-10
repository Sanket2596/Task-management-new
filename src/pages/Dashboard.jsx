import React from 'react';
import { useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username || 'User'}!</h1>
      <p className="text-gray-600 mb-8">Here's an overview of your tasks and progress.</p>
      {/* Add task summary, charts, and other dashboard components here */}
    </div>
  );
};

export default Dashboard;