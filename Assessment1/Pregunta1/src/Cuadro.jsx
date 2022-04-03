
// Componente de cada recuadro negro (inicialmente)
export function Cuadro ({fondo, place, changeColor}) {
  return(
    <div 
    className = {'cuadro'}
      style = {{
        backgroundColor: fondo,
        width: '40px',
        height: '40px',
      }}
      onClick = {() =>{changeColor(place)}}
    >
    </div>
  )
}