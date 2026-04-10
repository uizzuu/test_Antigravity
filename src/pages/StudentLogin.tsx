import React, { useState } from 'react';
import { LogIn, ArrowLeft, X, Search } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';

const StudentLogin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type'); // basic, achievement, psychology, or null
  
  const isExamMode = !!type; // type 파라미터가 있으면 응시 로그인 모드
  
  // 학교 검색 모달 상태
  const [schoolModalOpen, setSchoolModalOpen] = useState(false);
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');

  // 응시 모드 전용 배경 및 타이틀 설정
  let examConfig = {
    bgClass: 'from-blue-500 to-blue-700',
    title: '국가기초학력지원포털',
  };

  if (type === 'achievement') {
    examConfig = { bgClass: 'from-purple-500 to-purple-800', title: '학업성취도지원포털' };
  } else if (type === 'psychology') {
    examConfig = { bgClass: 'from-slate-500 to-slate-700', title: '심리검사' };
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

  const MOCK_SCHOOLS = ['한국학교', '서울초등학교', '부산중학교', '대구고등학교', '테스트초등학교', '제주국제학교', '독도초등학교'];
  const searchResults = schoolSearchQuery.trim() === '' ? [] : MOCK_SCHOOLS.filter(s => s.includes(schoolSearchQuery));

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans transition-all duration-500 ${isExamMode ? `bg-gradient-to-b ${examConfig.bgClass}` : 'bg-gradient-to-b from-slate-50 to-white'}`}>
      
      {/* 이전으로 버튼: 응시모드는 시험선택으로, 계정모드는 멤버유형선택으로 */}
      <Link 
        to={isExamMode ? "/select-portal" : "/entry"} 
        className={`absolute top-6 left-6 p-2.5 rounded-lg flex items-center gap-1.5 text-sm transition-all font-medium z-20 ${isExamMode ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-slate-400 hover:bg-white hover:text-slate-600'}`}
      >
        <ArrowLeft className="w-4 h-4" />
        이전으로
      </Link>

      {/* 응시모드 디자인용 데코레이션 */}
      {isExamMode && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L50 100 L100 0" fill="none" stroke="white" strokeWidth="20" />
          </svg>
        </div>
      )}

      <div className="z-10 w-full max-w-[480px] px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-1 tracking-tight ${isExamMode ? 'text-white' : 'text-slate-800'}`}>
            {isExamMode ? examConfig.title : '학생 로그인'}
          </h1>
          <p className={`text-sm ${isExamMode ? 'text-white/80' : 'text-slate-400'}`}>
            {isExamMode ? '학생 응시용 로그인' : '학생 계정 정보를 입력해 주세요.'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-5">
            {/* School Selection: 공통 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 text-left block">학교</label>
              <div className="flex gap-2">
                <select 
                  className="select select-bordered w-32 bg-slate-50 text-slate-600 h-11 rounded-lg border-slate-200 text-sm focus:outline-none"
                  value={schoolLevel}
                  onChange={e => {
                    setSchoolLevel(e.target.value);
                    if (selectedSchool) setSelectedSchool('');
                  }}
                >
                  <option value="" disabled>학교급</option>
                  <option value="초등학교">초등학교</option>
                  <option value="중학교">중학교</option>
                  <option value="고등학교">고등학교</option>
                  <option value="기타학교">기타학교</option>
                </select>
                <div 
                  className="flex-1 relative cursor-pointer group"
                  onClick={handleOpenSchoolSearch}
                >
                  <input 
                    type="text" 
                    placeholder="학교 검색" 
                    className="input input-bordered w-full bg-slate-50 text-slate-600 h-11 pl-9 rounded-lg border-slate-200 cursor-pointer group-hover:border-primary transition-colors focus:outline-none text-sm"
                    value={selectedSchool}
                    readOnly
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
              </div>
            </div>

            {isExamMode ? (
              /* ── 응시 모드 UI (학년/반/번호) ── */
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="grid grid-cols-4 gap-3 text-center mb-2">
                  <label className="text-xs font-semibold text-slate-400">학년</label>
                  <label className="text-xs font-semibold text-slate-400">반</label>
                  <label className="text-xs font-semibold text-slate-400">번호</label>
                  <label className="text-xs font-semibold text-slate-400">비밀번호</label>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <input type="text" className="input input-bordered w-full text-center text-lg font-bold bg-white h-11 rounded-lg border-slate-200 focus:border-primary px-1" />
                  <div className="flex gap-1">
                    <input type="text" className="input input-bordered w-full text-center text-lg font-bold bg-white h-11 rounded-lg border-slate-200 focus:border-primary px-1" />
                    <input type="text" className="input input-bordered w-full text-center text-lg font-bold bg-white h-11 rounded-lg border-slate-200 focus:border-primary px-1" />
                  </div>
                  <div className="flex gap-1">
                    <input type="text" className="input input-bordered w-full text-center text-lg font-bold bg-white h-11 rounded-lg border-slate-200 focus:border-primary px-1" />
                    <input type="text" className="input input-bordered w-full text-center text-lg font-bold bg-white h-11 rounded-lg border-slate-200 focus:border-primary px-1" />
                  </div>
                  <input type="password" title="비밀번호" className="input input-bordered w-full bg-white h-11 rounded-lg border-slate-200 focus:border-primary" />
                </div>
              </div>
            ) : (
              /* ── 계정 모드 UI (아이디/비밀번호) ── */
              <>
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-500">아이디</label>
                  <input 
                    type="text" 
                    placeholder="아이디를 입력해 주세요" 
                    className="input input-bordered w-full bg-slate-50 text-slate-700 h-11 rounded-lg border-slate-200 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-500">비밀번호</label>
                  <input 
                    type="password" 
                    placeholder="비밀번호를 입력해 주세요" 
                    className="input input-bordered w-full bg-slate-50 text-slate-700 h-11 rounded-lg border-slate-200 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </>
            )}

            {/* Login Button */}
            <button className={`btn w-full h-12 text-base font-bold gap-2 rounded-lg border-0 text-white shadow-md mt-2 transition-colors ${isExamMode ? 'btn-neutral bg-slate-800 hover:bg-slate-900' : 'btn-primary'}`}>
              <LogIn className="w-4 h-4" />
              로그인
            </button>
          </div>
        </div>
      </div>
      
      {/* ── 학교 검색 모달 (공통) ── */}
      <dialog className={`modal ${schoolModalOpen ? 'modal-open' : ''} bg-slate-900/40 backdrop-blur-sm z-[100]`} style={{position:'fixed'}}>
        <div className="modal-box bg-white max-w-sm rounded-xl p-5 border border-slate-200 shadow-lg text-slate-800">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-slate-400"
            onClick={() => setSchoolModalOpen(false)}>
            <X size={16} />
          </button>
          <h3 className="font-bold text-base text-slate-800 mb-3">학교 검색</h3>
          <input 
            type="text" 
            placeholder={`${schoolLevel} 이름을 입력하세요`}
            className="input input-sm input-bordered w-full bg-white mb-3 border-slate-200 text-slate-700"
            value={schoolSearchQuery}
            onChange={(e) => setSchoolSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
          />
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 h-36 overflow-y-auto text-left">
            {searchResults.length > 0 ? (
              <ul className="space-y-0.5">
                {searchResults.map(school => (
                  <li key={school}>
                    <button 
                      className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-primary rounded-md transition-colors"
                      onClick={() => handleSelectSchool(school)}
                    >
                      {school}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs">
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
