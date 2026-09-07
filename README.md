# TOTO browser demo

This is the real browser proof for TOTO. It is not a synthetic canvas preview.
The user selects a local video, the page initializes MoveNet MultiPose Lightning
through TensorFlow.js, runs inference over the video frames and renders detected
people/keypoints. The video and poses stay in temporary tab memory; nothing is
uploaded to GitHub or stored by the demo. The user can optionally download a
CSV locally.

The page source, deployment and web model assets live in
`TOTO-Toolkit/TOTO-demo` on GitHub. The checked-in MoveNet package was sourced
from the official TensorFlow Hub URL recorded in
`models/movenet-multipose-lightning-1/ATTRIBUTION.md`; the video is kept in the
browser and is never uploaded to a TOTO server. CDN library versions are pinned
in `index.html` so a clean browser can reproduce the same demo without asking
TF Hub for the model at runtime.

For local QA, serve this directory over HTTP (for example with any static file
server) and open `index.html` through `http://localhost`. Opening the file
directly may prevent the browser from loading the model because of origin and
WebGL restrictions.
