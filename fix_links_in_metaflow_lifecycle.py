import re, sys

LINKS = {
    'link_notebook': '/metaflow/intro',
    'link_workflow': '/metaflow/basics',
    'link_track': '/metaflow/artifacts',
    'link_visualize': '/metaflow/visualizing-results',
    'link_scale': '/metaflow/scaling-out-and-up',
    'link_data': '/metaflow/data',
    'link_libraries': '/metaflow/dependencies',
    'link_failures': '/metaflow/failures',
    'link_schedule': '/going-to-production-with-metaflow/scheduling-metaflow-flows',
    'link_variants': '/going-to-production-with-metaflow/coordinating-larger-metaflow-projects',
    'link_monitor': '/going-to-production-with-metaflow/mfgui',
    'link_intro_prototype': '/metaflow/intro',
    'link_intro_scale': '/metaflow/scaling-out-and-up',
    'link_intro_production': '/going-to-production-with-metaflow/scheduling-metaflow-flows',
    'link_debug': '/metaflow/debugging'
}
RE = r'https://www\.google\.com/url\?q=http://%s.*?"'

orig = open(sys.argv[1]).read()

for key, target in LINKS.items():
    orig = re.sub(RE % key, target + '"', orig, flags=re.DOTALL)


print(orig)







