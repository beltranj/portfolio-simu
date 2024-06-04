---
title: Practica 4 - Simulación de objetos deformables
description: Implementación de un objeto deformable tipo malla en forma de red de portería utilizando el modelo masa-muelle.
tag: tema3
author: Jordi Beltran
---

Esta práctica se compone de dos partes, una simulacion de un objeto deformable tipo malla en forma de red de portería y la simulación de olas mediante una estructura de datos llamada mapa de alturas.

## Problema 1 - Simulación de un objeto deformable sólido

Se va a crear una malla deformable formada por partículas unidas entre sí mediante muelles parecida a una portería. Al interactuar con una esfera en movimiento, esta va a tratar la colisión con la malla mediante muelles entre la esfera y las particulas de la malla con las que ha colisionado.

Se utilizan varios tipos de malla para poder ver las diferencias de comportamiento.

- **Structural**: Se unen las partículas en horizontal y vertical mediante muelles a la partícula más
próxima (distancia 1). Su elongación en reposo, por tanto, será la distancia de separación entre
partículas.

- **Shear**: Se unen las partículas en diagonal con las partículas más cercanas (a distancia 1), lo que
provoca una forma de “x”. Su elongación en reposo se obtiene mediante Pitágoras, hallando la
hipotenusa entre la distancia a las partículas adyacentes.

- **Bend**: Esta malla se forma uniendo las partículas a distancia 2. Por tanto, se creará un muelle cuya
elongación en reposo será del doble de la distancia que las separa.

- **Structural - Shear**: Se combina la distribución Structural y Shear.

- **Structural - Bend**: Se combina la distribución Structural y Bend.

- **Shear - Bend**: Se combina la distribución Shear y Bend

- **Structural - Shear - Bend**: Se combinan todas las distribuciones principales (Structural,
Shear y Bend).

A continuación veremos como es la interacción entre la bola y la malla deformable utilizando las diferentes estructuras y variando otros parámetros de la simulación.

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/_seZo5sjygY?si=0VUnrHQwP0Cjyonl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Problema 2 - Simulación cinemática de Olas

Se realiza una simulación cinemática de olas mediante un mapa de alturas, también conocido como HeightMap. Se trata de una estructura donde cada punto tiene una coordenada __(x, y, z)__.

Se pueden generar tres tipos de olas:

- **Directional Waves**: Generamos ondas que siguen un vector dirección D. Solo se genera movimiento en el eje vertical del mapa de alturas, las posiciones x e z no se modifican.

```java
class WaveDirectional extends Wave
{
  public WaveDirectional(float _a,PVector _srcDir, float _L, float _C)
  {
    super(_a, _srcDir, _L, _C);
  }
  
  public PVector getVariation(float x, float y, float z, float time)
  {
    // Solo existe variación en el eje Y (vertical)
    tmp.x = 0;
    tmp.z = 0;
    
    PVector dir = D.copy();
    dir.normalize();
    
    float p_Escalar = PVector.dot(new PVector(x,y,z),dir);

    tmp.y = -A * sin(p_Escalar*W + phi * time);
    return tmp;
  }
}
```

- **Radial Waves**: Son casi identicas a las direccionales, pero en este caso el vector D no indica dirección, sino el epicentro de la onda. Solo se modifica la altura.

```java
class WaveRadial extends Wave
{
  public WaveRadial(float _a,PVector _srcDir, float _L, float _C)
  {
    super(_a, _srcDir, _L, _C);
    _srcDir.normalize();
  }
  
  public PVector getVariation(float x, float y, float z, float time)
  {
    // Solo existe variación en el eje Y (vertical)
    float d_ep = dist(x, z, D.x, D.z);

    tmp.x = 0;
    tmp.y = -A * sin(W * d_ep + phi * time);
    tmp.z = 0;
    return tmp;
  }
}
```
- **Gerstner Waves**: Los modelos anteriores son demasiado perfectos y regulares, ahí es donde surgen las ondas Gerstner, parten de las direccionales pero ahora hay movimiento en los 3 ejes. Se introduce el parámetro Q que controla la inclinación de la cresta de la onda.

```java
class WaveGerstner extends Wave
{
  public WaveGerstner(float _a,PVector _srcDir, float _L, float _C)
  {
    super(_a, _srcDir, _L, _C);
  }
  
  public PVector getVariation(float x, float y, float z, float time)
  {
    // Recordar que Y es el eje vertical
    PVector dir = D.copy();
    dir.normalize();

    tmp.x = Q * A * dir.x * cos(W*(dir.x*x + dir.z*z) + time*phi);
    tmp.z = Q * A * dir.z * cos(W*(dir.x*x + dir.z*z) + time*phi);

    tmp.y = -A * sin(W*(dir.x*x + dir.z*z) + time*phi);
    
    return tmp;
  }
}
```
A continuación, el resultado de un fenómeno físico utilizando este tipos de ondas:
<div align="center">

<b>Mar en calma</b>
<iframe width="560" height="315" src="https://www.youtube.com/embed/5KItfujzey0?si=q2CkY9sQRgdi0oot" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<b>Mar con oleaje</b>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SBsK4HTYDlc?si=GGyEMOPZjMEcUu8f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<a href="../../pr4.pdf" target="_blank" 
type="application/octet-stream" download="Memoria_Pr4"> <i class="fa-solid fa-download fa-bounce"></i> Descargar memoria</a>

</div>

