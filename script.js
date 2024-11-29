// Fetch Pokémon data from the PokéAPI and display it
let offset = 0;
const limit = 20;

document.getElementById('load-more').addEventListener('click', loadPokemon);

// Load Pokémon on page load and when "Load more" is clicked
function loadPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(pokemon => {
        const pokemonCard = createPokemonCard(pokemon);
        document.getElementById('pokemon-list').appendChild(pokemonCard);
      });
      offset += limit; // Increment offset for next load
    })
    .catch(error => console.error('Error fetching Pokémon:', error));
}

// Create a Pokémon card
function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('col-6', 'col-md-3');
  
  const cardContent = `
    <div class="pokemon-card" onclick="showPokemonDetails('${pokemon.url}')">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png" alt="${pokemon.name}">
      <div class="pokemon-info">
        <h5 class="text-center">${pokemon.name}</h5>
      </div>
    </div>
  `;
  card.innerHTML = cardContent;
  return card;
}

// Show Pokémon details in modal
function showPokemonDetails(url) {
  fetch(url)
    .then(response => response.json())
    .then(pokemon => {
      const details = `
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
      `;
      document.getElementById('pokemon-details').innerHTML = details;
      const modal = new bootstrap.Modal(document.getElementById('pokemon-details-modal'));
      modal.show();
    })
    .catch(error => console.error('Error fetching Pokémon details:', error));
}

// Initial load of Pokémon
loadPokemon();
