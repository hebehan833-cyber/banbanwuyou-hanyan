
import React from 'react';

interface PaymentConfirmationScreenProps {
  onBack: () => void;
  onPaymentComplete: () => void;
}

const PaymentConfirmationScreen: React.FC<PaymentConfirmationScreenProps> = ({ onBack, onPaymentComplete }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-sans">
      <header className="sticky top-0 z-10 flex items-center bg-white dark:bg-[#1a2624] p-4 border-b border-[#dde4e3] dark:border-[#2d3d3a] justify-between">
        <div 
          onClick={onBack}
          className="text-[#121716] dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer active:opacity-60"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <h2 className="text-[#121716] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">订单支付确认</h2>
      </header>

      <main className="flex-1 pb-44 overflow-y-auto">
        {/* 总额显示 */}
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-white dark:bg-[#1a2624]">
          <p className="text-[#67837f] text-sm font-medium mb-2">待支付总额</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#121716] dark:text-white">¥</span>
            <span className="text-4xl font-extrabold text-[#121716] dark:text-white tracking-tight">168.00</span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full">
            <span className="material-symbols-outlined text-primary text-sm filled">verified_user</span>
            <span className="text-primary text-xs font-bold">由加密协议保障支付安全</span>
          </div>
        </div>

        {/* 订单详情 */}
        <div className="px-4 mb-6 mt-4">
          <div className="bg-white dark:bg-[#243431] rounded-2xl p-5 border border-[#dde4e3] dark:border-[#2d3d3a] shadow-sm">
            <h3 className="text-[#121716] dark:text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px] filled">assignment_turned_in</span>
              订单详情
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#67837f]">订单ID</span>
                <span className="text-[#121716] dark:text-white font-medium">ORD202310248892</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#67837f]">服务类目</span>
                <span className="text-[#121716] dark:text-white font-medium">全程陪诊</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#67837f]">就诊城市</span>
                <span className="text-[#121716] dark:text-white font-medium">上海市</span>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-[#67837f]">就诊医院和科室</span>
                <span className="text-[#121716] dark:text-white font-medium">上海交通大学医学院附属瑞金医院 - 心内科</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#67837f]">预约日期和时间</span>
                <span className="text-[#121716] dark:text-white font-medium">2023-11-05 08:30</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#67837f]">就诊人</span>
                <div className="text-right">
                  <span className="text-[#121716] dark:text-white font-medium block">张晓明</span>
                  <span className="text-[#67837f] text-xs font-medium">138****5678</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-[#f1f4f3] dark:border-[#2d3d3a] pt-4">
                <span className="text-[#67837f]">预约服务时长</span>
                <span className="text-[#121716] dark:text-white font-medium">4.0 小时 (08:00 - 12:00)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 费用明细 */}
        <div className="px-4 mb-6">
          <div className="bg-white dark:bg-[#243431] rounded-2xl p-5 border border-[#dde4e3] dark:border-[#2d3d3a] shadow-sm">
            <h3 className="text-[#121716] dark:text-white font-bold text-base mb-4">费用明细</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#67837f]">服务费用</span>
                <span className="text-[#121716] dark:text-white">¥198.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#67837f]">优惠券抵扣</span>
                <span className="text-red-500 font-medium">-¥30.00</span>
              </div>
              <div className="flex justify-between items-center text-base pt-3 border-t border-dashed border-[#dde4e3] dark:border-[#2d3d3a]">
                <span className="font-bold text-[#121716] dark:text-white text-lg">合计支付</span>
                <span className="text-primary font-bold text-lg">¥168.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* 支付方式 */}
        <div className="px-4">
          <p className="text-[#121716] dark:text-white text-sm font-bold uppercase tracking-wider mb-3 px-1">支付方式</p>
          <div className="bg-white dark:bg-[#243431] rounded-2xl overflow-hidden border border-[#dde4e3] dark:border-[#2d3d3a]">
            <label className="flex items-center gap-4 px-4 py-5 cursor-pointer hover:bg-primary/5 transition-colors">
              <div className="size-10 flex items-center justify-center bg-[#07c160]/10 rounded-full">
                <svg className="w-7 h-7" fill="#07c160" viewBox="0 0 24 24">
                  <path d="M8.5 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m6 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M21 10.71c0-3.66-3.41-6.71-7.61-6.71-4.2 0-7.61 3.05-7.61 6.71 0 3.33 2.82 6.13 6.64 6.64l-.19 1.16c-.03.17.06.35.22.42.05.02.1.03.15.03.12 0 .23-.06.3-.17l1.24-1.89c.39.03.78.05 1.18.05 4.2 0 7.61-3.12 7.61-6.71z"></path>
                  <path d="M12.55 17.65c-.24 0-.47-.01-.7-.03l-.71 1.09c-.06.09-.17.15-.28.15a.4.4 0 01-.15-.03c-.15-.06-.24-.23-.2-.39l.11-.66c-2.43-.33-4.22-2.12-4.22-4.26 0-2.35 2.19-4.31 4.88-4.31s4.89 1.96 4.89 4.31c0 2.35-2.19 4.31-4.88 4.31-.25 0-.49-.01-.74-.03V17.65zm-2.01-4.31c0 .44.34.78.78.78s.78-.34.78-.78-.34-.78-.78-.78-.78.34-.78.78zm3.25 0c0 .44.34.78.78.78s.78-.34.78-.78-.34-.78-.78-.78-.78.34-.78.78z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[#121716] dark:text-white text-base font-bold">微信支付</p>
                  <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold">推荐</span>
                </div>
                <p className="text-[#67837f] text-xs">使用微信一键快捷支付</p>
              </div>
              <div className="relative flex items-center">
                <input 
                  defaultChecked 
                  className="appearance-none size-6 rounded-full border-2 border-[#dde4e3] checked:border-primary checked:bg-primary checked:bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDdGkjBnx1JwVUy3SMzfz7a8-IMugnMLVolJ71Is23uYKKVjaNeoSvKLrN5w9QvdETO1xpfqNsYnHYs1oRkLoeO6GcYCkdbypgG3NAVLH2a3Q77dQ6YPLA3dv8ev_sTDNqT0aQWKH49751f97NbRXfM2GTcP06hinwkJjARkDinRFZy_xJkjeO8KSCqFTI2lU6kcOVq2VlAeVqSFW2guYZjuYH5I4lBYjmAYutZhCmNtpkz8vkRni1qHX2T5CD7TbaCzsljzwDGYEX')] bg-center bg-no-repeat focus:ring-0 transition-all cursor-pointer" 
                  name="payment" 
                  type="radio" 
                />
              </div>
            </label>
          </div>
        </div>

        <div className="mt-8 px-6 text-center">
          <p className="text-[#67837f] text-xs leading-relaxed">
            支付过程中如有任何疑问，请联系
            <a className="text-primary font-medium underline ml-1" href="#">在线客服</a>
          </p>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-white dark:bg-[#1a2624] border-t border-[#dde4e3] dark:border-[#2d3d3a] z-20">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex flex-col">
            <span className="text-[#67837f] text-xs font-medium">实付款</span>
            <span className="text-primary text-xl font-extrabold">¥168.00</span>
          </div>
          <div className="text-[#67837f] text-xs flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
            明细 <span className="material-symbols-outlined text-sm">expand_less</span>
          </div>
        </div>
        <button 
          onClick={onPaymentComplete}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-[22px] filled">lock</span>
          <span>立即支付 ¥168.00</span>
        </button>
      </footer>
    </div>
  );
};

export default PaymentConfirmationScreen;
