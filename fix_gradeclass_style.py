with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/GradeClassManagement.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# rounded-2xl → rounded-lg
content = content.replace('rounded-2xl', 'rounded-lg')
# rounded-3xl → rounded-xl
content = content.replace('rounded-3xl', 'rounded-xl')
# shadow-xl → shadow-md
content = content.replace('shadow-xl', 'shadow-md')
# shadow-2xl → shadow-lg
content = content.replace('shadow-2xl', 'shadow-lg')
# shadow-sm → (remove from some)
# font-black → font-bold
content = content.replace('font-black', 'font-bold')
# text-xl font-bold → text-base font-bold (headings)
content = content.replace("text-xl font-bold text-slate-800", "text-base font-bold text-slate-800")
# text-2xl → text-lg (modal headings)
content = content.replace("text-2xl text-slate-800", "text-lg text-slate-800")
# h-11 → h-10 (form fields)
content = content.replace('h-11', 'h-10')
# p-8 → p-6 (modal padding)
content = content.replace('p-8 ', 'p-6 ')
# p-6 rounded → p-5 rounded (filter area)
content = content.replace('p-6 rounded', 'p-5 rounded')
# border-slate-300 → border-slate-200
content = content.replace('border-slate-300', 'border-slate-200')
# rounded-xl → rounded-lg (for dropdown inner items)
content = content.replace('rounded-xl shadow-md', 'rounded-lg shadow-md')
# size={28} → size={20}
content = content.replace('size={28}', 'size={20}')
# size={24} → size={18}
content = content.replace('size={24}', 'size={18}')

with open('/Users/wuju/Desktop/test_Antigravity-main/src/components/GradeClassManagement.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed GradeClassManagement styles")
