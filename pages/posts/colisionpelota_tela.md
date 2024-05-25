---
title: Colisión tela - esfera
description: Realizar una simulación utilizando las diferentes estructuras de Masa Muelle y aplicar sobre ellas fuerzas para ver su reacción ante estas. 
tag: tema3
author: Jordi Beltran
---
<div style="text-align: justify;">
Partiendo del ejercicio de banderas, donde creábamos tres mallas, ahora crearemos una malla y añadiremos una clase Ball.

Lo que vamos a realizar en esta simulación, es ver como la reacciona la malla al caer sobre un objeto y de las distintas formas que reacciona segun el tipo de malla que estemos utilizando.

Definimos una clase **Ball** y un método **BallCollision**.

````java
  void ballCollision(Ball b){
    for(int i = 0; i < N_H; i++)
    {
      for(int j = 0; j < N_V; j++)
      {
        float d = PVector.sub(_nodes[i][j]._s, b._s).mag();
        
        if(d < b._r)
        {
          PVector n = PVector.sub(_nodes[i][j]._s, b._s);
          float l = n.mag();
          n.normalize();

          float Fe = (d - b._r) * _ke;
          PVector F_esfera = PVector.mult(n, Fe);
          PVector F_malla = PVector.mult(n, -Fe);

          _nodes[i][j].addExternalForce(F_malla);
        }
      }
    }    
  }
````

Se realiza de forma similar a la colisión en el modelo de velocidades pero en este caso en una escena 3D.

Llamamos a esta función en ```updateSimulation()```:
```java
void updateSimulation()
{
   malla.update(_timeStep);
   b.update(_timeStep);
   malla.ballCollision(b);

   _simTime += _timeStep;
}
````
Hay varios parámetros configurables en la simulación mediante teclado:
- **Gravedad**: activar y desactivar la gravedad con la tecla **G**.
- **Nodos fijos**: activar y desactivar si hay nodos fijos en la malla con la tecla **C** (para esto se reinicia la simulación).
- **Tipo de malla**: cambiar entre los tipos de malla disponibles con las teclas **1 a 4**.
- **Modo de dibujado**: cambiar el tipo de dibujado de la malla con segmentos o quads con la tecla **D**.

A continuación, se muestra un vídeo del resultado de esta simulación:
</div>
<div align="center">

<iframe width="560" height="315" src="https://www.youtube.com/embed/qxQEuaWSaNg?si=RQN1HGz_oZ35aAGe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

</div>
