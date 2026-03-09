
import React, { useState, useMemo } from 'react';

interface DatePickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: string) => void;
}

const DatePickerSheet: React.FC<DatePickerSheetProps> = ({ isOpen, onClose, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<string>('2024-05-25');

  // 模拟生成一些水平滑动的日期数据
  const quickDates = useMemo(() => {
    return [
      { day: '今天', date: '25', full: '2024-05-25' },
      { day: '周日', date: '26', full: '2024-05-26' },
      { day: '周一', date: '27', full: '2024-05-27' },
      { day: '周二', date: '28', full: '2024-05-28' },
      { day: '周三', date: '29', full: '2024-05-29' },
      { day: '周四', date: '30', full: '2024-05-30' },
    ];
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-end justify-center pointer-events-auto">
      {/* 遮罩 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* 弹窗主体 */}
      <div className="relative w-full max-w-[480px] bg-white dark:bg-[#1a2624] rounded-t-[2.5rem] shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[90vh]">
        {/* 顶部指示条 */}
        <div className="w-12 h-1.5 bg-[#dde4e3] dark:bg-[#2d3d3a] rounded-full mx-auto mt-3 mb-1 shrink-0"></div>

        {/* 头部标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0">
          <button onClick={onClose} className="text-[#67837f] font-medium text-base active:opacity-60">取消</button>
          <h3 className="text-[#121716] dark:text-white text-lg font-bold">选择服务日期</h3>
          <div className="w-10"></div> 
        </div>

        {/* 内容滚动区 */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-32">
          {/* 水平快捷选择 */}
          <div className="px-6 py-2">
            <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2">
              {quickDates.map((item) => (
                <div 
                  key={item.full}
                  onClick={() => setSelectedDate(item.full)}
                  className={`flex flex-col items-center justify-center min-w-[64px] h-[72px] rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedDate === item.full 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-[#dde4e3] dark:border-[#2d3d3a] text-[#121716] dark:text-white'
                  }`}
                >
                  <span className={`text-xs font-bold mb-1 ${selectedDate === item.full ? 'text-primary' : 'text-[#67837f]'}`}>{item.day}</span>
                  <span className="text-lg font-bold">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5月日历 */}
          <div className="px-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#121716] dark:text-white font-bold">2024年5月</h4>
            </div>
            <div className="grid grid-cols-7 mb-4">
              {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                <span key={d} className="text-center text-xs font-bold text-[#67837f]">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-2">
              {/* 空白占位 */}
              <div className="h-10"></div><div className="h-10"></div><div className="h-10"></div>
              {/* 日期网格 */}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const fullDate = `2024-05-${day.toString().padStart(2, '0')}`;
                const isPast = day < 25;
                const isSelected = selectedDate === fullDate;
                
                return (
                  <div key={fullDate} className="flex items-center justify-center h-10">
                    <button 
                      disabled={isPast}
                      onClick={() => setSelectedDate(fullDate)}
                      className={`size-9 flex items-center justify-center rounded-full text-sm transition-all ${
                        isSelected 
                          ? 'bg-primary text-white font-bold shadow-md shadow-primary/30' 
                          : isPast 
                            ? 'text-[#dde4e3] dark:text-[#2d3d3a]' 
                            : 'text-[#121716] dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* 6月日历 */}
            <div className="mt-8 mb-4">
              <h4 className="text-[#121716] dark:text-white font-bold">2024年6月</h4>
            </div>
            <div className="grid grid-cols-7 gap-y-2 pb-6">
              {/* 6月1日是周六，前面有6个空位 */}
              {[...Array(6)].map((_, i) => <div key={i} className="h-10"></div>)}
              {[...Array(30)].map((_, i) => {
                const day = i + 1;
                const fullDate = `2024-06-${day.toString().padStart(2, '0')}`;
                const isSelected = selectedDate === fullDate;
                
                return (
                  <div key={fullDate} className="flex items-center justify-center h-10">
                    <button 
                      onClick={() => setSelectedDate(fullDate)}
                      className={`size-9 flex items-center justify-center rounded-full text-sm transition-all ${
                        isSelected 
                          ? 'bg-primary text-white font-bold shadow-md shadow-primary/30' 
                          : 'text-[#121716] dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 底部按钮栏 */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-[#1a2624] border-t border-[#dde4e3] dark:border-[#2d3d3a] z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => onSelect(selectedDate)}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-3xl transition-all text-lg shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            确定日期
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerSheet;
