import re

with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/TeacherManagement.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("ShieldOff, Plus", "ShieldOff, Plus, UserCircle")
content = content.replace("type Role = 'ADMIN' | 'HOMEROOM' | 'GENERAL';", "type Role = 'BASIC_ADMIN' | 'ACHIEVEMENT_ADMIN' | 'HOMEROOM' | 'GENERAL';\ntype AdminType = 'BASIC_ADMIN' | 'ACHIEVEMENT_ADMIN';")
content = content.replace("  teacherType: TeacherType;", "  teacherType: TeacherType;\n  adminType?: AdminType | null;")

content = content.replace("""    teacherType: 'HOMEROOM',
    subjects: { ...EMPTY_SUBJECTS, allSubjects: true },""", """    teacherType: 'HOMEROOM',
    adminType: 'BASIC_ADMIN',
    subjects: { ...EMPTY_SUBJECTS, allSubjects: true },""", 1)

content = content.replace("""    teacherType: 'HOMEROOM',
    subjects: { ...EMPTY_SUBJECTS, allSubjects: true },""", """    teacherType: 'HOMEROOM',
    adminType: 'ACHIEVEMENT_ADMIN',
    subjects: { ...EMPTY_SUBJECTS, allSubjects: true },""", 1)


content = content.replace("  const [role, setRole] = useState<Role>('ADMIN');", "  const [role, setRole] = useState<Role>('BASIC_ADMIN');")

injection_states = """  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const isAdminRole = role === 'BASIC_ADMIN' || role === 'ACHIEVEMENT_ADMIN';

  const maxAdmins = 6; // 초등학교 기준
  const currentAdmins = data.filter(t => t.adminType != null);
  const isQuotaFull = currentAdmins.length >= maxAdmins;
  
  // 내 정보용 모의 ID (상단 롤에 따라 매칭)
  const myMockId = role === 'BASIC_ADMIN' ? 1 : role === 'ACHIEVEMENT_ADMIN' ? 2 : role === 'HOMEROOM' ? 3 : 4;
  const myInfo = data.find(t => t.id === myMockId);
  
  const handleRequestAdmin = (type: AdminType) => {
    if (isQuotaFull) {
      alert('관리자 정원이 꽉 차서 신청할 수 없습니다. 기존 관리자가 권한을 포기해야 합니다.');
      return;
    }
    if (confirm('관리자 권한을 신청하시겠습니까? (자동 승인 데모)')) {
      setData(prev => prev.map(t => t.id === myMockId ? { ...t, adminType: type } : t));
      setRole(type);
      alert('관리자 권한이 부여되었습니다.');
    }
  };

  const handleRevokeMyAdmin = () => {
    if (confirm('정말로 관리자 권한을 취소(포기)하시겠습니까?\\n(해당 권한 취소해도 교사 데이터는 삭제되지 않습니다)')) {
      setData(prev => prev.map(t => t.id === myMockId ? { ...t, adminType: null } : t));
      setRole('HOMEROOM');
      alert('관리자 권한이 취소되었습니다.');
    }
  };"""

content = content.replace("  const [filterType, setFilterType] = useState<string>('all');", injection_states + "\n\n  const [filterType, setFilterType] = useState<string>('all');")

role_toggle_old = """          <div className="flex bg-slate-100 p-1 rounded-lg text-sm">
            {(['ADMIN', 'HOMEROOM', 'GENERAL'] as Role[]).map(r => (
              <button key={r}
                className={`px-4 py-1.5 rounded-md font-bold transition-all ${role === r ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setRole(r)}
              >
                {r === 'ADMIN' ? '국기초 담당자' : r === 'HOMEROOM' ? '담임교사' : '일반교사'}
              </button>
            ))}
          </div>"""
role_toggle_new = """          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-lg text-sm">
              {(['BASIC_ADMIN', 'ACHIEVEMENT_ADMIN', 'HOMEROOM', 'GENERAL'] as Role[]).map(r => (
                <button key={r}
                  className={`px-2 py-1 rounded-md font-medium text-[0.7rem] transition-all ${role === r ? 'bg-white shadow-sm text-primary font-bold' : 'text-slate-500 hover:text-slate-700'}`}
                  onClick={() => setRole(r)}
                >
                  {r === 'BASIC_ADMIN' ? '국기초관리자' : r === 'ACHIEVEMENT_ADMIN' ? '성취도관리자' : r === 'HOMEROOM' ? '담임교사' : '일반교사'}
                </button>
              ))}
            </div>
            <button className="btn btn-sm btn-outline btn-primary font-bold gap-1 rounded-lg ml-2" onClick={() => setProfileModalOpen(true)}>
              <UserCircle size={15} />
              권한신청
            </button>
          </div>"""
content = content.replace(role_toggle_old, role_toggle_new)

content = content.replace("role === 'ADMIN' ?", "isAdminRole ?")
content = content.replace("{r === 'ADMIN' ? '국기초 담당자' : r === 'HOMEROOM' ? '담임교사' : '일반교사'}", "{r === 'BASIC_ADMIN' ? '국기초 관리자' : r === 'ACHIEVEMENT_ADMIN' ? '성취도 관리자' : r === 'HOMEROOM' ? '담임교사' : '일반교사'}")

content = content.replace("role === 'ADMIN'", "isAdminRole")
content = content.replace("role !== 'ADMIN'", "!isAdminRole")

modal_jsx = """      {/* ════════════════════════════════════════
          내 회원정보(관리자 권한 신청) 모달
      ════════════════════════════════════════ */}
      <dialog className={`modal ${profileModalOpen ? 'modal-open' : ''} bg-slate-900/50 backdrop-blur-sm`}>
        <div className="modal-box bg-white max-w-lg rounded-3xl p-8 border border-slate-100 shadow-2xl">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-400"
            onClick={() => setProfileModalOpen(false)}>
            <X size={18} />
          </button>

          <h3 className="font-black text-2xl text-slate-800 mb-1 flex items-center gap-2">
            <UserCircle className="text-primary" size={26} /> 내 회원정보
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            현재 로그인한 <span className="font-bold text-slate-700">{myInfo?.name}</span> 선생님의 권한과 정보를 확인합니다.
          </p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6 space-y-3">
             <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
               <span className="text-sm font-bold text-slate-500">현재 보유 권한</span>
               {myInfo?.adminType === 'BASIC_ADMIN' ? (
                 <span className="badge bg-blue-100 text-blue-700 font-bold border-0 px-2 py-3">국가기초학력 관리자</span>
               ) : myInfo?.adminType === 'ACHIEVEMENT_ADMIN' ? (
                 <span className="badge bg-purple-100 text-purple-700 font-bold border-0 px-2 py-3">학업성취도평가 관리자</span>
               ) : (
                 <span className="text-slate-400 font-medium text-sm">관리자 권한 없음</span>
               )}
             </div>
             <div>
                <div className="flex justify-between items-end mb-2 mt-1">
                  <span className="text-sm font-bold text-slate-600">등록된 관리자 현황</span>
                  <span className="text-xs font-bold font-mono text-primary bg-blue-50 px-2 py-1 rounded-md">({currentAdmins.length}/{maxAdmins}명)</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-32 overflow-y-auto space-y-1.5">
                  {currentAdmins.map(admin => (
                    <div key={admin.id} className="flex justify-between text-xs items-center p-1 border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <span className="font-bold text-slate-700">{admin.name}</span>
                      <span className="text-slate-500 font-medium">{admin.adminType === 'BASIC_ADMIN' ? '국가기초학력 관리자' : '학업성취도 관리자'}</span>
                    </div>
                  ))}
                  {currentAdmins.length === 0 && <div className="text-xs text-slate-400 text-center py-2">등록된 관리자가 없습니다.</div>}
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-3">
             {myInfo?.adminType ? (
               <button className="btn w-full bg-red-50 hover:bg-red-100 text-red-600 border-red-200 font-bold h-12 rounded-xl text-base" onClick={handleRevokeMyAdmin}>
                 <ShieldOff size={18} className="mr-1" /> 내 관리자 권한 취소(포기)
               </button>
             ) : (
               <>
                 <button 
                   className="btn w-full btn-primary font-bold h-12 rounded-xl text-base shadow-sm" 
                   disabled={isQuotaFull}
                   onClick={() => handleRequestAdmin('BASIC_ADMIN')}
                 >
                   국가기초학력 관리자 권한 신청
                 </button>
                 <button 
                   className="btn w-full btn-secondary font-bold h-12 rounded-xl text-base shadow-sm bg-purple-600 hover:bg-purple-700 border-purple-600 text-white" 
                   disabled={isQuotaFull}
                   onClick={() => handleRequestAdmin('ACHIEVEMENT_ADMIN')}
                 >
                   학업성취도평가 관리자 권한 신청
                 </button>
                 {isQuotaFull && (
                   <div className="text-center text-xs text-red-500 font-medium mt-1">
                     <AlertCircle size={12} className="inline mr-1 mb-0.5" />
                     정원({maxAdmins}명)이 꽉 차서 신청할 수 없습니다.
                   </div>
                 )}
               </>
             )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setProfileModalOpen(false)}>
          <button>닫기</button>
        </form>
      </dialog>
"""
content = content.replace("    </>", modal_jsx + "\n    </>")

with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/TeacherManagement.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
