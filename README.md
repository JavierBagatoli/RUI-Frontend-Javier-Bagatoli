# RUIFrontendJavierBagatoli

Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) version 20.3.18.

## Objetivos del proyecto

Demostrar conocimientos en angular.

Herramientas utilizadas:

- Angular
- Material Angular para el thema de colores y configuracion de SCSS
- Jest ya que es la suite base de angular.

### Interfaz de comunicación

POST: AddHero
GET: GetAllHeroes
GET: GetHero/:name
GET: GetHeroFilter/:name
PUT: UpdateHero
DELETE: DeleteHero

### Objeto sobre el que desarrollare el ejercicio.

name: string,
state: boolean,
age: number,
description: string,
id: number,

### Paginas

#### Home

- Tabla de heroes, cada row muestra editar y borrar
- Sobre la tabla se tiene le boton de agregar. => crear dialog crear/editar

#### Dialog Add Hero

Add Hero / Edit Hero
name
age
description

#### Dialog Delete

¿Desea borrar _Nombre_?
Si No

=================
Los datos seran almacenados en la chace del programa, pero se leen desde un JSON al iniciar.
Se agregara un timing para simular las latencias entre un front y back.
