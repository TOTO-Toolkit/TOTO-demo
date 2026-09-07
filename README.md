# TOTO browser demo

This is the real browser proof for TOTO. It is not a synthetic canvas preview.
The user selects a local video, the page initializes MoveNet MultiPose Lightning
through TensorFlow.js, runs inference over the video frames and renders detected
people/keypoints. The video and poses stay in temporary tab memory; nothing is
uploaded to GitHub or stored by the demo. The user can optionally download a
CSV locally.

The development source for this page remains in the private repository
`TOTO-Toolkit/TOTO-demo`. The public Pages deployment is a separate,
deployment-only copy in `TOTO-Toolkit/TOTO-public`; it contains only the static
browser demo and the small model package needed by the browser. Do not publish
the desktop installer or private development history from this directory.
The checked-in MoveNet package was sourced from the official TensorFlow Hub URL recorded in
`models/movenet-multipose-lightning-1/ATTRIBUTION.md`; the video is kept in the
browser and is never uploaded to a TOTO server. CDN library versions are pinned
in `index.html` so a clean browser can reproduce the same demo without asking
TF Hub for the model at runtime.

## Private installer boundary

The public page intentionally does not expose a `.exe`, release asset or
download URL. Both installer buttons open a prepared email to
`fabian.nana@pucp.edu.pe` so the private installer can be delivered manually.
Keep this boundary when updating the page: the demo may be public, but the
installer and the full source remain private.

For local QA, serve this directory over HTTP (for example with any static file
server) and open `index.html` through `http://localhost`. Opening the file
directly may prevent the browser from loading the model because of origin and
WebGL restrictions.
