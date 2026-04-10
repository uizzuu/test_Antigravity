import React from 'react';
import { LogIn, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans relative overflow-hidden" data-theme="corporate">
      {/* Background decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-5%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl"></div>
      </div>

      <main className="max-w-[1200px] mx-auto px-6 flex flex-col items-center justify-center text-center min-h-screen relative z-10">
        <div className="w-full max-w-[800px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-3 tracking-tight">
            국가기초학력지원포털
          </h1>
          <p className="text-slate-400 text-lg mb-14">기초학력 진단부터 학습 지원까지</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Student Exam */}
            <Link 
              to="/select-portal"
              className="group relative flex flex-col items-center justify-center gap-6 py-16 px-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl no-underline overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <GraduationCap className="w-20 h-20 text-white/80 group-hover:text-white group-hover:scale-105 transition-all duration-300 relative z-10" />
              <div className="relative z-10 text-center">
                <span className="block text-2xl font-bold text-white">학생 응시하기</span>
                <span className="block text-sm text-blue-200/60 mt-1">시험 선택 화면으로 이동</span>
              </div>
            </Link>

            {/* Login/Signup */}
            <Link 
              to="/entry"
              className="group relative flex flex-col items-center justify-center gap-6 py-16 px-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl no-underline bg-white"
            >
              <LogIn className="w-20 h-20 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" />
              <div className="text-center">
                <span className="block text-2xl font-bold text-slate-700">로그인/회원가입</span>
                <span className="block text-sm text-slate-400 mt-1">교사·학부모 계정 접속</span>
              </div>
            </Link>
          </div>
        </div>

        <p className="absolute bottom-8 text-slate-300 text-xs font-medium tracking-wide">
          국가기초학력지원포털 통합 로그인 시스템
        </p>
      </main>
    </div>
  );
};

export default Home;
