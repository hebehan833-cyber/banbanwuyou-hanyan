
import React from 'react';

interface PermissionModalProps {
  onClose: () => void;
  onAllow: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ onClose, onAllow }) => {
  return (
    <div className="absolute inset-0 z-[80] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-[#1a1c1e] rounded-t-[2.5rem] px-8 pt-4 pb-10 shadow-2xl flex flex-col items-center text-center animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-8"></div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xs">health_and_safety</span>
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">伴伴无忧</span>
        </div>
        <h3 className="text-xl font-bold text-[#111518] dark:text-white mb-3">
          申请获取你的位置信息
        </h3>
        <p className="text-[13px] leading-relaxed text-primary font-medium mb-10 px-4">
          将获取你的大概位置信息，用于获取同城活动与就近医疗机构推荐
        </p>
        <div className="flex flex-col w-full gap-3">
          <button onClick={onAllow} className="w-full py-4 bg-primary text-white font-bold rounded-2xl active:opacity-90 transition-opacity">
            允许
          </button>
          <button onClick={onClose} className="w-full py-4 bg-[#f3f4f6] dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold rounded-2xl active:opacity-90 transition-opacity">
            不允许
          </button>
        </div>
        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default PermissionModal;
