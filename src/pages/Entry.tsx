import React from 'react';
import { GraduationCap, BookOpen, User, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Entry: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col items-center justify-center p-6" data-theme="corporate">
      {/* Top Banner decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 via-indigo-300 to-sky-300"></div>
      
      <main className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        <header className="text-center mb-12 space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            로그인
          </h1>
          <p className="text-xl text-slate-400 font-bold">로그인할 회원 유형을 선택해 주세요.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Student Button */}
          <Link to="/student-login" className="flex flex-col items-center justify-center gap-6 p-10 bg-blue-100 rounded-3xl shadow-xl shadow-blue-200/50 hover:scale-[1.03] active:scale-95 transition-all group border-none no-underline">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:-rotate-3 transition-transform">
              <GraduationCap size={40} className="text-blue-500" />
            </div>
            <div className="text-center space-y-1">
              <span className="block text-3xl font-black text-slate-700">학생</span>
              <span className="block text-base text-slate-500 font-medium">학생 계정으로 접속</span>
            </div>
          </Link>

          {/* Teacher Button */}
          <Link to="/teacher-dashboard" className="flex flex-col items-center justify-center gap-6 p-10 bg-indigo-100 rounded-3xl shadow-xl shadow-indigo-200/50 hover:scale-[1.03] active:scale-95 transition-all group border-none no-underline">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-3 transition-transform">
              <BookOpen size={40} className="text-indigo-500" />
            </div>
            <div className="text-center space-y-1">
              <span className="block text-3xl font-black text-slate-700">교사</span>
              <span className="block text-base text-slate-500 font-medium">교사 계정으로 접속</span>
            </div>
          </Link>

          {/* General Member Button */}
          <button className="flex flex-col items-center justify-center gap-6 p-10 bg-sky-100 rounded-3xl shadow-xl shadow-sky-200/50 hover:scale-[1.03] active:scale-95 transition-all group border-none">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:-rotate-3 transition-transform">
              <User size={40} className="text-sky-500" />
            </div>
            <div className="text-center space-y-1">
              <span className="block text-3xl font-black text-slate-700">일반회원</span>
              <span className="block text-base text-slate-500 font-medium">일반/학부모 계정 접속</span>
            </div>
          </button>
        </div>

        {/* Sign Up Button */}
        <div className="mt-10 max-w-4xl mx-auto w-full">
          <Link to="/signup" className="w-full h-24 bg-cyan-100 rounded-3xl shadow-xl shadow-cyan-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group border-none no-underline">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:-rotate-3 transition-transform">
              <UserPlus size={28} className="text-cyan-500" />
            </div>
            <span className="text-2xl font-black text-slate-700">새로운 계정 만들기 (회원가입)</span>
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="fixed bottom-8 text-slate-300 text-lg font-bold">
        국가기초학력지원포털 통합 로그인 시스템
      </footer>
    </div>
  );
};

export default Entry;
