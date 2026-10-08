---
layout: default
title: "06 · Brazo robótico"
nav_order: 5
permalink: /06-brazo/
---

# 06 — Brazo robótico controlado con Arduino

## Introducción

En este proyecto se diseñó y construyó un *brazo robótico de cuatro grados de movimiento* fabricado principalmente con piezas de MDF y controlado con un Arduino Uno. El objetivo fue lograr un sistema capaz de girar la base, modificar la altura del brazo, mover la sección superior hacia adelante o hacia atrás y abrir o cerrar la pinza.

Cada movimiento se controla manualmente mediante un potenciómetro independiente. Esto permite mover el brazo de forma intuitiva y observar de manera directa la relación entre una entrada analógica y el movimiento de un actuador.

## Objetivo

Construir un prototipo funcional de brazo robótico que permita:

- Girar la base.
- Subir y bajar el brazo.
- Mover el mecanismo hacia adelante y hacia atrás.
- Abrir y cerrar la pinza.
- Controlar cada movimiento mediante un potenciómetro.
- Manipular una pelota y coordinar una prueba con otro brazo robótico.

# Materiales

 <style>
.material-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin:20px 0}
.material-card{border:1px solid #d7dce1;border-radius:12px;padding:14px;background:#fff;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.05)}
.material-card svg{width:130px;height:95px;display:block;margin:0 auto 10px}
.material-card strong{display:block;font-size:1rem}
.material-card small{color:#5c6570}
.media-frame{width:100%;max-width:920px;border-radius:12px;border:1px solid #d7dce1;background:#111}
.caption{font-size:.92rem;color:#666;margin-top:6px}
</style>

<div class="material-grid">
  <div class="material-card">
    <svg viewBox="0 0 160 110" role="img" aria-label="Servomotor de 9 gramos">
      <rect x="45" y="40" width="70" height="48" rx="7" fill="#1676c4"/>
      <rect x="55" y="33" width="50" height="10" rx="3" fill="#0b4d83"/>
      <circle cx="80" cy="35" r="8" fill="#eee" stroke="#777" stroke-width="3"/>
      <rect x="76" y="10" width="8" height="27" rx="4" fill="#eee"/>
      <rect x="49" y="20" width="62" height="7" rx="3" fill="#eee"/>
      <path d="M110 72 C140 80 135 100 153 100" fill="none" stroke="#d23b31" stroke-width="4"/>
      <path d="M110 77 C135 84 132 104 153 104" fill="none" stroke="#7b3f16" stroke-width="4"/>
    </svg>
    <strong>4 servomotores 9 g</strong><small>Movimiento de los cuatro ejes</small>
  </div>

<div class="material-card">
    <svg viewBox="0 0 160 110" role="img" aria-label="Arduino Uno">
      <rect x="25" y="22" width="110" height="70" rx="7" fill="#159a9c"/>
      <rect x="48" y="41" width="48" height="28" rx="3" fill="#1f2c33"/>
      <rect x="19" y="38" width="25" height="28" rx="3" fill="#bfc6cb"/>
      <rect x="104" y="30" width="20" height="20" rx="2" fill="#27363d"/>
      <g fill="#e3d39f">
        <rect x="30" y="18" width="7" height="8"/><rect x="42" y="18" width="7" height="8"/><rect x="54" y="18" width="7" height="8"/><rect x="66" y="18" width="7" height="8"/><rect x="78" y="18" width="7" height="8"/><rect x="90" y="18" width="7" height="8"/><rect x="102" y="18" width="7" height="8"/><rect x="114" y="18" width="7" height="8"/>
        <rect x="35" y="88" width="7" height="8"/><rect x="47" y="88" width="7" height="8"/><rect x="59" y="88" width="7" height="8"/><rect x="71" y="88" width="7" height="8"/><rect x="83" y="88" width="7" height="8"/><rect x="95" y="88" width="7" height="8"/>
      </g>
    </svg>
    <strong>Arduino Uno</strong><small>Control del sistema</small>
  </div>

 <div class="material-card">
    <svg viewBox="0 0 160 110" role="img" aria-label="Power bank">
      <rect x="28" y="28" width="104" height="58" rx="13" fill="#2c3035"/>
      <rect x="39" y="39" width="58" height="36" rx="4" fill="#3c434a"/>
      <rect x="105" y="45" width="15" height="9" rx="2" fill="#dfe6eb"/>
      <circle cx="113" cy="67" r="4" fill="#65d480"/>
      <path d="M48 56 h27" stroke="#dfe6eb" stroke-width="4"/>
    </svg>
    <strong>Power bank para teléfono</strong><small>Fuente de energía portátil</small>
  </div>

  <div class="material-card">
    <svg viewBox="0 0 160 110" role="img" aria-label="Protoboard">
      <rect x="18" y="20" width="124" height="72" rx="7" fill="#f7f7f5" stroke="#bfc4c8" stroke-width="2"/>
      <g fill="#747b80">
        <circle cx="30" cy="34" r="1.8"/><circle cx="41" cy="34" r="1.8"/><circle cx="52" cy="34" r="1.8"/><circle cx="63" cy="34" r="1.8"/><circle cx="74" cy="34" r="1.8"/><circle cx="85" cy="34" r="1.8"/><circle cx="96" cy="34" r="1.8"/><circle cx="107" cy="34" r="1.8"/><circle cx="118" cy="34" r="1.8"/><circle cx="129" cy="34" r="1.8"/><circle cx="30" cy="46" r="1.8"/><circle cx="41" cy="46" r="1.8"/><circle cx="52" cy="46" r="1.8"/><circle cx="63" cy="46" r="1.8"/><circle cx="74" cy="46" r="1.8"/><circle cx="85" cy="46" r="1.8"/><circle cx="96" cy="46" r="1.8"/><circle cx="107" cy="46" r="1.8"/><circle cx="118" cy="46" r="1.8"/><circle cx="129" cy="46" r="1.8"/><circle cx="30" cy="58" r="1.8"/><circle cx="41" cy="58" r="1.8"/><circle cx="52" cy="58" r="1.8"/><circle cx="63" cy="58" r="1.8"/><circle cx="74" cy="58" r="1.8"/><circle cx="85" cy="58" r="1.8"/><circle cx="96" cy="58" r="1.8"/><circle cx="107" cy="58" r="1.8"/><circle cx="118" cy="58" r="1.8"/><circle cx="129" cy="58" r="1.8"/><circle cx="30" cy="70" r="1.8"/><circle cx="41" cy="70" r="1.8"/><circle cx="52" cy="70" r="1.8"/><circle cx="63" cy="70" r="1.8"/><circle cx="74" cy="70" r="1.8"/><circle cx="85" cy="70" r="1.8"/><circle cx="96" cy="70" r="1.8"/><circle cx="107" cy="70" r="1.8"/><circle cx="118" cy="70" r="1.8"/><circle cx="129" cy="70" r="1.8"/><circle cx="30" cy="82" r="1.8"/><circle cx="41" cy="82" r="1.8"/><circle cx="52" cy="82" r="1.8"/><circle cx="63" cy="82" r="1.8"/><circle cx="74" cy="82" r="1.8"/><circle cx="85" cy="82" r="1.8"/><circle cx="96" cy="82" r="1.8"/><circle cx="107" cy="82" r="1.8"/><circle cx="118" cy="82" r="1.8"/><circle cx="129" cy="82" r="1.8"/>
      </g>
      <line x1="26" y1="26" x2="134" y2="26" stroke="#e45b62" stroke-width="2"/>
      <line x1="26" y1="86" x2="134" y2="86" stroke="#4c84cf" stroke-width="2"/>
    </svg>
    <strong>1 protoboard</strong><small>Distribución de 5 V, GND y señales</small>
  </div>

  <div class="material-card">
    <svg viewBox="0 0 160 110" role="img" aria-label="Potenciómetro de 1 kiloohm">
      <circle cx="80" cy="59" r="27" fill="#3d4147"/>
      <circle cx="80" cy="59" r="17" fill="#7b858d"/>
      <rect x="76" y="16" width="8" height="34" rx="3" fill="#c7cbd0"/>
      <rect x="61" y="84" width="5" height="18" fill="#c9a85c"/>
      <rect x="78" y="84" width="5" height="18" fill="#c9a85c"/>
      <rect x="95" y="84" width="5" height="18" fill="#c9a85c"/>
    </svg>
    <strong>4 potenciómetros de 1 kΩ</strong><small>Control manual de cada servo</small>
  </div>

<div class="material-card">
    <svg viewBox="0 0 160 110" role="img" aria-label="Jumpers macho macho">
      <path d="M24 80 C55 15 105 100 138 25" fill="none" stroke="#e24444" stroke-width="5"/>
      <path d="M22 65 C60 5 100 95 139 42" fill="none" stroke="#f2bd33" stroke-width="5"/>
      <path d="M25 95 C60 40 108 100 137 63" fill="none" stroke="#377fcb" stroke-width="5"/>
      <g fill="#1b2227"><rect x="17" y="58" width="11" height="16"/><rect x="132" y="17" width="11" height="16"/><rect x="16" y="86" width="11" height="16"/><rect x="132" y="55" width="11" height="16"/></g>
    </svg>
    <strong>Jumpers macho–macho</strong><small>Conexiones en la protoboard</small>
  </div>

    <div class="material-card">
    <svg viewBox="0 0 160 110" role="img" aria-label="Jumpers macho hembra">
      <path d="M25 81 C53 20 100 100 135 29" fill="none" stroke="#32a36b" stroke-width="5"/>
      <path d="M24 64 C65 14 104 90 136 48" fill="none" stroke="#8c57c9" stroke-width="5"/>
      <path d="M25 96 C64 50 105 100 136 70" fill="none" stroke="#dd7043" stroke-width="5"/>
      <rect x="18" y="57" width="13" height="18" rx="2" fill="#1b2227"/><rect x="129" y="20" width="14" height="20" rx="2" fill="#1b2227"/>
      <rect x="18" y="87" width="13" height="18" rx="2" fill="#1b2227"/><rect x="129" y="62" width="14" height="20" rx="2" fill="#1b2227"/>
      <circle cx="136" cy="29" r="3" fill="#777"/><circle cx="136" cy="71" r="3" fill="#777"/>
    </svg>
    <strong>Jumpers macho–hembra</strong><small>Conexión de módulos y señales</small>
  </div>
</div>

Los cuatro servomotores son de aproximadamente *9 g* y los cuatro potenciómetros utilizados son de *1 kΩ*. La estructura mecánica se realizó en MDF.

## Distribución de conexiones

 Elemento | Pin de Arduino |
|---|---:|
| Servo de la base | D9 |
| Servo de altura | D6 |
| Servo adelante/atrás | D5 |
| Servo de la pinza | D3 |
| Potenciómetro de base | A0 |
| Potenciómetro de altura | A1 |
| Potenciómetro adelante/atrás | A2 |
| Potenciómetro de pinza | A3 |

Los potenciómetros trabajan como entradas analógicas. El Arduino lee valores entre 0 y 1023 y los convierte en ángulos adecuados para cada servomotor.

*Nota eléctrica:* al trabajar con cuatro servomotores conviene usar una alimentación de 5 V con suficiente corriente y mantener *GND común* entre la fuente y el Arduino. Esto evita reinicios y movimientos erráticos causados por caídas de voltaje.

# Código utilizado

cpp
#include <Servo.h>

Servo servoBase;
Servo servoAltura;
Servo servoD5;
Servo servoPinza;

// SERVOS
const int PIN_BASE   = 9;
const int PIN_ALTURA = 6;
const int PIN_D5     = 5;   // ESTE es el que vamos a invertir
const int PIN_PINZA  = 3;

// POTENCIÓMETROS
const int POT_BASE   = A0;
const int POT_ALTURA = A1;
const int POT_D5     = A2;
const int POT_PINZA  = A3;

// Últimas lecturas
int lastBase;
int lastAltura;
int lastD5;
int lastPinza;

// Evita movimientos por pequeñas variaciones
const int CAMBIO_MINIMO = 6;

void setup() {

servoBase.attach(PIN_BASE);
  servoAltura.attach(PIN_ALTURA);
  servoD5.attach(PIN_D5);
  servoPinza.attach(PIN_PINZA);

  // Guardar posición actual de los potenciómetros
  lastBase   = analogRead(POT_BASE);
  lastAltura = analogRead(POT_ALTURA);
  lastD5     = analogRead(POT_D5);
  lastPinza  = analogRead(POT_PINZA);
}

void loop() {

  int lecturaBase   = analogRead(POT_BASE);
  int lecturaAltura = analogRead(POT_ALTURA);
  int lecturaD5     = analogRead(POT_D5);
  int lecturaPinza  = analogRead(POT_PINZA);

  // BASE - D9
  if (abs(lecturaBase - lastBase) > CAMBIO_MINIMO) {
    int anguloBase = map(lecturaBase, 0, 1023, 0, 180);
    servoBase.write(anguloBase);
    lastBase = lecturaBase;
  }

  // ALTURA - D6
  if (abs(lecturaAltura - lastAltura) > CAMBIO_MINIMO) {
    int anguloAltura = map(lecturaAltura, 0, 1023, 10, 170);
    servoAltura.write(anguloAltura);
    lastAltura = lecturaAltura;
  }

// SERVO D5 - INVERTIDO
  if (abs(lecturaD5 - lastD5) > CAMBIO_MINIMO) {
    int anguloD5 = map(lecturaD5, 0, 1023, 170, 10);
    servoD5.write(anguloD5);
    lastD5 = lecturaD5;
  }

  // PINZA - D3
  if (abs(lecturaPinza - lastPinza) > CAMBIO_MINIMO) {
    int anguloPinza = map(lecturaPinza, 0, 1023, 0, 170);
    servoPinza.write(anguloPinza);
    lastPinza = lecturaPinza;
  }

  delay(10);
}

## Funcionamiento del programa

El programa utiliza la biblioteca Servo.h. Cada potenciómetro se lee de forma continua mediante analogRead(). Después, la función map() convierte la lectura analógica en un ángulo para el servo correspondiente.

Se agregó un valor CAMBIO_MINIMO = 6 para evitar que pequeñas variaciones eléctricas de los potenciómetros produzcan movimientos constantes o vibraciones. El servo conectado al pin *D5* utiliza un mapeo invertido (170 → 10) porque mecánicamente se encontraba montado en sentido contrario al movimiento deseado.

# Proceso de construcción

## 1. Diseño de la estructura

Primero se definieron los movimientos necesarios: giro de base, altura, movimiento hacia adelante/atrás y apertura de la pinza. Con base en estos ejes se diseñaron las piezas del brazo para cortarlas en MDF.

Las piezas se unieron mediante puntos de giro y tornillería, procurando que cada articulación pudiera moverse sin trabarse.

## 2. Montaje de los servomotores

Se instalaron cuatro servomotores:

1. *Base:* permite girar todo el brazo.
2. *Altura:* controla el ascenso y descenso del conjunto.
3. *Adelante/atrás:* modifica el alcance horizontal.
4. *Pinza:* abre y cierra el mecanismo de agarre.

Durante las pruebas fue necesario invertir el sentido del servo D5 desde software, ya que su orientación física hacía que se moviera en la dirección contraria.

## 3. Instalación de los potenciómetros

Se colocaron cuatro potenciómetros en la base de control. Cada uno funciona como mando de un servo. Los extremos se conectan a alimentación y tierra, mientras que el terminal central se conecta a una entrada analógica del Arduino.

## 4. Cableado

La protoboard se utilizó para distribuir alimentación y tierra. Los jumpers macho–macho y macho–hembra permitieron conectar los potenciómetros, los servos y el Arduino.

## 5. Programación

Después del montaje se cargó el programa en el Arduino. El código convierte la posición física de cada potenciómetro en un ángulo del servo correspondiente.

Para reducir movimientos involuntarios se añadió una zona muerta: el servo solamente recibe una nueva posición cuando la lectura cambia más de seis unidades.

## 6. Ajustes mecánicos y pruebas

Se realizaron varias pruebas para verificar que ninguna articulación forzara el MDF y que la pinza pudiera sostener objetos. También se ajustaron los rangos de movimiento a valores seguros (10°–170°) en los ejes donde un recorrido completo podía forzar la estructura.

# Evidencia fotográfica

<img class="media-frame" 
