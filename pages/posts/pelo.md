---
title: Pelo
description: Realizar la simulación de cabellos 1D utilizando el modelo masa-muelle
tag: tema3
author: Jordi Beltran
---

<div style="text-align: justify;">
Este código implementa la simulación de objetos deformables en concreto, la simulación de cuerdas/cabellos en este caso se trata de un modelo masa-muelle 1D. Son partículas con masa despreciable unidas por muelles a las que se les aplican las fuerzas de Damping (amortiguación) y la fuerza elástica.

Se ha creado una clase Pelo en la que se establece la posición inicial del pelo, longitud de los muelles que lo conforman y el número de muelles que lo formarán.

En el programa principal, iteramos en un bucle for de **0** a **NPELOS** dónde creamos cada pelo dada su posición inicial (calculada de forma aleatoria sobre una elipse) y los almacenamos en un array de objetos Pelo.

Podemos interactuar con los pelos mediante eventos de ratón, podemos arrastrar para mover y estirar los muelles que forman los cabellos.
</div>

<div align="center">

<iframe src="https://editor.p5js.org/beltranj/full/wWxWXdVvb" width="700" height="800"></iframe>

</div>