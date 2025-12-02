#!/usr/bin/env python3
"""
Convert markdown bible files to HTML for the website
"""

import re
import os

def convert_markdown_to_html(markdown_text):
    """Simple markdown to HTML converter"""
    html = markdown_text
    
    # Escape HTML entities
    # html = html.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    
    # Headers
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^#### (.+)$', r'<h4>\1</h4>', html, flags=re.MULTILINE)
    
    # Bold
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)
    
    # Italic
    html = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html)
    
    # Code blocks
    html = re.sub(r'`(.+?)`', r'<code>\1</code>', html)
    
    # Blockquotes - handle multi-line
    lines = html.split('\n')
    in_blockquote = False
    result_lines = []
    blockquote_content = []
    
    for line in lines:
        if line.startswith('> '):
            if not in_blockquote:
                in_blockquote = True
                blockquote_content = []
            blockquote_content.append(line[2:])
        else:
            if in_blockquote:
                result_lines.append('<blockquote>' + '<br>'.join(blockquote_content) + '</blockquote>')
                in_blockquote = False
                blockquote_content = []
            result_lines.append(line)
    
    if in_blockquote:
        result_lines.append('<blockquote>' + '<br>'.join(blockquote_content) + '</blockquote>')
    
    html = '\n'.join(result_lines)
    
    # Lists - handle unordered lists
    lines = html.split('\n')
    in_list = False
    result_lines = []
    
    for line in lines:
        if re.match(r'^[\-\*] ', line):
            if not in_list:
                result_lines.append('<ul>')
                in_list = True
            item = re.sub(r'^[\-\*] ', '', line)
            result_lines.append(f'<li>{item}</li>')
        else:
            if in_list:
                result_lines.append('</ul>')
                in_list = False
            result_lines.append(line)
    
    if in_list:
        result_lines.append('</ul>')
    
    html = '\n'.join(result_lines)
    
    # Paragraphs - wrap non-tag lines in <p>
    lines = html.split('\n')
    result_lines = []
    
    for line in lines:
        line = line.strip()
        if line and not line.startswith('<') and not line.startswith('---'):
            result_lines.append(f'<p>{line}</p>')
        elif line == '---':
            result_lines.append('<hr>')
        else:
            result_lines.append(line)
    
    html = '\n'.join(result_lines)
    
    # Clean up nested tags
    html = re.sub(r'<p>(<h[1-6]>)', r'\1', html)
    html = re.sub(r'(</h[1-6]>)</p>', r'\1', html)
    html = re.sub(r'<p>(<ul>)', r'\1', html)
    html = re.sub(r'(</ul>)</p>', r'\1', html)
    html = re.sub(r'<p>(<blockquote>)', r'\1', html)
    html = re.sub(r'(</blockquote>)</p>', r'\1', html)
    html = re.sub(r'<p>(<hr>)</p>', r'\1', html)
    html = re.sub(r'<p></p>', '', html)
    
    return html

def convert_file(input_path, output_path):
    """Convert a single markdown file to HTML"""
    print(f"Converting {input_path} -> {output_path}")
    
    with open(input_path, 'r', encoding='utf-8') as f:
        markdown = f.read()
    
    html = convert_markdown_to_html(markdown)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"  ✓ Converted successfully")

def main():
    """Convert all markdown bible files"""
    files = [
        ('00_INDEX.md', 'website/chapters/00_INDEX.html'),
        ('01_WORLD_HISTORY.md', 'website/chapters/01_WORLD_HISTORY.html'),
        ('02_THE_CITY.md', 'website/chapters/02_THE_CITY.html'),
        ('03_MECHANITES.md', 'website/chapters/03_MECHANITES.html'),
        ('04_GENOVORES.md', 'website/chapters/04_GENOVORES.html'),
        ('05_HYBRID_CULT.md', 'website/chapters/05_HYBRID_CULT.html'),
        ('06_TECHNOLOGY.md', 'website/chapters/06_TECHNOLOGY.html'),
        ('07_CHARACTERS.md', 'website/chapters/07_CHARACTERS.html'),
        ('08_THEMES.md', 'website/chapters/08_THEMES.html'),
        ('09_SEASON_PLOT_OUTLINE.md', 'website/chapters/09_SEASON_PLOT_OUTLINE.html'),
        ('10_VISUAL_STYLE_BIBLE.md', 'website/chapters/10_VISUAL_STYLE_BIBLE.html'),
    ]
    
    for input_file, output_file in files:
        if os.path.exists(input_file):
            convert_file(input_file, output_file)
        else:
            print(f"  ✗ File not found: {input_file}")
    
    print("\n✓ All files converted!")

if __name__ == '__main__':
    main()

