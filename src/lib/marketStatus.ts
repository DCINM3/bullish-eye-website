export interface MarketStatus {
  isOpen: boolean;
  status: 'Open' | 'Closed' | 'Pre-Market' | 'Post-Market';
  nextEvent: string;
  timeUntilNext: string;
}

export function getIndianMarketStatus(): MarketStatus {
  const now = new Date();
  const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
  
  const currentHour = istTime.getHours();
  const currentMinute = istTime.getMinutes();
  const currentTime = currentHour * 60 + currentMinute; // Convert to minutes
  
  // Market timings in minutes from midnight
  const preMarketStart = 9 * 60; // 9:00 AM
  const marketOpen = 9 * 60 + 15; // 9:15 AM
  const marketClose = 15 * 60 + 30; // 3:30 PM
  const postMarketEnd = 16 * 60; // 4:00 PM
  
  // Check if it's weekend
  const dayOfWeek = istTime.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday = 0, Saturday = 6
    return {
      isOpen: false,
      status: 'Closed',
      nextEvent: 'Market opens Monday at 9:15 AM',
      timeUntilNext: getTimeUntilNextMarketDay(istTime)
    };
  }
  
  if (currentTime >= preMarketStart && currentTime < marketOpen) {
    return {
      isOpen: false,
      status: 'Pre-Market',
      nextEvent: 'Market opens at 9:15 AM',
      timeUntilNext: getTimeUntil(istTime, 9, 15)
    };
  } else if (currentTime >= marketOpen && currentTime < marketClose) {
    return {
      isOpen: true,
      status: 'Open',
      nextEvent: 'Market closes at 3:30 PM',
      timeUntilNext: getTimeUntil(istTime, 15, 30)
    };
  } else if (currentTime >= marketClose && currentTime < postMarketEnd) {
    return {
      isOpen: false,
      status: 'Post-Market',
      nextEvent: 'Market opens tomorrow at 9:15 AM',
      timeUntilNext: getTimeUntilNextDay(istTime, 9, 15)
    };
  } else {
    return {
      isOpen: false,
      status: 'Closed',
      nextEvent: currentTime < preMarketStart ? 'Pre-market starts at 9:00 AM' : 'Market opens tomorrow at 9:15 AM',
      timeUntilNext: currentTime < preMarketStart ? getTimeUntil(istTime, 9, 0) : getTimeUntilNextDay(istTime, 9, 15)
    };
  }
}

function getTimeUntil(currentTime: Date, targetHour: number, targetMinute: number): string {
  const target = new Date(currentTime);
  target.setHours(targetHour, targetMinute, 0, 0);
  
  const diff = target.getTime() - currentTime.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

function getTimeUntilNextDay(currentTime: Date, targetHour: number, targetMinute: number): string {
  const target = new Date(currentTime);
  target.setDate(target.getDate() + 1);
  target.setHours(targetHour, targetMinute, 0, 0);
  
  const diff = target.getTime() - currentTime.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}

function getTimeUntilNextMarketDay(currentTime: Date): string {
  const target = new Date(currentTime);
  const daysUntilMonday = (8 - target.getDay()) % 7 || 7;
  target.setDate(target.getDate() + daysUntilMonday);
  target.setHours(9, 15, 0, 0);
  
  const diff = target.getTime() - currentTime.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return `${days}d ${hours}h`;
}

export function formatISTTime(): string {
  const now = new Date();
  return now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}
