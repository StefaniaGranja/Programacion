const TOTAL_POKEMON = 1282;
const LIMIT = 12; // Número de Pokémon por página
let offset = 0;
let currentPage = 0;

// Función para obtener la lista de Pokémon
const fetchPokemonList = async (offset = 0, limit = 12) => {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
        let pokemons = await response.json();
        
        if (pokemons.results) {
            for (let index = 0; index < pokemons.results.length; index++) {
                let pokedata = await fetch(pokemons.results[index].url);
                pokemons.results[index].data = await pokedata.json();
            }
        }
        return pokemons;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
}

// Función para mostrar la lista de Pokémon en el DOM
const renderPokemonCards = (pokemonList) => {
    let html = '';
    let $divNavegaPokemon = document.querySelector('.navegapokemon'); // Selecciona el contenedor donde se agregarán las tarjetas

    if (pokemonList && pokemonList.results) {
        for (let i = 0; i < pokemonList.results.length; i++) {
            html += `
                <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                    <div class="custom-block custom-block-full">
                        <div class="custom-block-image-wrap">
                            <a href="detail-page.html">
                                <img src="${pokemonList.results[i].data.sprites.front_default}" class="custom-block-image img-fluid"
                                    alt="${pokemonList.results[i].name}">
                            </a>
                        </div>

                        <div class="custom-block-info">
                            <h5 class="mb-2">
                                <a href="detail-page.html">
                                    ${pokemonList.results[i].name}
                                </a>
                            </h5>

                            <p class="mb-0">Species: ${pokemonList.results[i].data.species.name}</p>
                            <p class="mb-0">Height: ${pokemonList.results[i].data.height} | Weight: ${pokemonList.results[i].data.weight}</p>

                            <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                <a href="#" class=" me-1">
                                    <span>${pokemonList.results[i].data.base_experience} XP</span>
                                </a>

                                <a href="#" class="bi-heart me-1">
                                    <span>${pokemonList.results[i].data.stats[0].base_stat} HP</span>
                                </a>

                                <a href="#" class="bi-chat me-1">
                                    <span>${pokemonList.results[i].data.abilities.length} Abilities</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        $divNavegaPokemon.innerHTML = html;
    } else {
        console.log('No Pokémon data available');
    }
}

// Función para cargar y mostrar una página de Pokémon
const loadPage = async (page) => {
    offset = page * LIMIT;
    currentPage = page;
    const pokemonList = await fetchPokemonList(offset, LIMIT);
    renderPokemonCards(pokemonList);
    updatePaginationButtons();
}

// Función para actualizar los botones de paginación
const updatePaginationButtons = () => {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // Habilita o deshabilita el botón "Anterior" según la página actual
    prevButton.classList.toggle('disabled', currentPage === 0);

    // Habilita o deshabilita el botón "Siguiente" según la página actual
    nextButton.classList.toggle('disabled', (currentPage + 1) * LIMIT >= TOTAL_POKEMON);
}

// Inicializa la primera carga de Pokémon
loadPage(0);

// Maneja el clic en el botón "Anterior"
document.getElementById('prev-page').addEventListener('click', (event) => {
    event.preventDefault();
    if (currentPage > 0) {
        loadPage(currentPage - 1);
    }
});

// Maneja el clic en el botón "Siguiente"
document.getElementById('next-page').addEventListener('click', (event) => {
    event.preventDefault();
    if ((currentPage + 1) * LIMIT < TOTAL_POKEMON) {
        loadPage(currentPage + 1);
    }
});
