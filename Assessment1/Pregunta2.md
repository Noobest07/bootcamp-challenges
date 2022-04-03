## 1. Opción 1:


## 2. Preguntas

### ¿Cuáles son las ceremonias más importantes de un Sprint y cuál es la idea de cada una?
* **Sprint Planning:** Marca el inicio del sprint. En esta reunión, el equipo de trabajo negocia con el product owner sobre las tareas que se realizarán en el sprint y los entregables relacionados. Todo es guiado por el Scrum Master.
* **Daily Scrum:** Es la reunión diaria del equipo de trabajo. Cada miembro del equipo cuenta cómo está trabajando, los bloqueantes que tiene, pide ayuda si es necesario y comenta cualquier cambio, con el fin de alcanzar los objetivos del sprint.
* **Sprint Review:** Es una reunión enfocada en el producto y en los incrementos de valor que el equipo haya conseguido. También se invitan stakeholders que pueden brindar feedback al equipo.
* **Sprint Retrospective:** Reunión interna del equipo en la que el equipo conversa sobre cómo vivieron el sprint y buscan formas de mejorar la forma en la que enfrentarán el siguiente sprint.

### ¿Qué son los Wireframes? Nombra al menos una herramienta que podamos utilizar.
Un wireframe es una maqueta de una página web, sirve para representar, de manera sencilla, cómo se vería la página web final. El wireframe permite ahorrar tiempo y dinero, ya que se puede recolectar feedback más rápido, sin tener el desarrollo completo. 

Ejemplo:
* Figma
* Adobe XD
* Invision

### Explicar la diferencia entre var, let y const. Y dar un ejemplo en qué caso se utilizará.
Las tres palabras (var, let y const) son palabras reservadas para declarar variables. La diferencia es la siguiente:
* **var**: Tiene un scope de function scope. Significa que su valor puede ser alterado dentro de una función.
* **let**: Tiene un scope de block scope. Esto significa que solo se altera dentro del bloque ({}) en el que fue declarada.
* **const**: Tiene un scope de block scope. Una vez declarado su valor, no puede ser reemplazado.

### ¿Cuáles son los tres comandos que se pueden utilizar para crear una nueva rama llamada rama-1?
La primera forma es combinando los comandos:
`git branch rama-1`
`git checkout rama-1`

La segunda forma es usando el comando:
`git checkout -b rama-1`

### Explicar la diferencia entre git merge y git rebase.
* **git merge:** Crea un nuevo commit en el que integra dos ramas, de manera que el historial de commits queda intacto. Pueden ocurrir conflictos si una parte del programa ha sido alterado en ambas ramas.
* **git rebase:** Reescribe la historia de las ramas, dejando solo una rama lineal con los cambios de ambas ramas. Los cambios se preservan pero el historial de commits cambia, ya que se eliminan los commits de una rama y se generan otros nuevos para mantener solo una rama.

### ¿Cuál es la diferencia entre Pull Request (PR) y el comando git pull?
* **Pull Request:** Opción que facilita la colaboración dentro de un proyecto en un repositorio remoto. Una persona que no es dueña del proyecto puede proponer cambios que luego serán revisados y, posiblemente, agregados al proyecto.
* **Git Pull:** Opción de git que permite recoger los cambios realizados en el repositorio remoto desde el repositorio local.

### ¿Qué es el Virtual DOM?
El Virtual DOM (VDOM) es una representación del DOM en memoria. El VDOM hace de intermediario entre las aplicaciones y el DOM (vista de usuario).

### Dado el siguiente codePen, el cual solo tiene un HTML, por medio de css llegar a esta respuesta. Imagen. (Para mostrar los servicios debes usar CSS Flexbox o CSS Grid).
```
@import url("https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600&display=swap");

h2, h3 {
  font-family: "Crimson Pro", serif;
}

body {
  font-size: 16px;
  font-family: sans-serif;
  color: #333;
}

ul {
  padding: 0;
}

.c-section {
  max-width: 820px;
  position: relative;
  margin: auto;
}

.c-section__title {
  font-size: 2rem;
  background: #242530;
  padding: 25px;
  text-align: center;
  color: #fff;
  border-top: solid 10px #C7C7C7;
}
.c-services {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.c-services__item {
  width: 49.5%;
  list-style: none;
  background: #f7f7f7;
  margin: 0 0 10px 0;
  box-sizing: border-box;
  padding: 5px 20px;
  font-size: 0.85rem;
  line-height: 1.3rem;
  font-weight: 550;
  letter-spacing: -0.05rem;
}
.c-services__item h3 {
  font-size: 1.4rem;
  padding: 5px 0 5px 55px;
}
.c-services__item:hover {
  box-shadow: 0px 5px 10px #666666;
}
```
