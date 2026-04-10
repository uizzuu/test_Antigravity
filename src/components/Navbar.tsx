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
    <div className="navbar bg-white border-b border-slate-200 px-4 md:px-8 text-slate-800 font-sans z-50 sticky top-0 h-20">
      {/* ... (Menu contents remain exactly the same until navbar-end) ... */}
      {/* Left side: Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52 font-medium">
            <li><Link to="#">진단도구</Link></li>
            <li><Link to="#">학습자료</Link></li>
            <li><Link to="#">정책소개</Link></li>
            <li><Link to="#">교사연수자료</Link></li>
            <li><Link to="#">이용안내</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-black tracking-tighter hover:bg-slate-50 transition-colors h-auto py-2">
          <span className="text-primary">국가기초학력지원포털</span>
        </Link>
      </div>

      {/* Center menus for large screens (Hover Dropdowns) */}
      <div className="navbar-center hidden lg:flex h-full">
        <ul className="flex items-center gap-6 font-semibold text-base h-full bg-transparent">
          
          <li className="relative group h-full flex items-center">
            <div className="cursor-pointer hover:text-primary transition-colors px-2 py-6">진단도구</div>
            {/* Dropdown Menu */}
            <ul className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col p-2 shadow-xl bg-white rounded-2xl border border-slate-100 min-w-[220px] z-50 text-sm gap-1 transition-all">
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 leading-relaxed whitespace-pre-wrap break-keep transition-colors">기초학력 진단검사</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 leading-relaxed whitespace-pre-wrap break-keep transition-colors">맞춤형 학업성취도 자율평가</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 leading-relaxed whitespace-pre-wrap break-keep transition-colors">심리검사</Link></li>
            </ul>
          </li>

          <li className="relative group h-full flex items-center">
            <div className="cursor-pointer hover:text-primary transition-colors px-2 py-6">학습자료</div>
            <ul className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col p-2 shadow-xl bg-white rounded-2xl border border-slate-100 min-w-[160px] z-50 text-sm gap-1 transition-all">
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">초등학교</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">중학교</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">고등학교</Link></li>
            </ul>
          </li>

          <li className="relative group h-full flex items-center">
            <div className="cursor-pointer hover:text-primary transition-colors px-2 py-6">정책소개</div>
            <ul className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col p-2 shadow-xl bg-white rounded-2xl border border-slate-100 min-w-[190px] z-50 text-sm gap-1 transition-all">
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">기초학력지원이란</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">1단계 : 수업 내 지원</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">2단계 : 학교 내 지원</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">3단계 : 학교 밖 지원</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">정책자료실</Link></li>
            </ul>
          </li>

          <li className="relative group h-full flex items-center">
            <div className="cursor-pointer hover:text-primary transition-colors px-2 py-6">교사연수자료</div>
            <ul className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col p-2 shadow-xl bg-white rounded-2xl border border-slate-100 min-w-[160px] z-50 text-sm gap-1 transition-all">
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">초등</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">중 · 고등</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">공통</Link></li>
            </ul>
          </li>

          <li className="relative group h-full flex items-center">
            <div className="cursor-pointer hover:text-primary transition-colors px-2 py-6">이용안내</div>
            <ul className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col p-2 shadow-xl bg-white rounded-2xl border border-slate-100 min-w-[160px] z-50 text-sm gap-1 transition-all">
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">공지사항</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">자주하는 질문</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">묻고 답하기</Link></li>
              <li><Link to="#" className="block hover:bg-blue-50/50 hover:text-primary rounded-xl py-3 px-4 transition-colors">이용가이드</Link></li>
            </ul>
          </li>
          
        </ul>
      </div>

      {/* Right side: User Role / Info */}
      <div className="navbar-end gap-3 items-center">
        <div className="flex flex-col text-right leading-tight">
          {isTeacherDashboard ? (
            <>
              <span className="text-xs text-primary font-bold">{teacherRole}</span>
              <span className="text-sm font-bold text-slate-800">{teacherName} 님</span>
            </>
          ) : (
            <>
              <span className="text-xs text-slate-500 font-medium">현재 권한</span>
              <span className="text-sm font-bold text-slate-800">게스트</span>
            </>
          )}
        </div>
        <div className={`avatar placeholder cursor-pointer hover:ring hover:ring-offset-2 hover:ring-offset-white rounded-full transition-all ${isTeacherDashboard ? 'hover:ring-indigo-500' : 'hover:ring-primary'}`}>
          <div className={`${isTeacherDashboard ? 'bg-indigo-600' : 'bg-primary'} text-primary-content rounded-full w-10 h-10 shadow-sm flex items-center justify-center`}>
            <span className="text-base font-semibold">{isTeacherDashboard ? teacherName.charAt(0) : 'G'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
