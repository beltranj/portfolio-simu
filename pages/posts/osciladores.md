---
title: Osciladores
description: Animar el movimiento de una partícula a velocidad v sobre las dos funciones oscilatorias.
tag: tema1
author: Jordi Beltran
---
Un oscilador es una función **y = f(x)** que devuelve una onda a una frecuencia. En este ejercicio implementamos dos funciones oscilatorias:
    - **y = sin(x) * exp(-0.002x)**
    - **y = 0.5sin(3x) + 0.5sin(3.5x)**

 Para animar el movimiento de una partícula sobre estas funciones utilizamos:
 - **````ArrayList<PVector> particula_posiciones````** dónde vamos añadiendo todas las posiciones de la partícula, con la finalidad de unirlas y ver la trayectoria de la función oscilatoria
 - **particula** será la partícula a la que se aplique la funcion oscilatoria

El movimiento de la partícula se realiza de la siguiente manera:
```
particula.x += SIM_STEP;
if(type == 1)
    particula.y = particula.y + (3*(0.5 * sin(3 * particula.x) + 0.5 *  sin(3.5 * particula.x)));
else if(type == 2)
    particula.y = particula.y + ( sin(particula.x) * exp(-0.002 * particula.x));
```
Para controlar la simulación, esta tiene unos controles muy básicos. Podemos cambiar de función oscilatoria con (1) **y = sin(x) * exp(-0.002x)** (2) **y = 0.5sin(3x) + 0.5sin(3.5x)** con +/- podemos aumentar y disminuir el paso de simulación y con (R) reiniciar la simulación

<div align="center">

<iframe src="https://editor.p5js.org/beltranj/full/bj4AXu49z" width="600" height="645"></iframe>

<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/urubeJxCnVs?si=uC40ecXSOUxmYPlu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

</div>