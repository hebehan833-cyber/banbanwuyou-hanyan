
import React from 'react';

interface LoginModalProps {
  onClose: () => void;
  onAllow: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onAllow }) => {
  return (
    <div className="absolute inset-0 z-[60] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-[#1a1c1e] rounded-t-[2.5rem] px-6 pt-4 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 self-center mx-auto"></div>
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[16px]">health_and_safety</span>
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">伴伴无忧</span>
        </div>
        <div className="px-2 mb-8">
          <h3 className="text-[20px] font-bold text-[#111518] dark:text-white mb-1">
            申请获取并验证你的手机号
          </h3>
          <p className="text-[15px] text-gray-400 dark:text-gray-500 font-medium">
            账号登录
          </p>
        </div>
        <div className="flex flex-col w-full gap-0 border-y border-gray-100 dark:border-gray-800 mb-8">
          <button className="w-full py-5 flex items-center justify-between px-2 active:bg-gray-50 dark:active:bg-gray-800 transition-colors">
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-[#111518] dark:text-white">150****3176</span>
              <span className="text-[12px] text-gray-400">微信绑定手机号</span>
            </div>
            <span className="material-symbols-outlined text-primary text-2xl filled">check_circle</span>
          </button>
          <button className="w-full py-5 flex items-center justify-between px-2 border-t border-gray-50 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800 transition-colors">
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-[#111518] dark:text-white">157****1462</span>
            </div>
          </button>
        </div>
        <div className="flex flex-col w-full gap-4 px-2">
          <button onClick={onAllow} className="w-full py-4 bg-primary text-white font-bold rounded-2xl active:opacity-90 shadow-sm transition-opacity">
            允许
          </button>
          <button onClick={onClose} className="w-full py-4 bg-[#f3f4f6] dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold rounded-2xl active:opacity-90 transition-opacity">
            不允许
          </button>
        </div>
        <button className="mt-6 text-[14px] text-primary font-medium self-center w-full text-center">
          使用其他手机号码
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
