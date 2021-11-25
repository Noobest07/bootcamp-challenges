const api = 'https://pokeapi.co/api/v2/pokemon';
const bloque = document.getElementById('root');

//Función de inicialización
const init = async ()=>{
    const response = await fetch(api);
    const data = await response.json();

    await listarPoke(data);
}

const listarPoke = async(data) =>{
    const pokemones = data.results;
    let i = 1;

    pokemones.forEach(pokemon => {
        // Se añade el div
        const div = document.createElement('div');
        div.classList.add('pokemon');

        // Añadir imagen
        const img = document.createElement('img')
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;

        // Añadir nombre
        const nombre = document.createElement('p');
        nombre.innerText = pokemon.name;

        //Ingresar bloque
        div.append(img,nombre);
        root.append(div);
        i++;
    }); 
}


init();