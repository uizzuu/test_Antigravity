with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/TeacherManagement.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# rounded-2xl → rounded-lg
content = content.replace('rounded-2xl', 'rounded-lg')
# rounded-3xl → rounded-xl
content = content.replace('rounded-3xl', 'rounded-xl')
# shadow-xl → shadow-md
content = content.replace('shadow-xl', 'shadow-md')
# shadow-2xl → shadow-lg
content = content.replace('shadow-2xl', 'shadow-lg')
# font-black → font-bold
content = content.replace('font-black', 'font-bold')
# text-xl font-bold → text-base font-bold
content = content.replace("text-xl font-bold", "text-base font-bold")
# text-2xl → text-lg
content = content.replace("text-2xl", "text-lg")
# p-8 → p-6
content = content.replace('p-8 ', 'p-6 ')
content = content.replace('p-8"', 'p-6"')
# border-slate-300 → border-slate-200
content = content.replace('border-slate-300', 'border-slate-200')
# size={28} → size={20}
content = content.replace('size={28}', 'size={20}')
# size={24} → size={18}
content = content.replace('size={24}', 'size={18}')

with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/TeacherManagement.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed TeacherManagement styles")
