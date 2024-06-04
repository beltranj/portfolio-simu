---
title: Practica 3 - Gestión eficiente de Interacciones entre partículas
description: Implementación de un sistema de partículas con interacciones entre las partículas que lo forman y creación de estructuras de datos para la gestión eficiente de las colisiones entre las partículas
tag: tema2
author: Jordi Beltran
---

Esta práctica se divide en dos partes:
1. Implementación de un **modelo de colisiones basado en velocidades**
2. Implementación de un **modelo basado en muelles asimétricos**

## Modelo de colisiones basado en velocidades - Billar Francés

Se implementa el modelo de colisiones basado en velocidades tanto entre partículas como partícula plano.

Para el manejo de las colisiones en esta simulación, utilizamos dos metódos, uno para la colisión partícula-partícula y otro método para la colisión partícula-plano. Podemos ver como ambos métodos se asemejan mucho. Pero el modelo para la colisión partícula-plano incluye algunas comprobaciones que explicaremos a continuación.

**Método para manejar la colisión partícula-partícula**
```java
 void particleCollision(float timeStep){

      for(int i = 0; i < _ps.getNumParticles(); i++){
         Particle p = _ps.getParticleArray().get(i);
         
         // Comprobar que la partícula no sea ella misma
         if(p._id != _id){
            // Paso 1 - Comprobar si hay colisión (distancia entre centros es menor que la suma de los radios)
            float distancia = PVector.dist(_s, p._s);
            float suma_radios = _radius + p._radius;

            if(distancia < suma_radios){
               // Paso 2 - Restitución --> Ha habido una colision
               float dist_restitucion = suma_radios - distancia;
               // Mirar la normal de la colisión
               PVector normal = PVector.sub(_s, p._s).normalize(); // no se si es asi
               // Incrementar la posición de la partícula
               PVector incremento = PVector.mult(normal, dist_restitucion);
               _s = PVector.add(_s, incremento);

               // Paso 3 - Velocidad de salida
               // 1 - Velocidad normal
               float v_n_escalar = PVector.dot(_v, normal);
               PVector v_n_vector = PVector.mult(normal, v_n_escalar);
               // 2 - Velocidad tangencial
               PVector v_t = PVector.sub(_v, v_n_vector);
               // 3 - Velocidad resultante
               PVector v_salida = PVector.mult(v_n_vector, Cr2);
               v_salida = PVector.sub(v_t, v_salida);

               // Actualizar la velocidad a la partícula
               _v = v_salida;
            }
         }
      }
   }
```
**Método para manejar la colisión partícula-plano**
Cómo hemos dicho anteriormente, este método incluye una serie de comprobaciones al inicio. Esta comprobaciones sirven para detectar que la partícula siga estando dentro del plano y sino la reubique dentro de este. Se pueden producir estas salidas del tablero debido al método que calcula la posición, velocidad y aceleración y también por el paso de simulación empleado.

```java
void planeCollision(ArrayList<PlaneSection> planes) {
      
      float dist_restitucion = 0;

      for (int i = 0; i < planes.size(); i++) {
         
         float distancia = planes.get(i).getDistance(_s);

         // Calcular distancia que debe salir la partícula tras la colisión en el plano
         if((distancia < _radius && planes.get(i).checkLimits(_s)))
            dist_restitucion = _radius - distancia;
         else if(!planes.get(i).checkSide(_s))
            dist_restitucion = _radius + distancia;
         

         if((distancia < _radius && planes.get(i).checkLimits(_s)) ||(!planes.get(i).checkSide(_s))){

            PVector n = planes.get(i).getNormal();

            // COLISION --> SIGUIENTE PASO (RESTITUCION)
            // Incremento de s * normal
            PVector incremento = PVector.mult(n, dist_restitucion);
            _s = PVector.add(_s, incremento);

            // ULTIMO PASO (VELOCIDAD DE SALIDA DE LA PARTÍCULA), calcular la velocidad de salida de la partícula tras la colisión

            // 1 - Velocidad normal
            float v_n_escalar = PVector.dot(_v, n);
            PVector v_n_vector = PVector.mult(n, v_n_escalar);
            
            // 2 - Velocidad tangencial
            PVector v_t = PVector.sub(_v, v_n_vector);

            // 3 - Velocidad resultante
            PVector v_salida = PVector.mult(v_n_vector, Cr1);
            v_salida = PVector.sub(v_t, v_salida);

            // Actualizar la velocidad de la partícula
            _v = v_salida;
         }
      }
   }
```

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/rkpXpWtjbr0?si=kFBfFMjXcAj0CWmx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Modelo de colisiones basado en muelles asimétricos y utilizando estructuras de datos


En este modelo, se utilizan dos estructuras de datos: **Grid** y **Hash**. La simulación muestra que al aumentar el **número de partículas**, el **tiempo de computación** también aumenta. Sin embargo, al utilizar estas estructuras de datos, se mejora significativamente el tiempo de computación.

### Comparativa de Estructuras de Datos
- Grid: Almacena todas las celdas de la ventana.
- Hash: Solo almacena las celdas donde hay partículas.

Ambas estructuras tienen el mismo coste computacional, pero Hash es más eficiente, ya que solo utiliza las celdas en las que realmente hay alguna partícula. No como con Grid que almacena todas las celdas de la pantalla.

> Nota: El cálculo de Hash para 8 vecinos aumenta el coste computacional en comparación con 4 vecinos.

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/sbcsAyQyKqw?si=Xy8XXfr3B53inBoJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<a href="../../pr3.pdf" target="_blank" 
type="application/octet-stream" download="Memoria_Pr3"> <i class="fa-solid fa-download fa-bounce"></i> Descargar memoria</a>
</div>