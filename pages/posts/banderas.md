---
title: Banderas
description: Realizar una simulación utilizando las diferentes estructuras de Masa Muelle y aplicar sobre ellas fuerzas para ver su reacción ante estas. 
tag: tema3
author: Jordi Beltran
---

<div style="text-align: justify;">
Este código implementa la simulación de objetos deformables en concreto, la simulación de tres mallas con diferentes estructuras sobre las que aplicamos fuerzas externas para ver cual es su comportamiento.

En este ejercicio, creamos tres mallas con estructuras:
- **STRUCTURED**: Es el esqueleto básico de la malla, las partículas que conforman la malla estan unidas con muelles.
- **STRUCTURED AND SHEAR**: Se combina el esqueleto básico con la transmisión lateral de energía. En el primer caso estabamos, uniendo mediante muelles unicamente las partículas de arriba, abajo, izquierda y derecha, sino también las partículas en diagonal
- **STRUCTURED AND BEND**: Se combina el esqueleto básico con un método antiarrugas que consiste en unir además las partículas que forman la malla con las que estan a una distancia de dos unidades.

### Aplicación de fuerzas externas:

Para ver el comportamiento de estas mallas en condiciones fisicas se simulan la fuerza gravitatoria y una fuerza viento.

Para calcular como afecta un viento básico sobre cada uno de los nodos de la malla hemos implementado la siguiente función:

```java
PVector calculateWindForce(PVector normal){
    
    PVector windNormalized = wind_direction.normalize();
    float windModulo = PVector.dot(normal, windNormalized);
    PVector windForce = PVector.mult(wind_direction, windModulo);

    return windForce;
}
```

Calculamos las normales de los parches que rodean el vertíce de la malla y realizamos el promedio. Con la normal promedio aplicamos la funcion de calcular la fuerza Viento.

La fuerza gravitatoria se aplica como:
``` gravity.set(0, 0, -G * PARTICLE_MASS);```
y esta se aplica sobre cada uno de los nodos de la malla al activar la gravedad (Tecla G).

La fuerza viento también puede activarse y desactivarse (Tecla W).

A continuación, se muestra un vídeo del resultado de esta simulación:
</div>

<div align="center">

<iframe width="560" height="315" src="https://www.youtube.com/embed/KKAOhdAr95E?si=0XtK2y1BPz2oEOo9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

</div>
