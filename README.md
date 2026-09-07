# TOTO browser demo (public surface)

This is the real browser proof for TOTO. It is not a synthetic canvas preview.
The user selects a local video, the page initializes MoveNet MultiPose Lightning
through TensorFlow.js, runs inference over the video frames and renders detected
people/keypoints. The video and poses stay in temporary tab memory; nothing is
uploaded to GitHub or stored by the demo. The user can optionally download a
CSV locally.

This repository is the intentionally isolated public surface for the browser
demo. It contains only static browser files and the web model needed by the
demo; the full scientific source, desktop application and installer remain in
private repositories. A separate private staging copy in `TOTO-public` holds
the installer distribution and must never be published from this directory.
The checked-in MoveNet package was sourced from the official TensorFlow Hub URL recorded in
`models/movenet-multipose-lightning-1/ATTRIBUTION.md`; the video is kept in the
browser and is never uploaded to a TOTO server. CDN library versions are pinned
in `index.html` so a clean browser can reproduce the same demo without asking
TF Hub for the model at runtime.

## Public/private boundary

The public page is only the browser demo at
`https://toto-toolkit.github.io/TOTO-demo/`. It has no public `.exe`, release
asset or full-code link. Its installer buttons open a prepared email to
`fabian.nana@pucp.edu.pe`; the installer itself is delivered privately.
Never copy the complete installer, desktop application or private source into
this public demo repository.

For local QA, serve this directory over HTTP (for example with any static file
server) and open `index.html` through `http://localhost`. Opening the file
directly may prevent the browser from loading the model because of origin and
WebGL restrictions.
