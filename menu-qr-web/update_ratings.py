import re
import os

# Index.html
html_path = r'C:\Users\Samuel\Documents\Start-Up-Innovacion\menu-qr-web\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()
pattern = re.compile(r'<p class="stats">. ([\d\.]+) \((\d+)\) \| . ([\d,]+) Descargas</p>')
replacement = r'''<div class="rating-container">
                            <div class="stars-wrapper">
                                <span class="stars-visual">★★★★★</span>
                                <span class="rating-score">\1</span>
                                <span class="rating-count">(\2)</span>
                            </div>
                            <div class="downloads-count">⬇️ \3</div>
                        </div>'''
new_content = pattern.sub(replacement, content)
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Updated index.html')

# Creator.html
html_path_c = r'C:\Users\Samuel\Documents\Start-Up-Innovacion\menu-qr-web\creator.html'
with open(html_path_c, 'r', encoding='utf-8') as f:
    content_c = f.read()
pattern_c = re.compile(r'<p class="stats">. \$\{doc.rating\} \| . \$\{doc.descargas\}</p>')
replacement_c = r'''<div class="rating-container">
                                <div class="stars-wrapper">
                                    <span class="stars-visual">★★★★★</span>
                                    <span class="rating-score"></span>
                                    <span class="rating-count">()</span>
                                </div>
                                <div class="downloads-count">⬇️ </div>
                            </div>'''
new_content_c = pattern_c.sub(replacement_c, content_c)
with open(html_path_c, 'w', encoding='utf-8') as f:
    f.write(new_content_c)
print('Updated creator.html')

