
import React, { useState, useEffect } from 'react';

interface CityPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
}

const PROVINCES = [
  '北京市', '上海市', '江苏省', '浙江省', '广东省', '四川省', '湖北省'
];

const CITIES_MAP: Record<string, string[]> = {
  '北京市': ['北京市'],
  '上海市': ['上海市'],
  '江苏省': ['南京市', '苏州市', '无锡市', '常州市'],
  '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '绍兴市', '金华市'],
  '广东省': ['广州市', '深圳市', '珠海市', '佛山市'],
  '四川省': ['成都市', '绵阳市'],
  '湖北省': ['武汉市'],
};

const CityPickerSheet: React.FC<CityPickerSheetProps> = ({ isOpen, onClose, onSelect }) => {
  const [selectedProvince, setSelectedProvince] = useState('浙江省');
  const [selectedCity, setSelectedCity] = useState('杭州市');

  useEffect(() => {
    // 当省份改变时，默认选中该省的第一个城市
    if (CITIES_MAP[selectedProvince]) {
      if (!CITIES_MAP[selectedProvince].includes(selectedCity)) {
          setSelectedCity(CITIES_MAP[selectedProvince][0]);
      }
    }
  }, [selectedProvince]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* 遮罩层 */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity" 
        onClick={onClose}
      />
      
      {/* 弹窗主体 */}
      <div className="relative w-full max-w-[480px] bg-white dark:bg-[#1a2b28] rounded-t-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300">
        <div className="flex h-6 w-full items-center justify-center pt-2">
          <div className="h-1.5 w-10 rounded-full bg-[#dde4e3] dark:bg-gray-700"></div>
        </div>

        <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <button onClick={onClose} className="w-10 flex justify-start text-gray-400 active:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
          <h2 className="text-[#121716] dark:text-white text-lg font-bold flex-1 text-center">选择服务城市</h2>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* 定位信息 */}
          <div className="px-6 py-5 bg-gray-50/50 dark:bg-gray-900/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">当前定位 (IP)</p>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl filled">location_on</span>
                  <span className="text-[#121716] dark:text-white font-semibold text-lg">浙江省 - 杭州市</span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-primary text-sm font-medium px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 active:opacity-70 transition-opacity">
                <span className="material-symbols-outlined text-sm">my_location</span>
                重新定位
              </button>
            </div>
          </div>

          {/* 滚轮选择器 */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-white dark:bg-[#1a2b28]">
            <div className="picker-indicator absolute inset-x-0 h-11 bg-primary/5 dark:bg-primary/10"></div>
            <div className="flex w-full px-4 h-full relative z-10">
              {/* 省份滚轮 */}
              <div className="flex-1 picker-container overflow-y-auto hide-scrollbar flex flex-col text-center">
                <div className="h-[120px] shrink-0"></div> 
                {PROVINCES.map(p => (
                  <div 
                    key={p} 
                    onClick={() => setSelectedProvince(p)}
                    className={`wheel-item cursor-pointer ${selectedProvince === p ? 'text-primary font-bold' : 'text-gray-400'}`}
                  >
                    {p}
                  </div>
                ))}
                <div className="h-[120px] shrink-0"></div> 
              </div>

              <div className="w-px h-32 bg-gray-100 dark:bg-gray-800 self-center"></div>

              {/* 城市滚轮 */}
              <div className="flex-1 picker-container overflow-y-auto hide-scrollbar flex flex-col text-center">
                <div className="h-[120px] shrink-0"></div> 
                {CITIES_MAP[selectedProvince]?.map(c => (
                  <div 
                    key={c} 
                    onClick={() => setSelectedCity(c)}
                    className={`wheel-item cursor-pointer ${selectedCity === c ? 'text-primary font-bold' : 'text-gray-400'}`}
                  >
                    {c}
                  </div>
                ))}
                <div className="h-[120px] shrink-0"></div> 
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500 py-3 bg-white dark:bg-[#1a2b28]">
            * 仅展示已开通服务的城市
          </p>
        </div>

        <div className="p-6 pb-10 bg-white dark:bg-[#1a2b28]">
          <button 
            onClick={() => onSelect(selectedCity)}
            className="w-full h-14 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
          >
            确认选择
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityPickerSheet;
