import React, { useEffect, useState } from 'react';

export const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time in Central Time (America/Chicago)
  const formatCentralTime = (date: Date) => {
    // Central Time is UTC-6 (Standard) or UTC-5 (Daylight Saving Time)
    const centralTime = new Date(date.toLocaleString("en-US", {timeZone: "America/Chicago"}));
    
    const hours = centralTime.getHours();
    const minutes = centralTime.getMinutes();
    const seconds = centralTime.getSeconds();
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    
    return {
      time: `${displayHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      period,
      fullTime: `${displayHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`
    };
  };

  const centralTime = formatCentralTime(time);

  return (
    <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg border border-yellow-500/20">
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-400 font-medium">CT</span>
      </div>
      <div className="text-yellow-400 font-mono font-bold text-sm">
        {centralTime.time}
      </div>
      <div className="text-xs text-gray-400">
        {centralTime.period}
      </div>
    </div>
  );
};