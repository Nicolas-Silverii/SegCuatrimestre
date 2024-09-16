document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('container');

    fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
    .then(response => {
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta');
        }
        return response.json();
    })
    .then(data => {
        data.results.forEach(pokemon => {
            fetch(pokemon.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue correcta');
                }
                return response.json();
            })
            .then(pokemonData => {
                let card = document.createElement('div');
                card.classList.add('pokemon-card');

                // Crear el nombre del Pokémon en mayúsculas
                let pokemonName = document.createElement('h3');
                pokemonName.textContent = pokemonData.name.toUpperCase();
                // 1. Convierte el nombre del Pokémon a mayúsculas con .toUpperCase()

                let pokemonId = document.createElement('p');
                pokemonId.textContent = `ID: ${pokemonData.id}`;

                let pokemonImage = document.createElement('img');
                pokemonImage.src = pokemonData.sprites.front_default;
                pokemonImage.alt = pokemonData.name;

                let pokemonType = document.createElement('p');
                pokemonType.textContent = `Type: ${pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ')}`;

                let pokemonAbilities = document.createElement('p');
                pokemonAbilities.textContent = `Abilities: ${pokemonData.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}`;

                container.appendChild(card);
                card.appendChild(pokemonName);
                card.appendChild(pokemonId);
                card.appendChild(pokemonImage);
                card.appendChild(pokemonType);
                card.appendChild(pokemonAbilities);
                
            })
            .catch(error => console.error('Error al obtener lista de Pokémon:', error));
        });
    })
    .catch(error => console.error('Error al obtener lista de Pokémon:', error));
});
