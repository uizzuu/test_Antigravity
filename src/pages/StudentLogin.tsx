import React from 'react';
import { Search, LogIn } from 'lucide-react';

const StudentLogin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-700 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Decorative background pattern (Simplified "W" shape feel) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L50 100 L100 0" fill="none" stroke="white" strokeWidth="20" />
        </svg>
      </div>

      <div className="z-10 w-full max-w-2xl px-4">
        {/* Header Titles */}
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">기초학력검사</h1>
          <h2 className="text-2xl font-medium opacity-90">학생 로그인</h2>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="space-y-6">
            {/* School Selection Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <select className="select select-bordered w-full bg-slate-200 text-slate-700 text-lg h-14 rounded-xl border-slate-200">
                  <option disabled selected>학교급</option>
                  <option>초등학교</option>
                  <option>중학교</option>
                  <option>고등학교</option>
                </select>
              </div>
              <div className="w-full md:flex-1 relative">
                <input 
                  type="text" 
                  placeholder="학교급 선택 후 입력해 주세요." 
                  className="input input-bordered w-full bg-slate-200 text-slate-700 text-lg h-14 pl-12 rounded-xl border-slate-200"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
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
    </div>
  );
};

export default StudentLogin;
