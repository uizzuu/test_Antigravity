import re

with open('/Users/wuju/Desktop/test_Antigravity-main/src/pages/TeacherDashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "import TeacherManagement from '../components/TeacherManagement';",
    "import TeacherManagement from '../components/TeacherManagement';\nimport UserInfo from '../components/UserInfo';"
)

content = content.replace(
    "ChevronRightCircle, Home\\n} from 'lucide-react';",
    "ChevronRightCircle, Home, UserCircle\\n} from 'lucide-react';"
)

content = content.replace(
    """  {
    title: '자료실',
    icon: <FolderOpen size={20} />,
    children: [] // 단일 메뉴
  }
];""",
    """  {
    title: '자료실',
    icon: <FolderOpen size={20} />,
    children: [] // 단일 메뉴
  },
  {
    title: '회원정보',
    icon: <UserCircle size={20} />,
    children: [] // 단일 메뉴
  }
];"""
)

content = content.replace(
    """          ) : (
            /* 일반적인 플레이스홀더 화면 */""",
    """          ) : activeMenu.parent === '회원정보' ? (
            <UserInfo />
          ) : (
            /* 일반적인 플레이스홀더 화면 */"""
)

with open('/Users/wuju/Desktop/test_Antigravity-main/src/pages/TeacherDashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated TeacherDashboard.tsx")
