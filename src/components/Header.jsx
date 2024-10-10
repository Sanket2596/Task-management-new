import React from 'react';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { CheckSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center text-xl font-bold text-gray-800">
          <CheckSquare className="w-6 h-6 mr-2" />
          TaskMaster
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/tasks" className="text-gray-600 hover:text-gray-800">Tasks</Link></li>
            <li><Link to="/buddy-feed" className="text-gray-600 hover:text-gray-800">Buddy Feed</Link></li>
            <li><Link to="/profile" className="text-gray-600 hover:text-gray-800">Profile</Link></li>
            <li><Link to="/settings" className="text-gray-600 hover:text-gray-800">Settings</Link></li>
          </ul>
        </nav>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;