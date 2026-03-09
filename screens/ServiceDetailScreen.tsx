
import React, { useState } from 'react';
import { Service } from '../types';

interface ServiceDetailScreenProps {
  service: Service;
  onBack: () => void;
  onBook: () => void;
}

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ service, onBack, onBook }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafb] dark:bg-background-dark min-h-screen">
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-4">
            <span onClick={onBack} className="material-symbols-outlined cursor-pointer text-[24px]">chevron_left</span>
            <h1 className="text-lg font-bold">{service.name}详情</h1>
          </div>
          <span className="material-symbols-outlined cursor-pointer text-gray-400">share</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="w-full aspect-video relative">
          <img alt="服务宣传图" className="w-full h-full object-cover" src={service.image}/>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-4 mb-2">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold">{service.name} ({service.duration})</h2>
            <div className="text-primary font-bold text-xl">{service.price.split('/')[0]}</div>
          </div>
          <div className="flex gap-2 mb-4">
            <span className="px-2 py-0.5 bg-[#289e8c1a] text-primary text-[10px] rounded font-bold">专业陪同</span>
            <span className="px-2 py-0.5 bg-[#289e8c1a] text-primary text-[10px] rounded font-bold">挂号缴费</span>
            <span className="px-2 py-0.5 bg-[#289e8c1a] text-primary text-[10px] rounded font-bold">极速响应</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {service.description}. 由资深陪诊师为您提供贴心的一站式就医陪护服务。
          </p>
        </div>

        <div className="sticky top-[61px] z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4">
          <div className="flex gap-8">
            <button 
                onClick={() => setActiveTab(0)}
                className={`py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 0 ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
            >
              <span className={`material-symbols-outlined text-[18px] ${activeTab === 0 ? 'filled' : ''}`}>medical_information</span>
              服务内容
            </button>
            <button 
                onClick={() => setActiveTab(1)}
                className={`py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 1 ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
            >
              <span className={`material-symbols-outlined text-[18px] ${activeTab === 1 ? 'filled' : ''}`}>description</span>
              下单需知
            </button>
          </div>
        </div>

        <div className="mt-4 px-4">
          {activeTab === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">medical_information</span>
                <h3 className="font-bold text-base">服务内容</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { title: '诊前沟通', desc: '预约成功后，陪诊员将提前与您沟通就诊流程与注意事项。' },
                  { title: '接机/接诊', desc: '在医院指定地点集合，协助办理取号、挂号等手续。' },
                  { title: '就诊陪同', desc: '全程协助排队，记录医嘱，协助医生进行各项检查沟通。' },
                  { title: '药事服务', desc: '协助排队缴费、取药，并叮嘱详细的用药频率与禁忌。' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">description</span>
                <h3 className="font-bold text-base">下单需知</h3>
              </div>
              <div className="space-y-5">
                {[
                  { icon: 'schedule', title: '预约时间', desc: '请至少提前24小时下单，以便为您安排最合适的金牌陪诊员。' },
                  { icon: 'payments', title: '费用说明', desc: '本服务费仅含陪诊劳务费，不含挂号费、检查费、医药费。' },
                  { icon: 'assignment_return', title: '退改规则', desc: '服务开始前12小时可免费取消；12小时内扣除30%手续费。' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                      <span className="text-sm font-bold">{item.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed pl-7">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 w-full max-w-[480px] bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 flex items-center justify-between p-4 z-50">
        <div className="flex items-center gap-6 pr-4 border-r border-gray-100 dark:border-gray-800">
          <div className="flex flex-col items-center gap-0.5 cursor-pointer active:opacity-60 transition-opacity">
            <span className="material-symbols-outlined text-gray-500">headset_mic</span>
            <span className="text-[10px] text-gray-500 font-medium">客服</span>
          </div>
        </div>
        <div className="flex-1 pl-4">
          <button 
            onClick={onBook}
            className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-[#289e8c4d] active:scale-95 transition-transform"
          >
            立即预约服务
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ServiceDetailScreen;
