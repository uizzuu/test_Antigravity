import re

content = """import React, { useState } from 'react';
import { Search, LogIn, ArrowLeft, X } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';

const StudentLogin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  
  // 학교 검색 모달 상태
  const [schoolModalOpen, setSchoolModalOpen] = useState(false);
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schoolLevel, setSchoolLevel] = useState(''); // 학교급(초소/중/고)

  let config = {
    bgClass: 'from-blue-500 to-blue-700',
    title: '국가기초학력지원포털',
  };

  if (type === 'achievement') {
    config = { bgClass: 'from-purple-500 to-purple-800', title: '학업성취도지원포털' };
  } else if (type === 'psychology') {
    config = { bgClass: 'from-slate-500 to-slate-700', title: '심리검사' };
  }
  
  const handleOpenSchoolSearch = () => {
    if (!schoolLevel) {
      alert('학교급을 먼저 선택해 주세요.');
      return;
    }
    setSchoolSearchQuery('');
    setSchoolModalOpen(true);
  };
  
  const handleSelectSchool = (schoolName: string) => {
    setSelectedSchool(schoolName);
    setSchoolModalOpen(false);
  };

  // 학교 검색 더미 데이터 로직
  const MOCK_SCHOOLS = ['한국학교', '서울초등학교', '부산중학교', '대구고등학교', '테스트초등학교', '제주국제학교', '독도초등학교'];
  const searchResults = schoolSearchQuery.trim() === '' ? [] : MOCK_SCHOOLS.filter(s => s.includes(schoolSearchQuery));

  return (
    <div className={`min-h-screen bg-gradient-to-b ${config.bgClass} flex flex-col items-center justify-center relative overflow-hidden font-sans`}>
      <Link to="/select-portal" className="absolute top-8 left-8 hover:bg-white/10 p-3 rounded-xl text-white flex items-center gap-2 text-lg transition-colors z-20 font-medium">
        <ArrowLeft className="w-6 h-6" />
        이전으로
      </Link>
      {/* Decorative background pattern (Simplified "W" shape feel) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L50 100 L100 0" fill="none" stroke="white" strokeWidth="20" />
        </svg>
      </div>

      <div className="z-10 w-full max-w-2xl px-4">
        {/* Header Titles */}
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">{config.title}</h1>
          <h2 className="text-2xl font-medium opacity-90">학생 로그인</h2>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="space-y-6">
            {/* School Selection Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <select 
                  className="select select-bordered w-full bg-slate-200 text-slate-700 text-lg h-14 rounded-xl border-slate-200"
                  value={schoolLevel}
                  onChange={e => {
                    setSchoolLevel(e.target.value);
                    if (selectedSchool) setSelectedSchool(''); // 학교급 변경시 선택된 학교 초기화
                  }}
                >
                  <option value="" disabled>학교급</option>
                  <option value="초등학교">초등학교</option>
                  <option value="중학교">중학교</option>
                  <option value="고등학교">고등학교</option>
                </select>
              </div>
              <div 
                className="w-full md:flex-1 relative cursor-pointer group"
                onClick={handleOpenSchoolSearch}
              >
                <input 
                  type="text" 
                  placeholder="학교급 선택 후 입력해 주세요." 
                  className="input input-bordered w-full bg-slate-200 text-slate-700 text-lg h-14 pl-12 rounded-xl border-slate-200 cursor-pointer group-hover:border-primary transition-colors focus:outline-none"
                  value={selectedSchool}
                  readOnly
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-primary transition-colors" />
              </div>
            </div>

            {/* Sub Info Row (Grade, Class, Number, Password) */}
            <div className="bg-slate-200 rounded-2xl p-6 border border-slate-200">
              <div className="grid grid-cols-4 gap-4 text-center mb-2">
                <label className="text-sm font-bold text-slate-500">학년</label>
                <label className="text-sm font-bold text-slate-500">반</label>
                <label className="text-sm font-bold text-slate-500">번호</label>
                <label className="text-sm font-bold text-slate-500">비밀번호</label>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <input type="text" className="input input-bordered w-full text-center text-xl font-bold bg-white h-14 rounded-xl border-slate-200 focus:border-primary" />
                <div className="flex gap-1">
                  <input type="text" className="input input-bordered w-full text-center text-xl font-bold bg-white h-14 rounded-xl border-slate-200 focus:border-primary px-1" />
                  <input type="text" className="input input-bordered w-full text-center text-xl font-bold bg-white h-14 rounded-xl border-slate-200 focus:border-primary px-1" />
                </div>
                <div className="flex gap-1">
                  <input type="text" className="input input-bordered w-full text-center text-xl font-bold bg-white h-14 rounded-xl border-slate-200 focus:border-primary px-1" />
                  <input type="text" className="input input-bordered w-full text-center text-xl font-bold bg-white h-14 rounded-xl border-slate-200 focus:border-primary px-1" />
                </div>
                <input type="password" className="input input-bordered w-full bg-white h-14 rounded-xl border-slate-200 focus:border-primary" />
              </div>
            </div>

            {/* Login Button */}
            <button className="btn btn-neutral w-full h-16 text-2xl font-bold gap-3 rounded-2xl bg-[#111111] hover:bg-black border-none text-white shadow-xl mt-4">
              <LogIn className="w-6 h-6" />
              로그인
            </button>
          </div>
        </div>

      </div>
      
      {/* ── 학교 검색 모달 ── */}
      <dialog className={`modal ${schoolModalOpen ? 'modal-open' : ''} bg-slate-900/50 backdrop-blur-sm z-[100]`} style={{position:'fixed'}}>
        <div className="modal-box bg-white max-w-sm rounded-2xl p-6 border border-slate-100 shadow-2xl text-slate-800">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-400"
            onClick={() => setSchoolModalOpen(false)}>
            <X size={18} />
          </button>
          <h3 className="font-bold text-lg text-slate-800 mb-4">학교 검색</h3>
          
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              placeholder={`${schoolLevel} 이름을 입력하세요`}
              className="input input-sm input-bordered w-full bg-white text-slate-800"
              value={schoolSearchQuery}
              onChange={(e) => setSchoolSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 h-40 overflow-y-auto">
            {searchResults.length > 0 ? (
              <ul className="space-y-1">
                {searchResults.map(school => (
                  <li key={school}>
                    <button 
                      className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
                      onClick={() => handleSelectSchool(school)}
                    >
                      {school}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                {schoolSearchQuery ? '검색 결과가 없습니다.' : '학교명을 검색해주세요.'}
              </div>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setSchoolModalOpen(false)}>
          <button>닫기</button>
        </form>
      </dialog>

    </div>
  );
};

export default StudentLogin;
"""

with open('/Users/wuju/Desktop/test_Antigravity-main/src/pages/StudentLogin.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added school search modal to StudentLogin")
