import os

def replace_in_files(root_dir):
    target = 'var(--secondary-color)'
    replacement = 'var(--white-color)'
    
    # Also handle the case where it might be `secondary-color` in a different context if needed, 
    # but let's stick to the variable usage first as it's safer.
    
    count = 0
    files_changed = 0

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.css') or file.endswith('.js') or file.endswith('.jsx') or file.endswith('.mjs'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if target in content:
                        new_content = content.replace(target, replacement)
                        
                        # Also specific user request: "remove this background color form anywhere its using use this background use this background-color: var(--white-color);"
                        # The simple replace covers `background-color: var(--secondary-color)` -> `background-color: var(--white-color)`
                        # It also covers `background: linear-gradient(..., var(--secondary-color) ...)` -> `... var(--white-color) ...`
                        
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {path}")
                        files_changed += 1
                        count += content.count(target)
                except Exception as e:
                    print(f"Error processing {path}: {e}")

    print(f"Total occurrences replaced: {count}")
    print(f"Total files changed: {files_changed}")

if __name__ == "__main__":
    replace_in_files(r'c:\Users\ALIENWARE\Desktop\techflux\Photographer\PhotoGrapher_User_Website\src')
