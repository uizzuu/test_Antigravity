import re

with open('/Users/wuju/Desktop/test_Antigravity-main/src/pages/TeacherDashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix literal "\n" issue if present, and change dropdowns to use "전체"
# The <select> elements look like: 
# <select className="select select-bordered bg-white w-full max-w-xs border-slate-300 text-slate-700">
#   <option disabled selected>학년 선택</option>\n                      <option>전체</option>
#   <option>1학년</option> ...

# Grade
content = re.sub(
    r'<select([^>]+)>\s*<option disabled selected>학년 선택</option>(?:\\n\s*|\n\s*)<option>전체</option>',
    r'<select\1 defaultValue="전체">\n                      <option value="전체">전체 학년</option>',
    content
)

# Class
content = re.sub(
    r'<select([^>]+)>\s*<option disabled selected>반 선택</option>(?:\\n\s*|\n\s*)<option>전체</option>',
    r'<select\1 defaultValue="전체">\n                      <option value="전체">전체 반</option>',
    content
)

with open('/Users/wuju/Desktop/test_Antigravity-main/src/pages/TeacherDashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed dropdowns defaults")
