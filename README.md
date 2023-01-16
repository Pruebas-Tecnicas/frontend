# Descripción del proyecto

Este proyecto forma parte de la prueba tecnica realizada para la empresa BIM. Su proposito es de frontend proporcionando la interacción entre el usuario final y el servidor.

## Herramientas usadas

* Typescript 4
* Node 16
* Angular 15
* HTML
* Bootstrap 5
* SweetAlert2

## Requisitos para ejecutar la aplicación

Esta aplicación es capaz de ejecutarse en local arrancando con comandos de Angular desde la terminal de comandos. El comando usado para ejecutar la app es: ng serve -o 

Para ejecutar la app se deben cumplir los siguientes requisitos:

* Tener instalado Angular para ejectar comandos ng
* Tener instalado NPM en caso de necesitar algun paquete (opcional)
* Tener permisos para ejecutar comandos ng desde la terminal
* El puerto 4200 debe estar libre ya que este es el puerto que se registró en el backend para cross origin
* El backend desde estar levantado en el puerto 8080 ya que este es el puerto configurado en el frontend para buscar al backend

## Pendientes de la app

La funcionalidad de login y logout no funcionan como se espera.

* Se debe iniciar sesión para poder acceder al formlario para guardar estado, municipio y CP.
* Se debe iniciar sesión para que el boton de logout se muestre.
