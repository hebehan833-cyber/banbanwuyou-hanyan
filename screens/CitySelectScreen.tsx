
import React, { useState } from 'react';
import { CITIES } from '../constants';

interface CitySelectScreenProps {
  currentCity: string;
  onBack: () => void;
  onCitySelect: (city: string) => void;
  onApplyToOpen: () => void;
}

const CitySelectScreen: React.FC<CitySelectScreenProps> = ({ currentCity, onBack, onCitySelect, onApplyToOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const openedCities = CITIES.filter(c => c.status === 'opened' && c.name.includes(searchQuery));
  const unopenedCities = CITIES.filter(c => c.status === 'unopened' && c.name.includes(searchQuery));

  return (
    <div className="relative flex flex-col bg-background-light dark:bg-background-dark min-h-screen">
      <div className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button onClick={onBack} className="text-[#121716] dark:text-white flex size-12 shrink-0 items-center">
            <span className="material-symbols-outlined text-[28px]">chevron_left</span>
          </button>
          <h2 className="text-[#121716] dark:text-white text-lg font-bold flex-1 text-center pr-12">选择服务城市</h2>
        </div>
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm bg-white dark:bg-[#1e2d2a]">
              <div className="text-[#67837f] flex items-center justify-center pl-4 rounded-l-xl">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 resize-none border-none bg-transparent focus:ring-0 h-full placeholder:text-[#67837f] px-4 pl-2 text-base font-normal leading-normal" 
                placeholder="搜索城市名称" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mt-2">
          <h3 className="text-[#121716] dark:text-white text-lg font-bold px-4 pb-2 pt-4">当前城市</h3>
          <div className="flex items-center gap-4 bg-white dark:bg-[#1e2d2a] px-4 min-h-14 justify-between mx-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                <span className="material-symbols-outlined filled">my_location</span>
              </div>
              <p className="text-[#121716] dark:text-white text-base font-medium leading-normal flex-1 truncate">{currentCity}</p>
            </div>
            <button className="text-primary text-sm font-medium flex items-center gap-1 active:opacity-60 transition-opacity">
              <span className="material-symbols-outlined text-sm">refresh</span>
              重新定位
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-[#121716] dark:text-white text-lg font-bold px-4 pb-2 pt-4">已开通城市</h3>
          <div className="px-4 pt-2">
            <div className="grid grid-cols-3 gap-3">
              {openedCities.map(city => (
                <button 
                  key={city.name}
                  onClick={() => onCitySelect(city.name)}
                  className="flex items-center justify-center px-4 py-3 bg-white dark:bg-[#1e2d2a] rounded-lg text-sm font-medium shadow-sm hover:border-primary border border-transparent transition-all active:scale-95"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 mb-10">
          <h3 className="text-[#121716] dark:text-white text-lg font-bold px-4 pb-2 pt-4">未开通城市</h3>
          <div className="flex flex-col gap-0.5 mt-2">
            {unopenedCities.map(city => (
              <div key={city.name} className="flex items-center justify-between bg-white dark:bg-[#1e2d2a] px-4 py-4 border-b border-background-light dark:border-background-dark">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#67837f]">location_city</span>
                  <span className="text-base font-normal">{city.name}</span>
                </div>
                <button 
                  onClick={onApplyToOpen}
                  className="px-4 py-1.5 border border-primary text-primary rounded-full text-xs font-medium hover:bg-primary hover:text-white transition-all active:scale-95"
                >
                  申请开通
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-[#67837f] text-xs mt-6 px-10">
            如果您所在的城市未开通，您可以点击申请开通，我们将优先考虑需求较多的区域。
          </p>
        </div>
      </div>
    </div>
  );
};

export default CitySelectScreen;
