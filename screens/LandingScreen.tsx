
import React from 'react';

interface LandingScreenProps {
  onLoginClick: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onLoginClick }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden group/design-root">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-pattern absolute inset-0 opacity-40"></div>
      </div>
      
      <div className="relative z-10 flex w-full grow flex-col items-center justify-center px-8 text-center pt-20">
        <div className="flex items-center justify-center gap-3 mb-14">
          <div className="w-12 h-12 bg-primary rounded-[18px] flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-white text-2xl font-bold">medical_services</span>
          </div>
          <span className="font-bold text-[32px] tracking-tight text-primary">陪诊App</span>
        </div>
        
        <h1 className="text-primary tracking-normal text-[36px] font-bold leading-[1.3] px-2 mb-8">
          专业陪诊，每一步<br/>都安心
        </h1>
        
        <p className="text-[#6b8580] dark:text-gray-300 text-[18px] font-normal leading-relaxed px-4 max-w-[340px]">
          为您及您的家人提供专业的就医陪护服务，确保就医过程安全、省心、高效。
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 px-8 pb-16 pt-6">
        <div className="flex justify-center items-center gap-2.5">
          <div className="h-1.5 w-8 rounded-full bg-primary"></div>
          <div className="h-2 w-2 rounded-full bg-[#d1e0dd]"></div>
          <div className="h-2 w-2 rounded-full bg-[#d1e0dd]"></div>
        </div>
        
        <div className="w-full max-w-[400px]">
          <button 
            onClick={onLoginClick}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-[68px] bg-primary text-white text-[20px] font-bold shadow-2xl shadow-primary/40 hover:bg-primary/95 transition-all active:scale-[0.98]"
          >
            <span className="truncate">手机号一键登录</span>
          </button>
        </div>
        
        <div className="pb-4">
          <div className="flex items-center justify-center gap-2 text-[#6b8580] dark:text-gray-400 text-sm font-medium leading-normal text-center">
            <input 
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" 
              type="checkbox" 
              defaultChecked
            />
            <span>
              已阅读并同意
              <a className="text-primary hover:underline" href="#">《用户协议》</a>
              和
              <a className="text-primary hover:underline" href="#">《隐私政策》</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
