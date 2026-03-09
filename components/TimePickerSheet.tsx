
import React, { useState } from 'react';

interface TimePickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (time: string) => void;
  selectedDate?: string;
}

const MORNING_SLOTS = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'
];

const AFTERNOON_SLOTS = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
];

const TimePickerSheet: React.FC<TimePickerSheetProps> = ({ isOpen, onClose, onSelect, selectedDate }) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('08:30');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedSlot) {
      onSelect(selectedSlot);
    }
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-end justify-center pointer-events-auto">
      {/* 遮罩 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* 弹窗主体 */}
      <div className="relative w-full max-w-[480px] bg-white dark:bg-[#1a2624] rounded-t-[2.5rem] shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[85vh]">
        {/* 顶部指示条 */}
        <div className="w-12 h-1.5 bg-[#dde4e3] dark:bg-[#2d3d3a] rounded-full mx-auto mt-3 mb-1 shrink-0"></div>

        {/* 头部 */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#dde4e3] dark:border-[#2d3d3a] shrink-0">
          <div>
            <h3 className="text-[#121716] dark:text-white text-xl font-bold">选择服务时间段</h3>
            {selectedDate && <p className="text-[#67837f] text-xs mt-1">服务日期：{selectedDate}</p>}
          </div>
          <button 
            onClick={onClose} 
            className="size-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 active:bg-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* 滚动内容区 */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-6 pb-32">
          {/* 上午 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary filled">wb_sunny</span>
              <h4 className="text-[#121716] dark:text-white font-bold text-base">上午时间段</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {MORNING_SLOTS.map(slot => (
                <button 
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-2 rounded-xl border transition-all active:scale-95 text-sm font-medium ${
                    selectedSlot === slot 
                      ? 'bg-primary text-white border-transparent shadow-md shadow-primary/20' 
                      : 'border-[#dde4e3] dark:border-[#2d3d3a] text-[#121716] dark:text-white hover:bg-primary/5'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* 下午 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary filled">nights_stay</span>
              <h4 className="text-[#121716] dark:text-white font-bold text-base">下午时间段</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {AFTERNOON_SLOTS.map(slot => (
                <button 
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-2 rounded-xl border transition-all active:scale-95 text-sm font-medium ${
                    selectedSlot === slot 
                      ? 'bg-primary text-white border-transparent shadow-md shadow-primary/20' 
                      : 'border-[#dde4e3] dark:border-[#2d3d3a] text-[#121716] dark:text-white hover:bg-primary/5'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-[#1a2624] border-t border-[#dde4e3] dark:border-[#2d3d3a] z-10">
          <button 
            onClick={handleConfirm}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-3xl transition-all text-lg shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            确认时间段
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerSheet;
