---
layout: default
title: Tarea 1
nav_order: 7
---
# Tarea 1

En esta tarea se realizaron diversos códigos en C++ para Arduino UNO, así, probando las funciones básicas que posee el microcontrolador por medio de circuitos simples, utilizando principalmente entradas y salidas, tanto analogicas y digitales, como también mecánicas.

#  Arduino, ¿Qué es?

Arduino es software de código abierto con lnguaje C++, es un software libre y, además, tiene diferentes modelos de hard. Fue creado en italia en 2005 para desarrollar prototipos interactivos. Permite el uso de varios modelos de microordenadores a libertad del usuario.

En la mayoría de ellos, su hardware consta de una placa que contiene un microcontrolador principal que permite controlar sus elementos periféricos.

¿Cómo se utiliza el programa de Arduino IDE?

Primero se instala el Arduino IDE en la computadora y se conecta la placa Arduino mediante un cable USB. Antes de comenzar a programar, nos tenemos que asegurar de haber instalado las librerías y drivers correspondientes según lo que vayamos a realizar. Dentro del programa se escribe el código, llamado "sketch", usando un lenguaje basado en C++. Una vez terminado el sketch deseado, se compila el código para verificar que no haya errores y, si el código se compila correctamente, está listo para subirse al microcontrolador.

# Lista de materiales:

## Arduino UNO:
![Arduino UNO](assets/img/material/PlacaArduino.jpeg)

Microcontrolador programable que controla el funcionamiento del proyecto mediante el código cargado desde la computadora.

## Cable USB-A a USB-B:
![Cable](assets/img/Tarea_1/material/cable.jpeg)

Se usa para conectar el Arduino UNO a la computadora, cargar los programas y, proporcionar alimentación eléctrica.

## Protoboard:
![Protoboard](assets/img/Tarea_1/material/protoboard.jpeg)

Tablero de pruebas que permite crear circuitos eléctricos con distintos componentes.

## Jumpers:
![Jumpers](assets/img/Tarea_1/material/jumpers.jpeg)

Cables que pueden unir lineas de la protoboard, hacer saltos entre ellas y conectarse a los pines del Arduino UNO.

## LED:
![LED](assets/img/Tarea_1/material/led.jpeg)

Diodo emisor de luz empleado para simular salidas de tipo High y Low.

## Resistencias:
![Resistencia 1k Ohm](assets/img/Tarea_1/material/1k_ohm.jpeg) ![Resistencia 220 ohms](assets/img/Tarea_1/material/220_ohm.jpeg) 

Componentes que limitan el paso de corriente y protegen los elementos electrónicos.

## Display de 7 segmentos:
![Display](assets/img/Tarea_1/material/display.jpeg)

Dispositivo formado por siete LEDs que permite mostrar números o letras.

## Servomotor 9g:
![Servo](assets/img/Tarea_1/material/servo9g.jpeg)

Es un motor con encoder que, gracias a este último, permite girar el eje a posiciones específicas según la cantidad de voltaje que reciba, todo esto mediante la programación.

## Potenciómetro:
![Potenciómetro](assets/img/Tarea_1/material/potenciometro.jpeg)

Resistencia variable que permite regular a manualmente la potencia que circule a través de él.

## Fuente de poder:
![Fuente](assets/img/Tarea_1/material/fuente.jpeg)

Suministra la energía necesaria para alimentar el Arduino y los componentes del circuito.

## Push button (NO):
![Push button](assets/img/Tarea_1/material/boton.jpeg)

Botón que permite el flujo de corriente cuando se oprime debido a que se encuentra normalmente abierto (NO).

# Prácticas

## 00 Prueba parpadeo PIN 13 Arduino UNO
Link del video: [Práctica_00](https://youtube.com/shorts/im3Q0wr0bbQ?feature=share)
![Práctica_01](assets/img/Tarea_1/practicas/01.png)

Esta práctica nos permite ver el Arduino inicializado, con la evidencia de que el indicador LED de entradas se encuentra parpadeando.

Código práctica :
```yml
// C++ code
//
void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000); // Wait for 1000 millisecond(s)
}
```

## 01 PIN_13_HIGH
Link del video: [Práctica_01](https://youtube.com/shorts/f5nQAyJDfuA?feature=share)
![Práctica_02](assets/img/Tarea_1/practicas/02.png)

Aquí se configuró el indicador LED del arduino para que se mantenga encendido (HIGH).

Código práctica :
```yml
// C++ code
//
void setup()
{
  pinMode(13, OUTPUT);
}

void loop()
{
  digitalWrite(13, HIGH);
}
```
## 02 PIN_13_LOW
Link del video: [Práctica_02](https://youtube.com/shorts/JB2_dd-b4W0?feature=share)
![Práctica_03](assets/img/Tarea_1/practicas/03.png)

En ésta parte se configuró el indicador LED para que se mantuviera apagado (LOW).

Código práctica :
```yml
// C++ code
//
void setup()
{
  pinMode(13, OUTPUT);
}

void loop()
{
  digitalWrite(13, LOW);
}
```
## 03 Delay
Link del video: [Práctica_03](https://youtube.com/shorts/T_IeBeGRtW0?feature=share)
![Práctica_04](assets/img/Tarea_1/practicas/04.png)

Aquí se programó el arduino para que el indicador LED tenga un retraso (delay) de 1 segundo.

Código práctica :
```yml
// C++ code
//
void setup()
{
  pinMode(13, OUTPUT);
}

void loop()
{
  digitalWrite(13, HIGH);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(13, LOW);
  delay(1000); // Wait for 1000 millisecond(s)
}
```
## 04 Led parpadeando
Link del video: [Práctica_04](https://youtube.com/shorts/o_R1jhTqSz4?feature=share)
![Práctica_05](assets/img/Tarea_1/practicas/05.png)

Se programó el arduino para que el LED se encendiera y se apagara al encontrarse conectado directamente al arduino.

Código práctica :
```yml
// C++ code
//
void setup()
{
  pinMode(13, OUTPUT);
}

void loop()
{
  digitalWrite(13, HIGH);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(13, LOW);
  delay(1000); // Wait for 1000 millisecond(s)
}
```
## 05 Circuito con resistor para Led
Link del video: [Práctica_05](https://youtube.com/shorts/GW0NLEjQkjs?feature=share)
![Práctica_06](assets/img/Tarea_1/practicas/06.png)

Se construyó un circuito con una resistencia de 220 ohmios para proteger al LED. A su vez, el código permitía que el LED parpadeara como en el ejercicio anterior.

Código práctica :
```yml
// C++ code
//
void setup()
{
  pinMode(13, OUTPUT);
}

void loop()
{
  digitalWrite(13, HIGH);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(13, LOW);
  delay(1000); // Wait for 1000 millisecond(s)
}
```
## 06 Circuito con dos LEDs alternando
Link del video: [Práctica_06](https://youtube.com/shorts/-ThP8Hp3MgQ?feature=share)
![Práctica_07](assets/img/Tarea_1/practicas/07.png)

Se expandió el circuito existente añadiendo un LED y resistencia adicional en paralelo, y el código permitía que parpadearan intermitentemente uno tras otro.

Código práctica :
```yml
// C++ code
//
void setup()
{
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
}

void loop()
{
  digitalWrite(13, HIGH);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(13, LOW);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(12, HIGH);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(12, LOW);
  delay(1000); // Wait for 1000 millisecond(s)
}
```
## 07 Circuito con dos LEDs emparejados
Link del video: [Práctica_07](https://youtube.com/shorts/CKdG0U9ygZA?feature=share)
![Práctica_08](assets/img/Tarea_1/practicas/08.png)

En escencia es el mismo circuito que el anterior, solo que el programa hace que los LEDs vayan a la misma frecuencia.

Código práctica :
```yml
// C++ code
//
void setup()
{
  pinMode(13, OUTPUT);
}

void loop()
{
  digitalWrite(13, HIGH);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(13, LOW);
  delay(1000); // Wait for 1000 millisecond(s)
}
```
## 08 Display de 7 segmentos
Link del video: [Práctica_08](https://youtube.com/shorts/yo0eoAQBA6g?feature=share)
![Práctica_09](assets/img/Tarea_1/practicas/09.png)

Se hicieron las conexiones correspondientes al display de 7 segmentos para que mostrara el número 9. Esto gracias a que el código mandaba señales HIGH y LOW a los pines correspondientes del display.

Código práctica :
```yml
// C++ code
//
void setup()
{
  pinMode(13, OUTPUT);	//Segmento e
  pinMode(12, OUTPUT);	//Segmento d
  pinMode(10, OUTPUT);	//Segmento c
  pinMode(9, OUTPUT);	//Segmento punto
  pinMode(7, OUTPUT);	//Segmento b
  pinMode(6, OUTPUT);	//Segmento a
  pinMode(5, OUTPUT);	//Segmento f
  pinMode(4, OUTPUT);	//Segmento g
}

void loop()
{
  digitalWrite(6, HIGH);//Segmento a
  digitalWrite(7, HIGH); //Segmento b
  digitalWrite(10, HIGH); //Segmento c
  digitalWrite(12, HIGH); //Segmento d
  digitalWrite(13, HIGH); //Segmento e
  digitalWrite(5, HIGH); //Segmento f
  digitalWrite(4, HIGH); //Segmento g
  digitalWrite(9, HIGH); //Segmento punto
  delay(1000);
}
```
## 09 Contador
Link del video: [Práctica_09](https://youtube.com/shorts/JFwFJl4hdnE?feature=share)
![Práctica_10](assets/img/Tarea_1/practicas/10.png)

Se hizo un programa para realizar una secuencia númerica del 1 al 3 (no se hicieron bien las conexiones).

Código práctica :
```yml
// C++ code
//
void setup()
{
  pinMode(13, OUTPUT);	//Segmento e
  pinMode(12, OUTPUT);	//Segmento d
  pinMode(10, OUTPUT);	//Segmento c
  pinMode(9, OUTPUT);	//Segmento punto
  pinMode(7, OUTPUT);	//Segmento b
  pinMode(6, OUTPUT);	//Segmento a
  pinMode(5, OUTPUT);	//Segmento f
  pinMode(4, OUTPUT);	//Segmento g
}

void loop()
{
    // Mostramos el numero 0
  digitalWrite(6, HIGH);//Segmento a
  digitalWrite(7, HIGH); //Segmento b
  digitalWrite(10, HIGH); //Segmento c
  digitalWrite(12, HIGH); //Segmento d
  digitalWrite(13, HIGH); //Segmento e
  digitalWrite(5, HIGH); //Segmento f
  digitalWrite(4, LOW); //Segmento g
  digitalWrite(9, LOW); //Segmento punto
  delay(1000);
  
    // Mostramos el numero 1
  digitalWrite(6, LOW);//Segmento a
  digitalWrite(7, HIGH); //Segmento b
  digitalWrite(10, HIGH); //Segmento c
  digitalWrite(12, LOW); //Segmento d
  digitalWrite(13, LOW); //Segmento e
  digitalWrite(5, LOW); //Segmento f
  digitalWrite(4, LOW); //Segmento g
  digitalWrite(9, LOW); //Segmento punto
  delay(1000);
  
    // Mostramos el numero 2
  digitalWrite(6, HIGH);//Segmento a
  digitalWrite(7, HIGH); //Segmento b
  digitalWrite(10, LOW); //Segmento c
  digitalWrite(12, HIGH); //Segmento d
  digitalWrite(13, HIGH); //Segmento e
  digitalWrite(5, LOW); //Segmento f
  digitalWrite(4, HIGH); //Segmento g
  digitalWrite(9, LOW); //Segmento punto
  delay(1000);
  
}
```
## 10 Entrada digital con botón
Link del video: [Práctica_10](https://youtube.com/shorts/Obgd7tISlhM?feature=share)
![Práctica_11](assets/img/Tarea_1/practicas/11.png)

Construimos un circuito en el que un botón permitía el flujo de corriente a un LED, siendo el estado del botón la condición lógica.

Código práctica :
```yml
// C++ code
//

void setup()
{
  pinMode(13, OUTPUT);	//LED
  
  pinMode(8, INPUT);	//BOTON
}

void loop()
{
  digitalWrite(13, digitalRead(8)); //Escribimpos en el LED el valor del BOTON
}
```
## 11 Entrada digital con dos botónes
Link del video: [Práctica_11](https://youtube.com/shorts/QLBKjJ9850g?feature=share)
![Práctica_12](assets/img/Tarea_1/practicas/12.png)

En escencia es la práctica anterior pero con dos botones.

Código práctica :
```yml
// C++ code
//

void setup()
{
  pinMode(13, OUTPUT);	//LED1
  pinMode(8, INPUT);	//BOTON1
  
  pinMode(11, OUTPUT);	//LED2
  pinMode(2, INPUT);	//BOTON2
}

void loop()
{
  
  digitalWrite(13, digitalRead(8)); //Escribimpos en el LED1 el valor del BOTON1
  digitalWrite(11, digitalRead(2)); //Escribimpos en el LED2 el valor del BOTON2
}
```
## 12 Entrada digital con condición
Link del video: [Práctica_12](https://youtube.com/shorts/SlA5CXg_wUw?feature=share)
![Práctica_13](assets/img/Tarea_1/practicas/13.png)

Lo que hace este código es leer el estado del botón, en este caso cuando se pulsa, el arduino lee que se cumple la condición y enciende el LED, cuando no se cumple lo apaga.

Código práctica :
```yml
// C++ code
//

void setup()
{
  pinMode(13, OUTPUT);	//LED
  
  pinMode(8, INPUT);	//BOTON
}

void loop()
{
  
  if (digitalRead(8) == HIGH)		//Pregunta si el boton1 esta activado
  {
    digitalWrite(13, HIGH);			//SI: encendemos el led1
  }
  else if(digitalRead(8) == LOW)	//Pregunta si el boton1 esta desactivado
  {
    digitalWrite(13, LOW);			//SI: apagamos el led1
  }
}
```
## 13 Entrada digital con condición (dos botones)
Link del video: [Práctica_13](https://youtube.com/shorts/Z-R9o-GPFJ4?feature=share)
![Práctica_14](assets/img/Tarea_1/practicas/14.png)

Hace exactamente lo mismo que la práctica anterior pero con dos botones.

Código práctica :
```yml
// C++ code
//

void setup()
{
  pinMode(13, OUTPUT);	//LED1
  pinMode(8, INPUT);	//BOTON1
  
  pinMode(11, OUTPUT);	//LED2
  pinMode(2, INPUT);	//BOTON2
}

void loop()
{
  
  if (digitalRead(8) == HIGH)		//Pregunta si el boton1 esta activado
  {
    digitalWrite(13, HIGH);			//SI: encendemos el led1
  }
  else if(digitalRead(8) == LOW)	//Pregunta si el boton1 esta desactivado
  {
    digitalWrite(13, LOW);			//SI: apagamos el led1
  }
  
  if (digitalRead(2) == HIGH)		//Pregunta si el boton2 esta activado
  {
    digitalWrite(11, HIGH);			//SI: encendemos el led2
  }
  else if(digitalRead(2) == LOW)	//Pregunta si el boton2 esta desactivado
  {
    digitalWrite(11, LOW);			//SI: apagamos el led2
  }
}
```
## 14 Condición OR con botones
Link del video: [Práctica_14](https://youtube.com/shorts/-T7_mfW067o?feature=share)
![Práctica_15](assets/img/Tarea_1/practicas/15.png)

Se simuló una condición tipo OR en el código, haciendo que, si un botón **O** ambos estaban presionados, entonces el LED se encendía, si **ninguno** se encontraba presionado, entonces se apagaba.

Código práctica :
```yml
// C++ code
//

void setup()
{
  //Inicializamos puertos
  pinMode(13, OUTPUT);	//LED1
  
  pinMode(8, INPUT);	//BOTON1
  pinMode(2, INPUT);	//BOTON2
}

void loop()
  
{
  if (digitalRead(8) == HIGH || digitalRead(2) == HIGH)		//Pregunta si se cumple la condición
  {
    digitalWrite(13, HIGH);			//SI: encendemos el led1
  }
  else	//En caso contrario
  {
    digitalWrite(13, LOW);			//NO: apagamos el led1
  }

}
```
## 15 Condición AND con botones
Link del video: [Práctica_15](https://youtube.com/shorts/EIUdnmTyj9s?feature=share)
![Práctica_16](assets/img/Tarea_1/practicas/16.png)

En este caso se simuló una compuerta tipo AND, siendo que la condición se cumple cuando **solo si** se presionan ambos botones..

Código práctica :
```yml
// C++ code
//

void setup()
{
  //Inicializamos puertos
  pinMode(13, OUTPUT);	//LED1
  
  pinMode(8, INPUT);	//BOTON1
  pinMode(2, INPUT);	//BOTON2
}

void loop()
{
  
  if (digitalRead(8) == HIGH && digitalRead(2) == HIGH)		//Pregunta si se cumple la condición
  {
    digitalWrite(13, HIGH);			//SI: encendemos el led1
  }
  else	//En caso contrario
  {
    digitalWrite(13, LOW);			//NO: apagamos el led1
  }

}
```
## 16 Contador LED
Link del video: [Práctica_16](https://youtube.com/shorts/u-XFvtNUUe0?feature=share)
![Práctica_17](assets/img/Tarea_1/practicas/17.png)

Se diseñó un circuito de LEDs en paralelo con la función de representar una cuenta, con un código que, por cada vez que se presionaba un botón, un LED adicional se iluminaba, y al llegar al máximo de LEDs iluminados, se reiniciaba la cuenta apagando todos los LEDs.

Código práctica :
```yml
// C++ code
// CONTADOR

int cuenta = 0;		//Variable que guarda el numero de veces que se ha contado

void setup()
{
  //Inicializamos puertos
  pinMode(13, OUTPUT);	//LED1
  pinMode(12, OUTPUT);	//LED2
  pinMode(11, OUTPUT);	//LED3
  pinMode(10, OUTPUT);	//LED4
  pinMode(2, INPUT);	//BOTON
}

void loop()
{
  if (digitalRead(2) == HIGH)		//Pregunta si el boton esta activado
  {
    cuenta++;
    delay(500);
  }
  if(cuenta >= 5)
  {
    cuenta = 0;
  }
  
  if(cuenta == 0)
  {
  	digitalWrite(13, LOW);
    digitalWrite(12, LOW);
    digitalWrite(11, LOW);
    digitalWrite(10, LOW);
  } 
  else if(cuenta == 1)
  {
  	digitalWrite(13, HIGH);
    digitalWrite(12, LOW);
    digitalWrite(11, LOW);
    digitalWrite(10, LOW);
  } 
  else if(cuenta == 2)
  {
  	digitalWrite(13, HIGH);
    digitalWrite(12, HIGH);
    digitalWrite(11, LOW);
    digitalWrite(10, LOW);
  }
  else if(cuenta == 3)
  {
  	digitalWrite(13, HIGH);
    digitalWrite(12, HIGH);
    digitalWrite(11, HIGH);
    digitalWrite(10, LOW);
  }
  else if(cuenta == 4)
  {
  	digitalWrite(13, HIGH);
    digitalWrite(12, HIGH);
    digitalWrite(11, HIGH);
    digitalWrite(10, HIGH);
  }
}
```
## 17 Inicio Servo
![17](assets/img/Tarea_1/extra/17.jpg)
![Práctica_18](assets/img/Tarea_1/practicas/18.png)

Este programa hacía que, al conectar un servomotor al arduino, hacía que este tomara el valor inicial de 0° sin importar su posición.

Código práctica :
```yml
// C++ code
// Incluímos la librería para poder controlar el servo
#include <Servo.h>

// Declaramos la variable para controlar el servo
Servo servoMotor;

void setup()
{ 
  // Iniciamos el servo para que empiece a trabajar con el pin 9
  servoMotor.attach(9);
}

void loop()
{
  // Desplazamos a la posición 90º
  servoMotor.write(90);
}
```
## 18 Posiciones Servo
Link del video: [Práctica_18](https://youtube.com/shorts/r4xbcZfGzGU?feature=share)
![Práctica_19](assets/img/Tarea_1/practicas/19.png)

Con este código, se creó una secuencia de posiciones en las que el servomotor se colocaba cada segundo. Dicha secuencia se repite indefinidamente.

Código práctica :
```yml
// C++ code
// Incluímos la librería para poder controlar el servo
#include <Servo.h>

// Declaramos la variable para controlar el servo
Servo servoMotor;

void setup()
{
  // Iniciamos el servo para que empiece a trabajar con el pin 9
  servoMotor.attach(9);
}

void loop()
{
  // Desplazamos a la posición 0º
  servoMotor.write(0);
  // Esperamos 1 segundo
  delay(1000);
  
  // Desplazamos a la posición 90º
  servoMotor.write(90);
  // Esperamos 1 segundo
  delay(1000);
  
  // Desplazamos a la posición 180º
  servoMotor.write(180);
  // Esperamos 1 segundo
  delay(1000);
}
```
## 19 Un servomotor con potenciómetro
Link del video: [Práctica_19](https://youtube.com/shorts/Fi9dAzrovCQ?feature=share)
![Práctica_20](assets/img/Tarea_1/practicas/20.png)

Se diseñó un circuito que, dependiendo la corriente que permitiera pasar el potenciómetro, el servo tomaría valores de 0 a 180 grados. En el código se define una normalización de valores que se leen en la librería del servo de 0 a 5V.

Código práctica :
```yml
// C++ code
// Incluímos la librería para poder controlar el servo
#include <Servo.h>

// Declaramos la variable para controlar el servo
Servo servoMotor;
int valor;		//variable que almacena la lectura analógica raw
int pos;        //Variable que almacena la posicion del servo

void setup()
{
  // Iniciamos el servo para que empiece a trabajar con el pin 9
  servoMotor.attach(9);
}

void loop()
{
  // leemos del pin A0 valor
  valor = analogRead(A0);
  //Convertimos el valor del potenciometro a una 
  //que entienda el servo
  pos = map(valor, 0, 1023, 0, 180);
  //Mandamos la posicion al servo 
  servoMotor.write(pos);
  // Esperamos 1 segundo
  delay(1000);
}
```
## 20 Dos servomotores con un potenciómetro
Link del video: [Práctica_20](https://youtu.be/vb8Seued3eY)
![Práctica_21](assets/img/Tarea_1/practicas/21.png)

En esta práctica, se utilizaron dos servomotores y sus posiciones estaban definidas por un solo potenciómetro.

Código práctica :
```yml
// C++ code
#include <Servo.h>
int valor;		//variable que almacena la lectura analógica raw
int pos;        //Variable que almacena la posicion del servo


//Le decimos al codigo que va a existir un servo
//llamado my servo
Servo myservo1;
Servo myservo2;

void setup()
{
  //Le decimos al codigo donde esta conectado el servo 1
  myservo1.attach(9);
  //Le decimos al codigo donde esta conectado el servo 2
  myservo2.attach(2);
}

void loop()
{
  // leemos el valor de potenciometro
  valor = analogRead(A0);
  //Convertimos el valor del potenciometro a una 
  //que entienda el servo
  pos = map(valor, 0, 1023, 0, 180);
  //Mandamos la posicion al servo 1
  myservo1.write(pos);
  //Mandamos la posicion al servo 2
  myservo2.write(pos);
  //esperamos un poco para que se mueva
  delay(10);
}
```
## 21 Dos servomotores con dos potenciómetros
Link del video: [Práctica_21](https://youtu.be/ZUcOmecNfMw)
![Práctica_22](assets/img/Tarea_1/practicas/22.png)

Aquí, similar que en la práctica 19 se controlan dos servomotores utilizando un potenciómetro para cada uno.

Código práctica :
```yml
// C++ code
#include <Servo.h>
int valor1;		//variable que almacena la 
				//lectura analógica1
int valor2;		//variable que almacena la 
				//lectura analógica2
int pos1;        //Variable que almacena la posicion del servo1
int pos2;        //Variable que almacena la posicion del servo2


//Le decimos al codigo que va a existir un servo
//llamado my servo
Servo myservo1;
Servo myservo2;

void setup()
{
  //Le decimos al codigo donde esta conectado el servo 1
  myservo1.attach(9);
  //Le decimos al codigo donde esta conectado el servo 2
  myservo2.attach(2);
}

void loop()
{
  // leemos el valor de potenciometro1
  valor1 = analogRead(A0);
  // leemos el valor de potenciometro2
  valor2 = analogRead(A1);
  //Convertimos el valor del potenciometro a una 
  //que entienda el servo
  pos1 = map(valor1, 0, 1023, 0, 180);
  pos2 = map(valor2, 0, 1023, 0, 180);
  //Mandamos la posicion al servo 1
  myservo1.write(pos1);
  //Mandamos la posicion al servo 2
  myservo2.write(pos2);
  //esperamos un poco para que se mueva
  delay(10);
}
```
## 22 Servomotor con fuente externa
Link del video: [Práctica_22](https://youtube.com/shorts/ZWjGVZDHUgw?feature=share)
![Práctica_23](assets/img/Tarea_1/practicas/23.png)

Dentro de esta última práctica, se conectó una fuente externa a los pines Vcc y GND del servomotor para brindarle potencia diferente a la proporcionada por el arduino.

Código práctica :
```yml
// C++ code
#include <Servo.h>
int valor;		//variable que almacena la lectura analógica raw
int pos;        //Variable que almacena la posicion del servo


//Le decimos al codigo que va a existir un servo
//llamado my servo
Servo myservo1;
Servo myservo2;

void setup()
{
  //Le decimos al codigo donde esta conectado el servo 1
  myservo1.attach(9);
  //Le decimos al codigo donde esta conectado el servo 2
  myservo2.attach(2);
}

void loop()
{
  // leemos el valor de potenciometro
  valor = analogRead(A0);
  //Convertimos el valor del potenciometro a una 
  //que entienda el servo
  pos = map(valor, 0, 1023, 0, 180);
  //Mandamos la posicion al servo 1
  myservo1.write(pos);
  //Mandamos la posicion al servo 2
  myservo2.write(pos);
  //esperamos un poco para que se mueva
  delay(10);
}
```
## Concluisón

Estas prácticas son fundamentales ya que, gracias a ellas, podemos conocer las funciones básicas de arduino IDE, apreciamos la distribución de los pines en el microcontrolador Arduino UNO, realizamos varios sistemas con varios componentes electrónicos y comprobamos el funcionamiento del códgico en conjunto con los circuitos armados. Este tipo de herramientas nos abre las puertas para poder diseñar, construir y aplicar diversas herramientas de sistemas, facilitando así la realización de proyectos mecatrónicos.

[def]: assets
