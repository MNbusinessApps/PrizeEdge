import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../App';

interface LiveClockProps {
  size?: 'small' | 'medium' | 'large';
}

const LiveClock: React.FC<LiveClockProps> = ({ size = 'medium' }) => {
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

  const getFontSize = () => {
    switch (size) {
      case 'small': return 12;
      case 'large': return 20;
      default: return 14;
    }
  };

  const getTimeSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 24;
      default: return 18;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Central Time</Text>
      <View style={styles.timeContainer}>
        <Text style={[styles.time, { fontSize: getTimeSize() }]}>
          {centralTime.time}
        </Text>
        <Text style={[styles.period, { fontSize: getFontSize() }]}>
          {centralTime.period} CT
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: Colors.accent,
  },
  period: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
});

export default LiveClock;