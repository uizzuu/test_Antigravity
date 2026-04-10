import React from 'react';
import { LogIn, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans" data-theme="corporate">


      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-12 tracking-tight">
            국가기초학력지원포털
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 justify-center items-stretch mt-12 min-h-[50vh]">
            {/* Student Exam Button */}
            <Link 
              to="/student-login"
              className="btn btn-primary h-full min-h-[320px] flex-col gap-5 text-4xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 group font-black rounded-3xl"
            >
              <GraduationCap className="w-20 h-20 group-hover:-rotate-12 transition-transform" />
              <span>학생 응시하기</span>
            </Link>

            {/* Login/Signup Button */}
            <Link 
              to="/entry"
              className="btn btn-outline btn-secondary h-full min-h-[320px] flex-col gap-5 text-4xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 group font-black rounded-3xl"
            >
              <LogIn className="w-20 h-20 group-hover:translate-x-3 transition-transform" />
              <span>로그인/회원가입</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-12 bg-slate-50 text-slate-400 mt-auto border-t border-slate-100">
        <aside>
          <p className="font-bold">
            국가기초학력지원포털<br />교육의 미래를 연결하는 파우스너
          </p>
          <p>Copyright © 2026 - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default Home;
