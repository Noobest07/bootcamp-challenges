// Creación del selector de color
export function Selector ({changeSelector, fondo, color}) {
  return(
    <div 
      className = 'selector'
      style = {{
        backgroundColor: fondo,
        width: '40px',
        height: '40px',
        border: color === fondo ? 'yellow solid' : '',
      }}
      onClick = {() => {changeSelector(fondo)}}
    >
    </div>
    
  )
}