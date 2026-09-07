# TOTO browser demo

This is the real browser proof for TOTO. It is not a synthetic canvas preview.
The user selects a local video, the page initializes MoveNet MultiPose Lightning
through TensorFlow.js, runs inference over the video frames and renders detected
people/keypoints. The video and poses stay in temporary tab memory; nothing is
uploaded to GitHub or stored by the demo. The user can optionally download a
CSV locally.

The development source for this page remains in the private repository
`TOTO-Toolkit/TOTO-demo`. A separate private staging copy exists in
`TOTO-Toolkit/TOTO-public`; it is not a public deployment. GitHub Pages is
disabled and no release assets or installer are published. Do not publish the
desktop installer, the browser demo or private development history from this
directory without explicit authorization.
The checked-in MoveNet package was sourced from the official TensorFlow Hub URL recorded in
`models/movenet-multipose-lightning-1/ATTRIBUTION.md`; the video is kept in the
browser and is never uploaded to a TOTO server. CDN library versions are pinned
in `index.html` so a clean browser can reproduce the same demo without asking
TF Hub for the model at runtime.

## Publication gate: closed

There is currently no public page and no public installer flow. The prepared
mailto behavior in the private source is only a staged implementation for a
future, separately authorized release; it must not be described as live or
re-enabled by a parallel model.

For local QA, serve this directory over HTTP (for example with any static file
server) and open `index.html` through `http://localhost`. Opening the file
directly may prevent the browser from loading the model because of origin and
WebGL restrictions.
