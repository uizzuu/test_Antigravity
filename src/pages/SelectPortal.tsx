import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, BrainCircuit, ArrowLeft } from 'lucide-react';

const SelectPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans pt-20 relative">
      <Link to="/" className="absolute top-8 left-8 hover:bg-slate-200 p-3 rounded-xl text-slate-600 flex items-center gap-2 text-lg transition-colors font-medium">
        <ArrowLeft className="w-6 h-6" />
        이전으로
      </Link>
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-slate-800 mb-16 tracking-tight">
          응시할 시험을 선택해주세요
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 기초학력 */}
          <Link 
            to="/student-login?type=basic" 
            className="group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col bg-white border border-slate-100"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-white flex flex-col items-center justify-center min-h-[240px]">
              <GraduationCap className="w-20 h-20 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold tracking-tight text-center">국가기초학력지원포털</h2>
            </div>
            <div className="p-8 bg-white min-h-[180px] flex flex-col justify-center items-center">
              <ul className="space-y-4 text-slate-600 font-semibold text-center text-[1.15rem]">
                <li>국가기초학력진단검사</li>
                <li>문해력/수리력(3R's)</li>
                <li>기초영어검사</li>
              </ul>
            </div>
          </Link>

          {/* 학업성취도 */}
          <Link 
            to="/student-login?type=achievement" 
            className="group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col bg-white border border-slate-100"
          >
            <div className="bg-gradient-to-br from-purple-500 to-purple-800 p-8 text-white flex flex-col items-center justify-center min-h-[240px]">
              <BookOpen className="w-20 h-20 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold tracking-tight text-center">학업성취도지원포털</h2>
            </div>
            <div className="p-8 bg-white min-h-[180px] flex flex-col justify-center items-center">
              <ul className="space-y-4 text-slate-600 font-semibold text-center text-[1.15rem]">
                <li>맞춤형학업성취도자율평가</li>
                <li>국가수준학업성취도지원평가</li>
              </ul>
            </div>
          </Link>

          {/* 심리검사 */}
          <Link 
            to="/student-login?type=psychology" 
            className="group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col bg-white border border-slate-100"
          >
            <div className="bg-gradient-to-br from-slate-500 to-slate-700 p-8 text-white flex flex-col items-center justify-center min-h-[240px]">
              <BrainCircuit className="w-20 h-20 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold tracking-tight text-center">심리검사</h2>
            </div>
            <div className="p-8 bg-white min-h-[180px] flex flex-col justify-center items-center">
              <ul className="space-y-4 text-slate-500 font-semibold text-center text-[1.15rem]">
                <li>학습 어려움 원인진단</li>
                <li>인지적 특성</li>
                <li>정의적 특성</li>
              </ul>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default SelectPortal;
