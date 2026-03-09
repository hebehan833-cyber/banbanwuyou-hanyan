
import React from 'react';

interface CityOpeningModalProps {
  onClose: () => void;
}

const CityOpeningModal: React.FC<CityOpeningModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-[340px] bg-white dark:bg-[#1a1c1e] rounded-[2rem] p-8 flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-[#e8f5f3] rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-[48px] filled">check_circle</span>
        </div>
        <h3 className="text-xl font-bold text-[#111518] dark:text-white mb-2">
          申请提交成功
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          感谢您的关注！我们将记录您的需求，并尽快在您的城市开通专业陪诊服务。
        </p>
        <button 
          onClick={onClose} 
          className="w-full py-4 bg-primary text-white font-bold rounded-2xl active:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          好的
        </button>
      </div>
    </div>
  );
};

export default CityOpeningModal;
