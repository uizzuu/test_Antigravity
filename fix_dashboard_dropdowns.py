import re

with open('/Users/wuju/Desktop/test_Antigravity-main/src/pages/TeacherDashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add <option>전체</option> to grade/class select elements in the search screens
content = content.replace("<option disabled selected>학년 선택</option>", "<option disabled selected>학년 선택</option>\\n                      <option>전체</option>")
content = content.replace("<option disabled selected>반 선택</option>", "<option disabled selected>반 선택</option>\\n                      <option>전체</option>")

with open('/Users/wuju/Desktop/test_Antigravity-main/src/pages/TeacherDashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed TeacherDashboard dropdowns")
