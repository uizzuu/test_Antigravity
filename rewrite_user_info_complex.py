import re

content = """import React, { useState } from 'react';
import { User, Shield, X, Check, ShieldOff, Lock, Edit3, XCircle, Plus, Trash2 } from 'lucide-react';

const UserInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
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
  const SELECTION_TEACHER_TYPES = ['초등담임', '중등담임', '교과교사', '보조교사'];
  
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

  const renderEditableInput = (item: any) => {
    if (!isEditing || !item.editable) {
      if (item.id === 'classes') {
        return <span className="text-slate-600 font-medium text-sm">{classes.map(c => `${c.grade} ${c.classNum}`).join(', ') || '지정 안됨'}</span>;
      }
      if (item.id === 'children') {
        return <span className="text-slate-600 font-medium text-sm">{childrenList.length === 0 ? '등록된 자녀 없음' : childrenList.map(c => `${c.name}(${c.school} ${c.grade} ${c.classNum})`).join(', ')}</span>;
      }
      if (item.id === 'subjects') {
        return <span className="text-slate-600 font-medium text-sm">{isElemHomeroom ? '전과목 (초등담임)' : (subjects.join(', ') || '선택 안됨')}</span>;
      }
      if (item.id === 'teacherType') {
        return <span className="text-slate-600 font-medium text-sm">{teacherTypes.join(', ') || '선택 안됨'}</span>;
      }
      return <span className="text-slate-600 font-medium text-sm">{Array.isArray(item.value) ? item.value.join(', ') : item.value}</span>;
    }

    switch (item.inputType) {
      case 'date':
        return <input type="date" className="input input-sm input-bordered bg-white w-full max-w-[150px]" defaultValue={item.value.replace(/\\./g, '-')} />;
      case 'radio':
        return (
          <div className="flex gap-4">
            {item.options.map((opt: string) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={item.label} className="radio radio-primary radio-sm bg-white" defaultChecked={item.value === opt} />
                <span className="text-sm font-medium text-slate-700">{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'custom_classes':
        return (
          <div className="space-y-2 w-full">
            {classes.map((c) => (
              <div key={c.id} className="flex gap-2 items-center">
                <select className="select select-sm select-bordered w-28 bg-white" value={c.grade} onChange={(e) => updateClass(c.id, 'grade', e.target.value)}>
                  {[1,2,3,4,5,6].map(g => <option key={g} value={`${g}학년`}>{g}학년</option>)}
                </select>
                <select className="select select-sm select-bordered w-28 bg-white" value={c.classNum} onChange={(e) => updateClass(c.id, 'classNum', e.target.value)}>
                  {[1,2,3,4,5,6,7,8,9,10].map(cl => <option key={cl} value={`${cl}반`}>{cl}반</option>)}
                </select>
                <button className="btn btn-sm btn-ghost text-red-500 px-2" onClick={() => removeClass(c.id)}><Trash2 size={16}/></button>
              </div>
            ))}
            <button className="btn btn-sm btn-outline border-slate-300 gap-1 w-fit mt-1" onClick={addClass}><Plus size={14}/> 학년반 추가</button>
          </div>
        );
      case 'custom_children':
        return (
          <div className="space-y-2 w-full">
            {childrenList.map((c) => (
              <div key={c.id} className="flex flex-wrap gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                <input type="text" placeholder="이름" className="input input-sm input-bordered bg-white w-20" value={c.name} onChange={(e) => updateChild(c.id, 'name', e.target.value)} />
                <input type="text" placeholder="학교명" className="input input-sm input-bordered bg-white w-32" value={c.school} onChange={(e) => updateChild(c.id, 'school', e.target.value)} />
                <select className="select select-sm select-bordered w-24 bg-white" value={c.grade} onChange={(e) => updateChild(c.id, 'grade', e.target.value)}>
                  {[1,2,3,4,5,6].map(g => <option key={g} value={`${g}학년`}>{g}학년</option>)}
                </select>
                <select className="select select-sm select-bordered w-24 bg-white" value={c.classNum} onChange={(e) => updateChild(c.id, 'classNum', e.target.value)}>
                  {[1,2,3,4,5,6,7,8,9,10].map(cl => <option key={cl} value={`${cl}반`}>{cl}반</option>)}
                </select>
                <button className="btn btn-sm btn-ghost text-red-500 px-2" onClick={() => removeChild(c.id)}><Trash2 size={16}/></button>
              </div>
            ))}
            <button className="btn btn-sm btn-outline border-slate-300 gap-1 w-fit mt-1" onClick={addChild}><Plus size={14}/> 자녀 추가</button>
          </div>
        );
      case 'custom_teacherType':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {SELECTION_TEACHER_TYPES.map((opt: string) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm bg-white" checked={teacherTypes.includes(opt)} onChange={() => toggleTeacherType(opt)} />
                <span className="text-sm font-medium text-slate-700">{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'custom_subjects':
        if (isElemHomeroom) {
          return <span className="text-sm font-bold text-primary bg-blue-50 px-3 py-1.5 rounded-md">전과목 (초등담임 선택 시 자동 적용 부분)</span>;
        }
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {SELECTION_SUBJECTS.map((opt: string) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm bg-white" checked={subjects.includes(opt)} onChange={() => toggleSubject(opt)} />
                <span className="text-sm font-medium text-slate-700">{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'text':
      default:
        return <input type="text" className="input input-sm input-bordered w-full max-w-sm bg-white" defaultValue={typeof item.value === 'string' ? item.value : ''} />;
    }
  };

  const ITEMS = [
    { label: '이름', value: '01초교사(0610)', editable: true, inputType: 'text' },
    { label: '아이디', value: 'telm0160', editable: false },
    { label: '생년월일', value: '1980.01.01', editable: true, inputType: 'date' },
    { label: '성별', value: '남자', editable: true, inputType: 'radio', options: ['남자', '여자'] },
    { label: '학교', value: '01초등학교', editable: false },
    { id: 'classes', label: '학년, 반', value: [], editable: true, inputType: 'custom_classes' },
    { id: 'teacherType', label: '교사유형', value: [], editable: true, inputType: 'custom_teacherType' },
    { id: 'subjects', label: '교과목정보', value: [], editable: true, inputType: 'custom_subjects' },
    { id: 'children', label: '자녀 등록 현황', value: [], editable: true, inputType: 'custom_children' },
    { label: '학교담당자여부', value: [hasBasicAdmin && '국가기초학력 관리자', hasAchievementAdmin && '학업성취도평가 관리자'].filter(Boolean).join(', ') || '관리자 권한 없음(일반교사)', editable: false }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      {/* ── 상단 타이틀 구역 ── */}
      <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <User className="text-primary" /> 회원정보
          </h2>
          <p className="text-slate-500 text-sm mt-1">현재 로그인한 계정의 정보를 조회하고 수정할 수 있습니다.</p>
        </div>
      </div>

      {/* ── 기본 정보 (dl/dt/dd 구조 레이아웃) ── */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <dl className="grid grid-cols-1 border-b border-slate-100 last:border-0 divide-y divide-slate-100">
          {ITEMS.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row bg-white hover:bg-slate-50/50 transition-colors">
              <dt className="w-full sm:w-48 bg-slate-50 font-bold text-slate-700 p-4 text-sm flex items-center shrink-0 border-b sm:border-b-0 sm:border-r border-slate-200/60">
                {item.label}
              </dt>
              <dd className="p-4 flex-1 flex items-center min-h-[56px] w-full">
                {renderEditableInput(item)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── 권한 영역 ── */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Shield className="text-primary" size={18} /> 보유 및 신청 가능 권한
        </h4>
        <div className="flex flex-wrap gap-3">
          <button 
            type="button" 
            className="btn btn-outline border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:text-primary gap-2 h-11 px-5"
            onClick={() => setModalOpen(true)}
          >
            <Shield size={16} /> 
            관리자 권한 신청 / 관리
          </button>
        </div>
      </div>

      {/* ── 하단 액션 버튼 ── */}
      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
        {!isEditing ? (
          <>
            <button className="btn btn-outline border-slate-300 text-slate-600 bg-white hover:bg-slate-50">
              <Lock size={16} /> 비밀번호 변경
            </button>
            <button className="btn btn-primary font-bold px-8" onClick={() => setIsEditing(true)}>
              <Edit3 size={16} /> 회원정보 수정
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost text-slate-500" onClick={() => setIsEditing(false)}>
              <XCircle size={16} /> 취소
            </button>
            <button className="btn btn-primary font-bold px-8" onClick={handleSave}>
              <Check size={16} /> 수정 완료(저장)
            </button>
          </>
        )}
      </div>

      {/* ── 권한 신청 모달 ── */}
      <dialog className={`modal ${modalOpen ? 'modal-open' : ''} bg-slate-900/50 backdrop-blur-sm`}>
        <div className="modal-box bg-white max-w-lg rounded-3xl p-8 border border-slate-100 shadow-2xl">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-400"
            onClick={() => setModalOpen(false)}>
            <X size={18} />
          </button>

          <h3 className="font-black text-xl text-slate-800 mb-6 flex items-center gap-2">
            <Shield className="text-primary" size={24} /> 관리자 권한 신청
          </h3>
          
          <div className="mb-6 space-y-3">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-slate-600">등록된 관리자 현황</span>
              <span className="text-xs font-bold font-mono text-primary bg-blue-50 px-2 py-1 rounded-md">({currentAdminCount}/{maxAdmin}명)</span>
            </div>
            {/* 가짜 관리자 목록 */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-32 overflow-y-auto space-y-1.5">
              <div className="flex justify-between text-xs items-center p-1 border-b border-slate-50">
                <span className="font-bold text-slate-700">김관리 (초등학교)</span>
                <span className="text-slate-500">국가기초학력 관리자</span>
              </div>
              <div className="flex justify-between text-xs items-center p-1 border-b border-slate-50">
                <span className="font-bold text-slate-700">박담당 (초등학교)</span>
                <span className="text-slate-500">학업성취도 관리자</span>
              </div>
              <div className="flex justify-between text-xs items-center p-1 border-b border-slate-50">
                <span className="font-bold text-slate-700">이학급 (초등학교)</span>
                <span className="text-slate-500">국가기초학력 관리자</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* 기초학력 권한 블록 */}
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-blue-800 text-sm">국가기초학력 관리자</div>
                <div className="text-xs text-blue-600 mt-0.5">기초학력진단평가 설정 및 배포 권한</div>
              </div>
              {hasBasicAdmin ? (
                <button className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-600 border-0 font-bold" onClick={() => handleRevokeAdmin('basic')}>
                  <ShieldOff size={14} /> 권한 취소
                </button>
              ) : (
                <button className="btn btn-sm btn-primary font-bold" onClick={handleApplyBasicAdmin}>
                  권한 신청
                </button>
              )}
            </div>
            
            {/* 학업성취도 권한 블록 */}
            <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-purple-800 text-sm">학업성취도평가 관리자</div>
                <div className="text-xs text-purple-600 mt-0.5">맞춤형 자율평가 설정 및 배포 권한</div>
              </div>
              {hasAchievementAdmin ? (
                <button className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-600 border-0 font-bold" onClick={() => handleRevokeAdmin('achievement')}>
                  <ShieldOff size={14} /> 권한 취소
                </button>
              ) : (
                <button className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white font-bold border-0" onClick={handleApplyAchievementAdmin}>
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
"""

with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/UserInfo.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
