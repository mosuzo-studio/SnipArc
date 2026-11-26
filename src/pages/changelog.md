---
title: 'Release information'
layout: '~/layouts/MarkdownLayout.astro'
---

Check the [download page](/download) for public release availability. Software screenshots and the historical entry below do not establish the latest publicly released version.

## v8.3.0

- Added in-app feedback and rating system with feature voting, first-time experience feedback, and contact tracking.
- Default filename now includes `SnipArc_` prefix (format: `SnipArc_YYYY-MM-DD_HH-mm-ss.png`) to identify source when using multiple tools.
- Quick save, auto-save, and pin backup now write atomically, preventing partial files when disk is full.
- Recording result windows and capture sessions now automatically avoid the app's own windows.
- Fixed UI automation timeout for large tables by switching to MSAA hit testing, reducing recognition time from 195ms+ to ~5ms.
- External windows appearing after screenshot are now correctly skipped and re-probed.
- Fixed lost mouse movement events causing recognition frames to stay at old positions.

## v8.2.0

- Pinned images now support AI cutout, AI eraser, and offline OCR with text selection and copying directly on the image.
- Customize mouse actions for pinned images. Toolbar tooltips and sticker shortcuts have been improved.
- Improved startup hotkey retries and added in-app feedback and redacted diagnostics export.

## v7.20.8

Historical entry. The website’s product screenshots now show SnipArc v7.20.9; this entry is not a claim that v7.20.8 is the latest software release.

The illustrated capture workflow covers selecting a region, adding annotations, and copying or saving the result. Available features and bundled resources depend on the software version.

## Need help?

[Choose a download](/download) or [read the usage help](/faq).
