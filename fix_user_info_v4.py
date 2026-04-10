import re

with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/UserInfo.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update State variables
old_state = """  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [editingChildId, setEditingChildId] = useState<number | null>(null);"""
new_state = """  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [editingSchoolTarget, setEditingSchoolTarget] = useState<number | 'self' | null>(null);
  const [teacherSchool, setTeacherSchool] = useState('01초등학교');"""
content = content.replace(old_state, new_state)

# 2. Update search handlers
old_handlers = """  const handleOpenSchoolSearch = (childId: number) => {
    setEditingChildId(childId);
    setSchoolSearchQuery('');
    setSchoolModalOpen(true);
  };
  
  const handleSelectSchool = (schoolName: string) => {
    if (editingChildId) {
      updateChild(editingChildId, 'school', schoolName);
    }
    setSchoolModalOpen(false);
  };"""
new_handlers = """  const handleOpenSchoolSearch = (target: number | 'self') => {
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
  };"""
content = content.replace(old_handlers, new_handlers)

# 3. Inject `custom_school` case into switch
custom_school_jsx = """      case 'custom_school':
        return (
          <div className="flex bg-white rounded-lg overflow-hidden border border-slate-300 w-full max-w-sm">
            <input type="text" placeholder="학교 검색" className="input input-sm border-0 bg-transparent flex-1 outline-none focus:outline-none cursor-pointer" value={teacherSchool} readOnly onClick={() => handleOpenSchoolSearch('self')} />
            <button className="btn btn-sm btn-ghost square px-2 bg-slate-100/50" onClick={() => handleOpenSchoolSearch('self')}><Search size={14} className="text-slate-500"/></button>
          </div>
        );
      case 'custom_classes':"""
content = content.replace("      case 'custom_classes':", custom_school_jsx)

# 4. Make Teacher School editable in the mock ITEMS array
old_items = "    { label: '학교', value: '01초등학교', editable: false },"
new_items = "    { id: 'custom_school', label: '학교', value: teacherSchool, editable: true, inputType: 'custom_school' },"
content = content.replace(old_items, new_items)

# Add fallback for display when not editing
display_fallback_old = """      if (item.id === 'classes') {"""
display_fallback_new = """      if (item.id === 'custom_school') {
        return <span className="text-slate-600 font-medium text-sm">{teacherSchool}</span>;
      }
      if (item.id === 'classes') {"""
content = content.replace(display_fallback_old, display_fallback_new)

with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/UserInfo.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed UserInfo school popup")
