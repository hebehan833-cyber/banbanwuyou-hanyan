
import React, { useState, useMemo } from 'react';

interface Department {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  departments: Department[];
}

interface DepartmentPickerSheetProps {
  isOpen: boolean;
  hospitalName: string;
  onClose: () => void;
  onSelect: (deptName: string) => void;
}

const CATEGORIES: Category[] = [
  {
    id: 'internal',
    name: '内科',
    departments: [
      { id: '1', name: '心血管内科' }, { id: '2', name: '消化内科' },
      { id: '3', name: '呼吸内科' }, { id: '4', name: '肾内科' },
      { id: '5', name: '神经内科' }, { id: '6', name: '内分泌科' },
      { id: '7', name: '血液内科' }, { id: '8', name: '免疫科' },
      { id: '9', name: '老年病科' }, { id: '10', name: '感染内科' },
    ]
  },
  {
    id: 'surgery',
    name: '外科',
    departments: [
      { id: '11', name: '普外科' }, { id: '12', name: '骨科' },
      { id: '13', name: '泌尿外科' }, { id: '14', name: '神经外科' },
      { id: '15', name: '胸外科' }, { id: '16', name: '整形外科' },
      { id: '17', name: '心外科' }, { id: '18', name: '腺体外科' },
    ]
  },
  {
    id: 'peds',
    name: '儿科',
    departments: [
      { id: '19', name: '小儿内科' }, { id: '20', name: '小儿外科' },
      { id: '21', name: '新生儿科' }, { id: '22', name: '儿童保健科' },
    ]
  },
  {
    id: 'obgyn',
    name: '妇产科',
    departments: [
      { id: '23', name: '妇科' }, { id: '24', name: '产科' },
      { id: '25', name: '生殖医学科' }, { id: '26', name: '计划生育科' },
    ]
  },
  {
    id: 'ent',
    name: '五官科',
    departments: [
      { id: '27', name: '眼科' }, { id: '28', name: '耳鼻喉科' },
      { id: '29', name: '口腔科' },
    ]
  },
  {
    id: 'tcm',
    name: '中医科',
    departments: [
      { id: '30', name: '中医内科' }, { id: '31', name: '针灸推拿科' },
      { id: '32', name: '中医骨伤科' }, { id: '33', name: '中医妇科' },
    ]
  },
  {
    id: 'derma',
    name: '皮肤科',
    departments: [
      { id: '34', name: '皮肤病科' }, { id: '35', name: '医疗美容科' },
    ]
  },
  {
    id: 'emergency',
    name: '急诊科',
    departments: [
      { id: '36', name: '急诊内科' }, { id: '37', name: '急诊外科' },
      { id: '38', name: '院前急救' },
    ]
  },
  {
    id: 'rehab',
    name: '康复科',
    departments: [
      { id: '39', name: '康复医学科' }, { id: '40', name: '物理治疗室' },
    ]
  },
];

const DepartmentPickerSheet: React.FC<DepartmentPickerSheetProps> = ({ isOpen, hospitalName, onClose, onSelect }) => {
  const [activeCategoryId, setActiveCategoryId] = useState('internal');
  const [selectedDept, setSelectedDept] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const results: { dept: Department; catName: string }[] = [];
    CATEGORIES.forEach((cat) => {
      cat.departments.forEach((dept) => {
        if (dept.name.includes(searchTerm)) {
          results.push({ dept, catName: cat.name });
        }
      });
    });
    return results;
  }, [searchTerm]);

  if (!isOpen) return null;

  const activeCategory = CATEGORIES.find((c) => c.id === activeCategoryId);

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center pointer-events-auto">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white dark:bg-[#1a2624] w-full max-w-[480px] h-[85vh] rounded-t-[2.5rem] flex flex-col overflow-hidden shadow-2xl transition-transform transform translate-y-0">
        <div className="w-full flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>

        <div className="px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex flex-col">
            <h3 className="text-[#121716] dark:text-white text-xl font-bold">选择就诊科室</h3>
            <p className="text-xs text-primary font-medium mt-0.5 truncate max-w-[200px]">
              {hospitalName || '未选定医院'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="size-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 active:bg-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="px-6 pb-4 shrink-0">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-gray-400">search</span>
            <input 
              className="w-full h-12 pl-12 pr-10 bg-gray-100 dark:bg-[#243431] border-none rounded-2xl text-base focus:ring-2 focus:ring-primary focus:bg-white transition-all dark:text-white dark:placeholder-gray-500" 
              placeholder="搜索科室名称" 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 text-gray-400 hover:text-primary"
              >
                <span className="material-symbols-outlined text-sm">cancel</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden border-t border-gray-100 dark:border-[#2d3d3a]">
          {searchTerm.trim() ? (
            <div className="flex-1 bg-white dark:bg-[#1a2624] overflow-y-auto p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">搜索结果 ({searchResults.length})</p>
              <div className="grid grid-cols-2 gap-3">
                {searchResults.map(({ dept, catName }) => (
                  <button 
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.name)}
                    className={`h-16 flex flex-col items-center justify-center px-2 text-sm rounded-3xl transition-all active:scale-95 border ${
                      selectedDept === dept.name
                        ? 'text-primary bg-primary/10 border-primary/40'
                        : 'text-[#121716] dark:text-white bg-gray-50 dark:bg-[#243431] border-transparent'
                    }`}
                  >
                    <span className="font-bold">{dept.name}</span>
                    <span className="text-[10px] opacity-60">{catName}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="w-28 bg-[#f8faf9] dark:bg-[#15201e] overflow-y-auto hide-scrollbar flex flex-col">
                {CATEGORIES.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`py-6 px-4 text-sm transition-all relative text-left outline-none ${
                      activeCategoryId === cat.id 
                        ? 'font-bold text-primary bg-white dark:bg-[#1a2624]' 
                        : 'font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1c2a27]'
                    }`}
                  >
                    {activeCategoryId === cat.id && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r-full"></div>
                    )}
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-white dark:bg-[#1a2624] overflow-y-auto p-4 hide-scrollbar">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">全部{activeCategory?.name}</p>
                <div className="grid grid-cols-2 gap-3">
                  {activeCategory?.departments.map((dept) => (
                    <button 
                      key={dept.id}
                      onClick={() => setSelectedDept(dept.name)}
                      className={`h-14 flex items-center justify-center px-2 text-sm font-medium rounded-3xl transition-all active:scale-95 border ${
                        selectedDept === dept.name
                          ? 'text-primary bg-primary/10 border-primary/40'
                          : 'text-[#121716] dark:text-white bg-gray-50 dark:bg-[#243431] border-transparent'
                      }`}
                    >
                      {dept.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-6 bg-white dark:bg-[#1a2624] border-t border-gray-100 dark:border-[#2d3d3a] shrink-0">
          <button 
            disabled={!selectedDept}
            onClick={() => onSelect(selectedDept)}
            className="w-full bg-primary py-4 rounded-2xl text-white font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
          >
            {selectedDept ? `确认选择: ${selectedDept}` : '请选择科室'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPickerSheet;
