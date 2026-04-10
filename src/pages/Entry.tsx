import React from 'react';
import { GraduationCap, BookOpen, User, UserPlus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Entry: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans flex flex-col items-center justify-center p-6 relative" data-theme="corporate">
      
      <Link to="/" className="absolute top-6 left-6 hover:bg-white p-2.5 rounded-lg text-slate-400 hover:text-slate-600 flex items-center gap-1.5 text-sm transition-all font-medium">
        <ArrowLeft className="w-4 h-4" />
        이전으로
      </Link>

      <main className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="text-center mb-12 space-y-2">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            로그인
          </h1>
          <p className="text-base text-slate-400">로그인할 회원 유형을 선택해 주세요.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[900px] mx-auto">
          {/* Student */}
          <Link to="/student-login" className="group flex flex-col items-center justify-center gap-5 py-12 px-6 bg-blue-50 rounded-2xl hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-1.5 no-underline">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-sm">
              <GraduationCap size={36} className="text-blue-500" />
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-slate-700">학생</span>
              <span className="block text-sm text-slate-400 mt-1">학생 계정으로 접속</span>
            </div>
          </Link>

          {/* Teacher */}
          <Link to="/teacher-dashboard" className="group flex flex-col items-center justify-center gap-5 py-12 px-6 bg-indigo-50 rounded-2xl hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-1.5 no-underline">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-sm">
              <BookOpen size={36} className="text-indigo-500" />
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-slate-700">교사</span>
              <span className="block text-sm text-slate-400 mt-1">교사 계정으로 접속</span>
            </div>
          </Link>

          {/* General */}
          <button className="group flex flex-col items-center justify-center gap-5 py-12 px-6 bg-sky-50 rounded-2xl hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-1.5 border-0">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-sm">
              <User size={36} className="text-sky-500" />
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-slate-700">일반회원</span>
              <span className="block text-sm text-slate-400 mt-1">일반/학부모 계정 접속</span>
            </div>
          </button>
        </div>

        <div className="mt-6 max-w-[900px] mx-auto w-full">
          <button className="w-full py-5 bg-emerald-50 rounded-2xl hover:shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 group border-0">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-sm">
              <UserPlus size={22} className="text-emerald-500" />
            </div>
            <span className="text-xl font-bold text-slate-700">새로운 계정 만들기 (회원가입)</span>
          </button>
        </div>

      </main>

      <footer className="fixed bottom-6 text-slate-300 text-xs font-medium">
        국가기초학력지원포털 통합 로그인 시스템
      </footer>
    </div>
  );
};

export default Entry;
