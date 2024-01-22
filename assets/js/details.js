const detailsList = document.getElementById("detailsList");

const maxRecords = 151;
const limit = 8;
let offset = 0;
let currentPokemonId = null;

function convertDetailsToLi(pokemon) {
    return `
    <div class="pokemon ${pokemon.type}">
    <img src="${pokemon.photo}"
         alt="${pokemon.name}" class="pokemonImg">
         
         </div>
         <div class="itens">
         <h1 class="name">${pokemon.name}</h1>
                         <ol class="types">
                             ${pokemon.types
                                 .map(
                                     (type) =>
                                         `<li class="type ${type}">${type}</li>`
                                 )
                                 .join("")}
                         </ol>
                    <h2>Stats</h2>
                    <section class="statsGeneral">
                    <ol class="stats"> 
                    <li>HP: ${pokemon.hp}</li>
                    <li>Attack: ${pokemon.attack}</li>
                    <li>Defense:  ${pokemon.defense}</li>
                    <li>Special-Attack: ${pokemon.specialAttack}</li>
                    <li>Special-Defense: ${pokemon.specialDefense}</li>
                    <li>Speed: ${pokemon.speed}</li>
                    </ol>
                    <ol class="bar">
                    <li><div class="barra"><div  class="${
                        pokemon.type
                    }" style="width: ${pokemon.hp}%"</div></div></li>
                    <li><div class="barra"><div  class="${
                        pokemon.type
                    }" style="width: ${pokemon.attack}% " </div></div></li>
                    <li><div class="barra"><div  class="${
                        pokemon.type
                    }" style="width: ${pokemon.defense}%" </div></div></li>
                    <li><div class="barra"><div  class="${
                        pokemon.type
                    }" style="width: ${pokemon.specialAttack}%"</div></div></li>
                    <li><div class="barra"><div  class="${
                        pokemon.type
                    }" style="width: ${
        pokemon.specialDefense
    }%"</div></div></li>
                    <li><div class="barra"><div class="${
                        pokemon.type
                    }" style="width: ${pokemon.speed}%"</div></div</li>
                    </ol>
                    </section>             
            
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

    let currentPokemonId = id - 1;
    loadPokemonDetails(currentPokemonId, 1);
});
