---
title: Practica 2 - Sistema de partículas
description: Simular un fenómeno físico utilizando un sistema de particulas mediante integración númerica y analizar el comportamiento y complejidad computacional en este.
tag: tema2
author: Jordi Beltran
---
Se desea simular una hoguera con humo y para esto necesitamos un sistema de partículas que emita partículas de abajo a arriba.

Para esta práctica, vamos a utilizar:
- Clase **Particle**.
Dónde se define el comportamiento de una partícula única. Se calculan los siguientes atributos:
  - Posición
  - Velocidad
  - Aceleración
  - Fuerzas

Además, la clase se encarga de renderizar la partícula. Para actualizar los frames de la simulación, se utiliza el método de Euler Simpléctico.

- Clase **ParticleSystem**.
Se utiliza para manipular un número elevado de partículas de manera eficiente. Sus principales métodos son:

  - Añadir partículas al sistema.
  - Actualizar partículas: Llama a updateSimulation de cada partícula mediante un bucle for.
  - Renderizar todas las partículas.

Hay varios parámetros modificables en la simulación como son:
  - el uso o no de textura para las particulas
  - aumentar/decrementar el paso de simulación
  - aumentar/decrementar el tiempo de vida 
  - aumentar/decrementar el número de partículas.

<div align="center" >
  <iframe src="https://editor.p5js.org/beltranj/full/f_MOSwSOC" allowfullscreen style="width: 500px; height: 555.25px;"></iframe>

  <a href="../../pr2.pdf" target="_blank" 
type="application/octet-stream" download="Memoria_Pr2"><i class="fa-solid fa-download fa-bounce"></i> Descargar memoria</a>
</div>
