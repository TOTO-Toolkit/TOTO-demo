"use strict";

const RELEASE_INSTALLER = "https://github.com/TOTO-Toolkit/TOTO-public/releases/download/v0.2.0-public-beta.7/TOTO-Setup-Web.exe";
const MODEL_URL = "./models/movenet-multipose-lightning-1/model.json";
const MODEL_NAME = "MoveNet MultiPose Lightning";
const KEYPOINT_NAMES = [
  "nose", "left_eye", "right_eye", "left_ear", "right_ear",
  "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
  "left_wrist", "right_wrist", "left_hip", "right_hip", "left_knee",
  "right_knee", "left_ankle", "right_ankle",
];
const SKELETON_EDGES = [
  [5, 6], [5, 7], [7, 9], [6, 8], [8, 10], [5, 11], [6, 12],
  [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], [0, 1],
  [0, 2], [1, 3], [2, 4],
];
const PALETTE = ["#24d4ca", "#ffb454", "#a88bff", "#ff7292", "#76b9ff", "#9ee36d"];

const copy = {
  es: {
    nav_demo: "Demo real", nav_download: "Descargar", nav_releases: "Versiones", nav_code: "Código GitHub",
    live_model: "Modelo real", hero_title: "Prueba el tracking real antes de instalar.",
    hero_copy: "Selecciona un vídeo desde tu celular o computadora. MoveNet analiza las personas en tu navegador, dibuja sus puntos y te deja descargar los resultados. El vídeo no se sube a un servidor de TOTO.",
    try_demo: "Probar con mi vídeo", download_windows: "Descargar instalador Windows", cloud_title: "Código y distribución en GitHub",
    cloud_copy: "La demo, el instalador y la trazabilidad del proyecto viven en GitHub. El modelo se carga desde la nube al pulsar “Cargar modelo”.",
    source_link: "Ver fuente", model_link: "Ver modelo", interactive_label: "PRUEBA INTERACTIVA",
    demo_title: "Sube un vídeo y ejecuta pose tracking", demo_copy: "Esta vez no hay una figura dibujada de mentira: el detector recibe los frames de tu vídeo y devuelve poses reales.",
    model_not_loaded: "Modelo no cargado", choose_video: "Elegir vídeo", load_model: "Cargar modelo", process_video: "Procesar vídeo",
    stop: "Detener", empty_title: "Selecciona un vídeo para comenzar", empty_copy: "Formatos habituales del navegador: MP4, WebM o MOV.",
    ready: "Listo para cargar un vídeo", runtime: "Runtime", model_hint: "Carga el modelo para activar la inferencia.",
    visuals: "Capas visuales", skeleton: "Esqueleto", boxes: "Cajas", keypoints: "Puntos", confidence: "Confianza mínima",
    metric_frames: "Frames", metric_people: "Personas", metric_fps: "FPS modelo", metric_backend: "Backend",
    analysis_hint: "Carga el modelo y procesa un vídeo para obtener resultados reales.", download_results: "Descargar resultados JSON",
    privacy_note: "Privacidad: el archivo se lee en el navegador mediante una URL local. TOTO-demo no recibe el vídeo.",
    proof_one_title: "Modelo cargado", proof_one_copy: "MoveNet MultiPose Lightning se inicializa de verdad con TensorFlow.js y devuelve hasta seis personas.",
    proof_two_title: "Vídeo del usuario", proof_two_copy: "Puedes usar un archivo del teléfono o de la computadora; el procesamiento ocurre en la pestaña.",
    proof_three_title: "Salida descargable", proof_three_copy: "Cada frame procesado se conserva en JSON con tiempo, personas, puntos y confianza.",
    distribution: "DISTRIBUCIÓN PÚBLICA", download_title: "Instala el flujo completo de escritorio",
    download_copy: "El instalador web es un bootstrap separado del programa. Descarga los componentes desde la distribución de GitHub, verifica SHA-256, conserva las descargas reanudables y crea el acceso directo de TOTO.",
    poses: "poses", loading: "Cargando el modelo…", model_ready: "Modelo listo", processing: "Procesando vídeo…", stopped: "Procesamiento detenido",
    finished: "Procesamiento terminado", no_video: "Selecciona primero un vídeo", error: "No se pudo completar la operación",
  },
  en: {
    nav_demo: "Live demo", nav_download: "Download", nav_releases: "Releases", nav_code: "GitHub code",
    live_model: "Real model", hero_title: "Try real tracking before installing.",
    hero_copy: "Choose a video from your phone or computer. MoveNet detects people in your browser, draws their keypoints and lets you download the results. The video is not uploaded to a TOTO server.",
    try_demo: "Try with my video", download_windows: "Download Windows installer", cloud_title: "Code and distribution on GitHub",
    cloud_copy: "The demo, installer and project traceability live on GitHub. The model is loaded from the cloud when you click “Load model”.",
    source_link: "View source", model_link: "View model", interactive_label: "INTERACTIVE TEST",
    demo_title: "Upload a video and run pose tracking", demo_copy: "This is not a drawn figure: the detector receives frames from your video and returns real poses.",
    model_not_loaded: "Model not loaded", choose_video: "Choose video", load_model: "Load model", process_video: "Process video",
    stop: "Stop", empty_title: "Choose a video to begin", empty_copy: "Common browser formats: MP4, WebM or MOV.",
    ready: "Ready for a video", runtime: "Runtime", model_hint: "Load the model to enable inference.",
    visuals: "Visual layers", skeleton: "Skeleton", boxes: "Boxes", keypoints: "Keypoints", confidence: "Minimum confidence",
    metric_frames: "Frames", metric_people: "People", metric_fps: "Model FPS", metric_backend: "Backend",
    analysis_hint: "Load the model and process a video to get real results.", download_results: "Download JSON results",
    privacy_note: "Privacy: the file is read in your browser through a local object URL. TOTO-demo never receives the video.",
    proof_one_title: "Loaded model", proof_one_copy: "MoveNet MultiPose Lightning is initialized through TensorFlow.js and returns up to six people.",
    proof_two_title: "User video", proof_two_copy: "Use a file from your phone or computer; processing happens in this tab.",
    proof_three_title: "Downloadable output", proof_three_copy: "Every processed frame is kept in JSON with time, people, keypoints and confidence.",
    distribution: "PUBLIC DISTRIBUTION", download_title: "Install the complete desktop workflow",
    download_copy: "The web installer is a bootstrap separate from the application. It downloads GitHub distribution components, verifies SHA-256, resumes interrupted downloads and creates the TOTO shortcut.",
    poses: "poses", loading: "Loading model…", model_ready: "Model ready", processing: "Processing video…", stopped: "Processing stopped",
    finished: "Processing finished", no_video: "Choose a video first", error: "The operation could not be completed",
  },
};

const $ = (id) => document.getElementById(id);
let locale = localStorage.getItem("toto-demo-language") || "es";
let detector = null;
let videoUrl = null;
let processing = false;
let runToken = 0;
let frameIndex = 0;
let results = [];
let lastPoses = [];
let resultUrl = null;

function t(key) {
  return (copy[locale] || copy.es)[key] || copy.es[key] || key;
}

function translate() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.documentElement.lang = locale;
  localStorage.setItem("toto-demo-language", locale);
  $("download-hero").href = RELEASE_INSTALLER;
  $("download-main").href = RELEASE_INSTALLER;
}

function setStatus(message, kind = "") {
  const node = $("viewer-message");
  node.textContent = message;
  node.className = kind;
}

function setModelBadge(message, kind = "pending") {
  const badge = $("model-badge");
  badge.textContent = message;
  badge.className = `demo-badge ${kind}`;
}

function updateActionState() {
  $("process").disabled = !detector || !$("source-video").src || processing;
  $("load-model").disabled = processing;
  $("stop").disabled = !processing;
}

function resetResults() {
  results = [];
  frameIndex = 0;
  $("metric-frames").textContent = "0";
  $("metric-people").textContent = "0";
  $("metric-fps").textContent = "—";
  $("progress-bar").style.width = "0%";
  $("download-results").classList.add("hidden");
  if (resultUrl) {
    URL.revokeObjectURL(resultUrl);
    resultUrl = null;
  }
}

function resizeCanvas() {
  const video = $("source-video");
  const canvas = $("overlay-canvas");
  const width = video.videoWidth || 960;
  const height = video.videoHeight || 540;
  canvas.width = width;
  canvas.height = height;
  $("stage").style.aspectRatio = `${width} / ${height}`;
  drawOverlay(lastPoses);
}

function visibleKeypoints(pose) {
  const threshold = Number($("confidence").value) / 100;
  return (pose.keypoints || []).filter((point) => Number(point.score || 0) >= threshold);
}

function poseBox(pose) {
  if (pose.box && Number.isFinite(pose.box.xMin)) {
    return pose.box;
  }
  const points = visibleKeypoints(pose);
  if (!points.length) return null;
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const xMin = Math.min(...xs);
  const yMin = Math.min(...ys);
  const xMax = Math.max(...xs);
  const yMax = Math.max(...ys);
  return {xMin, yMin, width: xMax - xMin, height: yMax - yMin};
}

function drawOverlay(poses) {
  const canvas = $("overlay-canvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  const threshold = Number($("confidence").value) / 100;
  poses.forEach((pose, poseIndex) => {
    const color = PALETTE[poseIndex % PALETTE.length];
    const keypoints = pose.keypoints || [];
    if ($("show-boxes").checked) {
      const box = poseBox(pose);
      if (box) {
        context.strokeStyle = color;
        context.lineWidth = Math.max(2, canvas.width / 420);
        context.setLineDash([8, 5]);
        context.strokeRect(box.xMin, box.yMin, box.width || (box.xMax - box.xMin), box.height || (box.yMax - box.yMin));
        context.setLineDash([]);
        context.font = `${Math.max(12, canvas.width / 55)}px Inter, system-ui, sans-serif`;
        context.fillStyle = color;
        context.fillText(`P${pose.id ?? poseIndex + 1}`, box.xMin + 5, Math.max(16, box.yMin - 8));
      }
    }
    if ($("show-skeleton").checked) {
      context.strokeStyle = color;
      context.lineWidth = Math.max(3, canvas.width / 260);
      context.lineCap = "round";
      SKELETON_EDGES.forEach(([first, second]) => {
        const a = keypoints[first];
        const b = keypoints[second];
        if (!a || !b || Number(a.score || 0) < threshold || Number(b.score || 0) < threshold) return;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      });
    }
    if ($("show-keypoints").checked) {
      keypoints.forEach((point) => {
        if (Number(point.score || 0) < threshold) return;
        context.fillStyle = "#ffffff";
        context.strokeStyle = color;
        context.lineWidth = Math.max(2, canvas.width / 480);
        context.beginPath();
        context.arc(point.x, point.y, Math.max(3, canvas.width / 165), 0, Math.PI * 2);
        context.fill();
        context.stroke();
      });
    }
  });
}

function serializePose(pose) {
  return {
    id: pose.id ?? null,
    score: Number.isFinite(pose.score) ? pose.score : null,
    box: pose.box ? {
      xMin: pose.box.xMin ?? null,
      yMin: pose.box.yMin ?? null,
      width: pose.box.width ?? null,
      height: pose.box.height ?? null,
    } : null,
    keypoints: (pose.keypoints || []).map((point, index) => ({
      name: point.name || KEYPOINT_NAMES[index] || `keypoint_${index}`,
      x: point.x,
      y: point.y,
      score: point.score ?? null,
    })),
  };
}

function publishResults() {
  if (!results.length) return;
  const payload = {
    product: "TOTO browser demo",
    model: MODEL_NAME,
    model_url: MODEL_URL,
    backend: $("backend-value").textContent,
    source_filename: $("video-input").files[0]?.name || null,
    video_width: $("source-video").videoWidth,
    video_height: $("source-video").videoHeight,
    duration_seconds: $("source-video").duration,
    frames: results,
  };
  if (resultUrl) URL.revokeObjectURL(resultUrl);
  resultUrl = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], {type: "application/json"}));
  $("download-results").href = resultUrl;
  $("download-results").classList.remove("hidden");
}

async function loadModel() {
  if (detector) return;
  if (!window.tf || !window.poseDetection) {
    setStatus(`${t("error")}: TensorFlow.js no terminó de cargar`, "error");
    return;
  }
  $("load-model").disabled = true;
  setModelBadge(t("loading"), "loading");
  $("model-status").textContent = t("loading");
  try {
    let backend = "webgl";
    try {
      await tf.setBackend("webgl");
      await tf.ready();
    } catch (_error) {
      backend = "cpu";
      await tf.setBackend("cpu");
      await tf.ready();
    }
    detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
      modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
      modelUrl: MODEL_URL,
      enableSmoothing: true,
      enableTracking: true,
      trackerType: poseDetection.TrackerType?.BoundingBox,
      minPoseScore: 0.25,
    });
    backend = tf.getBackend() || backend;
    $("backend-value").textContent = backend;
    $("metric-backend").textContent = backend;
    $("model-status").textContent = `${t("model_ready")} · ${backend}`;
    setModelBadge(t("model_ready"), "ready");
    setStatus(t("ready"), "success");
  } catch (error) {
    detector = null;
    $("load-model").disabled = false;
    setModelBadge(t("error"), "error");
    $("model-status").textContent = error?.message || String(error);
    setStatus(`${t("error")}: ${error?.message || String(error)}`, "error");
  }
  updateActionState();
}

function scheduleNextFrame(token) {
  const video = $("source-video");
  if (!processing || token !== runToken) return;
  if (typeof video.requestVideoFrameCallback === "function") {
    video.requestVideoFrameCallback((now, metadata) => processFrame(now, metadata, token));
  } else {
    requestAnimationFrame((now) => processFrame(now, {mediaTime: video.currentTime}, token));
  }
}

async function processFrame(now, metadata, token) {
  if (!processing || token !== runToken) return;
  const started = performance.now();
  try {
    const poses = await detector.estimatePoses($("source-video"));
    if (!processing || token !== runToken) return;
    lastPoses = poses || [];
    const mediaTime = Number(metadata?.mediaTime ?? $("source-video").currentTime);
    results.push({
      frame: frameIndex++,
      time_s: Number.isFinite(mediaTime) ? mediaTime : 0,
      poses: lastPoses.map(serializePose),
    });
    const elapsed = Math.max(1, performance.now() - started);
    $("metric-fps").textContent = (1000 / elapsed).toFixed(1);
    $("metric-frames").textContent = String(results.length);
    $("metric-people").textContent = String(Math.max(Number($("metric-people").textContent) || 0, lastPoses.length));
    $("pose-count").textContent = `${lastPoses.length} ${t("poses")}`;
    const duration = $("source-video").duration || 0;
    $("progress-bar").style.width = `${duration ? Math.min(100, (mediaTime / duration) * 100) : 0}%`;
    drawOverlay(lastPoses);
  } catch (error) {
    stopProcessing();
    setStatus(`${t("error")}: ${error?.message || String(error)}`, "error");
    return;
  }
  if ($("source-video").ended || $("source-video").currentTime >= $("source-video").duration - 0.03) {
    finishProcessing();
  } else {
    scheduleNextFrame(token);
  }
}

async function processVideo() {
  const video = $("source-video");
  if (!detector || !video.src) {
    setStatus(t("no_video"), "error");
    return;
  }
  resetResults();
  lastPoses = [];
  frameIndex = 0;
  runToken += 1;
  const token = runToken;
  processing = true;
  video.pause();
  try {
    video.currentTime = 0;
    await video.play();
  } catch (error) {
    processing = false;
    setStatus(`${t("error")}: ${error?.message || String(error)}`, "error");
    updateActionState();
    return;
  }
  setStatus(t("processing"));
  $("analysis").textContent = t("processing");
  updateActionState();
  scheduleNextFrame(token);
}

function finishProcessing() {
  if (!processing) return;
  processing = false;
  runToken += 1;
  $("source-video").pause();
  publishResults();
  setStatus(t("finished"), "success");
  $("analysis").textContent = `${t("finished")}: ${results.length} frames`;
  updateActionState();
}

function stopProcessing() {
  if (!processing) return;
  processing = false;
  runToken += 1;
  $("source-video").pause();
  publishResults();
  setStatus(t("stopped"));
  updateActionState();
}

function prepareVideo(file) {
  if (!file) return;
  if (processing) stopProcessing();
  if (videoUrl) URL.revokeObjectURL(videoUrl);
  videoUrl = URL.createObjectURL(file);
  const video = $("source-video");
  video.src = videoUrl;
  video.load();
  $("empty-state").classList.add("hidden");
  resetResults();
  lastPoses = [];
  setStatus(`${file.name} · ${Math.round(file.size / 1024 / 1024 * 10) / 10} MB`);
  updateActionState();
}

$("language").value = locale;
$("language").addEventListener("change", (event) => { locale = event.target.value; translate(); });
$("theme").addEventListener("click", () => { document.body.classList.toggle("dark"); drawOverlay(lastPoses); });
$("video-input").addEventListener("change", (event) => prepareVideo(event.target.files[0]));
$("load-model").addEventListener("click", loadModel);
$("process").addEventListener("click", processVideo);
$("stop").addEventListener("click", stopProcessing);
$("source-video").addEventListener("loadedmetadata", () => { resizeCanvas(); updateActionState(); });
$("source-video").addEventListener("ended", finishProcessing);
$("confidence").addEventListener("input", (event) => {
  $("confidence-value").textContent = `${event.target.value}%`;
  drawOverlay(lastPoses);
});
["show-skeleton", "show-boxes", "show-keypoints"].forEach((id) => $(id).addEventListener("change", () => drawOverlay(lastPoses)));

translate();
updateActionState();
