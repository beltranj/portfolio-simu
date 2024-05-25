---
title: Movimiento circular
description: Simular el movimiento de una bola alrededor de un punto situado a una distancia r de la bola. Dará una vuelta por segundo.
tag: tema1
author: Jordi Beltran
---
El movimiento circular uniforme describe el movimiento de una partícula alrededor de un punto central. Para ello utilizamos varias variables:
 - **c:** es la posición del centro entorno al que gira la partícula
 - **T:** es el periodo. El tiempo necesario para que la partícula dé una vuelta
 - **w:** es la velocidad angular. Representa la velocidad a la que la partícula se desplaza a lo largo de la circunferencia del círculo
 - **p:** es la partícula.

El movimiento de la partícula se realiza de la siguiente manera:
```
p.x = c.x + radio * cos(w * tiempo); // Coordenada x
p.y = c.y + radio * sin(w * tiempo); // Coordenada y
```
Para controlar la simulación, esta tiene unos controles muy básicos. Con las teclas +/- podemos aumentar/decrementar el período de la partícula, esto afectará a la velocidad angular de la partícula y en consecuencia a la rapidez con la que se mueve alrededor del círculo. Con la tecla **R** podemos restaurar el valor del periodo a 1.

<div align="center">

<iframe src="https://editor.p5js.org/beltranj/full/Jw_HSLvHr" width="600" height="645"></iframe>

<br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/nXZuzDWddVk?si=KRytwB0zswpFCZxn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

</div>