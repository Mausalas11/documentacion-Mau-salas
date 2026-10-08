---
layout: default
title: "Uso de la IA"
nav_order: 6
---

# NEON VELOCITY

## Descripción del proyecto

**Neon Velocity** es un videojuego 2D desarrollado utilizando HTML, CSS y JavaScript. El concepto está inspirado en las motocicletas de luz de las películas y videojuegos de ciencia ficción, incorporando una estética cyberpunk basada en colores neón, efectos de iluminación y una cuadrícula futurista.

El objetivo principal del jugador es controlar una motocicleta de luz, evitar las colisiones y utilizar las estelas luminosas para provocar que los enemigos choquen contra ellas.

## Tecnologías utilizadas

Para desarrollar el videojuego se utilizaron principalmente tres tecnologías:

* **HTML5:** estructura de la página y elementos del juego.
* **CSS3:** diseño visual, colores, botones, interfaz y estética cyberpunk.
* **JavaScript:** programación de la lógica, movimiento, enemigos, colisiones, vidas, puntuación y animaciones.
* **Canvas 2D:** representación gráfica del escenario, motocicletas, estelas, partículas y efectos visuales.
* **GitHub Pages:** publicación del videojuego en Internet.

## Uso de Inteligencia Artificial

Durante el desarrollo del videojuego se utilizó Inteligencia Artificial como herramienta de apoyo para el proceso de programación.

La IA ayudó principalmente a generar una primera versión de la estructura del proyecto, proponer código en HTML, CSS y JavaScript, desarrollar la lógica de movimiento de las motocicletas y crear diferentes efectos visuales relacionados con la estética cyberpunk.

El proceso no consistió únicamente en copiar el código generado. El código fue revisado, organizado y adaptado para que funcionara dentro del repositorio de GitHub y pudiera ejecutarse mediante GitHub Pages.

También se utilizó la IA para plantear diferentes elementos visuales, como las motocicletas futuristas, las estelas de luz, los efectos de partículas, el fondo con cuadrícula y la interfaz del marcador.

## Funcionamiento del juego

El jugador controla la motocicleta utilizando las teclas:

**W:** movimiento hacia arriba.

**A:** movimiento hacia la izquierda.

**S:** movimiento hacia abajo.

**D:** movimiento hacia la derecha.

El jugador comienza con **tres vidas**.

Cada vez que la motocicleta choca contra una pared, una estela de luz o un obstáculo, pierde una vida.

Cuando las tres vidas se terminan, aparece la pantalla de **Game Over**.

## Sistema de puntuación

El juego cuenta con un sistema de puntuación.

El jugador obtiene puntos mientras permanece dentro del escenario y puede conseguir puntos adicionales cuando una motocicleta enemiga choca contra una estela.

Además, el juego guarda automáticamente la puntuación más alta utilizando `localStorage`, por lo que el récord permanece almacenado en el navegador.

## Enemigos

Los enemigos aparecen desde diferentes zonas del escenario.

Cada enemigo posee:

* Una motocicleta de color diferente.
* Una velocidad propia.
* Una dirección de movimiento.
* Una estela luminosa.
* Un sistema básico de inteligencia artificial.

La IA de los enemigos permite que cambien de dirección y recorran diferentes zonas del escenario.

## Efectos visuales

Para conseguir el estilo cyberpunk se utilizaron diferentes efectos gráficos mediante Canvas y CSS.

Entre ellos se encuentran:

* Luces de neón.
* Efecto Glow.
* Cuadrícula futurista.
* Partículas.
* Explosiones.
* Estelas luminosas.
* Efectos de pantalla.
* Colores cian, rosa y morado.
* Animaciones de movimiento.

Estos efectos permiten crear una estética inspirada en ambientes futuristas y videojuegos de ciencia ficción.

## Estructura del proyecto

El videojuego está dividido en tres archivos principales:

```text
juego/
│
├── index.html
├── style.css
└── game.js
```

### index.html

Contiene la estructura principal del videojuego, incluyendo el Canvas, el marcador, las vidas, la pantalla inicial y la pantalla de Game Over.

### style.css

Controla la apariencia visual del juego. Aquí se encuentran los estilos relacionados con la interfaz, botones, colores, tipografías, paneles y diseño responsive.

### game.js

Contiene la programación principal del videojuego.

En este archivo se encuentran:

* Movimiento del jugador.
* Movimiento de enemigos.
* Colisiones.
* Sistema de vidas.
* Sistema de puntuación.
* Récord.
* Partículas.
* Estelas.
* Inteligencia artificial.
* Animaciones.
* Game Loop.

## Publicación mediante GitHub Pages

Después de desarrollar y probar el videojuego, los archivos fueron incorporados al repositorio de GitHub.

GitHub Pages permite convertir el repositorio en un sitio web accesible desde Internet.

La página del videojuego se encuentra dentro de la carpeta `juego`, por lo que puede accederse mediante:

**https://mausalas11.github.io/documentacion-Mau-salas/juego/**

De esta manera, el proyecto no necesita un servidor externo para funcionar.

## Conclusión

El desarrollo de Neon Velocity permitió aplicar conocimientos de HTML, CSS y JavaScript en la creación de un videojuego interactivo. La Inteligencia Artificial funcionó como una herramienta de apoyo para generar ideas, código y soluciones durante el proceso de desarrollo. Finalmente, el proyecto fue integrado y publicado mediante GitHub Pages para que pudiera ejecutarse directamente desde un navegador web.
