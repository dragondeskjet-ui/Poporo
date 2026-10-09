# Poporo Quimbaya: Open Design & Digital Heritage Specification

> **Licencia:** Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC BY-SA 4.0)  
> **Iniciativa:** Red de Preservación y Fabricación Digital de Patrimonio Precolombino  
> **CI/CD:** Despliegue automatizado con GitHub Actions

---

## 1. Introducción: El Poporo Quimbaya
El **Poporo Quimbaya** es una de las piezas cumbres de la orfebrería universal precolombina. Hallado en Yarumal, Antioquia (1930) y adquirido en 1939 por el Banco de la República como la **Pieza No. 00001**, fundó las colecciones del legendario **Museo del Oro de Bogotá**.

Perteneciente al **Periodo Quimbaya Clásico (c. 300 – 800 d.C.)**, el objeto servía como recipiente ritual para almacenar cal viva obtenida de conchas marinas o rocas calizas, la cual se mezclaba mediante un alfiler ceremonial con hojas de coca (*mambeo*) para extraer sus alcaloides durante asambleas de pensamiento y gobierno espiritual.

---

## 2. Paradigma de Open Design (Diseño Abierto) aplicado al Patrimonio
Tradicionalmente, las piezas arqueológicas permanecen confinadas a vitrinas museográficas inaccesibles o sujetas a derechos de propiedad restrictivos. La filosofía del **Open Design** subvierte esta limitación mediante:

1. **Digitalización Paramétrica:** Vectorización de perfiles esferoidales y generación de mallas volumétricas computacionales.
2. **Fabricación Distribuida:** Capacidad de reproducir réplicas educativas a escala 1:1 en colegios, laboratorios FABLAB y universidades usando manufactura aditiva (impresión 3D FDM/SLA) y bio-resinas.
3. **Ergonomía Ancestral:** Estudio de la distribución de masas, centro de gravedad y adaptación palmar que los orfebres Quimbayas perfeccionaron sin herramientas computacionales.
4. **Respeto y Divulgación Ética:** Reconocimiento indisoluble a los pueblos originarios y a la cosmovisión del mambeo como acto sagrado de diálogo y reflexión.

---

## 3. Especificaciones Técnicas y Morfología
- **Altura Total:** 235 mm
- **Diámetro Máximo:** 114 mm
- **Masa Original:** 777.7 gramos
- **Aleación:** Tumbaga (82.5% Au, 13.8% Cu, 3.7% Ag)
- **Técnica Ancestral:** Fundición a la cera perdida con vaciado por gravedad y enriquecimiento superficial por oxidación/decapado de cobre.
- **Tolerancias de Reproducción Open Hardware:** $\pm 0.2\text{ mm}$ en mallas poligonales optimizadas.

---

## 4. Pipeline de Integración Continua (GitHub Actions)
Este repositorio cuenta con un flujo de trabajo automatizado en `.github/workflows/deploy.yml`:
- **Lint & Integrity Check:** Valida la estructura de archivos estáticos y especificaciones JSON.
- **Continuous Deployment (CD):** Despliega la presentación interactiva en GitHub Pages a cada `push` sobre la rama `main`.
