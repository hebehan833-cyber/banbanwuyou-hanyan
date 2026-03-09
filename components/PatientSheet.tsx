
import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  relation: string;
  info: string;
  icon: string;
  iconColor: string;
}

interface PatientSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (patientName: string) => void;
}

const PatientSheet: React.FC<PatientSheetProps> = ({ isOpen, onClose, onSelect }) => {
  const [selectedId, setSelectedId] = useState('self');

  const patients: Patient[] = [
    { id: 'self', name: '本人', relation: '本人', info: '默认就诊人', icon: 'person', iconColor: 'bg-primary/10 text-primary' },
    { id: 'father', name: '张三', relation: '父亲', info: '65岁 · 医保', icon: 'elderly', iconColor: 'bg-blue-500/10 text-blue-500' },
    { id: 'mother', name: '李四', relation: '母亲', info: '62岁 · 医保', icon: 'elderly_woman', iconColor: 'bg-pink-500/10 text-pink-500' },
  ];

  if (!isOpen) return null;

  const handleConfirm = () => {
    const selected = patients.find(p => p.id === selectedId);
    if (selected) {
      onSelect(selected.id === 'self' ? '本人' : `${selected.relation}：${selected.name}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* 遮罩层 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* 弹窗主体 */}
      <div className="relative w-full max-w-[480px] bg-white dark:bg-[#1a2624] rounded-t-[2rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-[#dde4e3] dark:bg-[#2d3d3a] rounded-full"></div>
        </div>
        
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-xl font-bold text-[#121716] dark:text-white">选择就诊人</h3>
          <button onClick={onClose} className="text-[#67837f] hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-6 pb-8 space-y-4">
          <div className="space-y-3 max-h-[40vh] overflow-y-auto hide-scrollbar">
            {patients.map((patient) => (
              <label 
                key={patient.id}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                  selectedId === patient.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-transparent bg-gray-50 dark:bg-[#243431]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${patient.iconColor}`}>
                    <span className="material-symbols-outlined">{patient.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#121716] dark:text-white">
                      {patient.id === 'self' ? patient.name : `${patient.relation}：${patient.name}`}
                    </p>
                    <p className="text-sm text-[#67837f]">{patient.info}</p>
                  </div>
                </div>
                <input 
                  type="radio"
                  name="patient"
                  checked={selectedId === patient.id}
                  onChange={() => setSelectedId(patient.id)}
                  className="form-radio text-primary focus:ring-primary h-5 w-5 border-gray-300"
                />
              </label>
            ))}

            <button className="w-full flex items-center gap-3 p-4 bg-white dark:bg-[#1a2624] rounded-2xl border-2 border-dashed border-[#dde4e3] dark:border-[#2d3d3a] hover:border-primary text-primary transition-colors group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined">add</span>
              </div>
              <span className="font-bold">添加新就诊人</span>
            </button>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleConfirm}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl transition-all text-lg shadow-lg shadow-primary/20 active:scale-[0.98]"
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSheet;
