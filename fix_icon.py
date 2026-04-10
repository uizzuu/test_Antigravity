import re
import os

files_to_fix = [
    '/Users/wuju/Desktop/test_Antigravity-main/src/components/TeacherManagement.tsx',
    '/Users/wuju/Desktop/test_Antigravity-main/src/pages/TeacherDashboard.tsx',
    '/Users/wuju/Desktop/test_Antigravity-main/src/components/UserInfo.tsx'
]

for filepath in files_to_fix:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace UserCircle with User
        new_content = content.replace("UserCircle", "User")
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed {filepath}")

print("Done")
