import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Move <meta charset="UTF-8"> to first element of <head> if not already
    content = re.sub(r'<meta\s+charset=["' + "'" + r']UTF-8["' + "'" + r']\s*/?>\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<head>', '<head>\n    <meta charset="UTF-8">', content, count=1, flags=re.IGNORECASE)

    # Wrap UniNotes if not wrapped
    content = re.sub(r'(?<!<span class="text-gradient">)UniNotes(?!</span>)', '<span class="text-gradient">UniNotes</span>', content)

    # Avoid wrapping UniNotes in title tag if it got wrapped
    content = re.sub(r'<title><span class="text-gradient">UniNotes</span>', '<title>UniNotes', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('menu-qr-web/index.html')
fix_file('menu-qr-web/creator.html')
print('Done!')
