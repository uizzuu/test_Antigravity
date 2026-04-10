import React, { useState } from 'react';
import { User, Shield, X, Check, ShieldOff, Lock, Edit3, XCircle, Plus, Trash2, Search } from 'lucide-react';

const UserInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  // 학교 검색 모달 상태
  const [schoolModalOpen, setSchoolModalOpen] = useState(false);
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [editingSchoolTarget, setEditingSchoolTarget] = useState<number | 'self' | null>(null);
  const [teacherSchool, setTeacherSchool] = useState('01초등학교');
  
  // 권한 관련 및 가짜 데이터
  const [hasBasicAdmin, setHasBasicAdmin] = useState(false);
  const [hasAchievementAdmin, setHasAchievementAdmin] = useState(false);
  const maxAdmin = 6;
  const currentAdminCount = 3; 

  // 편집 폼 상태
  const [classes, setClasses] = useState([{ id: 1, grade: '6학년', classNum: '10반' }, { id: 2, grade: '5학년', classNum: '09반' }]);
  const [childrenList, setChildrenList] = useState([{ id: 1, school: '테스트초등학교', grade: '4학년', classNum: '2반', name: '김학생' }]);
  const [teacherTypes, setTeacherTypes] = useState<string[]>(['초등담임']);
  const [subjects, setSubjects] = useState<string[]>(['국어', '수학']);

  const handleSave = () => {
    setIsEditing(false);
    alert('회원정보가 성공적으로 수정되었습니다.');
  };

  const handleApplyBasicAdmin = () => setHasBasicAdmin(true);
  const handleApplyAchievementAdmin = () => setHasAchievementAdmin(true);
  const handleRevokeAdmin = (type: 'basic' | 'achievement') => {
    if (confirm('해당 권한을 정말로 취소하시겠습니까?')) {
      if (type === 'basic') setHasBasicAdmin(false);
      if (type === 'achievement') setHasAchievementAdmin(false);
    }
  };

  const SELECTION_SUBJECTS = ['국어', '수학', '사회', '과학', '영어', '예체능', '그 외 교과'];
  const SELECTION_TEACHER_TYPES = ['초등담임', '중/고등 담임', '교과교사', '보조교사'];
  
  const isElemHomeroom = teacherTypes.includes('초등담임');

  const addClass = () => setClasses([...classes, { id: Date.now(), grade: '1학년', classNum: '1반' }]);
  const updateClass = (id: number, field: string, value: string) => {
    setClasses(classes.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const removeClass = (id: number) => setClasses(classes.filter(c => c.id !== id));

  const addChild = () => setChildrenList([...childrenList, { id: Date.now(), school: '', grade: '1학년', classNum: '1반', name: '' }]);
  const updateChild = (id: number, field: string, value: string) => {
    setChildrenList(childrenList.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const removeChild = (id: number) => setChildrenList(childrenList.filter(c => c.id !== id));

  const toggleTeacherType = (type: string) => {
    if (teacherTypes.includes(type)) {
      setTeacherTypes(teacherTypes.filter(t => t !== type));
    } else {
      setTeacherTypes([...teacherTypes, type]);
    }
  };

  const toggleSubject = (subj: string) => {
    if (subjects.includes(subj)) {
      setSubjects(subjects.filter(s => s !== subj));
    } else {
      setSubjects([...subjects, subj]);
    }
  };
  
  const handleOpenSchoolSearch = (target: number | 'self') => {
    setEditingSchoolTarget(target);
    setSchoolSearchQuery('');
    setSchoolModalOpen(true);
  };
  
  const handleSelectSchool = (schoolName: string) => {
    if (editingSchoolTarget === 'self') {
      setTeacherSchool(schoolName);
    } else if (typeof editingSchoolTarget === 'number') {
      updateChild(editingSchoolTarget, 'school', schoolName);
    }
    setSchoolModalOpen(false);
  };

  const MOCK_SCHOOLS = ['한국학교', '서울초등학교', '부산중학교', '대구고등학교', '테스트초등학교', '제주국제학교', '독도초등학교'];
  const searchResults = schoolSearchQuery.trim() === '' ? [] : MOCK_SCHOOLS.filter(s => s.includes(schoolSearchQuery));

  const renderEditableInput = (item: any) => {
    if (!isEditing || !item.editable) {
      if (item.id === 'custom_school') {
        return <span className="text-slate-600 text-base font-medium">{teacherSchool}</span>;
      }
      if (item.id === 'classes') {
        return <span className="text-slate-600 text-base font-medium">{classes.map(c => `${c.grade} ${c.classNum}`).join(', ') || '지정 안됨'}</span>;
      }
      if (item.id === 'children') {
        return <span className="text-slate-600 text-base font-medium">{childrenList.length === 0 ? '등록된 자녀 없음' : childrenList.map(c => `${c.name}(${c.school} ${c.grade} ${c.classNum})`).join(', ')}</span>;
      }
      if (item.id === 'subjects') {
        return <span className="text-slate-600 text-base font-medium">{isElemHomeroom ? '전과목 (초등담임)' : (subjects.join(', ') || '선택 안됨')}</span>;
      }
      if (item.id === 'teacherType') {
        return <span className="text-slate-600 text-base font-medium">{teacherTypes.join(', ') || '선택 안됨'}</span>;
      }
      return <span className="text-slate-600 text-base font-medium">{Array.isArray(item.value) ? item.value.join(', ') : item.value}</span>;
    }

    const inputBase = "input input-bordered bg-white w-full border-slate-200 text-base h-11";
    const selectBase = "select select-bordered bg-white border-slate-200 text-base h-11";

    switch (item.inputType) {
      case 'date':
        return <input type="date" className={`${inputBase} max-w-[180px]`} defaultValue={typeof item.value === 'string' ? item.value.replace(/\./g, '-') : ''} />;
      case 'radio':
        return (
          <div className="flex gap-6">
            {item.options.map((opt: string) => (
              <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name={item.label} className="radio radio-primary radio-sm sm:radio-md" defaultChecked={item.value === opt} />
                <span className="text-base text-slate-600 font-medium">{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'custom_school':
        return (
          <div className="flex bg-white overflow-hidden border border-slate-200 rounded-lg w-full max-w-sm h-11">
            <input type="text" placeholder="학교 검색" className="input border-0 bg-transparent flex-1 outline-none focus:outline-none cursor-pointer text-base" value={teacherSchool} readOnly onClick={() => handleOpenSchoolSearch('self')} />
            <button className="btn btn-ghost px-3 bg-slate-50 h-full rounded-none" onClick={() => handleOpenSchoolSearch('self')}><Search size={18} className="text-slate-400"/></button>
          </div>
        );
      case 'custom_classes':
        return (
          <div className="space-y-3 w-full">
            {classes.map((c) => (
              <div key={c.id} className="flex gap-3 items-center">
                <select className={`${selectBase} w-32`} value={c.grade} onChange={(e) => updateClass(c.id, 'grade', e.target.value)}>
                  {[1,2,3,4,5,6].map(g => <option key={g} value={`${g}학년`}>{g}학년</option>)}
                </select>
                <select className={`${selectBase} w-32`} value={c.classNum} onChange={(e) => updateClass(c.id, 'classNum', e.target.value)}>
                  {[1,2,3,4,5,6,7,8,9,10].map(cl => <option key={cl} value={`${cl}반`}>{cl}반</option>)}
                </select>
                <button className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50 px-2" onClick={() => removeClass(c.id)}><Trash2 size={18}/></button>
              </div>
            ))}
            <button className="btn btn-sm btn-outline border-slate-200 gap-1.5 w-fit mt-1 text-slate-500 font-bold" onClick={addClass}><Plus size={14}/> 학년반 추가</button>
          </div>
        );
      case 'custom_children':
        return (
          <div className="space-y-3 w-full">
            {childrenList.map((c) => (
              <div key={c.id} className="flex flex-wrap gap-3 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                <input type="text" placeholder="이름" className={`${inputBase} w-28`} value={c.name} onChange={(e) => updateChild(c.id, 'name', e.target.value)} />
                <div className="flex bg-white overflow-hidden border border-slate-200 rounded-lg h-11">
                  <input type="text" placeholder="학교 검색" className="input border-0 bg-transparent w-44 outline-none focus:outline-none cursor-pointer text-base" value={c.school} readOnly onClick={() => handleOpenSchoolSearch(c.id)} />
                  <button className="btn btn-ghost px-3 bg-slate-100 h-full rounded-none" onClick={() => handleOpenSchoolSearch(c.id)}><Search size={16} className="text-slate-400"/></button>
                </div>
                <select className={`${selectBase} w-28`} value={c.grade} onChange={(e) => updateChild(c.id, 'grade', e.target.value)}>
                  {[1,2,3,4,5,6].map(g => <option key={g} value={`${g}학년`}>{g}학년</option>)}
                </select>
                <select className={`${selectBase} w-28`} value={c.classNum} onChange={(e) => updateChild(c.id, 'classNum', e.target.value)}>
                  {[1,2,3,4,5,6,7,8,9,10].map(cl => <option key={cl} value={`${cl}반`}>{cl}반</option>)}
                </select>
                <button className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50 px-2" onClick={() => removeChild(c.id)}><Trash2 size={18}/></button>
              </div>
            ))}
            <button className="btn btn-sm btn-outline border-slate-200 gap-1.5 w-fit mt-1 text-slate-500 font-bold" onClick={addChild}><Plus size={14}/> 자녀 추가</button>
          </div>
        );
      case 'custom_teacherType':
        return (
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {SELECTION_TEACHER_TYPES.map((opt: string) => (
              <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm sm:checkbox-md" checked={teacherTypes.includes(opt)} onChange={() => toggleTeacherType(opt)} />
                <span className="text-base text-slate-600 font-medium">{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'custom_subjects':
        if (isElemHomeroom) {
          return <span className="text-base text-primary bg-blue-50 px-4 py-1.5 rounded-lg font-bold border border-blue-100">전과목 (초등담임 선택 시 자동 적용)</span>;
        }
        return (
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {SELECTION_SUBJECTS.map((opt: string) => (
              <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm sm:checkbox-md" checked={subjects.includes(opt)} onChange={() => toggleSubject(opt)} />
                <span className="text-base text-slate-600 font-medium">{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'text':
      default:
        return <input type="text" className={`${inputBase} max-w-sm`} defaultValue={typeof item.value === 'string' ? item.value : ''} />;
    }
  };

  const ITEMS = [
    { label: '이름', value: '01초교사(0610)', editable: true, inputType: 'text' },
    { label: '아이디', value: 'telm0160', editable: false },
    { label: '생년월일', value: '1980.01.01', editable: true, inputType: 'date' },
    { label: '성별', value: '남자', editable: true, inputType: 'radio', options: ['남자', '여자'] },
    { id: 'custom_school', label: '학교', value: teacherSchool, editable: true, inputType: 'custom_school' },
    { id: 'classes', label: '학년, 반', value: [], editable: true, inputType: 'custom_classes' },
    { id: 'teacherType', label: '교사유형', value: [], editable: true, inputType: 'custom_teacherType' },
    { id: 'subjects', label: '교과목정보', value: [], editable: true, inputType: 'custom_subjects' },
    { id: 'children', label: '자녀 등록 현황', value: [], editable: true, inputType: 'custom_children' },
    { label: '학교담당자여부', value: [hasBasicAdmin && '국가기초학력 관리자', hasAchievementAdmin && '학업성취도평가 관리자'].filter(Boolean).join(', ') || '관리자 권한 없음(일반교사)', editable: false }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 max-w-4xl relative">
      {/* ── 상단 타이틀 구역 ── */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <User className="text-primary" size={28} /> 회원정보
          </h2>
          <p className="text-slate-500 text-base mt-2">현재 로그인한 계정의 정보를 조회하고 수정할 수 있습니다.</p>
        </div>
      </div>

      {/* ── 기본 정보 (dl/dt/dd 구조 레이아웃) ── */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <dl className="grid grid-cols-1 divide-y divide-slate-100">
          {ITEMS.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row hover:bg-slate-50/40 transition-colors">
              <dt className="w-full sm:w-48 bg-slate-50 text-slate-600 p-4 text-base font-bold flex items-center shrink-0 border-b sm:border-b-0 sm:border-r border-slate-100">
                {item.label}
              </dt>
              <dd className="p-4 flex-1 flex items-center min-h-[60px] w-full">
                {renderEditableInput(item)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── 권한 영역 ── */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <h4 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
          <Shield className="text-primary" size={20} /> 보유 및 신청 가능 권한
        </h4>
        <button 
          type="button" 
          className="btn btn-md btn-outline border-slate-200 text-slate-600 bg-white hover:bg-slate-50 gap-2 font-bold px-6"
          onClick={() => setModalOpen(true)}
        >
          <Shield size={18} /> 
          관리자 권한 신청 / 관리
        </button>
      </div>

      {/* ── 하단 액션 버튼 ── */}
      <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
        {!isEditing ? (
          <>
            <button className="btn btn-md btn-outline border-slate-200 text-slate-500 bg-white hover:bg-slate-50 gap-2 font-bold px-6">
              <Lock size={16} /> 비밀번호 변경
            </button>
            <button className="btn btn-md btn-primary font-bold px-8 gap-2 shadow-md" onClick={() => setIsEditing(true)}>
              <Edit3 size={16} /> 회원정보 수정
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-md btn-ghost text-slate-400 gap-2 font-bold px-6" onClick={() => setIsEditing(false)}>
              <XCircle size={16} /> 취소
            </button>
            <button className="btn btn-md btn-primary font-bold px-8 gap-2 shadow-md" onClick={handleSave}>
              <Check size={16} /> 수정 완료(저장)
            </button>
          </>
        )}
      </div>

      {/* ── 학교 검색 모달 ── */}
      <dialog className={`modal ${schoolModalOpen ? 'modal-open' : ''} bg-slate-900/40 backdrop-blur-sm z-[100]`} style={{position:'fixed'}}>
        <div className="modal-box bg-white max-w-sm rounded-xl p-5 border border-slate-200 shadow-lg">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-slate-400"
            onClick={() => setSchoolModalOpen(false)}>
            <X size={16} />
          </button>
          <h3 className="font-bold text-xl text-slate-800 mb-4">학교 검색</h3>
          <input 
            type="text" 
            placeholder="학교명을 입력하세요"
            className="input input-bordered w-full bg-white mb-4 border-slate-200 text-base h-11"
            value={schoolSearchQuery}
            onChange={(e) => setSchoolSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
          />
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 h-48 overflow-y-auto">
            {searchResults.length > 0 ? (
              <ul className="space-y-1">
                {searchResults.map(school => (
                  <li key={school}>
                    <button 
                      className="w-full text-left px-4 py-3 text-base text-slate-600 hover:bg-blue-50 hover:text-primary rounded-lg transition-colors font-medium border border-transparent hover:border-primary/20"
                      onClick={() => handleSelectSchool(school)}
                    >
                      {school}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm font-medium">
                {schoolSearchQuery ? '검색 결과가 없습니다.' : '학교명을 검색해주세요.'}
              </div>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setSchoolModalOpen(false)}>
          <button>닫기</button>
        </form>
      </dialog>

      {/* ── 권한 신청 모달 ── */}
      <dialog className={`modal ${modalOpen ? 'modal-open' : ''} bg-slate-900/40 backdrop-blur-sm`} style={{position:'fixed'}}>
        <div className="modal-box bg-white max-w-md rounded-xl p-6 border border-slate-200 shadow-lg">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-slate-400"
            onClick={() => setModalOpen(false)}>
            <X size={16} />
          </button>

          <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
            <Shield className="text-primary" size={24} /> 관리자 권한 신청
          </h3>
          
          <div className="mb-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-slate-500">등록된 관리자 현황</span>
              <span className="text-sm font-bold text-primary bg-blue-50 px-3 py-1 rounded-full border border-blue-100">({currentAdminCount}/{maxAdmin}명)</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 max-h-40 overflow-y-auto space-y-2">
              {['김관리', '박담당', '이학급'].map((name, i) => (
                <div key={i} className="flex justify-between text-sm items-center py-2 border-b border-slate-200 last:border-0">
                  <span className="font-bold text-slate-700">{name} (초등학교)</span>
                  <span className="text-slate-500 font-medium">{i % 2 === 0 ? '국가기초학력 관리자' : '학업성취도 관리자'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {/* 기초학력 권한 블록 */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between border-l-[4px] border-l-blue-400 shadow-sm">
              <div>
                <div className="font-bold text-slate-800 text-base">국가기초학력 관리자</div>
                <div className="text-sm text-slate-500 mt-1 font-medium">기초학력진단평가 설정 및 배포 권한</div>
              </div>
              {hasBasicAdmin ? (
                <button className="btn btn-sm bg-red-50 hover:bg-red-100 text-red-500 border-0 font-bold gap-1.5" onClick={() => handleRevokeAdmin('basic')}>
                  <ShieldOff size={16} /> 권한 취소
                </button>
              ) : (
                <button className="btn btn-sm btn-primary font-bold px-4" onClick={handleApplyBasicAdmin}>
                  권한 신청
                </button>
              )}
            </div>
            
            {/* 학업성취도 권한 블록 */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between border-l-[4px] border-l-purple-400 shadow-sm">
              <div>
                <div className="font-bold text-slate-800 text-base">학업성취도평가 관리자</div>
                <div className="text-sm text-slate-500 mt-1 font-medium">맞춤형 자율평가 설정 및 배포 권한</div>
              </div>
              {hasAchievementAdmin ? (
                <button className="btn btn-sm bg-red-50 hover:bg-red-100 text-red-500 border-0 font-bold gap-1.5" onClick={() => handleRevokeAdmin('achievement')}>
                  <ShieldOff size={16} /> 권한 취소
                </button>
              ) : (
                <button className="btn btn-sm bg-purple-500 hover:bg-purple-600 text-white font-bold border-0 px-4" onClick={handleApplyAchievementAdmin}>
                  권한 신청
                </button>
              )}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <button>닫기</button>
        </form>
      </dialog>
    </div>
  );
};

export default UserInfo;
