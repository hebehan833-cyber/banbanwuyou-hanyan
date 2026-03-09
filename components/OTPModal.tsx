
import React, { useState, useEffect } from 'react';

interface OTPModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ onClose, onSuccess }) => {
  const [code, setCode] = useState<string[]>(['8', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(55);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleKeypad = (num: string) => {
    const nextEmpty = code.findIndex(c => c === '');
    if (nextEmpty !== -1) {
      const newCode = [...code];
      newCode[nextEmpty] = num;
      setCode(newCode);
      if (nextEmpty === 5) {
        // Complete
        setTimeout(onSuccess, 500);
      }
    }
  };

  const handleDelete = () => {
    const lastFilled = [...code].reverse().findIndex(c => c !== '');
    if (lastFilled !== -1) {
      const index = 5 - lastFilled;
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  return (
    <div className="absolute inset-0 z-[70] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-[#1a1c1e] rounded-t-[1.5rem] shadow-2xl flex flex-col max-h-[90dvh] animate-in slide-in-from-bottom duration-300">
        <div className="relative w-full px-6 pt-6 pb-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#111518] dark:text-white">请输入验证码</h3>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-400 text-xl">close</span>
            </button>
          </div>
          <div className="mb-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              已发送至 <span className="text-[#111518] dark:text-white font-medium">150****3176</span>
            </p>
            <p className="text-sm mt-2">
              <span className="text-primary">{timeLeft > 0 ? `${timeLeft}s后重发` : '重新发送'}</span>
            </p>
          </div>
          <div className="flex justify-between gap-2 mb-10">
            {code.map((c, i) => (
              <div key={i} className={`w-12 h-14 border-2 ${c ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'} rounded-xl flex items-center justify-center text-2xl font-bold ${c ? 'text-primary' : ''}`}>
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-[#111214] p-2 grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
            <button 
                key={num}
                onClick={() => handleKeypad(num)}
                className="h-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-center text-xl font-medium active:bg-gray-200 dark:active:bg-gray-700 transition-colors"
            >
              {num}
            </button>
          ))}
          <div className="h-12" />
          <button onClick={() => handleKeypad('0')} className="h-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-center text-xl font-medium active:bg-gray-200 dark:active:bg-gray-700 transition-colors">0</button>
          <button onClick={handleDelete} className="h-12 flex items-center justify-center active:opacity-60">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">backspace</span>
          </button>
          <div className="col-span-3 h-6" />
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
