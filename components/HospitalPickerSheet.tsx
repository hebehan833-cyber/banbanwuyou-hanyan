
import React, { useState } from 'react';

interface Hospital {
  id: string;
  name: string;
  tag: string;
  address: string;
  distance: string;
}

interface HospitalPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (hospital: Hospital) => void;
}

const HOSPITALS: Hospital[] = [
  { id: '1', name: '复旦大学附属中山医院', tag: '三甲', address: '徐汇区医学院路180号', distance: '1.2km' },
  { id: '2', name: '上海交通大学医学院附属瑞金医院', tag: '三甲', address: '黄浦区瑞金二路197号', distance: '2.8km' },
  { id: '3', name: '上海市第六人民医院', tag: '三甲', address: '徐汇区宜山路600号', distance: '4.5km' },
  { id: '4', name: '华山医院', tag: '三甲', address: '静安区乌鲁木齐中路12号', distance: '5.1km' },
  { id: '5', name: '上海长征医院', tag: '三甲', address: '黄浦区凤阳路415号', distance: '6.2km' },
];

const HospitalPickerSheet: React.FC<HospitalPickerSheetProps> = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredHospitals = HOSPITALS.filter(h => h.name.includes(search));

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center pointer-events-auto">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative flex h-[92vh] w-full flex-col max-w-[480px] bg-white dark:bg-[#1a2624] rounded-t-[32px] shadow-2xl overflow-hidden transition-transform transform translate-y-0">
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1.5 bg-[#dde4e3] dark:bg-[#2d3d3a] rounded-full"></div>
        </div>
        
        <header className="flex items-center bg-white dark:bg-[#1a2624] px-4 pb-4 justify-between shrink-0">
          <h2 className="text-[#121716] dark:text-white text-lg font-bold">选择就诊医院</h2>
          <button onClick={onClose} className="text-[#67837f] dark:text-gray-400 p-2 active:bg-gray-100 dark:active:bg-gray-800 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="px-4 pb-4 shrink-0">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-primary">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="w-full h-12 bg-[#f0f3f2] dark:bg-[#243431] border-none rounded-2xl pl-12 pr-4 text-base focus:ring-2 focus:ring-primary/20 placeholder:text-[#67837f] dark:text-white" 
              placeholder="搜索医院名称" 
              type="text" 
              value={search}
              // Fix: Corrected variable name from setSearchTerm to setSearch to match state definition
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto px-4 pb-10">
          <section className="mt-2">
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-[#121716] dark:text-white text-sm font-bold uppercase tracking-wider">附近医院</p>
              <span className="text-xs text-[#67837f]">自动定位：上海市</span>
            </div>
            <div className="space-y-3">
              {filteredHospitals.map(hospital => (
                <div 
                  key={hospital.id}
                  onClick={() => onSelect(hospital)}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-[#243431] border border-[#dde4e3] dark:border-[#2d3d3a] rounded-2xl active:bg-gray-50 dark:active:bg-primary/10 transition-colors cursor-pointer"
                >
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined filled">domain</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#121716] dark:text-white font-bold truncate">{hospital.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">{hospital.tag}</span>
                      <span className="text-[#67837f] text-xs truncate">{hospital.address}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-primary text-sm font-bold">{hospital.distance}</p>
                    <span className="material-symbols-outlined text-[#dde4e3] text-sm mt-1">navigation</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HospitalPickerSheet;
