import sys, base64, os
path = sys.argv[1]
b64 = sys.argv[2]
os.makedirs(os.path.dirname(path) if os.path.dirname(path) else '.', exist_ok=True)
with open(path, 'wb') as f:
    f.write(base64.b64decode(b64))
print(f'Wrote {path}')
