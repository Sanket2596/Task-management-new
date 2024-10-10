import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';
import BuddyFeed from './pages/BuddyFeed';
import Settings from './pages/Settings';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/buddy-feed" element={<BuddyFeed />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;