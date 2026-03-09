
import React, { useState } from 'react';
import { Service } from '../types';
import PatientSheet from '../components/PatientSheet';
import CityPickerSheet from '../components/CityPickerSheet';
import HospitalPickerSheet from '../components/HospitalPickerSheet';
import DepartmentPickerSheet from '../components/DepartmentPickerSheet';
import DatePickerSheet from '../components/DatePickerSheet';
import TimePickerSheet from '../components/TimePickerSheet';

interface BookingScreenProps {
  service: Service;
  selectedCity: string;
  onBack: () => void;
  onSuccess: () => void;
  onCityChange?: (city: string) => void;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ 
  service, 
  selectedCity, 
  onBack, 
  onSuccess,
  onCityChange 
}) => {
  const [duration, setDuration] = useState(2.0);
  const ratePer30Min = 45;
  const estimatedCost = (duration / 0.5) * ratePer30Min;

  const [hospital, setHospital] = useState('');
  const [department, setDepartment] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('请选择就诊人');
  const [selectedDate, setSelectedDate] = useState('5月25日');
  const [selectedTime, setSelectedTime] = useState('08:30');
  
  const [showPatientSheet, setShowPatientSheet] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showHospitalSheet, setShowHospitalSheet] = useState(false);
  const [showDepartmentSheet, setShowDepartmentSheet] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAdjustDuration = (amount: number) => {
    setDuration(prev => Math.max(0.5, prev + amount));
  };

  const handleSelectPatient = (name: string) => {
    setSelectedPatient(name);
    setShowPatientSheet(false);
  };

  const handleSelectCity = (city: string) => {
    if (onCityChange) {
      onCityChange(city);
    }
    setShowCityPicker(false);
  };

  const handleHospitalSelect = (h: { name: string }) => {
    setHospital(h.name);
    setShowHospitalSheet(false);
  };

  const handleDepartmentSelect = (dept: string) => {
    setDepartment(dept);
    setShowDepartmentSheet(false);
  };

  const handleDateSelect = (dateStr: string) => {
    // 简单的格式化显示：2024-05-25 -> 5月25日
    const [y, m, d] = dateStr.split('-');
    setSelectedDate(`${parseInt(m)}月${parseInt(d)}日`);
    setShowDatePicker(false);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden font-sans">
      <header className="sticky top-0 z-10 flex items-center bg-white dark:bg-[#1a2624] p-4 border-b border-[#dde4e3] dark:border-[#2d3d3a] justify-between">
        <div 
          onClick={onBack}
          className="text-[#121716] dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer active:opacity-60"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
        <h2 className="text-[#121716] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">立即预约</h2>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        {/* 服务时长 */}
        <div className="mt-4 px-4">
          <p className="text-[#121716] dark:text-white text-sm font-bold uppercase tracking-wider mb-2 px-1">服务时长</p>
          <div className="bg-white dark:bg-[#243431] rounded-3xl p-5 border border-[#dde4e3] dark:border-[#2d3d3a] flex flex-col items-center shadow-sm">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-base font-medium text-[#121716] dark:text-white">选择服务时间</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleAdjustDuration(-0.5)}
                  className="size-10 rounded-full border-2 border-primary text-primary flex items-center justify-center active:bg-primary/10 transition-colors"
                >
                  <span className="material-symbols-outlined font-bold">remove</span>
                </button>
                <div className="flex flex-col items-center min-w-[80px]">
                  <span className="text-xl font-bold text-primary">{duration.toFixed(1)} 小时</span>
                </div>
                <button 
                  onClick={() => handleAdjustDuration(0.5)}
                  className="size-10 rounded-full bg-primary text-white flex items-center justify-center active:bg-primary/90 transition-colors"
                >
                  <span className="material-symbols-outlined font-bold">add</span>
                </button>
              </div>
            </div>
            <div className="w-full pt-3 border-t border-[#f1f4f3] dark:border-[#2d3d3a] flex justify-between items-end">
              <span className="text-[#67837f] text-sm italic">费用估算：{duration.toFixed(1)}小时 - ¥{estimatedCost}</span>
              <span className="text-primary font-bold text-xl">¥{estimatedCost.toFixed(2)}</span>
            </div>
            <p className="w-full text-[12px] text-[#67837f] mt-2 leading-tight">* 按 ¥45/30分钟 计算，最终以实际时长为准</p>
          </div>
        </div>

        {/* 基本信息 */}
        <div className="mt-6 px-4">
          <p className="text-[#121716] dark:text-white text-sm font-bold uppercase tracking-wider mb-2 px-1">基本信息</p>
          <div className="bg-white dark:bg-[#243431] rounded-3xl overflow-hidden border border-[#dde4e3] dark:border-[#2d3d3a] shadow-sm">
            <div 
              onClick={() => setShowPatientSheet(true)}
              className="flex items-center gap-4 px-4 min-h-16 justify-between border-b border-[#f1f4f3] dark:border-[#2d3d3a] hover:bg-gray-50 dark:hover:bg-primary/10 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined filled">person</span>
                </div>
                <p className="text-[#121716] dark:text-white text-base font-medium flex-1 truncate">就诊人</p>
              </div>
              <div className="flex items-center gap-2">
                <p className={`${selectedPatient === '请选择就诊人' ? 'text-[#67837f]' : 'text-[#121716] dark:text-white'} text-base font-normal`}>
                  {selectedPatient}
                </p>
                <span className="material-symbols-outlined text-[#67837f] text-sm">chevron_right</span>
              </div>
            </div>
            <div 
              onClick={() => setShowCityPicker(true)}
              className="flex items-center gap-4 px-4 min-h-16 justify-between hover:bg-gray-50 dark:hover:bg-primary/10 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined filled">location_on</span>
                </div>
                <p className="text-[#121716] dark:text-white text-base font-medium flex-1 truncate">服务城市</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[#121716] dark:text-white text-base font-normal">{selectedCity}</p>
                <span className="material-symbols-outlined text-[#67837f] text-sm">chevron_right</span>
              </div>
            </div>
          </div>
        </div>

        {/* 医疗机构 */}
        <div className="mt-6 px-4">
          <p className="text-[#121716] dark:text-white text-sm font-bold uppercase tracking-wider mb-2 px-1">医疗机构</p>
          <div className="flex flex-col mb-4">
            <div 
              onClick={() => setShowHospitalSheet(true)}
              className="flex w-full items-center h-14 bg-white dark:bg-[#243431] border border-[#dde4e3] dark:border-[#2d3d3a] rounded-3xl px-[15px] cursor-pointer hover:bg-gray-50 dark:hover:bg-primary/10 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[#67837f] mr-4">domain</span>
              <p className={`flex-1 text-base ${hospital ? 'text-[#121716] dark:text-white' : 'text-[#67837f]'}`}>
                {hospital || '选择就诊医院'}
              </p>
              <span className="material-symbols-outlined text-primary">search</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div 
              onClick={() => setShowDepartmentSheet(true)}
              className="flex w-full items-center h-14 bg-white dark:bg-[#243431] border border-[#dde4e3] dark:border-[#2d3d3a] rounded-3xl px-[15px] cursor-pointer hover:bg-gray-50 dark:hover:bg-primary/10 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[#67837f] mr-4">medical_information</span>
              <p className={`flex-1 text-base ${department ? 'text-[#121716] dark:text-white' : 'text-[#67837f]'}`}>
                {department || '选择就诊科室'}
              </p>
              <span className="material-symbols-outlined text-[#67837f] text-sm">chevron_right</span>
            </div>
          </div>
        </div>

        {/* 服务时间 */}
        <div className="mt-6 px-4">
          <p className="text-[#121716] dark:text-white text-sm font-bold uppercase tracking-wider mb-2 px-1">服务时间</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div 
                onClick={() => setShowDatePicker(true)}
                className={`flex items-center gap-3 bg-white dark:bg-[#243431] border rounded-3xl h-14 px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-primary/10 transition-colors shadow-sm ${selectedDate ? 'border-primary/50 bg-primary/5' : 'border-[#dde4e3] dark:border-[#2d3d3a]'}`}
              >
                <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
                <span className={`text-sm font-medium ${selectedDate ? 'text-[#121716] dark:text-white' : 'text-[#67837f]'}`}>
                  {selectedDate || '选择日期'}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div 
                onClick={() => setShowTimePicker(true)}
                className={`flex items-center gap-3 bg-white dark:bg-[#243431] border rounded-3xl h-14 px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-primary/10 transition-colors shadow-sm ${selectedTime ? 'border-primary ring-1 ring-primary' : 'border-[#dde4e3] dark:border-[#2d3d3a]'}`}
              >
                <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                <span className={`text-sm font-medium ${selectedTime ? 'text-primary' : 'text-[#67837f]'}`}>
                  {selectedTime || '选择时间段'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 备注信息 */}
        <div className="mt-6 px-4">
          <p className="text-[#121716] dark:text-white text-sm font-bold uppercase tracking-wider mb-2 px-1">备注信息</p>
          <div className="flex flex-col">
            <label className="flex flex-col w-full">
              <textarea 
                className="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-3xl text-[#121716] dark:text-white focus:outline-0 focus:ring-0 border border-[#dde4e3] dark:border-[#2d3d3a] bg-white dark:bg-[#243431] focus:border-primary min-h-[100px] placeholder:text-[#67837f] p-[15px] text-base font-normal shadow-sm" 
                placeholder="请填写特殊需求，例如：需要轮椅、协助取药等..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </label>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-white/95 backdrop-blur-md dark:bg-[#1a2624]/95 border-t border-[#dde4e3] dark:border-[#2d3d3a] z-20">
        <button 
          onClick={onSuccess}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-3xl transition-all text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
        >
          <span>立即提交预约</span>
        </button>
      </footer>

      <PatientSheet 
        isOpen={showPatientSheet} 
        onClose={() => setShowPatientSheet(false)} 
        onSelect={handleSelectPatient} 
      />

      <CityPickerSheet
        isOpen={showCityPicker}
        onClose={() => setShowCityPicker(false)}
        onSelect={handleSelectCity}
      />

      <HospitalPickerSheet
        isOpen={showHospitalSheet}
        onClose={() => setShowHospitalSheet(false)}
        onSelect={handleHospitalSelect}
      />

      <DepartmentPickerSheet
        isOpen={showDepartmentSheet}
        hospitalName={hospital}
        onClose={() => setShowDepartmentSheet(false)}
        onSelect={handleDepartmentSelect}
      />

      <DatePickerSheet
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={handleDateSelect}
      />

      <TimePickerSheet
        isOpen={showTimePicker}
        selectedDate={selectedDate}
        onClose={() => setShowTimePicker(false)}
        onSelect={handleTimeSelect}
      />
    </div>
  );
};

export default BookingScreen;
