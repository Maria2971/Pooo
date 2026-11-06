async function buscarPokemon() {
const input = document.getElementById('pokemonInput').value.toLowerCase().trim();
const card = document.getElementById('pokemonCard');
const error = document.getElementById('error');

error.innerHTML = "";
card.style.display = "none";

if (!input) {
error.innerHTML = "Digite um Pokémon.";
return;
}
try {
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

if (!response.ok) {
throw new Error("Pokémon não encontrado");
}

const data = await response.json();

document.getElementById('pokemonName').innerHTML =
`${data.name} #${data.id}`;

document.getElementById('pokemonImage').src =
data.sprites.other["official-artwork"].front_default;

// Tipos
const typesContainer = document.getElementById('pokemonTypes');
typesContainer.innerHTML = "";

const cores = {
fire: "#F08030",
water: "#6890F0",
grass: "#78C850",
electric: "#F8D030",
psychic: "#F85888",
ice: "#98D8D8",
dragon: "#7038F8",
dark: "#705848",
fairy: "#EE99AC",
normal: "#A8A878",
fighting: "#C03028",
flying: "#A890F0",
poison: "#A040A0",
ground: "#E0C068",
rock: "#B8A038",
bug: "#A8B820",
ghost: "#705898",
steel: "#B8B8D0"
};

data.types.forEach(tipo => {
const span = document.createElement("span");
span.classList.add("type");
span.innerText = tipo.type.name;
span.style.background = cores[tipo.type.name] || "#777";
typesContainer.appendChild(span);
});

// Status
const statsContainer = document.getElementById('pokemonStats');
statsContainer.innerHTML = "";

data.stats.forEach(stat => {
const div = document.createElement("div");
div.classList.add("stat");

div.innerHTML = `
<strong>${stat.stat.name.toUpperCase()}</strong>: ${stat.base_stat}
`;

statsContainer.appendChild(div);
});

card.style.display = "grid";

} catch (err) {
error.innerHTML = "Pokémon não encontrado.";
}
}

// Buscar ao apertar Enter
document.getElementById("pokemonInput")
.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
buscarPokemon();
}
});