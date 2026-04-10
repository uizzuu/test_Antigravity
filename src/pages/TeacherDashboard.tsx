import React, { useState } from 'react';
import { 
  School, Settings, Users, BarChart3, BookOpenCheck, FolderOpen, 
  ChevronRight, ChevronDown, CheckCircle2, ChevronRightCircle, Home
} from 'lucide-react';
import GradeClassManagement from '../components/GradeClassManagement';
import TeacherManagement from '../components/TeacherManagement';

type MenuState = {
  parent: string;
  child?: string;
};

type MenuItem = {
  title: string;
  desc?: string;
  icon: React.ReactNode;
  children: { name: string; desc?: string; }[];
};

const MENU_DATA: MenuItem[] = [
  {
    title: '학교정보',
    icon: <School size={20} />,
    children: [
      { name: '학년반관리' },
      { name: '교사' },
      { name: '학생관리', desc: '(가입 여부, 아이디/비밀번호 확인 등)' },
      { name: '전문지원요청' },
    ]
  },
  {
    title: '검사설정',
    desc: '(검사 및 배포)',
    icon: <Settings size={20} />,
    children: [
      { name: '국기초' },
      { name: '맞자평' },
      { name: '향상도' },
      { name: '문해력수리력(3R’s)' },
      { name: '심리검사' },
    ]
  },
  {
    title: '시험감독',
    icon: <Users size={20} />,
    children: [] // 단일 메뉴
  },
  {
    title: '통계',
    icon: <BarChart3 size={20} />,
    children: [] // 단일 메뉴
  },
  {
    title: '학습관리',
    icon: <BookOpenCheck size={20} />,
    children: [
      { name: '모둠학습' },
      { name: '학습자료검색' },
      { name: '학생질문관리' },
    ]
  },
  {
    title: '자료실',
    icon: <FolderOpen size={20} />,
    children: [] // 단일 메뉴
  }
];

const TeacherDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuState>({ parent: '' });
  const [expandedParents, setExpandedParents] = useState<string[]>(['학교정보']);

  const toggleParent = (parent: string) => {
    if (expandedParents.includes(parent)) {
      setExpandedParents(expandedParents.filter(p => p !== parent));
    } else {
      setExpandedParents([...expandedParents, parent]);
    }
  };

  const handleMenuClick = (parent: string, child?: string) => {
    setActiveMenu({ parent, child });
    if (!expandedParents.includes(parent)) {
      setExpandedParents([...expandedParents, parent]);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-slate-50 font-sans" data-theme="corporate">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm hidden md:flex sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            교사 업무
          </h2>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2 text-sm font-medium">
            {/* Home Dashboard Button */}
            <li className="mb-4">
              <div 
                onClick={() => handleMenuClick('')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                  activeMenu.parent === '' 
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-200' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm'
                }`}
              >
                <Home size={20} className={activeMenu.parent === '' ? 'text-white' : 'text-slate-400'} />
                <span>대시보드 홈</span>
              </div>
            </li>

            {MENU_DATA.map((menu) => {
              const isParentActive = activeMenu.parent === menu.title;
              const hasChildren = menu.children.length > 0;
              const isExpanded = expandedParents.includes(menu.title);

              return (
                <li key={menu.title} className="flex flex-col">
                  {/* Parent Item */}
                  <div 
                    onClick={() => {
                      if (hasChildren) {
                        toggleParent(menu.title);
                      } else {
                        handleMenuClick(menu.title);
                      }
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                      isParentActive && !hasChildren 
                        ? 'bg-blue-50 text-primary font-bold' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${isParentActive ? 'text-primary' : 'text-slate-400'}`}>
                        {menu.icon}
                      </span>
                      <span className={isParentActive ? 'font-bold text-slate-900' : ''}>
                        {menu.title}
                        {menu.desc && <span className="text-xs text-slate-400 font-normal ml-1 block mt-0.5">{menu.desc}</span>}
                      </span>
                    </div>
                    {hasChildren && (
                      <span className="text-slate-400">
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </span>
                    )}
                  </div>

                  {/* Children Items */}
                  {hasChildren && isExpanded && (
                    <ul className="mt-1 mb-2 ml-4 pl-4 border-l-2 border-slate-100 space-y-1">
                      {menu.children.map((child) => {
                        const isChildActive = isParentActive && activeMenu.child === child.name;
                        return (
                          <li key={child.name}>
                            <div 
                              onClick={() => handleMenuClick(menu.title, child.name)}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${
                                isChildActive 
                                  ? 'bg-blue-50 text-primary font-bold' 
                                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isChildActive ? 'bg-primary' : 'bg-slate-300'}`}></span>
                              <span>
                                {child.name}
                                {child.desc && <span className="block text-xs text-slate-400 font-normal mt-0.5 leading-tight">{child.desc}</span>}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden p-6 md:p-10 animate-in fade-in duration-500">
        
        {/* Breadcrumb */}
        <div className="text-sm text-slate-400 font-medium mb-6 flex items-center gap-2">
          <Home size={14} />
          <ChevronRight size={14} className="text-slate-300" />
          <span>교사업무</span>
          {activeMenu.parent !== '' && (
            <>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-600 font-semibold">{activeMenu.parent}</span>
              {activeMenu.child && (
                <>
                  <ChevronRight size={14} className="text-slate-300" />
                  <span className="text-primary font-bold">{activeMenu.child}</span>
                </>
              )}
            </>
          )}
        </div>

        {/* Content Header */}
        <header className="mb-8 border-b border-slate-200 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              {activeMenu.parent === '' ? '교사 대시보드' : (activeMenu.child || activeMenu.parent)}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              {activeMenu.parent === '' 
                ? '원하시는 업무 메뉴를 선택해 주세요.' 
                : '선택하신 메뉴의 상세 정보를 확인하고 관리할 수 있습니다.'}
            </p>
          </div>
        </header>

        {/* Content Placeholder based on Active Menu */}
        <div className={activeMenu.parent === '' ? '' : 'bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[500px]'}>
          
          {/* Dashboard Home (6 Cards) */}
          {activeMenu.parent === '' ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
               {MENU_DATA.map((menu) => (
                 <div 
                   key={menu.title}
                   onClick={() => handleMenuClick(menu.title, menu.children.length > 0 ? menu.children[0].name : undefined)}
                   className="flex flex-col items-center justify-center gap-5 p-8 bg-white rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all group cursor-pointer"
                 >
                   <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                     <div className="text-primary opacity-80 group-hover:opacity-100 scale-[2]">{menu.icon}</div>
                   </div>
                   <div className="text-center">
                     <span className="block text-2xl font-bold text-slate-800">{menu.title}</span>
                     <span className="block text-sm text-slate-500 mt-1">{menu.desc || `교사 ${menu.title} 메뉴`}</span>
                   </div>
                 </div>
               ))}
             </div>
          ) : activeMenu.parent === '시험감독' && !activeMenu.child ? (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row items-end gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="w-full md:w-auto flex-1 space-y-2">
                  <label className="text-sm font-bold text-slate-700">검색 조건 (학년반 검색)</label>
                  <div className="flex gap-2">
                    <select className="select select-bordered bg-white w-full max-w-xs border-slate-300 text-slate-700">
                      <option disabled selected>학년 선택</option>
                      <option>1학년</option>
                      <option>2학년</option>
                    </select>
                    <select className="select select-bordered bg-white w-full max-w-xs border-slate-300 text-slate-700">
                      <option disabled selected>반 선택</option>
                      <option>1반</option>
                      <option>2반</option>
                    </select>
                    <button className="btn btn-primary px-8">검색</button>
                  </div>
                </div>
                <div>
                  <button className="btn btn-outline btn-primary">전체 보기</button>
                </div>
              </div>
              
              <div className="bg-blue-50/50 text-blue-800 p-4 rounded-xl border border-blue-100 flex items-start gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p>현재 <strong>[배포가 완료된 항목]</strong>만 리스트에 노출되어 시험 감독이 가능합니다.</p>
              </div>

              {/* Data Table Placeholder */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="table">
                  <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-4">No.</th>
                      <th>검사명 (배포 완료 건)</th>
                      <th>대상 학년반</th>
                      <th>상태</th>
                      <th className="text-center">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
                      <td>1</td>
                      <td className="font-semibold text-slate-800">2026학년도 1학기 기초학력 진단검사</td>
                      <td>1학년 1반</td>
                      <td><span className="badge badge-success badge-sm font-bold">진행중</span></td>
                      <td className="text-center"><button className="btn btn-sm btn-primary">시험감독 입장</button></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
                      <td>2</td>
                      <td className="font-semibold text-slate-800">맞춤형 학업성취도 자율평가 (수학)</td>
                      <td>전체반</td>
                      <td><span className="badge badge-warning badge-sm font-bold">대기중</span></td>
                      <td className="text-center"><button className="btn btn-sm btn-primary">시험감독 입장</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeMenu.parent === '학교정보' && activeMenu.child === '학년반관리' ? (
            <GradeClassManagement />
          ) : activeMenu.parent === '학교정보' && activeMenu.child === '교사' ? (
            <TeacherManagement />
          ) : activeMenu.parent === '학교정보' && activeMenu.child === '학생관리' ? (
            /* 학생관리 특별 렌더링 */
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-end mb-4">
                 <div className="flex gap-2">
                    <select className="select select-bordered bg-white w-full max-w-xs border-slate-300 text-slate-700">
                      <option disabled selected>학년 선택</option>
                      <option>1학년</option>
                      <option>2학년</option>
                    </select>
                    <select className="select select-bordered bg-white w-full max-w-xs border-slate-300 text-slate-700">
                      <option disabled selected>반 선택</option>
                      <option>1반</option>
                    </select>
                    <button className="btn btn-primary px-6">조회</button>
                 </div>
                 <div className="text-sm font-bold text-slate-500">
                   총 인원: 25명 / 가입완료: 24명
                 </div>
               </div>

               <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <table className="table">
                  <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-4">학번</th>
                      <th>이름</th>
                      <th>가입 여부</th>
                      <th>아이디</th>
                      <th className="text-center">비밀번호 관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
                      <td className="font-medium">10101</td>
                      <td className="font-semibold text-slate-800">김학생</td>
                      <td><span className="badge badge-success badge-sm font-bold">가입완료</span></td>
                      <td className="text-slate-500 font-mono">stu1***</td>
                      <td className="text-center"><button className="btn btn-xs btn-outline btn-neutral">초기화</button></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
                      <td className="font-medium">10102</td>
                      <td className="font-semibold text-slate-800">이학생</td>
                      <td><span className="badge badge-success badge-sm font-bold">가입완료</span></td>
                      <td className="text-slate-500 font-mono">lee_***</td>
                      <td className="text-center"><button className="btn btn-xs btn-outline btn-neutral">초기화</button></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
                      <td className="font-medium">10103</td>
                      <td className="font-semibold text-slate-800">박학생</td>
                      <td><span className="badge badge-error badge-sm font-bold text-white">미가입</span></td>
                      <td className="text-slate-300 font-mono">-</td>
                      <td className="text-center">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* 일반적인 플레이스홀더 화면 */
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-6 py-20">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border-4 border-slate-100">
                <ChevronRightCircle size={48} className="text-slate-300" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-slate-700">{activeMenu.child || activeMenu.parent} 화면 준비 중</h3>
                <p className="text-lg">좌측 사이드바 구조에 맞춰 기능이 연동될 예정입니다.</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
