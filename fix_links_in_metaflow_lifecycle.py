import re, sys

LINKS = {
    'link_notebook': '/metaflow/introduction',
    'link_workflow': '/metaflow/basics',
    'link_track': '/metaflow/basics#artifacts',
    'link_visualize': '/metaflow/visualizing-results',
    'link_scale': '/scaling/introduction',
    'link_data': '/scaling/data',
    'link_libraries': '/scaling/dependencies',
    'link_failures': '/scaling/failures',
    'link_schedule': '/production/introduction',
    'link_variants': '/production/coordinating-larger-metaflow-projects',
    'link_monitor': '#',
    'link_intro_prototype': '/metaflow/introduction',
    'link_intro_scale': '/scaling/introduction',
    'link_intro_production': '/production/introduction',
    'link_debug': '/metaflow/debugging'
}
RE = r'https://www\.google\.com/url\?q=http://%s.*?"'

orig = open(sys.argv[1]).read()

for key, target in LINKS.items():
    orig = re.sub(RE % key, target + '"', orig, flags=re.DOTALL)


print(orig)







