import re

with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/GradeClassManagement.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

helper_function = """
  // Helper function for dropdown format
  const formatSelectedGrades = (grades: string[]) => {
    if (grades.length === 0) return '전체 학년 검색';
    const nums = grades.map(g => parseInt(g)).sort((a, b) => a - b);
    if (nums.length <= 2) {
      return nums.join(',') + '학년';
    }
    const isContiguous = nums.every((num, i) => i === 0 || num === nums[i - 1] + 1);
    if (isContiguous) {
      return `${nums[0]}~${nums[nums.length - 1]}학년`;
    }
    return nums.join(',') + '학년';
  };

  // 상태 관리
"""
content = content.replace("  // 상태 관리\n", helper_function)

old_jsx = """                  <span className="text-sm text-slate-700 font-medium truncate">
                    {selectedGrades.length === 0 
                      ? '전체 학년 검색' 
                      : `${selectedGrades.length}개 학년 선택됨`}
                  </span>"""
new_jsx = """                  <span className="text-sm text-slate-700 font-medium truncate">
                    {formatSelectedGrades(selectedGrades)}
                  </span>"""

content = content.replace(old_jsx, new_jsx)

with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/GradeClassManagement.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed grade formatting")
