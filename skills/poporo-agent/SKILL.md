---
name: poporo-agent
description: |
  Official OpenDesign workflow skill to build and maintain the Poporo Quimbaya museum presentation, 3D Canvas parametric engine, and Open Hardware deliverables.
triggers:
  - "poporo design"
  - "quimbaya gold"
  - "poporo open design"
  - "heritage 3d"
od:
  mode: prototype
  category: web-artifacts
  craft:
    requires: [typography, color, anti-ai-slop]
  design_system:
    requires: true
    ref: "quimbaya-gold"
---

# poporo-agent

Use this skill in **OpenDesign** (`nexu-io/open-design`) to orchestrate:
1. **Museum Presentation:** Deploying high-fidelity, interactive, responsive showcases.
2. **Parametric 3D Hardware:** Rendering and calculating exact physical measurements of the Poporo (235mm, 777.7g).
3. **CI/CD Integration:** Maintaining `.github/workflows/deploy.yml` for automated GitHub Pages distribution.
