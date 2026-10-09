/**
 * Poporo Quimbaya - Interactive 3D Parametric Engine & Dynamic Anatomy
 * Open Design Heritage Viewer
 */

// Datos anatómicos interactivos
const anatomyData = {
  "sphere-up": {
    badge: "Módulo 01",
    title: "Cuerpo Esférico Superior",
    desc: "Representa la mitad superior de la curvatura simétrica inspirada en el fruto seco del totumo. Fundido en cera perdida con núcleo de arcilla y carbón. Actuaba como remate ceremonial y bóveda de equilibrio visual.",
    spec1: "102 mm",
    spec2: "1.9 – 2.2 mm",
    spec3: "Cera perdida (núcleo refractario)",
    spec4: "Sólido de revolución / NURBS"
  },
  "waist": {
    badge: "Módulo 02",
    title: "Cintura de Sujeción (Garganta)",
    desc: "Zona central estrecha que brinda una sujeción ergonómica perfecta con una sola mano durante largas horas de deliberación comunitaria. Transmite el calor de la mano al metal sin enfriar el contenido interior.",
    spec1: "64 mm",
    spec2: "2.4 mm (Refuerzo)",
    spec3: "Fundición continua sin soldadura",
    spec4: "Punto de inflexión hiperbólico"
  },
  "sphere-down": {
    badge: "Módulo 03",
    title: "Receptáculo Cuatripartito Inferior",
    desc: "Cámara principal destinada al almacenamiento de cal obtenida de conchas marinas molidas o rocas calizas. Destaca por sus 4 lóbulos sutiles que representan los 4 puntos cardinales y dimensiones cósmicas.",
    spec1: "114 mm",
    spec2: "2.0 mm",
    spec3: "Tumbaga dorada al fuego",
    spec4: "Lóbulos cuatridimensionales"
  },
  "pedestal": {
    badge: "Módulo 04",
    title: "Pedestal Anular de Apoyo",
    desc: "Base cónica truncada que confiere total estabilidad vertical cuando el poporo descansa sobre bancos ceremoniales o telares de algodón sagrado.",
    spec1: "68 mm",
    spec2: "2.3 mm",
    spec3: "Vaciado por gravedad",
    spec4: "Base cónica paramétrica"
  },
  "pin": {
    badge: "Módulo 05",
    title: "Alfiler Ceremonial (Palillo)",
    desc: "Vástago de oro puro que se introducía por la abertura para extraer cal y humedecer el mambe en la boca. Su remate estilizado refleja la conexión entre el mundo terrenal y los espíritus solares.",
    spec1: "240 mm (Longitud)",
    spec2: "3.2 mm (Diámetro)",
    spec3: "Forja y cera perdida",
    spec4: "Eje cilíndrico helicoidal"
  }
};

// Inicialización de interactividad anatómica
document.addEventListener("DOMContentLoaded", () => {
  setupAnatomyButtons();
  init3DParametricCanvas();
});

function setupAnatomyButtons() {
  const buttons = document.querySelectorAll(".anatomy-btn");
  const badgeEl = document.getElementById("anatomy-badge");
  const titleEl = document.getElementById("anatomy-title");
  const descEl = document.getElementById("anatomy-desc");
  const spec1El = document.getElementById("anatomy-spec1");
  const spec2El = document.getElementById("anatomy-spec2");
  const spec3El = document.getElementById("anatomy-spec3");
  const spec4El = document.getElementById("anatomy-spec4");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const targetKey = btn.getAttribute("data-target");
      const data = anatomyData[targetKey];
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
// MOTOR 3D PARAMÉTRICO BASADO EN CANVAS HTML5
// Renderiza el Poporo Quimbaya matemáticamente con rotación, sombreado y wireframe
// =========================================================================

function init3DParametricCanvas() {
  const canvas = document.getElementById("poporoCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Parámetros de render y estado
  let renderMode = "gold"; // "gold", "wire", "xray"
  let autoRotate = true;
  let angleY = 0.5;
  let angleX = 0.15;
  let zoomScale = 1.0;
  let lightAngleDeg = 45;
  let wireResolution = 36;

  // Interacción de arrastre con ratón
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  // Controles UI
  const btnGold = document.getElementById("btn-mode-gold");
  const btnWire = document.getElementById("btn-mode-wire");
  const btnXray = document.getElementById("btn-mode-xray");
  const btnToggleRotate = document.getElementById("btn-toggle-rotate");
  const sliderScale = document.getElementById("slider-scale");
  const sliderLight = document.getElementById("slider-light");
  const sliderWireDensity = document.getElementById("slider-wire-density");

  btnGold.addEventListener("click", () => setMode("gold", btnGold));
  btnWire.addEventListener("click", () => setMode("wire", btnWire));
  btnXray.addEventListener("click", () => setMode("xray", btnXray));

  function setMode(mode, btn) {
    renderMode = mode;
    [btnGold, btnWire, btnXray].forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  btnToggleRotate.addEventListener("click", () => {
    autoRotate = !autoRotate;
    btnToggleRotate.textContent = autoRotate ? "⏸ Pausar Giro" : "▶ Reanudar Giro";
  });

  sliderScale.addEventListener("input", (e) => {
    zoomScale = parseFloat(e.target.value);
  });

  sliderLight.addEventListener("input", (e) => {
    lightAngleDeg = parseFloat(e.target.value);
  });

  sliderWireDensity.addEventListener("input", (e) => {
    wireResolution = parseInt(e.target.value, 10);
  });

  // Eventos de ratón para rotación 3D
  canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;

    angleY += deltaX * 0.01;
    angleX += deltaY * 0.01;
    // Limitar inclinación en X
    angleX = Math.max(-0.6, Math.min(0.6, angleX));
  });

  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    zoomScale += e.deltaY * -0.0015;
    zoomScale = Math.max(0.5, Math.min(2.0, zoomScale));
    sliderScale.value = zoomScale;
  });

  // Geometría paramétrica del Poporo Quimbaya: perfil de revolución
  // Generamos puntos (y, radius) a lo largo del eje central
  function getPoporoProfile() {
    const steps = 70;
    const profile = [];
    const height = 300; // altura total gráfica

    for (let i = 0; i <= steps; i++) {
      const t = i / steps; // 0 (superior) a 1 (base)
      const y = (t - 0.5) * height; // centrado en Y

      let r = 0;
      if (t < 0.05) {
        // Boca y cuello superior
        r = 16 + (t / 0.05) * 6;
      } else if (t >= 0.05 && t < 0.38) {
        // Esfera / bulbo superior
        const localT = (t - 0.05) / 0.33; // 0 a 1
        r = 22 + Math.sin(localT * Math.PI) * 44;
      } else if (t >= 0.38 && t < 0.46) {
        // Cuello / cintura ergonómica
        const localT = (t - 0.38) / 0.08;
        r = 30 - Math.sin(localT * Math.PI) * 7;
      } else if (t >= 0.46 && t < 0.82) {
        // Bulbo inferior cuatripartito
        const localT = (t - 0.46) / 0.36;
        r = 28 + Math.sin(localT * Math.PI) * 56;
      } else if (t >= 0.82 && t <= 1.0) {
        // Pedestal y base cónica
        const localT = (t - 0.82) / 0.18;
        r = 30 + localT * 18;
      }

      profile.push({ y, r });
    }
    return profile;
  }

  const profile = getPoporoProfile();

  // Bucle de animación 60 FPS
  function renderLoop() {
    if (autoRotate && !isDragging) {
      angleY += 0.012;
    }

    drawScene();
    requestAnimationFrame(renderLoop);
  }

  function drawScene() {
    // Redimensionar canvas manteniendo aspect ratio
    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = canvas.parentElement.clientHeight;

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 + 10;
    const baseScale = (Math.min(width, height) / 380) * zoomScale;

    // Dirección de la luz
    const lightRad = (lightAngleDeg * Math.PI) / 180;
    const lightDir = {
      x: Math.cos(lightRad),
      y: -0.4,
      z: Math.sin(lightRad)
    };
    // Normalizar vector luz
    const lightLen = Math.hypot(lightDir.x, lightDir.y, lightDir.z);
    lightDir.x /= lightLen;
    lightDir.y /= lightLen;
    lightDir.z /= lightLen;

    // Calcular mallas poligonales en 3D
    const segments = wireResolution;
    const rings = profile.length;
    const grid = [];

    for (let i = 0; i < rings; i++) {
      const ring = [];
      const { y, r } = profile[i];

      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI * 2 + angleY;
        
        // Modulación cuatripartita en la esfera inferior
        let radiusMod = r;
        if (i > 30 && i < 58) {
          // 4 lóbulos Quimbaya
          const lobeWave = Math.cos(phi * 4) * 3.5;
          radiusMod += lobeWave;
        }

        // Posición tridimensional original
        let px = radiusMod * Math.cos(phi);
        let py = y;
        let pz = radiusMod * Math.sin(phi);

        // Rotar alrededor de X (inclinación cenital)
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const pyRot = py * cosX - pz * sinX;
        const pzRot = py * sinX + pz * cosX;

        // Proyección ortográfica / perspectiva suave
        const perspective = 700 / (700 + pzRot);
        const screenX = centerX + px * baseScale * perspective;
        const screenY = centerY + pyRot * baseScale * perspective;

        ring.push({
          x: screenX,
          y: screenY,
          z: pzRot,
          nx: Math.cos(phi),
          ny: 0,
          nz: Math.sin(phi)
        });
      }
      grid.push(ring);
    }

    // Dibujar sombra en el suelo
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 160 * baseScale, 75 * baseScale, 20 * baseScale, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.filter = "blur(10px)";
    ctx.fill();
    ctx.restore();

    // Dibujar aguja ceremonial / alfiler
    drawPin(centerX, centerY, baseScale);

    // Dibujar cuadriláteros / anillos
    for (let i = 0; i < rings - 1; i++) {
      for (let j = 0; j < segments; j++) {
        const p1 = grid[i][j];
        const p2 = grid[i][j + 1];
        const p3 = grid[i + 1][j + 1];
        const p4 = grid[i + 1][j];

        // Backface culling en modo oro
        const avgZ = (p1.z + p2.z + p3.z + p4.z) / 4;
        const isBack = avgZ < 0;

        if (renderMode === "wire") {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          ctx.strokeStyle = isBack ? "rgba(245, 194, 66, 0.15)" : "rgba(245, 194, 66, 0.75)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else if (renderMode === "xray") {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          ctx.fillStyle = isBack ? "rgba(20, 160, 220, 0.05)" : "rgba(20, 180, 240, 0.15)";
          ctx.fill();
          ctx.strokeStyle = "rgba(100, 220, 255, 0.35)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          // Modo Oro Realista con sombreado de Lambert
          if (isBack) continue; // Culling para sólidos

          const dotLight = Math.max(0.1, (p1.nx * lightDir.x + p1.nz * lightDir.z));
          const brightness = Math.min(1, dotLight * 1.3);

          const rCol = Math.round(180 + brightness * 75);
          const gCol = Math.round(130 + brightness * 95);
          const bCol = Math.round(30 + brightness * 50);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          ctx.fillStyle = `rgb(${rCol}, ${gCol}, ${bCol})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(${rCol + 20}, ${gCol + 20}, ${bCol}, 0.2)`;
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      }
    }
  }

  function drawPin(cx, cy, scale) {
    const pinTopY = cy - 220 * scale;
    const pinBotY = cy + 50 * scale;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - 2 * scale, pinBotY);
    ctx.lineTo(cx - 2 * scale, pinTopY);
    ctx.lineTo(cx + 2 * scale, pinTopY);
    ctx.lineTo(cx + 2 * scale, pinBotY);
    ctx.closePath();

    if (renderMode === "wire") {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 1;
      ctx.stroke();
    } else if (renderMode === "xray") {
      ctx.fillStyle = "rgba(100, 240, 255, 0.5)";
      ctx.fill();
    } else {
      const grad = ctx.createLinearGradient(cx - 2, 0, cx + 2, 0);
      grad.addColorStop(0, "#c49015");
      grad.addColorStop(0.5, "#fff8d6");
      grad.addColorStop(1, "#8a5800");
      ctx.fillStyle = grad;
      ctx.fill();

      // Esfera cabezal del alfiler
      ctx.beginPath();
      ctx.arc(cx, pinTopY, 6 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#ffe066";
      ctx.shadowColor = "rgba(245, 194, 66, 0.8)";
      ctx.shadowBlur = 12;
      ctx.fill();
    }
    ctx.restore();
  }

  renderLoop();
}
