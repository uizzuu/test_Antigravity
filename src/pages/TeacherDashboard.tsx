import React, { useState } from 'react';
import { 
  School, Settings, Users, BarChart3, BookOpenCheck, FolderOpen, 
  ChevronRight, ChevronDown, CheckCircle2, ChevronRightCircle, Home,
  User, Menu
} from 'lucide-react';
import GradeClassManagement from '../components/GradeClassManagement';
import TeacherManagement from '../components/TeacherManagement';
import UserInfo from '../components/UserInfo';

type MenuState = {
  parent: string;
  child?: string;
};

type MenuItem = {
  title: string;
  desc?: string;
  icon: React.ReactNode;
  children: { name: string; desc?: string; badge?: string | number; }[];
};

const MENU_DATA: MenuItem[] = [
  {
    title: '학교정보관리',
    icon: <School size={18} />,
    children: [
      { name: '학년반관리' },
      { name: '교사관리', badge: 'N' },
      { name: '학생관리' },
      { name: '전문지원요청' },
    ]
  },
  {
    title: '검사설정',
    desc: '(검사 및 배포)',
    icon: <Settings size={18} />,
    children: [
      { name: '국기초' },
      { name: '맞자평' },
      { name: '향상도' },
      { name: "문해력수리력(3R's)" },
      { name: '심리검사' },
    ]
  },
  {
    title: '시험감독',
    icon: <Users size={18} />,
    children: []
  },
  {
    title: '통계',
    icon: <BarChart3 size={18} />,
    children: []
  },
  {
    title: '학습관리',
    icon: <BookOpenCheck size={18} />,
    children: [
      { name: '모둠학습' },
      { name: '학습자료검색' },
      { name: '학생질문관리' },
    ]
  },
  {
    title: '자료실',
    icon: <FolderOpen size={18} />,
    children: []
  },
  {
    title: '회원정보',
    icon: <User size={18} />,
    children: []
  }
];

const TeacherDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuState>({ parent: '' });
  const [expandedParents, setExpandedParents] = useState<string[]>(['학교정보관리']);

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
    <div className="drawer md:drawer-open" data-theme="corporate">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area */}
      <div className="drawer-content flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50 overflow-x-hidden">
        
        {/* Mobile Toolbar (Top sticky or just before content) */}
        <div className="md:hidden sticky top-0 z-30 flex items-center bg-white border-b border-slate-200 px-4 h-12 shrink-0">
          <label htmlFor="dashboard-drawer" className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 cursor-pointer">
            <Menu size={20} />
          </label>
          <span className="ml-2 text-sm font-bold text-slate-800">교사 업무 메뉴</span>
        </div>

        <main className="flex-1 p-6 md:p-8">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-400 font-medium mb-5 flex items-center gap-1.5">
            <Home size={14} />
            <ChevronRight size={14} className="text-slate-300" />
            <span>교사업무</span>
            {activeMenu.parent !== '' && (
              <>
                <ChevronRight size={14} className="text-slate-300" />
                <span className="text-slate-500">{activeMenu.parent}</span>
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
          <header className="mb-6 border-b border-slate-200 pb-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                {activeMenu.parent === '' ? '교사 대시보드' : (activeMenu.child || activeMenu.parent)}
              </h1>
              <p className="text-slate-500 mt-2 text-base">
                {activeMenu.parent === '' 
                  ? '원하시는 업무 메뉴를 선택해 주세요.' 
                  : '선택하신 메뉴의 상세 정보를 확인하고 관리할 수 있습니다.'}
              </p>
            </div>
            {activeMenu.parent === '' && (
              <button 
                onClick={() => handleMenuClick('회원정보')}
                className="btn btn-sm btn-outline border-slate-200 text-slate-600 bg-white hover:bg-slate-50 font-medium gap-1.5 hidden sm:flex"
              >
                <User size={14} className="text-primary" />
                내 회원정보
              </button>
            )}
          </header>

          {/* Content Placeholder based on Active Menu */}
          <div className={activeMenu.parent === '' ? '' : 'bg-white rounded-xl p-6 border border-slate-200 min-h-[500px]'}>
            
            {/* Dashboard Home (6 Cards) */}
            {activeMenu.parent === '' ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 {MENU_DATA.filter(m => m.title !== '회원정보').map((menu) => (
                   <div 
                     key={menu.title}
                     onClick={() => handleMenuClick(menu.title, menu.children.length > 0 ? menu.children[0].name : undefined)}
                     className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-xl border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all group cursor-pointer"
                   >
                     <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                       <div className="text-slate-400 group-hover:text-primary transition-colors scale-150">{menu.icon}</div>
                     </div>
                     <div className="text-center">
                       <span className="block text-xl font-bold text-slate-800">{menu.title}</span>
                       <span className="block text-sm text-slate-400 mt-1 font-medium">{menu.desc || `교사 ${menu.title} 메뉴`}</span>
                     </div>
                   </div>
                 ))}
               </div>
            ) : activeMenu.parent === '시험감독' && !activeMenu.child ? (
              <div className="space-y-5 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row items-end gap-4 bg-slate-50 p-5 rounded-lg border border-slate-200">
                  <div className="w-full md:w-auto flex-1 space-y-2">
                    <label className="text-sm font-bold text-slate-600">검색 조건 (학년반 검색)</label>
                    <div className="flex flex-wrap gap-2">
                      <select className="select select-sm select-bordered bg-white flex-1 min-w-[120px] border-slate-200 text-slate-600" defaultValue="전체">
                        <option value="전체">전체 학년</option>
                        <option>1학년</option>
                        <option>2학년</option>
                      </select>
                      <select className="select select-sm select-bordered bg-white flex-1 min-w-[120px] border-slate-200 text-slate-600" defaultValue="전체">
                        <option value="전체">전체 반</option>
                        <option>1반</option>
                        <option>2반</option>
                      </select>
                      <button className="btn btn-sm btn-primary px-6 w-full sm:w-auto">검색</button>
                    </div>
                  </div>
                  <div className="w-full md:w-auto">
                    <button className="btn btn-sm btn-outline border-slate-200 text-slate-600 w-full">전체 보기</button>
                  </div>
                </div>
                
                <div className="bg-blue-50/60 text-blue-700 px-4 py-3 rounded-lg border border-blue-100 flex items-start gap-2.5 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p>현재 <strong>[배포가 완료된 항목]</strong>만 리스트에 노출되어 시험 감독이 가능합니다.</p>
                </div>

                {/* Data Table */}
                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="table table-sm min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-500 text-sm font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-4">No.</th>
                        <th>검사명 (배포 완료 건)</th>
                        <th>대상 학년반</th>
                        <th>상태</th>
                        <th className="text-center">액션</th>
                      </tr>
                    </thead>
                    <tbody className="text-base text-slate-600">
                      <tr className="hover:bg-slate-50/60 transition-colors border-b border-slate-100">
                        <td>1</td>
                        <td className="font-medium text-slate-700">2026학년도 1학기 기초학력 진단검사</td>
                        <td>1학년 1반</td>
                        <td><span className="badge badge-success badge-sm text-xs">진행중</span></td>
                        <td className="text-center"><button className="btn btn-xs btn-primary">시험감독 입장</button></td>
                      </tr>
                      <tr className="hover:bg-slate-50/60 transition-colors border-b border-slate-100">
                        <td>2</td>
                        <td className="font-medium text-slate-700">맞춤형 학업성취도 자율평가 (수학)</td>
                        <td>전체반</td>
                        <td><span className="badge badge-warning badge-sm text-xs">대기중</span></td>
                        <td className="text-center"><button className="btn btn-xs btn-primary">시험감독 입장</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeMenu.parent === '학교정보관리' && activeMenu.child === '학년반관리' ? (
              <GradeClassManagement />
            ) : activeMenu.parent === '학교정보관리' && activeMenu.child === '교사관리' ? (
              <TeacherManagement />
            ) : activeMenu.parent === '학교정보관리' && activeMenu.child === '학생관리' ? (
              /* 학생관리 */
              <div className="space-y-5 animate-in slide-in-from-bottom-4 duration-500">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-3">
                   <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <select className="select select-sm select-bordered bg-white flex-1 min-w-[120px] border-slate-200 text-slate-600" defaultValue="전체">
                        <option value="전체">전체 학년</option>
                        <option>1학년</option>
                        <option>2학년</option>
                      </select>
                      <select className="select select-sm select-bordered bg-white flex-1 min-w-[120px] border-slate-200 text-slate-600" defaultValue="전체">
                        <option value="전체">전체 반</option>
                        <option>1반</option>
                      </select>
                      <button className="btn btn-sm btn-primary px-5">조회</button>
                   </div>
                   <div className="text-xs font-medium text-slate-400">
                     총 인원: 25명 / 가입완료: 24명
                   </div>
                 </div>

                 <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="table table-sm min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-500 text-sm font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-4">학번</th>
                        <th>이름</th>
                        <th>가입 여부</th>
                        <th>아이디</th>
                        <th className="text-center">비밀번호 관리</th>
                      </tr>
                    </thead>
                    <tbody className="text-base text-slate-600">
                      <tr className="hover:bg-slate-50/60 transition-colors border-b border-slate-100">
                        <td className="font-medium text-slate-500">10101</td>
                        <td className="font-medium text-slate-700">김학생</td>
                        <td><span className="badge badge-success badge-sm text-xs">가입완료</span></td>
                        <td className="text-slate-400 font-mono text-xs">stu1***</td>
                        <td className="text-center"><button className="btn btn-xs btn-outline border-slate-200 text-slate-500">초기화</button></td>
                      </tr>
                      <tr className="hover:bg-slate-50/60 transition-colors border-b border-slate-100">
                        <td className="font-medium text-slate-500">10102</td>
                        <td className="font-medium text-slate-700">이학생</td>
                        <td><span className="badge badge-success badge-sm text-xs">가입완료</span></td>
                        <td className="text-slate-400 font-mono text-xs">lee_***</td>
                        <td className="text-center"><button className="btn btn-xs btn-outline border-slate-200 text-slate-500">초기화</button></td>
                      </tr>
                      <tr className="hover:bg-slate-50/60 transition-colors border-b border-slate-100">
                        <td className="font-medium text-slate-500">10103</td>
                        <td className="font-medium text-slate-700">박학생</td>
                        <td><span className="badge badge-error badge-sm text-xs text-white">미가입</span></td>
                        <td className="text-slate-300 font-mono text-xs">-</td>
                        <td className="text-center">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeMenu.parent === '회원정보' ? (
              <UserInfo />
            ) : (
              /* 일반적인 플레이스홀더 화면 */
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 py-16">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
                  <ChevronRightCircle size={32} className="text-slate-300" />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-slate-600">{activeMenu.child || activeMenu.parent} 화면 준비 중</h3>
                  <p className="text-sm">좌측 사이드바 구조에 맞춰 기능이 연동될 예정입니다.</p>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Drawer Side (Sidebar) */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-60 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto">
          <div className="px-5 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-primary rounded-sm"></span>
              교사 업무
            </h2>
          </div>
          
          <nav className="flex-1 p-3">
            <ul className="space-y-1 text-sm font-medium">
              {/* Home Dashboard Button */}
              <li className="mb-4">
                <div 
                  onClick={() => {
                    handleMenuClick('');
                    document.getElementById('dashboard-drawer')?.click();
                  }}
                  className={`flex items-center gap-2.5 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                    activeMenu.parent === '' 
                      ? 'bg-primary text-white font-bold' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Home size={18} className={activeMenu.parent === '' ? 'text-white' : 'text-slate-400'} />
                  <span className="text-base">대시보드 홈</span>
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
                          document.getElementById('dashboard-drawer')?.click();
                        }
                      }}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                        isParentActive && !hasChildren 
                          ? 'bg-blue-50 text-primary font-bold' 
                          : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`${isParentActive ? 'text-primary' : 'text-slate-400'}`}>
                          {menu.icon}
                        </span>
                        <span className={`text-base ${isParentActive ? 'font-bold text-slate-800' : ''}`}>
                          {menu.title}
                        </span>
                      </div>
                      {hasChildren && (
                        <span className="text-slate-300">
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </span>
                      )}
                    </div>

                    {/* Children Items */}
                    {hasChildren && isExpanded && (
                      <ul className="mt-0.5 mb-1 ml-3 pl-3 border-l border-slate-100 space-y-0.5">
                        {menu.children.map((child) => {
                          const isChildActive = isParentActive && activeMenu.child === child.name;
                          return (
                            <li key={child.name}>
                              <div 
                                onClick={() => {
                                  handleMenuClick(menu.title, child.name);
                                  document.getElementById('dashboard-drawer')?.click();
                                }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                                  isChildActive 
                                    ? 'bg-blue-50 text-primary font-bold' 
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                }`}
                              >
                                <span className={`w-1 h-1 rounded-full ${isChildActive ? 'bg-primary' : 'bg-slate-300'} shrink-0`}></span>
                                <div className="flex items-center gap-1.5 font-medium">
                                  <span className="text-sm">{child.name}</span>
                                  {child.badge && (
                                    <span className="bg-red-500 text-white text-[11px] font-bold h-4 min-w-[1rem] px-1 rounded-full flex items-center justify-center">{child.badge}</span>
                                  )}
                                </div>
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
      </div>
    </div>
  );
};

export default TeacherDashboard;
