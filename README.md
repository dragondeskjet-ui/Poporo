# Poporo Quimbaya — Open Design Initiative 🏺✨

> **Presentación Interactiva, Geometría Paramétrica y Patrimonio Abierto desplegado con GitHub Actions.**

Repositorio oficial: [https://github.com/dragondeskjet-ui/Poporo](https://github.com/dragondeskjet-ui/Poporo)  
Sitio en Vivo (GitHub Pages): [https://dragondeskjet-ui.github.io/Poporo/](https://dragondeskjet-ui.github.io/Poporo/)

---

## 🌟 Acerca del Proyecto

Este proyecto une la **orfebrería precolombina de Colombia** (Cultura Quimbaya Clásica, 300–800 d.C.) con los paradigmas del **Diseño Abierto (Open Design)**, la **fabricación digital** y la **entrega continua (CI/CD)**:

1. **Patrimonio Accesible:** Reinterpretación de la *Pieza No. 00001* del Museo del Oro de Bogotá bajo licencias Creative Commons (CC BY-SA 4.0).
2. **Simulador Paramétrico 3D:** Renderizado en tiempo real en Canvas HTML5 con modos Oro Realista, Wireframe CAD e inspección de Rayos X.
3. **Desglose Anatómico y Ergonómico:** Análisis de sus esferas, cuello de agarre, pedestal y alfiler ceremonial para el mambeo sagrado.
4. **Especificaciones Abiertas:** Archivo de datos estructurado en `data/open-design-spec.json` para modeladores 3D, ingenieros y creadores de Open Hardware.
5. **CI/CD con GitHub Actions:** Pipeline automatizado en `.github/workflows/deploy.yml` que valida archivos estáticos y publica automáticamente en **GitHub Pages**.

---

## 🚀 Estructura del Repositorio

```bash
Poporo/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Pipeline de CI/CD para GitHub Pages
├── css/
│   └── styles.css               # Diseño editorial, tokens de oro y responsive UI
├── js/
│   └── main.js                  # Motor 3D paramétrico y control interactivo
├── data/
│   └── open-design-spec.json    # Parámetros antropométricos y metalúrgicos FOSS
├── docs/
│   └── OPEN_DESIGN_SPEC.md      # Manifiesto y guía técnica de fabricación
├── index.html                   # Presentación web inmersiva
└── README.md                    # Documentación del proyecto
```

---

## 🛠️ Ejecución Local

Para visualizar la presentación en tu navegador:

```bash
# Servidor local rápido con Python 3:
python3 -m http.server 8080

# Abrir en el navegador:
http://localhost:8080
```

---

## ⚙️ Automatización (GitHub Actions)

El workflow se activa con cada `git push` a `main` o vía `workflow_dispatch`:
- **Job `lint-and-validate`:** Verifica la presencia de los recursos base y esquemas.
- **Job `deploy`:** Utiliza `actions/deploy-pages@v4` para publicar la web de forma segura y sin dependencias externas pesadas.

---

## 📜 Licencia

- **Código y Contenido:** Licenciado bajo [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) y MIT License.
- **Patrimonio Histórico:** Perteneciente a la memoria colectiva y ancestral de los pueblos indígenas del Cauca Medio y Colombia.
