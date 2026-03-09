
import React from 'react';
import { SERVICES } from '../constants';
import { Service } from '../types';

interface HomeScreenProps {
  selectedCity: string;
  onCityClick: () => void;
  onServiceClick: (service: Service) => void;
  onSupportClick: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
  selectedCity, 
  onCityClick, 
  onServiceClick, 
  onSupportClick 
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-background-dark min-h-screen">
      <header className="sticky top-0 z-50 bg-primary text-white">
        <div className="flex items-center p-4 pb-4 justify-between">
          <button onClick={onCityClick} className="flex items-center gap-2 active:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-white filled">location_on</span>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">{selectedCity}</h2>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          <div className="flex items-stretch p-4 gap-3 w-full shrink-0">
            {/* 轮播图 1 */}
            <div className="flex h-full flex-1 flex-col gap-3 rounded-lg min-w-[320px] snap-center">
              <div className="w-full bg-center bg-no-repeat aspect-[21/9] bg-cover rounded-xl flex flex-col justify-end p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <p className="text-white relative z-10 text-lg font-bold">专业陪诊，守护健康</p>
                <p className="text-white/80 relative z-10 text-xs">金牌陪诊员全程贴心服务</p>
                <img alt="医疗服务展示" className="absolute inset-0 w-full h-full object-cover -z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeth5zDujJkdYFWm-teZs6jvkSxYxo-I0cXx8-g3nYG6rrTTpyesT673mIK7KDQL63bbJeLa2UKFfODkMhlWJ6XUER-mB41ZO06gCWLuf1wFc-Pc1Tm4McxnoyI_KyH7UAoyXYIyQVEVVA_vwYAIBq10L7yvImg005lqzOyeGDIL6tlvDsyVdSVU-ukF-pNbiRZ7f13Ac32ccAmukPPJRAbQhbnm76Mml7DeRvMztjd0qsQdCBFSRZZJzErjktHBOS6nwy8QR-rDkj"/>
              </div>
            </div>
            {/* 轮播图 2 */}
            <div className="flex h-full flex-1 flex-col gap-3 rounded-lg min-w-[320px] snap-center">
              <div className="w-full bg-center bg-no-repeat aspect-[21/9] bg-cover rounded-xl flex flex-col justify-end p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <p className="text-white relative z-10 text-lg font-bold">足不出户，代取药品</p>
                <p className="text-white/80 relative z-10 text-xs">快递到家，省心省力</p>
                <img alt="代取药品展示" className="absolute inset-0 w-full h-full object-cover -z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArNRzUI_2hGDnNYw7z2HMF54i8sviLt6yIV488HAk_APJ6X7DWIHCTfwMCTO7dHm5HvMVJbpS4kMRW-bLBdmp-N9varU6uBun5o77IDXRV3SAemqbHXRSr29MuWHNBW2GyGnQFXu53U1akRm3pfabBGHGKYL2kjydX2DZdwON81EHQbL9uS8wRLG2iJeRnYwhVT49wHg4ANmSvc1HqVYNTGrwZadwLeoyVbgx60mz85-vittGykVr-JPtlIoiotrrO3ym17JFhFZSe"/>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">
          <h2 className="text-[#111518] dark:text-white text-lg font-bold mb-4">服务分类</h2>
          <div className="flex flex-col gap-4">
            {SERVICES.map((service) => (
              <div 
                key={service.id}
                onClick={() => onServiceClick(service)}
                className="flex items-center gap-4 p-5 rounded-[2.5rem] bg-white dark:bg-gray-900 border border-gray-100/50 dark:border-gray-800 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] relative cursor-pointer active:scale-[0.98] transition-all"
              >
                <div className="w-20 h-20 shrink-0 rounded-[1.5rem] bg-[#e8f5f3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-4xl filled">{service.icon}</span>
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <span className="text-[17px] font-bold text-[#111518] dark:text-white">{service.name}</span>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-2 leading-[1.4] pr-24 line-clamp-2">
                    {service.description}
                  </p>
                </div>
                <div className="absolute right-5 flex flex-col items-center gap-1.5">
                  <span className="text-primary text-[15px] font-bold">{service.price}</span>
                  <button className="bg-primary text-white text-[13px] font-bold py-2 px-4 rounded-full shadow-sm active:opacity-80 transition-opacity">立即下单</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pt-8 pb-10">
          <h2 className="text-[#111518] dark:text-white text-lg font-bold mb-4">快捷入口</h2>
          <div className="grid grid-cols-1">
            <div 
              onClick={onSupportClick}
              className="flex items-center justify-between p-5 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100/50 dark:border-gray-800 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] cursor-pointer active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl filled">support_agent</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[15px] font-bold">在线客服与投诉</span>
                    <span className="text-[12px] text-gray-400">专业人工客服 · 全天候极速响应</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
