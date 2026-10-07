# NEON VELOCITY — 2D Cyberpunk Light Bikes

Videojuego web inspirado en las carreras de motos de luz de estética retro-futurista.

## Características

- HTML + CSS + JavaScript puro.
- Canvas 2D, sin frameworks.
- Controles **WASD**.
- **3 vidas**.
- Score + récord guardado en `localStorage`.
- Motos luminosas y estelas que funcionan como obstáculos.
- Enemigos con IA sencilla.
- Colisiones, partículas, explosiones, pantalla de inicio y Game Over.
- Arte cyberpunk generado mediante CSS/Canvas y SVG.
- Responsive para escritorio y pantallas pequeñas.

## Ejecutar

Abre `index.html` en un navegador.

También puedes publicarlo directamente con **GitHub Pages**.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Crear Neon Velocity"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Después, en GitHub:
**Settings → Pages → Deploy from a branch → main → / (root)**.

## Estructura

```text
tron-cyber-bikes/
├── index.html
├── style.css
├── game.js
├── README.md
└── assets/
    ├── player-bike.svg
    ├── enemy-bike.svg
    └── cyberpunk-scene.svg
```

Las imágenes SVG incluidas son editables y no dependen de servidores externos.
