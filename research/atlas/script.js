let INDEX = null;
let REGION_MAP = {};

// UI elements
const ageEl = document.getElementById("age");
const animalEl = document.getElementById("animal");
const channelEl = document.getElementById("channel");
const viewer = document.getElementById("viewer");

// Fullscreen elements
const fullscreenOverlay = document.getElementById("fullscreenOverlay");
const fullscreenCanvas = document.getElementById("fullscreenCanvas");
const closeFullscreen = document.getElementById("closeFullscreen");

let fullscreenLabelCanvas = null;
let fullscreenLabelCtx = null;

let currentItems = [];
let currentFullscreenIndex = 0;

/* ------------------ Load index + region map ------------------ */

fetch("data/index.json")
  .then(r => r.json())
  .then(d => {
    INDEX = d;
    populateAges();
  });

fetch("data/regions.json")
  .then(r => r.json())
  .then(d => {
    REGION_MAP = d;
    console.log("Region map loaded");
  });

/* ------------------ Tooltip ------------------ */

const tooltip = document.createElement("div");
tooltip.style.position = "fixed";
tooltip.style.background = "rgba(0,0,0,0.8)";
tooltip.style.color = "white";
tooltip.style.padding = "4px 8px";
tooltip.style.borderRadius = "4px";
tooltip.style.fontSize = "12px";
tooltip.style.pointerEvents = "none";
tooltip.style.display = "none";
tooltip.style.zIndex = "10000";
document.body.appendChild(tooltip);

function showTooltip(x, y, text) {
  tooltip.textContent = text;
  tooltip.style.left = x + 10 + "px";
  tooltip.style.top = y + 10 + "px";
  tooltip.style.display = "block";
}

function hideTooltip() {
  tooltip.style.display = "none";
}

/* ------------------ Dropdowns ------------------ */

function populateAges() {
  ageEl.innerHTML = "";
  Object.keys(INDEX).forEach(age =>
    ageEl.add(new Option(age, age))
  );

  ageEl.onchange = populateAnimals;
  populateAnimals();
}

function populateAnimals() {
  animalEl.innerHTML = "";
  const age = ageEl.value;
  if (!INDEX[age]) return;

  Object.keys(INDEX[age]).sort().forEach(animal =>
    animalEl.add(new Option(animal, animal))
  );

  animalEl.onchange = populateChannels;
  populateChannels();
}

function populateChannels() {
  channelEl.innerHTML = "";

  const age = ageEl.value;
  const animal = animalEl.value;
  const data = INDEX[age]?.[animal];

  if (!data?.channels) return;

  // Use keys in insertion order (from JSON) instead of sorting
  Object.keys(data.channels).forEach(ch =>
    channelEl.add(new Option(ch, ch))
  );

  channelEl.onchange = renderImages;
  renderImages();
}

function renderImages() {
  viewer.innerHTML = "";

  const age = ageEl.value;
  const animal = animalEl.value;
  const channel = channelEl.value;

  const items = INDEX?.[age]?.[animal]?.channels?.[channel];
  if (!items) return;

  currentItems = items;

  const grid = document.createElement("div");
  grid.className = "image-grid";
  viewer.appendChild(grid);

  items.forEach((item, idx) => {
    // Container for label + image
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.gap = "5px";

    // Add folder name on top
    // const label = document.createElement("div");
    // const folderName = item.path.split("/").pop(); // last part of path
    // label.textContent = folderName;
    // label.style.fontSize = "12px";
    // label.style.textAlign = "center";
    // label.style.wordBreak = "break-word";
    // container.appendChild(label);

    // Draw image + atlas
    drawOverlayImage(
      `data/${item.path}/${item.image}`,
      `data/${item.path}/${item.atlas}`,
      container,
      idx
    );

    grid.appendChild(container);
  });
}

function drawRegionBoundary(ctx, labelCtx, targetRGB, scaleX, scaleY) {
  const { width, height } = labelCtx.canvas;
  const imgData = labelCtx.getImageData(0, 0, width, height);
  const data = imgData.data;

  ctx.save();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.beginPath();

  function same(i) {
    return (
      data[i] === targetRGB[0] &&
      data[i + 1] === targetRGB[1] &&
      data[i + 2] === targetRGB[2]
    );
  }

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      if (!same(i)) continue;

      const neighbors = [
        i - 4,
        i + 4,
        i - width * 4,
        i + width * 4
      ];

      if (neighbors.some(n => !same(n))) {
        ctx.rect(
          x * scaleX,
          y * scaleY,
          scaleX,
          scaleY
        );
      }
    }
  }

  ctx.stroke();
  ctx.restore();
}

/* ------------------ Draw image + atlas + hover ------------------ */

function drawOverlayImage(imagePath, atlasPath, container, imgIdx) {
  const canvas = document.createElement("canvas");
  canvas.style.cursor = "pointer";
  const ctx = canvas.getContext("2d");

  // OFFSCREEN canvas for pixel lookup
  const labelCanvas = document.createElement("canvas");
  const labelCtx = labelCanvas.getContext("2d", { willReadFrequently: true });

  const img = new Image();
  const atlas = new Image();

  img.crossOrigin = "anonymous";
  atlas.crossOrigin = "anonymous";

  let loaded = 0;

  function tryDraw() {
    if (loaded < 2) return;

    canvas.width = img.width;
    canvas.height = img.height;

    // draw base image
    ctx.drawImage(img, 0, 0);

    // draw atlas overlay (visual)
    ctx.globalAlpha = 0.4;
    ctx.drawImage(atlas, 0, 0, img.width, img.height);
    ctx.globalAlpha = 1.0;

    // draw atlas to offscreen canvas (NO alpha)
    labelCanvas.width = atlas.width;
    labelCanvas.height = atlas.height;
    labelCtx.drawImage(atlas, 0, 0);
  }

  img.onload = () => { loaded++; tryDraw(); };
  atlas.onload = () => { loaded++; tryDraw(); };

  img.onerror = () => console.error("Failed to load image:", imagePath);
  atlas.onerror = () => console.error("Failed to load atlas:", atlasPath);

  img.src = encodeURI(imagePath);
  atlas.src = encodeURI(atlasPath);

  /* -------- Hover region detection -------- */

  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(
      (e.clientX - rect.left) * (labelCanvas.width / rect.width)
    );
    const y = Math.floor(
      (e.clientY - rect.top) * (labelCanvas.height / rect.height)
    );

    if (
      x < 0 || y < 0 ||
      x >= labelCanvas.width ||
      y >= labelCanvas.height
    ) {
      hideTooltip();
      return;
    }

    const pixel = labelCtx.getImageData(x, y, 1, 1).data;
    const key = `${pixel[0]},${pixel[1]},${pixel[2]}`;

    const age = ageEl.value;
    const regionName = REGION_MAP?.[age]?.[key];
    console.log(key, REGION_MAP[ageEl.value]?.[key]);


    if (regionName) {
      showTooltip(e.clientX, e.clientY, regionName);
    } else {
      hideTooltip();
    }
  });

  canvas.addEventListener("mouseleave", hideTooltip);

  /* -------- Fullscreen -------- */

  canvas.onclick = () => {
    currentFullscreenIndex = imgIdx;
    openFullscreen();
  };

  container.appendChild(canvas);
}

/* ------------------ Fullscreen ------------------ */

function openFullscreen() {
  fullscreenOverlay.style.display = "flex";
  renderFullscreenImage();
}

function renderFullscreenImage() {
  const item = currentItems[currentFullscreenIndex];
  if (!item) return;

  const ctx = fullscreenCanvas.getContext("2d");

  const img = new Image();
  const atlas = new Image();

  fullscreenLabelCanvas = document.createElement("canvas");
  fullscreenLabelCtx = fullscreenLabelCanvas.getContext("2d", {
    willReadFrequently: true
  });

  let loaded = 0;

  function tryDraw() {
    if (loaded < 2) return;

    // INTERNAL canvas resolution = native image size
    fullscreenCanvas.width = img.width;
    fullscreenCanvas.height = img.height;

    ctx.clearRect(0, 0, fullscreenCanvas.width, fullscreenCanvas.height);

    // draw base image
    ctx.drawImage(img, 0, 0);

    // draw atlas overlay (visual only)
    ctx.globalAlpha = 0.6;
    ctx.drawImage(atlas, 0, 0);
    ctx.globalAlpha = 1.0;

    // OFFSCREEN atlas (no alpha)
    fullscreenLabelCanvas.width = atlas.width;
    fullscreenLabelCanvas.height = atlas.height;
    fullscreenLabelCtx.drawImage(atlas, 0, 0);
  }

  img.onload = () => { loaded++; tryDraw(); };
  atlas.onload = () => { loaded++; tryDraw(); };

  img.src = `data/${item.path}/${item.image}`;
  atlas.src = `data/${item.path}/${item.atlas}`;
}

fullscreenCanvas.addEventListener("mousemove", e => {
  if (!fullscreenLabelCanvas) return;

  const rect = fullscreenCanvas.getBoundingClientRect();

  // Map CSS pixels → image pixels
  const x = Math.floor(
    (e.clientX - rect.left) * (fullscreenLabelCanvas.width / rect.width)
  );
  const y = Math.floor(
    (e.clientY - rect.top) * (fullscreenLabelCanvas.height / rect.height)
  );

  if (
    x < 0 || y < 0 ||
    x >= fullscreenLabelCanvas.width ||
    y >= fullscreenLabelCanvas.height
  ) {
    hideTooltip();
    return;
  }

  const pixel = fullscreenLabelCtx.getImageData(x, y, 1, 1).data;
  const key = `${pixel[0]},${pixel[1]},${pixel[2]}`;

  const age = ageEl.value;
  const regionName = REGION_MAP?.[age]?.[key];

  if (regionName) {
    showTooltip(e.clientX, e.clientY, regionName);
  } else {
    hideTooltip();
  }
});

fullscreenCanvas.addEventListener("mouseleave", hideTooltip);

/* ------------------ Fullscreen controls ------------------ */

closeFullscreen.onclick = () => {
  fullscreenOverlay.style.display = "none";
};

document.addEventListener("keydown", e => {
  if (fullscreenOverlay.style.display !== "flex") return;

  if (e.key === "ArrowRight" && currentFullscreenIndex < currentItems.length - 1) {
    currentFullscreenIndex++;
    renderFullscreenImage();
  }

  if (e.key === "ArrowLeft" && currentFullscreenIndex > 0) {
    currentFullscreenIndex--;
    renderFullscreenImage();
  }

  if (e.key === "Escape") {
    fullscreenOverlay.style.display = "none";
  }
});

// let INDEX = null;
// let REGION_MAP = {};
// const MAX_SIZE = 1024; // max width/height for images to prevent freezing

// // UI elements
// const ageEl = document.getElementById("age");
// const animalEl = document.getElementById("animal");
// const channelEl = document.getElementById("channel");
// const viewer = document.getElementById("viewer");

// // Fullscreen elements
// const fullscreenOverlay = document.getElementById("fullscreenOverlay");
// const fullscreenCanvas = document.getElementById("fullscreenCanvas");
// const closeFullscreen = document.getElementById("closeFullscreen");

// let fullscreenLabelCanvas = null;
// let fullscreenLabelCtx = null;

// let currentItems = [];
// let currentFullscreenIndex = 0;

// // Tooltip
// const tooltip = document.createElement("div");
// tooltip.style.position = "fixed";
// tooltip.style.background = "rgba(0,0,0,0.8)";
// tooltip.style.color = "white";
// tooltip.style.padding = "4px 8px";
// tooltip.style.borderRadius = "4px";
// tooltip.style.fontSize = "12px";
// tooltip.style.pointerEvents = "none";
// tooltip.style.display = "none";
// tooltip.style.zIndex = "10000";
// document.body.appendChild(tooltip);

// function showTooltip(x, y, text) {
//   tooltip.textContent = text;
//   tooltip.style.left = x + 10 + "px";
//   tooltip.style.top = y + 10 + "px";
//   tooltip.style.display = "block";
// }

// function hideTooltip() {
//   tooltip.style.display = "none";
// }

// // Load index + region map
// fetch("data/index.json").then(r => r.json()).then(d => {
//   INDEX = d;
//   populateAges();
// });

// fetch("data/regions.json").then(r => r.json()).then(d => {
//   REGION_MAP = d;
//   console.log("Region map loaded");
// });

// // Dropdowns
// function populateAges() {
//   ageEl.innerHTML = "";
//   Object.keys(INDEX).sort().forEach(age =>
//     ageEl.add(new Option(age, age))
//   );
//   ageEl.onchange = populateAnimals;
//   populateAnimals();
// }

// function populateAnimals() {
//   animalEl.innerHTML = "";
//   const age = ageEl.value;
//   if (!INDEX[age]) return;
//   Object.keys(INDEX[age]).sort().forEach(animal =>
//     animalEl.add(new Option(animal, animal))
//   );
//   animalEl.onchange = populateChannels;
//   populateChannels();
// }

// function populateChannels() {
//   channelEl.innerHTML = "";
//   const age = ageEl.value;
//   const animal = animalEl.value;
//   const data = INDEX[age]?.[animal];
//   if (!data?.channels) return;
//   Object.keys(data.channels).forEach(ch =>
//     channelEl.add(new Option(ch, ch))
//   );
//   channelEl.onchange = renderImages;
//   renderImages();
// }

// function renderImages() {
//   viewer.innerHTML = "";
//   const age = ageEl.value;
//   const animal = animalEl.value;
//   const channel = channelEl.value;
//   const items = INDEX?.[age]?.[animal]?.channels?.[channel];
//   if (!items) return;

//   currentItems = items;

//   const grid = document.createElement("div");
//   grid.className = "image-grid";
//   viewer.appendChild(grid);

//   items.forEach((item, idx) => {
//     const container = document.createElement("div");
//     container.style.display = "flex";
//     container.style.flexDirection = "column";
//     container.style.alignItems = "center";
//     container.style.gap = "5px";

//     const label = document.createElement("div");
//     const folderName = item.path.split("/").pop();
//     label.textContent = folderName;
//     label.style.fontSize = "12px";
//     label.style.textAlign = "center";
//     label.style.wordBreak = "break-word";
//     container.appendChild(label);

//     drawOverlayImage(
//       `data/${item.path}/${item.image}`,
//       `data/${item.path}/${item.atlas}`,
//       container,
//       idx
//     );

//     grid.appendChild(container);
//   });
// }

// // Scale utility
// function getScaledSize(w, h, max) {
//   const scale = Math.min(1, max / Math.max(w, h));
//   return { width: Math.round(w * scale), height: Math.round(h * scale), scale };
// }

// // Draw boundary for a region
// function drawRegionBoundary(ctx, labelCtx, targetRGB, scaleX, scaleY) {
//   const { width, height } = labelCtx.canvas;
//   const imgData = labelCtx.getImageData(0, 0, width, height);
//   const data = imgData.data;

//   ctx.save();
//   ctx.strokeStyle = "black";
//   ctx.lineWidth = 1;
//   ctx.beginPath();

//   function same(i) {
//     return data[i] === targetRGB[0] &&
//            data[i + 1] === targetRGB[1] &&
//            data[i + 2] === targetRGB[2];
//   }

//   for (let y = 1; y < height - 1; y++) {
//     for (let x = 1; x < width - 1; x++) {
//       const i = (y * width + x) * 4;
//       if (!same(i)) continue;
//       const neighbors = [i - 4, i + 4, i - width * 4, i + width * 4];
//       if (neighbors.some(n => !same(n))) {
//         ctx.rect(x * scaleX, y * scaleY, scaleX, scaleY);
//       }
//     }
//   }

//   ctx.stroke();
//   ctx.restore();
// }

// // Draw image + atlas + hover
// function drawOverlayImage(imagePath, atlasPath, container, imgIdx) {
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   canvas.style.cursor = "pointer";

//   const labelCanvas = document.createElement("canvas");
//   const labelCtx = labelCanvas.getContext("2d", { willReadFrequently: true });

//   const img = new Image();
//   const atlas = new Image();

//   img.crossOrigin = "anonymous";
//   atlas.crossOrigin = "anonymous";

//   let loaded = 0;
//   let lastRegionKey = null;

//   function tryDraw() {
//     if (loaded < 2) return;

//     const scaledImg = getScaledSize(img.width, img.height, MAX_SIZE);
//     canvas.width = scaledImg.width;
//     canvas.height = scaledImg.height;

//     const scaledAtlas = getScaledSize(atlas.width, atlas.height, MAX_SIZE);
//     labelCanvas.width = scaledAtlas.width;
//     labelCanvas.height = scaledAtlas.height;

//     // draw main image
//     ctx.drawImage(img, 0, 0, scaledImg.width, scaledImg.height);

//     // draw atlas overlay (visual)
//     ctx.globalAlpha = 0.6;
//     ctx.drawImage(atlas, 0, 0, scaledImg.width, scaledImg.height);
//     ctx.globalAlpha = 1.0;

//     // draw atlas on label canvas (no alpha)
//     labelCtx.clearRect(0, 0, labelCanvas.width, labelCanvas.height);
//     labelCtx.drawImage(atlas, 0, 0, scaledAtlas.width, scaledAtlas.height);
//   }

//   img.onload = () => { loaded++; tryDraw(); };
//   atlas.onload = () => { loaded++; tryDraw(); };

//   img.src = encodeURI(imagePath);
//   atlas.src = encodeURI(atlasPath);

//   canvas.addEventListener("mousemove", e => {
//     const rect = canvas.getBoundingClientRect();
//     const x = Math.floor((e.clientX - rect.left) * canvas.width / rect.width);
//     const y = Math.floor((e.clientY - rect.top) * canvas.height / rect.height);

//     if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
//       hideTooltip();
//       lastRegionKey = null;
//       return;
//     }

//     const pixel = labelCtx.getImageData(x, y, 1, 1).data;
//     const key = `${pixel[0]},${pixel[1]},${pixel[2]}`;
//     const age = ageEl.value;
//     const regionName = REGION_MAP?.[age]?.[key];
//     console.log(key, REGION_MAP[ageEl.value]?.[key]);

//     // redraw only if region changes
//     if (key !== lastRegionKey) {
//       lastRegionKey = key;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//       ctx.globalAlpha = 0.6;
//       ctx.drawImage(atlas, 0, 0, canvas.width, canvas.height);
//       ctx.globalAlpha = 1.0;

//       if (regionName) {
//         showTooltip(e.clientX, e.clientY, regionName);
//         drawRegionBoundary(ctx, labelCtx, [pixel[0], pixel[1], pixel[2]], canvas.width / labelCanvas.width, canvas.height / labelCanvas.height);
//       } else {
//         hideTooltip();
//       }
//     }
//   });

//   canvas.addEventListener("mouseleave", () => {
//     hideTooltip();
//     lastRegionKey = null;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//     ctx.globalAlpha = 0.6;
//     ctx.drawImage(atlas, 0, 0, canvas.width, canvas.height);
//     ctx.globalAlpha = 1.0;
//   });

//   canvas.onclick = () => {
//     currentFullscreenIndex = imgIdx;
//     openFullscreen();
//   };

//   container.appendChild(canvas);
// }

// // Fullscreen functions
// function openFullscreen() {
//   fullscreenOverlay.style.display = "flex";
//   renderFullscreenImage();
// }

// function renderFullscreenImage() {
//   const item = currentItems[currentFullscreenIndex];
//   if (!item) return;

//   const ctx = fullscreenCanvas.getContext("2d");
//   const img = new Image();
//   const atlas = new Image();

//   fullscreenLabelCanvas = document.createElement("canvas");
//   fullscreenLabelCtx = fullscreenLabelCanvas.getContext("2d", { willReadFrequently: true });
//   let loaded = 0;
//   let lastRegionKey = null;

//   function tryDraw() {
//     if (loaded < 2) return;

//     const scaledImg = getScaledSize(img.width, img.height, MAX_SIZE);
//     fullscreenCanvas.width = scaledImg.width;
//     fullscreenCanvas.height = scaledImg.height;

//     const scaledAtlas = getScaledSize(atlas.width, atlas.height, MAX_SIZE);
//     fullscreenLabelCanvas.width = scaledAtlas.width;
//     fullscreenLabelCanvas.height = scaledAtlas.height;

//     ctx.drawImage(img, 0, 0, scaledImg.width, scaledImg.height);
//     ctx.globalAlpha = 0.6;
//     ctx.drawImage(atlas, 0, 0, scaledImg.width, scaledImg.height);
//     ctx.globalAlpha = 1.0;

//     fullscreenLabelCtx.clearRect(0, 0, fullscreenLabelCanvas.width, fullscreenLabelCanvas.height);
//     fullscreenLabelCtx.drawImage(atlas, 0, 0, scaledAtlas.width, scaledAtlas.height);
//   }

//   img.onload = () => { loaded++; tryDraw(); };
//   atlas.onload = () => { loaded++; tryDraw(); };
//   img.src = `data/${item.path}/${item.image}`;
//   atlas.src = `data/${item.path}/${item.atlas}`;

//   fullscreenCanvas.onmousemove = e => {
//     if (!fullscreenLabelCanvas) return;
//     const rect = fullscreenCanvas.getBoundingClientRect();
//     const x = Math.floor((e.clientX - rect.left) * fullscreenCanvas.width / rect.width);
//     const y = Math.floor((e.clientY - rect.top) * fullscreenCanvas.height / rect.height);

//     if (x < 0 || y < 0 || x >= fullscreenCanvas.width || y >= fullscreenCanvas.height) {
//       hideTooltip();
//       lastRegionKey = null;
//       return;
//     }

//     const pixel = fullscreenLabelCtx.getImageData(x, y, 1, 1).data;
//     const key = `${pixel[0]},${pixel[1]},${pixel[2]}`;
//     const age = ageEl.value;
//     const regionName = REGION_MAP?.[age]?.[key];

//     if (key !== lastRegionKey) {
//       lastRegionKey = key;
//       ctx.clearRect(0, 0, fullscreenCanvas.width, fullscreenCanvas.height);
//       ctx.drawImage(img, 0, 0, fullscreenCanvas.width, fullscreenCanvas.height);
//       ctx.globalAlpha = 0.6;
//       ctx.drawImage(atlas, 0, 0, fullscreenCanvas.width, fullscreenCanvas.height);
//       ctx.globalAlpha = 1.0;

//       if (regionName) {
//         showTooltip(e.clientX, e.clientY, regionName);
//         drawRegionBoundary(ctx, fullscreenLabelCtx, [pixel[0], pixel[1], pixel[2]], fullscreenCanvas.width / fullscreenLabelCanvas.width, fullscreenCanvas.height / fullscreenLabelCanvas.height);
//       } else {
//         hideTooltip();
//       }
//     }
//   };

//   fullscreenCanvas.onmouseleave = () => {
//     hideTooltip();
//     lastRegionKey = null;
//     ctx.clearRect(0, 0, fullscreenCanvas.width, fullscreenCanvas.height);
//     ctx.drawImage(img, 0, 0, fullscreenCanvas.width, fullscreenCanvas.height);
//     ctx.globalAlpha = 0.6;
//     ctx.drawImage(atlas, 0, 0, fullscreenCanvas.width, fullscreenCanvas.height);
//     ctx.globalAlpha = 1.0;
//   };
// }

// // Fullscreen controls
// closeFullscreen.onclick = () => fullscreenOverlay.style.display = "none";

// document.addEventListener("keydown", e => {
//   if (fullscreenOverlay.style.display !== "flex") return;

//   if (e.key === "ArrowRight" && currentFullscreenIndex < currentItems.length - 1) {
//     currentFullscreenIndex++;
//     renderFullscreenImage();
//   }
//   if (e.key === "ArrowLeft" && currentFullscreenIndex > 0) {
//     currentFullscreenIndex--;
//     renderFullscreenImage();
//   }
//   if (e.key === "Escape") fullscreenOverlay.style.display = "none";
// });
