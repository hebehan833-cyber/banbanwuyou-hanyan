
import React from 'react';
import { ScreenName } from '../types';

interface BottomNavProps {
  currentScreen: ScreenName;
  onNav: (screen: ScreenName) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNav }) => {
  const tabs = [
    { name: '首页', icon: 'home', screen: 'Home' as ScreenName },
    { name: '订单', icon: 'receipt_long', screen: 'Orders' as any },
    { name: '助手', icon: 'smart_toy', screen: 'Chat' as ScreenName },
    { name: '服务', icon: 'medical_services', screen: 'Services' as any },
    { name: '我的', icon: 'person', screen: 'Profile' as any },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-[480px] bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 flex justify-around items-center py-3 px-4 z-50">
      {tabs.map((tab) => (
        <button 
          key={tab.name}
          onClick={() => onNav(tab.screen)}
          className={`flex flex-col items-center gap-1 ${currentScreen === tab.screen ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-2xl ${currentScreen === tab.screen ? 'filled' : ''}`}>{tab.icon}</span>
          <span className={`text-[11px] font-bold`}>{tab.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
