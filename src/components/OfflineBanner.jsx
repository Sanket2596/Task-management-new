import React from 'react';
import { WifiOff } from 'lucide-react';

const OfflineBanner = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 flex items-center">
      <WifiOff className="mr-2" />
      <span>You are currently offline. Changes will be synced when you're back online.</span>
    </div>
  );
};

export default OfflineBanner;