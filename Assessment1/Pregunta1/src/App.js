import React from 'react'
import { useState } from 'react';
import './App.css'
import { Cuadro } from './Cuadro.jsx';
import { Selector } from './Selector';

function App() {
  // Inicializando parámetros de la matriz. Inicialmente todo es negro
  const [matriz, setMatriz] = useState(Array(100).fill('black'))
  const selectores = ['black', 'blue', 'green']

  // Define estados iniciales
  const [color, setColor] = useState('black')

  // Selector
  const changeSelectorColor = (color) => {
    setColor(color)
  }

  // Cambia el color de un componente
  const changeBoxColor = (index) => {
    const newMatriz = [...matriz]
    newMatriz.splice(index, 1, color)
    setMatriz(newMatriz)
  }
  
  // Estructura del DOM
  return (
    <div className = 'plantilla'>
      <div className ='box'>
        <div className = 'cuadros'>
          {matriz.map((cuadro, i) => (
            <Cuadro
              key = {String(i)}
              fondo = {cuadro}
              place = {i}
              changeColor = {changeBoxColor}
            />  
          ))}
        </div>
      </div>
      <p>Select a color and click on any cell on any cell of the grid:</p>
      <div className = 'options'>
        {selectores.map((selector, j) => (
         <Selector
            key = {String(401+j)}
            fondo = {selector}
            color = {color}
            changeSelector = {changeSelectorColor}
          />
        ))}       
      </div>
    </div>
    
  );
}

export default App;
