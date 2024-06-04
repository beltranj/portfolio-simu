---
title: Practica 1 - Péndulo elástico bidimensional
description: Simular un fenómeno físico simple como es un péndulo utilizando los distintos métodos de integración númerica y analizar el comportamiento y estabilidad de cada uno de estos.
tag: tema1
author: Jordi Beltran
---

En la práctica 1, se considera una partícula de masa m, colgada de un punto fijo con un muelle dada su constante elastica y longitud de reposo.

Para realizar el movimiento de los muelles vamos a hacerlo mediante ecuaciones diferenciales utilizando los diferentes métodos de integración númerica.

Entre estos están:
- **Euler explícito**
```java
void updateSimulationExplicitEuler()
{
   // s(t+h) = s(t) + h*v(t)
   // v(t+h) = v(t) + h*a(s(t),v(t))

   _a = calculateAcceleration(_s, _v); // a partir de x y dx/dy (velocidad) calculamos y
   _s.add(PVector.mult(_v, _timeStep)); // sumo la posicion anterior * el paso * velocidad
   _v.add(PVector.mult(_a, _timeStep));
}
```

- **Euler simpléctico**
```java
void updateSimulationSimplecticEuler()
{
   // Same as Explicit Euler, but calculating the velocity first, and then the position
   // v(t+h) = v(t) + h*a(s(t),v(t))
   // s(t+h) = s(t) + h*v(t)
   
  _a =  calculateAcceleration(_s, _v); 
  _v.add(PVector.mult(_a, _timeStep)); 
  _s.add(PVector.mult(_v, _timeStep));
}
```

- **Heun**
```java
void updateSimulationHeun()
{
   // s(t+h) = s(t) + h*( v(t) + v(t+h) ) / 2
   // v(t+h) = v(t) + h*a(s(t),v(t)) / 2

   // Calculate acceleration at current time
  PVector currentAccel = calculateAcceleration(_s, _v);
  
  // Predict next position and velocity using Euler's method
  PVector predicted_s = PVector.add(_s, PVector.mult(_v, _timeStep));
  PVector predicted_v = PVector.add(_v, PVector.mult(currentAccel, _timeStep));
  
  // Calculate acceleration at next time using predicted position and velocity
  PVector predicted_a = calculateAcceleration(predicted_s, predicted_v);
  
  // Take average of _a and acel2
  PVector average_acel = PVector.add(currentAccel, predicted_a);
  _a=PVector.div(average_acel, 2);
   
  PVector average_vel = PVector.add(_v, predicted_v);
  average_vel.div(2);
  
  // Update position and velocity using average acceleration
  _s.add(PVector.mult(average_vel, _timeStep));
  _v.add(PVector.mult(_a, _timeStep));
}
```

- **Runge-Kutta 2**
```java
void updateSimulationRK2()
{
   // timeStep = t
   // a(t) = k1v
   // v(t) = k1s

   // timeStep = t + h/2
   // s(t+h/2) = s(t) + h/2 * k1s
   // v(t+h/2) = v(t) + h/2 * k1v
   // a(t+h/2) = k2v

   // timeStep = t + h
   // s(t+h) = s(t) + h * k2s
   // v(t+h) = v(t) + h * k2v
   
   _a = calculateAcceleration(_s, _v);
   PVector k1v = PVector.mult(_a, _timeStep);
   PVector k1s = PVector.mult(_v, _timeStep);

   PVector s2 = PVector.add(_s, PVector.mult(k1s, 0.5));
   PVector v2 = PVector.add(_v, PVector.mult(k1v, 0.5));
   PVector k2v = PVector.mult(calculateAcceleration(s2, v2), _timeStep);
   PVector k2s = PVector.mult(v2, _timeStep);

   _s.add(k2s);
   _v.add(k2v);
}
```

- **Runge-Kutta 4**
```java

void updateSimulationRK4()
{
   // timeStep = t (k1)
   // a(t) = k1v
   // v(t) = k1s

   // timeStep = t + h/2 (k2)
   // s(t+h/2) = s(t) + h/2 * k1s
   // v(t+h/2) = v(t) + h/2 * k1v = k2s
   // a(t+h/2) = k2v

   // timeStep = t + h/2 (k3)
   // s(t+h/2) = s(t) + h/2 * k2s
   // v(t+h/2) = v(t) + h/2 * k2v = k3s
   // a(t+h/2) = k3v

   // timeStep = t + h (k4)
   // s(t+h) = s(t) + h * k3s
   // v(t+h) = v(t) + h * k3v = k4s
   // a(t+h) = k4v

   // Update the position and velocity
   // s(t+h) = s(t) + h/6 * (k1s + 2*k2s + 2*k3s + k4s)
   // v(t+h) = v(t) + h/6 * (k1v + 2*k2v + 2*k3v + k4v)
  
   // k1 
   _a = calculateAcceleration(_s, _v);
   PVector k1v = PVector.mult(_a, _timeStep);
   PVector k1s = PVector.mult(_v, _timeStep);

   // k2
   PVector s2 = PVector.add(_s, PVector.mult(k1s, 0.5*_timeStep));
   PVector v2 = PVector.add(_v, PVector.mult(k1v, 0.5*_timeStep));
   PVector k2v = calculateAcceleration(s2,v2);
   PVector k2s = v2;
  
   // k3
   PVector s3 = PVector.add(_s, PVector.mult(k2s, 0.5*_timeStep));
   PVector v3 = PVector.add(_v, PVector.mult(k2v, 0.5*_timeStep));
   PVector k3v = calculateAcceleration(s3,v3);
   PVector k3s = v3;
  
   // k4
   PVector s4 = PVector.add(_s, PVector.mult(k3s, _timeStep));
   PVector v4 = PVector.add(_v, PVector.mult(k3v, _timeStep));
   PVector k4v = calculateAcceleration(s4,v4);
   PVector k4s = v4;
  
   // Update the position and velocity
   PVector aux_ks = new PVector();
   aux_ks=PVector.add(k1s, k4s);
   aux_ks=PVector.add(aux_ks, PVector.mult(k2s, 2));
   aux_ks=PVector.add(aux_ks, PVector.mult(k3s, 2));
   aux_ks=PVector.mult(aux_ks, 1./6.*_timeStep);
   _s=PVector.add(_s, aux_ks);

   PVector aux_kv = new PVector();
   aux_kv=PVector.add(k1v, k4v);
   aux_kv=PVector.add(aux_kv, PVector.mult(k2v, 2));
   aux_kv=PVector.add(aux_kv, PVector.mult(k3v, 2));
   aux_kv=PVector.mult(aux_kv, 1./6.*_timeStep);
   _v=PVector.add(_v, aux_kv);

}
```
A continuación, se muestra la implementación de esta práctica con y sin rozamiento tal y como pedía el guión. Al final de la página se encuentra la memoria en formato PDF dónde se encuentran las gráficas comparativas entre los diferentes métodos.

<div align="center" >
  <h5>Sin rozamiento</h5>
  <iframe src="https://editor.p5js.org/beltranj/full/sG28mZDEI" allowfullscreen style="width: 500px; height: 555.25px;"></iframe>

  <h5>Con rozamiento (40 kg/s)</h5>
  <iframe src="https://editor.p5js.org/beltranj/full/p8OFIMD3z" allowfullscreen style="width: 500px; height: 555.25px;"></iframe>
</div>

<div align="center">
<a href="../../pr1.pdf" target="_blank" 
type="application/octet-stream" download="Memoria_Pr1">Descargar memoria</a>
</div>
