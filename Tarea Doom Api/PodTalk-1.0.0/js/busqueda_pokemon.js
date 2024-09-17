/---------------------------------------/
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const searchForm = document.querySelector('.search-form');
    const pokemonContainer = document.querySelector('.navegapokemon');

    // Función para buscar y mostrar Pokémon
    const searchPokemon = async (query) => {
        try {
            // Borramos resultados anteriores
            pokemonContainer.innerHTML = '';

            // Hacemos la petición a la API para obtener la lista de Pokémon
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
            const data = await response.json();

            // Filtramos los Pokémon que coincidan con la búsqueda
            const filteredPokemon = data.results.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));

            if (filteredPokemon.length === 0) {
                pokemonContainer.innerHTML = '<p class="text-white">No se encontraron Pokémon</p>';
                return;
            }

            // Mostramos los Pokémon encontrados
            for (let i = 0; i < filteredPokemon.length; i++) {
                const pokemonDataResponse = await fetch(filteredPokemon[i].url);
                const pokemonDetails = await pokemonDataResponse.json();

                // Inserción del Pokémon con el formato proporcionado
                const pokemonCard = `
                    <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                        <div class="custom-block custom-block-full">
                            <div class="custom-block-image-wrap">
                                <a href="detail-page.html">
                                    <img src="${pokemonDetails.sprites.front_default}" class="custom-block-image img-fluid"
                                        alt="${filteredPokemon[i].name}">
                                </a>
                            </div>

                            <div class="custom-block-info">
                                <h5 class="mb-2">
                                    <a href="detail-page.html">
                                        ${filteredPokemon[i].name}
                                    </a>
                                </h5>

                                <p class="mb-0">Species: ${pokemonDetails.species.name}</p>
                                <p class="mb-0">Height: ${pokemonDetails.height} | Weight: ${pokemonDetails.weight}</p>

                                <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                    <a href="#" class="bi-controller me-1">
                                        <span>${pokemonDetails.base_experience} XP</span>
                                    </a>

                                    <a href="#" class="bi-heart me-1">
                                        <span>${pokemonDetails.stats[0].base_stat} HP</span>
                                    </a>

                                    <a href="#" class="bi-chat me-1">
                                        <span>${pokemonDetails.abilities.length} Abilities</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Añadimos el HTML generado al contenedor
                pokemonContainer.innerHTML += pokemonCard;
            }

        } catch (error) {
            console.error('Error al obtener Pokémon:', error);
            pokemonContainer.innerHTML = '<p class="text-white">Ocurrió un error al obtener los Pokémon</p>';
        }
    };

    // Evento de búsqueda
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            searchPokemon(query);
        }
    });
});