---
title: Partícula flotante
description: Realizar una simulación utilizando las diferentes estructuras de Masa Muelle y aplicar sobre ellas fuerzas para ver su reacción ante estas. 
tag: tema2
author: Jordi Beltran
---

Este proyecto implementa una simulación de una partícula flotando en un fluido, considerando el volumen de la partícula y la densidad del líquido. Podemos observar cómo la partícula se mueve y responde a las fuerzas de flotación y gravedad.

En esta simulación, estamos calculando el volumen de una partícula con las siguientes formulas:

<div style="background-color:#FFFFFF; padding: 20px; border-radius: 14px; box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);">
    <img src="/images/flotacion.png">
</div>

<br>

En el caso de que la pelota supere el centro de la pantalla, se cambia el cálculo del volumen, una vez vuelva a la superfície vuelve a cambiarse el cálculo del volumen. Esto es así indefinidamente ya que no hay fuerzas de rozamiento que vayan frenando la partícula.

¿Que fuerzas contribuyen a la partícula flotante en este ejercicio?
- **Fuerza de flotación:** se aplica con un volumen u otro dependiendo de si la partícula esta sumergida o no.
- **Fuerza gravitatoria.**

<div align="center">

<iframe src="https://editor.p5js.org/beltranj/full/ZVtBeTyoX" width="640" height="360"></iframe>

<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/AFkDD_EeLsc?si=K0LDPyfHStyQCs3j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
