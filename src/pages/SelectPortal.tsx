import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, BrainCircuit, ArrowLeft } from 'lucide-react';

const SelectPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center p-4 font-sans relative">
      <Link to="/" className="absolute top-6 left-6 hover:bg-white p-2.5 rounded-lg text-slate-400 hover:text-slate-600 flex items-center gap-1.5 text-sm transition-all font-medium">
        <ArrowLeft className="w-4 h-4" />
        이전으로
      </Link>
      <div className="w-full max-w-[1200px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12 tracking-tight">
          응시할 시험을 선택해주세요
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          
          {/* 기초학력 */}
          <Link 
            to="/student-login?type=basic" 
            className="group rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col no-underline bg-white"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 px-6 py-10 text-white flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <GraduationCap className="w-16 h-16 mb-4 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 relative z-10" />
              <h2 className="text-xl font-bold tracking-tight text-center relative z-10">국가기초학력지원포털</h2>
            </div>
            <div className="px-6 py-6 flex flex-col justify-center items-center">
              <ul className="space-y-3 text-slate-500 text-sm text-center">
                <li className="font-medium">국가기초학력진단검사</li>
                <li className="font-medium">문해력/수리력(3R's)</li>
                <li className="font-medium">기초영어검사</li>
              </ul>
            </div>
          </Link>

          {/* 학업성취도 */}
          <Link 
            to="/student-login?type=achievement" 
            className="group rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col no-underline bg-white"
          >
            <div className="bg-gradient-to-br from-purple-500 to-purple-800 px-6 py-10 text-white flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <BookOpen className="w-16 h-16 mb-4 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 relative z-10" />
              <h2 className="text-xl font-bold tracking-tight text-center relative z-10">학업성취도지원포털</h2>
            </div>
            <div className="px-6 py-6 flex flex-col justify-center items-center">
              <ul className="space-y-3 text-slate-500 text-sm text-center">
                <li className="font-medium">맞춤형학업성취도자율평가</li>
                <li className="font-medium">국가수준학업성취도지원평가</li>
              </ul>
            </div>
          </Link>

          {/* 심리검사 */}
          <Link 
            to="/student-login?type=psychology" 
            className="group rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col no-underline bg-white"
          >
            <div className="bg-gradient-to-br from-slate-500 to-slate-700 px-6 py-10 text-white flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <BrainCircuit className="w-16 h-16 mb-4 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 relative z-10" />
              <h2 className="text-xl font-bold tracking-tight text-center relative z-10">심리검사</h2>
            </div>
            <div className="px-6 py-6 flex flex-col justify-center items-center">
              <ul className="space-y-3 text-slate-400 text-sm text-center">
                <li className="font-medium">학습 어려움 원인진단</li>
                <li className="font-medium">인지적 특성</li>
                <li className="font-medium">정의적 특성</li>
              </ul>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default SelectPortal;
