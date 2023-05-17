
# Metaflow API reference

These pages document the public API of Metaflow.

Notably, all APIs documented here are subject to Metaflow's **backward
compatibility promise**: You may use these APIs knowing that they are
very stable and highly unlikely to change across Metaflow versions. Rest
assured that all APIs featured anywhere in Metaflow docs are covered
here.

## Decorators

Use these to construct flows.

- [Flow decorators](/api/flow-decorators) - define top-level behavior.
- [Step decorators](/api/step-decorators) - define step-level behavior.

## Other APIs

Use these to construct flows, access data, and manipulate results.

- [Client API](/api/client) - accessing past results.
- [FlowSpec](/api/flowspec) - constructing flows.
- [Current](/api/current) - operating a run.
- [S3](/api/s3) - accessing data in S3 quickly.
- [Cards](/api/cards) - visualizing results.
- [ArgoEvent](/api/argoevent) - triggering runs via events.