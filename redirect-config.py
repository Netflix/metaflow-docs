import json

redirects = []
for line in open('redirect-urls.csv'):
    to_path, from_path = line.strip().split()
    redirects.append({'to': to_path, 'from': from_path})

print('REDIRECTS = %s' % json.dumps(redirects))
