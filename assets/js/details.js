const detailsList = document.getElementById("detailsList");

const maxRecords = 151;
const limit = 8;
let offset = 0;

function convertDetailsToLi(pokemon) {
    return `
    <div class="initial">
    <img src="${pokemon.photo}"
         alt="${pokemon.name}">
    <h1 class="name">${pokemon.name}</h1>
                    <ol class="types">
                        ${pokemon.types
                            .map(
                                (type) =>
                                    `<li class="type ${type}">${type}</li>`
                            )
                            .join("")}
                    </ol>
    
                </div>
                <div class="stats">
                    <h2>Stats</h2>
                    <li>HP ${pokemon.hp}</li>
                    <li>Attack ${pokemon.attack}</li>
                    <li>Defense ${pokemon.defense}</li>
                    <li>Special-Attack ${pokemon.specialAttack}</li>
                    <li>Special-Defense ${pokemon.specialDefense}</li>
                    <li>Speed ${pokemon.speed}</li>
                </div>
            </div>
`;
}

function loadPokemonDetails(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertDetailsToLi).join("");
        detailsList.innerHTML += newHtml;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const pokemonID = params.get("id");
    const id = parseInt(pokemonID, 10);

    if (id < 1 || id > maxRecords) {
        return (window.location.href = "./index.html");
    }

    let currentPokemonId = id;
    loadPokemonDetails(currentPokemonId, 1);
});
