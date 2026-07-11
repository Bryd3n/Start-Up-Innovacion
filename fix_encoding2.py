import os
import re

def fix_file(filepath):
    with open(filepath, 'rb') as f:
        content = f.read()
    
    content_str = content.decode('utf-8')
    
    # 1. Strip existing charset if any
    content_str = re.sub(r'<meta\s+charset=["' + "'" + r']UTF-8["' + "'" + r']\s*/?>\s*', '', content_str, flags=re.IGNORECASE)
    
    # 2. Add <meta charset="UTF-8"> as first element of <head>
    content_str = re.sub(r'<head>', '<head>\n    <meta charset="UTF-8">', content_str, count=1, flags=re.IGNORECASE)
    
    # 3. Replace UniNotes
    content_str = re.sub(r'(?<!<span class="text-gradient">)UniNotes(?!</span>)', '<span class="text-gradient">UniNotes</span>', content_str)
    
    # 4. Fix the title tag which should not have spans
    content_str = re.sub(r'<title><span class="text-gradient">UniNotes</span>', '<title>UniNotes', content_str)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content_str)

fix_file('menu-qr-web/index.html')
fix_file('menu-qr-web/creator.html')
