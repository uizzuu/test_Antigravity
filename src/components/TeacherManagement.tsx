import React, { useState, useMemo } from 'react';
import {
  Building2, Search, RefreshCw, ChevronDown, ChevronUp,
  Info, AlertCircle, Check, X,
  UserCheck, Pencil, Trash2, Bell, Shield,
  BookOpen, Settings, ShieldOff, Plus
} from 'lucide-react';

// ─── 타입 정의 ────────────────────────────────────────
type Role = 'ADMIN' | 'HOMEROOM' | 'GENERAL';
type TeacherType = 'HOMEROOM' | 'GENERAL';
type ApprovalStatus = 'CONFIRMED' | 'PENDING' | 'REJECTED';

interface SubjectInfo {
  allSubjects: boolean;   // 전과목
  korean: boolean;
  math: boolean;
  social: boolean;
  science: boolean;
  english: boolean;
  music: boolean;
  art: boolean;
  pe: boolean;
  otherSubjects: boolean; // 그 외 교과 (상담 등)
  other: string;          // 기타 과목명 자유 입력
}

interface Teacher {
  id: number;
  name: string;
  hasNeis: boolean;
  assignedClasses: string[];   // 담당 학급 (표시용 유지)
  teacherType: TeacherType;
  subjects: SubjectInfo;
  registeredDate: string;
  approvalStatus: ApprovalStatus;
  confirmedBy: string | null;
  confirmedDate: string | null;
}

interface EditModalState {
  open: boolean;
  teacher: Teacher | null;
  teacherType: TeacherType;
  subjects: SubjectInfo;
}

// ─── 과목 옵션 (전과목 + 개별 + 그 외 교과) ──────────────
type SubjectKey = keyof Omit<SubjectInfo, 'other'>;

const SUBJECT_OPTIONS: Array<{ key: SubjectKey; label: string; special?: 'all' | 'other' }> = [
  { key: 'allSubjects',   label: '전과목',    special: 'all' },
  { key: 'korean',        label: '국어' },
  { key: 'math',          label: '수학' },
  { key: 'social',        label: '사회' },
  { key: 'science',       label: '과학' },
  { key: 'english',       label: '영어' },
  { key: 'music',         label: '음악' },
  { key: 'art',           label: '미술' },
  { key: 'pe',            label: '체육' },
  { key: 'otherSubjects', label: '그 외 교과', special: 'other' },
];

// 필터용 (전과목/그 외 교과 제외한 개별 과목)
const FILTER_SUBJECTS = SUBJECT_OPTIONS.filter(s => !s.special);

const GRADES = ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년'];

const EMPTY_SUBJECTS: SubjectInfo = {
  allSubjects: false,
  korean: false, math: false, social: false, science: false,
  english: false, music: false, art: false, pe: false,
  otherSubjects: false, other: '',
};

const INITIAL_EDIT: EditModalState = {
  open: false, teacher: null,
  teacherType: 'GENERAL',
  subjects: { ...EMPTY_SUBJECTS },
};

// ─── 목업 데이터 ───────────────────────────────────────
const MOCK_DATA: Teacher[] = [
  {
    id: 1, name: '김담임', hasNeis: true,
    assignedClasses: ['3-9', '5-1'],
    teacherType: 'HOMEROOM',
    subjects: { ...EMPTY_SUBJECTS, allSubjects: true },
    registeredDate: '2026.02.26', approvalStatus: 'CONFIRMED',
    confirmedBy: '관리자(0610)', confirmedDate: '2026.04.06',
  },
  {
    id: 2, name: '이담임', hasNeis: true,
    assignedClasses: ['3-5'],
    teacherType: 'HOMEROOM',
    subjects: { ...EMPTY_SUBJECTS, allSubjects: true },
    registeredDate: '2026.02.26', approvalStatus: 'CONFIRMED',
    confirmedBy: '관리자(0610)', confirmedDate: '2026.03.27',
  },
  {
    id: 3, name: '박수학', hasNeis: true,
    assignedClasses: ['3-4', '3-5'],
    teacherType: 'GENERAL',
    subjects: { ...EMPTY_SUBJECTS, math: true },
    registeredDate: '2026.02.26', approvalStatus: 'CONFIRMED',
    confirmedBy: '관리자(0610)', confirmedDate: '2026.03.27',
  },
  {
    id: 4, name: '최영어', hasNeis: true,
    assignedClasses: ['2-5', '3-4', '3-3'],
    teacherType: 'GENERAL',
    subjects: { ...EMPTY_SUBJECTS, english: true, other: '영어회화' },
    registeredDate: '2026.02.26', approvalStatus: 'CONFIRMED',
    confirmedBy: '관리자(0610)', confirmedDate: '2026.03.26',
  },
  {
    id: 5, name: '정미술', hasNeis: true,
    assignedClasses: ['1-1', '1-2'],
    teacherType: 'GENERAL',
    subjects: { ...EMPTY_SUBJECTS, art: true },
    registeredDate: '2026.02.26', approvalStatus: 'CONFIRMED',
    confirmedBy: '관리자(0610)', confirmedDate: '2026.03.26',
  },
  {
    id: 6, name: '강상담', hasNeis: true,
    assignedClasses: [],
    teacherType: 'GENERAL',
    subjects: { ...EMPTY_SUBJECTS, otherSubjects: true, other: '진로상담' },
    registeredDate: '2026.03.02', approvalStatus: 'CONFIRMED',
    confirmedBy: '관리자(0610)', confirmedDate: '2026.03.10',
  },
  // 외부회원
  {
    id: 7, name: '홍길동(영어강사)', hasNeis: false,
    assignedClasses: [],
    teacherType: 'GENERAL',
    subjects: { ...EMPTY_SUBJECTS, english: true, other: '영어회화' },
    registeredDate: '2026.04.01', approvalStatus: 'PENDING',
    confirmedBy: null, confirmedDate: null,
  },
  {
    id: 8, name: '유수학(수학강사)', hasNeis: false,
    assignedClasses: [],
    teacherType: 'GENERAL',
    subjects: { ...EMPTY_SUBJECTS, math: true },
    registeredDate: '2026.04.03', approvalStatus: 'PENDING',
    confirmedBy: null, confirmedDate: null,
  },
  {
    id: 9, name: '임시강사(과학)', hasNeis: false,
    assignedClasses: ['3-1'],
    teacherType: 'GENERAL',
    subjects: { ...EMPTY_SUBJECTS, science: true },
    registeredDate: '2026.03.15', approvalStatus: 'CONFIRMED',
    confirmedBy: '관리자(0610)', confirmedDate: '2026.03.20',
  },
];

// ─── 메인 컴포넌트 ─────────────────────────────────────
const TeacherManagement: React.FC = () => {
  const [role, setRole] = useState<Role>('ADMIN');
  const [data, setData] = useState<Teacher[]>(MOCK_DATA);
  const [editModal, setEditModal] = useState<EditModalState>(INITIAL_EDIT);

  const [filterType, setFilterType] = useState<string>('all');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterName, setFilterName] = useState<string>('');
  const [showPendingSection, setShowPendingSection] = useState(true);

  const today = () =>
    new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replace(/\. /g, '.').replace(/\.$/, '');

  // ── 수정 모달 열기 ──
  const openEdit = (teacher: Teacher) => {
    setEditModal({
      open: true, teacher,
      teacherType: teacher.teacherType,
      subjects: { ...teacher.subjects },
    });
  };

  // ── 과목 토글 ──
  const toggleSubject = (key: SubjectKey) => {
    setEditModal(prev => ({
      ...prev,
      subjects: { ...prev.subjects, [key]: !prev.subjects[key] },
    }));
  };

  // ── 수정 저장 ──
  const handleEditSave = () => {
    if (!editModal.teacher) return;
    setData(prev => prev.map(t =>
      t.id === editModal.teacher!.id
        ? { ...t, teacherType: editModal.teacherType, subjects: editModal.subjects }
        : t
    ));
    setEditModal(INITIAL_EDIT);
  };

  // ── 승인/거절 ──
  const handleApprove = (id: number, status: ApprovalStatus) => {
    const label = status === 'CONFIRMED' ? '승인' : '거절';
    if (!confirm(`해당 교사를 ${label} 처리하시겠습니까?`)) return;
    setData(prev => prev.map(t =>
      t.id === id
        ? {
            ...t, approvalStatus: status,
            confirmedBy: status === 'CONFIRMED' ? '관리자(0610)' : null,
            confirmedDate: status === 'CONFIRMED' ? today() : null,
          }
        : t
    ));
  };

  // ── 승인 취소 ──
  const handleRevokeApproval = (id: number) => {
    if (!confirm('해당 교사의 승인을 취소하시겠습니까?\n취소 후 다시 승인하지 않으면 열람 권한이 사라집니다.')) return;
    setData(prev => prev.map(t =>
      t.id === id ? { ...t, approvalStatus: 'PENDING', confirmedBy: null, confirmedDate: null } : t
    ));
  };

  // ── 삭제 ──
  const handleDelete = (id: number) => {
    if (!confirm('해당 교사를 목록에서 삭제하시겠습니까?')) return;
    setData(prev => prev.filter(t => t.id !== id));
  };

  // ── 필터링 ──
  const filteredData = useMemo(() => {
    return data
      .filter(t => t.hasNeis || t.approvalStatus === 'CONFIRMED')
      .filter(t => {
        if (filterType === 'all') return true;
        if (filterType === 'homeroom') return t.teacherType === 'HOMEROOM';
        if (filterType === 'general') return t.teacherType === 'GENERAL' && t.hasNeis;
        if (filterType === 'external') return !t.hasNeis;
        return true;
      })
      .filter(t => {
        if (filterGrade === 'all') return true;
        const gradeNum = filterGrade.replace('학년', '');
        return t.assignedClasses.some(c => c.startsWith(gradeNum + '-'));
      })
      .filter(t => {
        if (filterSubject === 'all') return true;
        if (t.subjects.allSubjects) return true;
        return t.subjects[filterSubject as SubjectKey] === true;
      })
      .filter(t => {
        if (!filterName.trim()) return true;
        return t.name.includes(filterName.trim());
      });
  }, [data, filterType, filterGrade, filterSubject, filterName]);

  const pendingExternal = data.filter(t => !t.hasNeis && t.approvalStatus === 'PENDING');

  const handleReset = () => {
    setFilterType('all');
    setFilterGrade('all');
    setFilterSubject('all');
    setFilterName('');
  };

  // ── 과목 요약 표시 ──
  const SubjectSummary = ({ teacher }: { teacher: Teacher }) => {
    const s = teacher.subjects;
    if (s.allSubjects) {
      return (
        <span className="inline-flex items-center gap-1 badge badge-sm font-bold bg-blue-100 text-blue-700 border-0 px-2 py-2">
          <BookOpen size={11} /> 전과목
        </span>
      );
    }
    const active = FILTER_SUBJECTS.filter(opt => s[opt.key]);
    const showOther = s.otherSubjects;
    if (active.length === 0 && !showOther && !s.other) {
      return <span className="text-slate-300 text-xs">미설정</span>;
    }
    return (
      <div className="flex flex-wrap gap-1">
        {active.map(opt => (
          <span key={opt.key} className="badge badge-xs font-bold bg-slate-100 text-slate-600 border-0 px-1.5 py-1.5">
            {opt.label}
          </span>
        ))}
        {showOther && (
          <span className="badge badge-xs font-bold bg-purple-50 text-purple-600 border-0 px-1.5 py-1.5">
            그 외 교과
          </span>
        )}
        {s.other && (
          <span className="badge badge-xs font-bold bg-sky-50 text-sky-600 border-0 px-1.5 py-1.5">
            +{s.other}
          </span>
        )}
      </div>
    );
  };

  // ── 상태 뱃지 ──
  const ApprovalBadge = ({ status }: { status: ApprovalStatus }) => {
    const map: Record<ApprovalStatus, { cls: string; text: string }> = {
      CONFIRMED: { cls: 'bg-green-100 text-green-700', text: '승인완료' },
      PENDING:   { cls: 'bg-slate-100 text-slate-500', text: '승인대기' },
      REJECTED:  { cls: 'bg-red-100 text-red-600',    text: '거절됨'  },
    };
    const { cls, text } = map[status];
    return <span className={`badge badge-sm font-bold border-0 px-2 py-2 whitespace-nowrap ${cls}`}>{text}</span>;
  };

  // ════════════════════════════════════════
  // JSX
  // ════════════════════════════════════════
  return (
    <>
      <div className="space-y-5 animate-in slide-in-from-bottom-4 duration-500">

        {/* ── 권한 토글 ── */}
        <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl text-primary"><Settings size={22} /></div>
            <div>
              <h2 className="text-base font-bold text-slate-800">테스트용 권한 변경</h2>
              <p className="text-xs text-slate-400 mt-0.5">실제로는 로그인 계정 권한을 따릅니다.</p>
            </div>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg text-sm">
            {(['ADMIN', 'HOMEROOM', 'GENERAL'] as Role[]).map(r => (
              <button key={r}
                className={`px-4 py-1.5 rounded-md font-bold transition-all ${role === r ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setRole(r)}
              >
                {r === 'ADMIN' ? '국기초 담당자' : r === 'HOMEROOM' ? '담임교사' : '일반교사'}
              </button>
            ))}
          </div>
        </div>

        {/* ── 권한별 알림 ── */}
        {role === 'ADMIN' ? (
          <div className="alert bg-blue-50/50 border border-blue-100 text-blue-800 rounded-2xl py-3">
            <Info size={18} className="text-blue-500 shrink-0" />
            <span className="text-sm">관리자 모드입니다. 외부회원 <strong>승인/거절</strong>, <strong>승인취소</strong>, 교사 정보 <strong>수정</strong>이 가능합니다.</span>
          </div>
        ) : (
          <div className="alert bg-slate-50/50 border border-slate-200 text-slate-600 rounded-2xl py-3">
            <AlertCircle size={18} className="text-slate-400 shrink-0" />
            <span className="text-sm">현재 페이지는 <strong>조회 전용</strong>입니다. 수정 권한은 관리자(국기초 담당자)에게 있습니다.</span>
          </div>
        )}

        {/* ── 검색 필터 ── */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-100 bg-slate-50/50">
            <Building2 size={16} className="text-primary" />
            <span className="font-black text-primary text-sm">602초등학교</span>
            <span className="text-slate-300 mx-1">|</span>
            <span className="text-xs text-slate-400">교사관리</span>
          </div>
          <div className="flex flex-wrap items-end gap-3 px-6 py-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">교사구분</label>
              <select className="select select-bordered select-sm bg-white border-slate-300 text-slate-700 w-36 font-medium"
                value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="all">전체</option>
                <option value="homeroom">담임교사</option>
                <option value="general">일반교사</option>
                <option value="external">외부회원(승인)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">학년</label>
              <select className="select select-bordered select-sm bg-white border-slate-300 text-slate-700 w-28 font-medium"
                value={filterGrade} onChange={e => setFilterGrade(e.target.value)}>
                <option value="all">전체</option>
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">담당 과목</label>
              <select className="select select-bordered select-sm bg-white border-slate-300 text-slate-700 w-32 font-medium"
                value={filterSubject} onChange={e => setFilterSubject(e.target.value)}>
                <option value="all">전체 과목</option>
                {FILTER_SUBJECTS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">이름</label>
              <input type="text"
                className="input input-bordered input-sm bg-white border-slate-300 text-slate-700 w-36 font-medium placeholder:text-slate-300"
                placeholder="교사 이름" value={filterName} onChange={e => setFilterName(e.target.value)} />
            </div>
            <div className="flex gap-2 mt-auto">
              <button className="btn btn-sm btn-ghost gap-1.5 text-slate-500 border border-slate-200" onClick={handleReset}>
                <RefreshCw size={14} /> 초기화
              </button>
              <button className="btn btn-sm btn-primary gap-1.5 px-6 shadow-sm">
                <Search size={14} /> 검색
              </button>
            </div>
          </div>
        </div>

        {/* ── 메인 테이블 ── */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/50">
            <span className="text-sm font-bold text-slate-700">총 <span className="text-primary">{filteredData.length}</span>명</span>
            <span className="text-xs text-slate-400">※ 담임교사도 담당 과목을 직접 지정할 수 있습니다.</span>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              <thead>
                <tr className="bg-slate-700 text-white text-xs font-bold text-center">
                  <th className="py-3 w-12" rowSpan={2}>No.</th>
                  <th className="border-l border-slate-600 py-3" colSpan={2}>교사 정보</th>
                  <th className="border-l border-slate-600 py-3" colSpan={2}>교사 구분</th>
                  <th className="border-l border-slate-600 py-3">담당 과목</th>
                  <th className="border-l border-slate-600 py-3" colSpan={3}>확인</th>
                  <th className="border-l border-slate-600 py-3 w-28" rowSpan={2}>관리</th>
                </tr>
                <tr className="bg-slate-100 text-slate-600 text-xs font-bold text-center border-b border-slate-200">
                  <th className="border-l border-slate-200 py-2.5 px-3">이름</th>
                  <th className="border-l border-slate-200 py-2.5 px-3">담당학급<br /><span className="font-normal text-slate-400">(학년-반)</span></th>
                  <th className="border-l border-slate-200 py-2.5 px-3">담임</th>
                  <th className="border-l border-slate-200 py-2.5 px-3">일반교사</th>
                  <th className="border-l border-slate-200 py-2.5 px-3">과목 정보</th>
                  <th className="border-l border-slate-200 py-2.5 px-3">등록일자</th>
                  <th className="border-l border-slate-200 py-2.5 px-3">확인 상태</th>
                  <th className="border-l border-slate-200 py-2.5 px-3">확인자 / 일자</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredData.length === 0 ? (
                  <tr><td colSpan={10} className="text-center py-14 text-slate-400">조회된 교사 데이터가 없습니다.</td></tr>
                ) : (
                  filteredData.map((teacher, index) => (
                    <tr key={teacher.id} className="hover:bg-slate-50/60 transition-colors border-b border-slate-100 text-center">
                      <td className="text-slate-400 font-semibold">{index + 1}</td>
                      <td className="border-l border-slate-100 px-3 text-left">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <span className="font-bold text-slate-800">{teacher.name}</span>
                          {!teacher.hasNeis && (
                            <span className="badge badge-xs bg-amber-100 text-amber-600 border-0 font-bold px-1.5 py-1.5">외부</span>
                          )}
                        </div>
                      </td>
                      <td className="border-l border-slate-100 px-3">
                        {teacher.assignedClasses.length > 0 ? (
                          <div className="flex flex-wrap gap-1 justify-center">
                            {teacher.assignedClasses.map(cls => (
                              <span key={cls} className="badge badge-xs bg-blue-50 text-blue-600 border border-blue-100 font-bold px-1.5 py-1.5 whitespace-nowrap">{cls}</span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-300 text-xs">미배정</span>
                        )}
                      </td>
                      <td className="border-l border-slate-100">
                        {teacher.teacherType === 'HOMEROOM'
                          ? <span className="text-blue-500 text-base font-bold">○</span>
                          : <span className="text-slate-200">-</span>}
                      </td>
                      <td className="border-l border-slate-100">
                        {teacher.teacherType === 'GENERAL'
                          ? <span className="text-blue-500 text-base font-bold">○</span>
                          : <span className="text-slate-200">-</span>}
                      </td>
                      <td className="border-l border-slate-100 px-3">
                        <SubjectSummary teacher={teacher} />
                      </td>
                      <td className="border-l border-slate-100 font-mono text-xs text-slate-500 whitespace-nowrap">
                        {teacher.registeredDate}
                      </td>
                      <td className="border-l border-slate-100">
                        <ApprovalBadge status={teacher.approvalStatus} />
                      </td>
                      <td className="border-l border-slate-100 text-xs text-slate-500 px-2">
                        {teacher.confirmedBy ? (
                          <div className="whitespace-nowrap">
                            <div className="font-medium text-slate-700">{teacher.confirmedBy}</div>
                            <div className="text-slate-400 font-mono">{teacher.confirmedDate}</div>
                          </div>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="border-l border-slate-100">
                        <div className="flex items-center justify-center gap-1 flex-wrap px-1">
                          {!teacher.hasNeis && teacher.approvalStatus === 'CONFIRMED' && (
                            <button
                              className={`btn btn-xs gap-1 font-bold whitespace-nowrap ${
                                role === 'ADMIN'
                                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-700 border-0'
                                  : 'opacity-30 cursor-not-allowed bg-amber-100 text-amber-700 border-0'
                              }`}
                              disabled={role !== 'ADMIN'}
                              onClick={() => handleRevokeApproval(teacher.id)}
                              title="승인 취소"
                            >
                              <ShieldOff size={11} /> 승인취소
                            </button>
                          )}
                          <button
                            className={`btn btn-square btn-xs btn-ghost hover:bg-blue-50 hover:text-blue-600 ${role !== 'ADMIN' ? 'opacity-30 cursor-not-allowed' : 'text-slate-400'}`}
                            disabled={role !== 'ADMIN'}
                            onClick={() => role === 'ADMIN' && openEdit(teacher)}
                            title="정보 수정"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            className={`btn btn-square btn-xs btn-ghost hover:bg-red-50 hover:text-red-500 ${role !== 'ADMIN' ? 'opacity-30 cursor-not-allowed' : 'text-slate-400'}`}
                            disabled={role !== 'ADMIN'}
                            onClick={() => handleDelete(teacher.id)}
                            title="삭제"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 외부회원 승인 대기 섹션 ── */}
        {role === 'ADMIN' && pendingExternal.length > 0 && (
          <div className="bg-white border border-amber-200 rounded-2xl overflow-hidden shadow-sm">
            <button
              className="w-full flex items-center justify-between px-5 py-4 bg-amber-50/60 border-b border-amber-100 hover:bg-amber-50 transition-colors"
              onClick={() => setShowPendingSection(prev => !prev)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Shield size={20} className="text-amber-500" />
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {pendingExternal.length}
                  </span>
                </div>
                <div className="text-left">
                  <span className="font-bold text-amber-800 text-sm">외부회원 열람 신청 — 승인 대기</span>
                  <span className="text-xs text-amber-600 ml-2">나이스 계정이 없는 외부 선생님의 신청입니다.</span>
                </div>
              </div>
              <span className="text-amber-400">
                {showPendingSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
            {showPendingSection && (
              <div className="p-5 space-y-3">
                <div className="bg-amber-50/80 border border-amber-100 rounded-xl p-3 flex gap-2 text-xs text-amber-700 font-medium">
                  <Bell size={14} className="shrink-0 mt-0.5" />
                  <span>승인 시 학생관리 열람이 가능합니다. 권한 회수는 메인 목록의 <strong>승인취소</strong> 버튼을 사용하세요.</span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="table table-sm w-full text-xs">
                    <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3">이름</th>
                        <th>담당 과목</th>
                        <th>신청일</th>
                        <th>상태</th>
                        <th className="text-center">처리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingExternal.map(teacher => (
                        <tr key={teacher.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                                <UserCheck size={13} className="text-amber-600" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-700">{teacher.name}</div>
                                <div className="text-slate-400">외부회원 · 나이스 미연동</div>
                              </div>
                            </div>
                          </td>
                          <td><SubjectSummary teacher={teacher} /></td>
                          <td className="font-mono text-slate-500 whitespace-nowrap">{teacher.registeredDate}</td>
                          <td><ApprovalBadge status={teacher.approvalStatus} /></td>
                          <td>
                            <div className="flex items-center justify-center gap-2">
                              <button className="btn btn-xs bg-green-500 hover:bg-green-600 text-white border-0 gap-1 font-bold"
                                onClick={() => handleApprove(teacher.id, 'CONFIRMED')}>
                                <Check size={11} /> 승인
                              </button>
                              <button className="btn btn-xs bg-red-100 hover:bg-red-200 text-red-600 border-0 gap-1 font-bold"
                                onClick={() => handleApprove(teacher.id, 'REJECTED')}>
                                <X size={11} /> 거절
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ════════════════════════════════════════
          수정 모달
      ════════════════════════════════════════ */}
      <dialog className={`modal ${editModal.open ? 'modal-open' : ''} bg-slate-900/50 backdrop-blur-sm`}>
        <div className="modal-box bg-white max-w-lg rounded-3xl p-8 border border-slate-100 shadow-2xl">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-400"
            onClick={() => setEditModal(INITIAL_EDIT)}>
            <X size={18} />
          </button>

          <h3 className="font-black text-xl text-slate-800 mb-1 flex items-center gap-2">
            <Pencil className="text-primary" size={20} /> 교사 정보 수정
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            <span className="font-bold text-slate-700">{editModal.teacher?.name}</span> 선생님의 정보를 수정합니다.
          </p>

          <div className="space-y-6">

            {/* ① 교사 구분 */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">교사 구분</label>
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                <button
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    editModal.teacherType === 'HOMEROOM' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
                  onClick={() => setEditModal(prev => ({ ...prev, teacherType: 'HOMEROOM' }))}
                >
                  담임교사
                </button>
                <button
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    editModal.teacherType === 'GENERAL' ? 'bg-white shadow text-slate-700' : 'text-slate-500 hover:text-slate-700'
                  }`}
                  onClick={() => setEditModal(prev => ({ ...prev, teacherType: 'GENERAL' }))}
                >
                  일반교사
                </button>
              </div>
            </div>

            {/* ② 담당 과목 — 담임/일반 모두 동일한 UI */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">담당 과목</label>
              <p className="text-xs text-slate-400 mb-3">
                담임교사도 담당 과목을 직접 선택할 수 있습니다. 초등 담임은 <strong className="text-blue-600">전과목</strong>을 선택하세요.
              </p>

              {/* 과목 버튼 그리드 */}
              <div className="grid grid-cols-4 gap-2">
                {SUBJECT_OPTIONS.map(opt => {
                  const checked = editModal.subjects[opt.key];
                  const isSpecialAll   = opt.special === 'all';
                  const isSpecialOther = opt.special === 'other';
                  const btnBase = `flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all`;
                  const btnChecked = isSpecialAll
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-200 col-span-2'
                    : isSpecialOther
                    ? 'bg-purple-500 border-purple-500 text-white shadow-sm shadow-purple-200 col-span-2'
                    : 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-200';
                  const btnUnchecked = isSpecialAll
                    ? 'bg-white border-blue-200 text-blue-500 hover:border-blue-400 hover:bg-blue-50 col-span-2'
                    : isSpecialOther
                    ? 'bg-white border-purple-200 text-purple-500 hover:border-purple-400 hover:bg-purple-50 col-span-2'
                    : 'bg-white border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500';
                  return (
                    <button
                      key={opt.key}
                      onClick={() => toggleSubject(opt.key)}
                      className={`${btnBase} ${checked ? btnChecked : btnUnchecked}`}
                    >
                      {checked ? <Check size={13} /> : <Plus size={13} />}
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* 기타 과목 자유 입력 */}
              <div className="flex items-center gap-2 mt-3">
                <label className="text-xs font-bold text-slate-500 shrink-0">기타 입력:</label>
                <input
                  type="text"
                  className="input input-bordered input-sm bg-white border-slate-300 text-slate-700 w-full font-medium placeholder:text-slate-300"
                  placeholder="예: 진로상담, 영어회화, 스포츠클럽 등"
                  value={editModal.subjects.other}
                  onChange={e => setEditModal(prev => ({
                    ...prev,
                    subjects: { ...prev.subjects, other: e.target.value },
                  }))}
                />
              </div>
            </div>

          </div>

          {/* 저장/취소 */}
          <div className="modal-action mt-8 flex justify-end gap-2">
            <button className="btn btn-ghost text-slate-500" onClick={() => setEditModal(INITIAL_EDIT)}>
              취소
            </button>
            <button className="btn btn-primary px-8 gap-2 font-bold" onClick={handleEditSave}>
              <Check size={15} /> 저장
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setEditModal(INITIAL_EDIT)}>
          <button>닫기</button>
        </form>
      </dialog>

    </>
  );
};

export default TeacherManagement;
