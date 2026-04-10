import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isTeacherDashboard = location.pathname.includes('/teacher-dashboard');
  
  // 가상의 교사 데이터 (백엔드 연동 전)
  const teacherRole = "담임교사"; // 관리자, 담임교사, 교과교사 중 하나
  const teacherName = "홍길동";

  return (
    <div className="navbar bg-white border-b border-slate-200 px-4 md:px-8 text-slate-800 font-sans z-50 sticky top-0 h-16">
      {/* Left side: Logo */}
      <div className="navbar-start">
        <Link to="/" className="normal-case text-2xl font-bold tracking-tight h-auto py-2 text-primary hover:opacity-80 transition-opacity">
          국가기초학력지원포털
        </Link>
      </div>

      {/* Center menus for large screens (Hover Dropdowns) */}
      <div className="navbar-center hidden lg:flex h-full">
        <ul className="flex items-center gap-2 text-base font-bold h-full bg-transparent">
          
          <li className="relative group h-full flex items-center">
            <div className="cursor-pointer hover:text-primary transition-colors px-3 py-4">진단도구</div>
            <ul className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col p-1.5 shadow-md bg-white rounded-lg border border-slate-100 min-w-[200px] z-50 text-base gap-0.5 transition-all font-medium">
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 leading-relaxed whitespace-pre-wrap break-keep transition-colors text-slate-600">기초학력 진단검사</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 leading-relaxed whitespace-pre-wrap break-keep transition-colors text-slate-600">맞춤형 학업성취도 자율평가</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 leading-relaxed whitespace-pre-wrap break-keep transition-colors text-slate-600">심리검사</Link></li>
            </ul>
          </li>

          <li className="relative group h-full flex items-center">
            <div className="cursor-pointer hover:text-primary transition-colors px-3 py-4">학습자료</div>
            <ul className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col p-1.5 shadow-md bg-white rounded-lg border border-slate-100 min-w-[140px] z-50 text-sm gap-0.5 transition-all">
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">초등학교</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">중학교</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">고등학교</Link></li>
            </ul>
          </li>

          <li className="relative group h-full flex items-center">
            <div className="cursor-pointer hover:text-primary transition-colors px-3 py-4">정책소개</div>
            <ul className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col p-1.5 shadow-md bg-white rounded-lg border border-slate-100 min-w-[180px] z-50 text-sm gap-0.5 transition-all">
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">기초학력지원이란</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">1단계 : 수업 내 지원</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">2단계 : 학교 내 지원</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">3단계 : 학교 밖 지원</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">정책자료실</Link></li>
            </ul>
          </li>

          <li className="relative group h-full flex items-center">
            <div className="cursor-pointer hover:text-primary transition-colors px-3 py-4">교사연수자료</div>
            <ul className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col p-1.5 shadow-md bg-white rounded-lg border border-slate-100 min-w-[140px] z-50 text-sm gap-0.5 transition-all">
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">초등</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">중 · 고등</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">공통</Link></li>
            </ul>
          </li>

          <li className="relative group h-full flex items-center">
            <div className="cursor-pointer hover:text-primary transition-colors px-3 py-4">이용안내</div>
            <ul className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col p-1.5 shadow-md bg-white rounded-lg border border-slate-100 min-w-[140px] z-50 text-sm gap-0.5 transition-all">
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">공지사항</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">자주하는 질문</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">묻고 답하기</Link></li>
              <li><Link to="#" className="block hover:bg-slate-50 hover:text-primary rounded-md py-2.5 px-3 transition-colors text-slate-600">이용가이드</Link></li>
            </ul>
          </li>
          
        </ul>
      </div>

      {/* Right side: User Role / Info */}
      <div className="navbar-end gap-2 items-center">
        <div className="flex flex-col text-right leading-tight">
          {isTeacherDashboard ? (
            <>
              <span className="text-[11px] text-primary font-bold">{teacherRole}</span>
              <span className="text-sm font-bold text-slate-800">{teacherName} 님</span>
            </>
          ) : (
            <>
              <span className="text-[11px] text-slate-400 font-bold">현재 권한</span>
              <span className="text-sm font-bold text-slate-700">게스트</span>
            </>
          )}
        </div>
        <div className={`avatar placeholder cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-offset-white rounded-full transition-all ${isTeacherDashboard ? 'hover:ring-indigo-400' : 'hover:ring-primary'}`}>
          <div className={`${isTeacherDashboard ? 'bg-indigo-500' : 'bg-primary'} text-primary-content rounded-full w-8 h-8 flex items-center justify-center`}>
            <span className="text-xs font-medium">{isTeacherDashboard ? teacherName.charAt(0) : 'G'}</span>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-md bg-white rounded-lg w-52 font-medium">
            <li><Link to="#">진단도구</Link></li>
            <li><Link to="#">학습자료</Link></li>
            <li><Link to="#">정책소개</Link></li>
            <li><Link to="#">교사연수자료</Link></li>
            <li><Link to="#">이용안내</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
