/**
 * Poporo Quimbaya - Interactive 3D Parametric Engine & UI Controls
 * Compatible with nexu-io/open-design specifications
 */

// Desglose anatómico interactivo con terminología de curaduría y Open CAD
const anatomyModules = {
  "sphere-up": {
    badge: "Módulo 01",
    title: "Cuerpo Esferoidal Superior",
    desc: "Representa la mitad superior de la curvatura de revolución inspirada en el fruto botánico desecado del totumo. Fundido en cera perdida con núcleo de arcilla y carbón vegetal. Actuaba como remate ceremonial y bóveda de equilibrio visual.",
    spec1: "102 mm",
    spec2: "1.9 – 2.2 mm",
    spec3: "Cera perdida (núcleo refractario)",
    spec4: "Sólido de revolución NURBS"
  },
  "waist": {
    badge: "Módulo 02",
    title: "Garganta / Cintura Central",
    desc: "Zona central estrecha diseñada con una ergonomía palmar insuperable. Facilita la sujeción firme con una sola mano durante largas vigilias y debates sagrados, transmitiendo el calor corporal sin alterar el contenido alcalino interior.",
    spec1: "64 mm",
    spec2: "2.4 mm (Refuerzo estructural)",
    spec3: "Fundición continua sin juntas",
    spec4: "Punto de inflexión hiperbólico"
  },
  "sphere-down": {
    badge: "Módulo 03",
    title: "Cuerpo Cuatripartito Inferior",
    desc: "Cámara volumétrica principal concebida para almacenar cal dolomítica viva. Sus cuatro lóbulos simétricos materializan los cuatro puntos cardinales y dimensiones cósmicas de la mitología del Cauca Medio.",
    spec1: "114 mm",
    spec2: "2.0 mm",
    spec3: "Tumbaga con enriquecimiento superficial",
    spec4: "Modulación tetralobular 3D"
  },
  "pedestal": {
    badge: "Módulo 04",
    title: "Pedestal Anular de Apoyo",
    desc: "Base anular con conicidad invertida que confiere un centro de gravedad bajo y equilibrio inamovible cuando reposa sobre telas sagradas o bancos ceremoniales de madera.",
    spec1: "68 mm",
    spec2: "2.3 mm",
    spec3: "Vaciado por gravedad y pulido abrasivo",
    spec4: "Base cónica paramétrica"
  },
  "pin": {
    badge: "Módulo 05",
    title: "Alfiler Ceremonial (Palillo)",
    desc: "Vástago de aleación dorada fina que se introduce por la abertura cenital para dosificar cal hacia el bolo de mambe. Rematado con cabezal globular que simboliza la energía solar fecundadora.",
    spec1: "240 mm (Longitud)",
    spec2: "3.2 mm (Diámetro)",
    spec3: "Forja y vaciado con cera perdida",
    spec4: "Vástago cilíndrico helicoidal"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupAnatomySelector();
  initParametricViewer();
});

function setupAnatomySelector() {
  const tabs = document.querySelectorAll(".anatomy-tab-btn");
  const badgeEl = document.getElementById("anatomy-badge");
  const titleEl = document.getElementById("anatomy-title");
  const descEl = document.getElementById("anatomy-desc");
  const spec1El = document.getElementById("anatomy-spec1");
  const spec2El = document.getElementById("anatomy-spec2");
  const spec3El = document.getElementById("anatomy-spec3");
  const spec4El = document.getElementById("anatomy-spec4");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const key = tab.getAttribute("data-target");
      const data = anatomyModules[key];
      if (!data) return;

      badgeEl.textContent = data.badge;
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      spec1El.textContent = data.spec1;
      spec2El.textContent = data.spec2;
      spec3El.textContent = data.spec3;
      spec4El.textContent = data.spec4;
    });
  });
}

// =========================================================================
// MOTOR 3D PARAMÉTRICO DE ALTA FIDELIDAD (CANVAS / OPEN CAD ENGINE)
// =========================================================================

function initParametricViewer() {
  const canvas = document.getElementById("poporoCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Estados de Render
  let renderMode = "gold"; // 'gold', 'wire', 'xray'
  let autoRotate = true;
  let angleY = 0.45;
  let angleX = 0.12;
  let zoomScale = 1.0;
  let lightAngleDeg = 45;
  let wireResolution = 36;

  // Interacción táctil / ratón
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;

  // Elementos UI
  const btnGold = document.getElementById("btn-mode-gold");
  const btnWire = document.getElementById("btn-mode-wire");
  const btnXray = document.getElementById("btn-mode-xray");
  const btnToggleRotate = document.getElementById("btn-toggle-rotate");
  const rotateIcon = document.getElementById("rotateIcon");
  const rotateText = document.getElementById("rotateText");
  const btnResetView = document.getElementById("btn-reset-view");

  const sliderScale = document.getElementById("slider-scale");
  const sliderLight = document.getElementById("slider-light");
  const sliderWireDensity = document.getElementById("slider-wire-density");

  const scaleReadout = document.getElementById("scaleReadout");
  const lightReadout = document.getElementById("lightReadout");
  const densityReadout = document.getElementById("densityReadout");
  const hudPoly = document.getElementById("hudPoly");

  // Modos de Visualización
  btnGold.addEventListener("click", () => switchMode("gold", btnGold, "Quad Mesh"));
  btnWire.addEventListener("click", () => switchMode("wire", btnWire, "CAD Wireframe"));
  btnXray.addEventListener("click", () => switchMode("xray", btnXray, "X-Ray Core"));

  function switchMode(mode, btn, hudText) {
    renderMode = mode;
    [btnGold, btnWire, btnXray].forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (hudPoly) hudPoly.textContent = hudText;
  }

  // Toggle Rotación
  btnToggleRotate.addEventListener("click", () => {
    autoRotate = !autoRotate;
    rotateIcon.textContent = autoRotate ? "⏸" : "▶";
    rotateText.textContent = autoRotate ? "Pausar Giro" : "Reanudar Giro";
  });

  // Reset Cámara
  btnResetView.addEventListener("click", () => {
    angleY = 0.45;
    angleX = 0.12;
    zoomScale = 1.0;
    sliderScale.value = 1.0;
    scaleReadout.textContent = "1.0x";
  });

  // Sliders
  sliderScale.addEventListener("input", (e) => {
    zoomScale = parseFloat(e.target.value);
    scaleReadout.textContent = `${zoomScale.toFixed(2)}x`;
  });

  sliderLight.addEventListener("input", (e) => {
    lightAngleDeg = parseFloat(e.target.value);
    lightReadout.textContent = `${lightAngleDeg}°`;
  });

  sliderWireDensity.addEventListener("input", (e) => {
    wireResolution = parseInt(e.target.value, 10);
    densityReadout.textContent = `${wireResolution} seg`;
  });

  // Drag Orbital
  canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    prevX = e.clientX;
    prevY = e.clientY;

    angleY += dx * 0.01;
    angleX += dy * 0.01;
    angleX = Math.max(-0.6, Math.min(0.6, angleX));
  });

  // Zoom por rueda
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    zoomScale += e.deltaY * -0.0015;
    zoomScale = Math.max(0.5, Math.min(1.8, zoomScale));
    sliderScale.value = zoomScale;
    scaleReadout.textContent = `${zoomScale.toFixed(2)}x`;
  });

  // Modelo Matemático del Poporo (Curvas de revolución Quimbayas)
  function createProfile() {
    const steps = 75;
    const list = [];
    const height = 310;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps; // 0 a 1
      const y = (t - 0.5) * height;
      let r = 0;

      if (t < 0.04) {
        r = 16 + (t / 0.04) * 5;
      } else if (t >= 0.04 && t < 0.38) {
        // Esfera superior
        const local = (t - 0.04) / 0.34;
        r = 21 + Math.sin(local * Math.PI) * 44;
      } else if (t >= 0.38 && t < 0.46) {
        // Cintura ergonómica
        const local = (t - 0.38) / 0.08;
        r = 29 - Math.sin(local * Math.PI) * 6.5;
      } else if (t >= 0.46 && t < 0.83) {
        // Esfera inferior tetralobulada
        const local = (t - 0.46) / 0.37;
        r = 28 + Math.sin(local * Math.PI) * 57;
      } else {
        // Pedestal y base cónica
        const local = (t - 0.83) / 0.17;
        r = 30 + local * 18;
      }

      list.push({ y, r });
    }
    return list;
  }

  const profile = createProfile();

  // Bucle de animación
  function loop() {
    if (autoRotate && !isDragging) {
      angleY += 0.01;
    }
    renderScene();
    requestAnimationFrame(loop);
  }

  function renderScene() {
    const w = canvas.width = canvas.parentElement.clientWidth;
    const h = canvas.height = canvas.parentElement.clientHeight;

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2 + 12;
    const scale = (Math.min(w, h) / 380) * zoomScale;

    // Vector de luz solar normalizado
    const lRad = (lightAngleDeg * Math.PI) / 180;
    const lx = Math.cos(lRad);
    const ly = -0.4;
    const lz = Math.sin(lRad);
    const lLen = Math.hypot(lx, ly, lz);
    const lightDir = { x: lx / lLen, y: ly / lLen, z: lz / lLen };

    const segments = wireResolution;
    const rings = profile.length;
    const grid = [];

    for (let i = 0; i < rings; i++) {
      const ring = [];
      const { y, r } = profile[i];

      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI * 2 + angleY;

        // Modulación de 4 lóbulos sagrados
        let modR = r;
        if (i > 32 && i < 62) {
          modR += Math.cos(phi * 4) * 3.8;
        }

        let px = modR * Math.cos(phi);
        let py = y;
        let pz = modR * Math.sin(phi);

        // Rotación inclinación X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const pyRot = py * cosX - pz * sinX;
        const pzRot = py * sinX + pz * cosX;

        // Proyección de cámara suave
        const perspective = 750 / (750 + pzRot);
        const sx = cx + px * scale * perspective;
        const sy = cy + pyRot * scale * perspective;

        ring.push({
          x: sx,
          y: sy,
          z: pzRot,
          nx: Math.cos(phi),
          nz: Math.sin(phi)
        });
      }
      grid.push(ring);
    }

    // Sombra en base con degradado suave
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy + 165 * scale, 80 * scale, 22 * scale, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.filter = "blur(12px)";
    ctx.fill();
    ctx.restore();

    // Renderizar Alfiler Ceremonial
    renderPin(cx, cy, scale);

    // Renderizar mallas
    for (let i = 0; i < rings - 1; i++) {
      for (let j = 0; j < segments; j++) {
        const p1 = grid[i][j];
        const p2 = grid[i][j + 1];
        const p3 = grid[i + 1][j + 1];
        const p4 = grid[i + 1][j];

        const avgZ = (p1.z + p2.z + p3.z + p4.z) / 4;
        const isBack = avgZ < 0;

        if (renderMode === "wire") {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          ctx.strokeStyle = isBack ? "rgba(245, 194, 66, 0.12)" : "rgba(245, 194, 66, 0.75)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else if (renderMode === "xray") {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          ctx.fillStyle = isBack ? "rgba(14, 165, 233, 0.05)" : "rgba(14, 165, 233, 0.18)";
          ctx.fill();
          ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          // Oro Realista Bruñido con iluminación Lambertiana
          if (isBack) continue;

          const dot = Math.max(0.12, (p1.nx * lightDir.x + p1.nz * lightDir.z));
          const brightness = Math.min(1, dot * 1.35);

          const r = Math.round(185 + brightness * 70);
          const g = Math.round(135 + brightness * 90);
          const b = Math.round(30 + brightness * 50);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(${r + 15}, ${g + 15}, ${b}, 0.25)`;
          ctx.lineWidth = 0.35;
          ctx.stroke();
        }
      }
    }
  }

  function renderPin(cx, cy, scale) {
    const pinTop = cy - 230 * scale;
    const pinBot = cy + 45 * scale;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - 2.5 * scale, pinBot);
    ctx.lineTo(cx - 2.5 * scale, pinTop);
    ctx.lineTo(cx + 2.5 * scale, pinTop);
    ctx.lineTo(cx + 2.5 * scale, pinBot);
    ctx.closePath();

    if (renderMode === "wire") {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 1;
      ctx.stroke();
    } else if (renderMode === "xray") {
      ctx.fillStyle = "rgba(56, 189, 248, 0.5)";
      ctx.fill();
    } else {
      const grad = ctx.createLinearGradient(cx - 3, 0, cx + 3, 0);
      grad.addColorStop(0, "#b87c08");
      grad.addColorStop(0.4, "#fff7c2");
      grad.addColorStop(1, "#7d4d03");
      ctx.fillStyle = grad;
      ctx.fill();

      // Esfera superior del alfiler
      ctx.beginPath();
      ctx.arc(cx, pinTop, 7 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#ffe680";
      ctx.shadowColor = "rgba(245, 194, 66, 0.9)";
      ctx.shadowBlur = 14;
      ctx.fill();
    }
    ctx.restore();
  }

  loop();
}
