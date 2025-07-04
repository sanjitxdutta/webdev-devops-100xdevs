const form = document.getElementById("pokeForm");
const cardsContainer = document.getElementById("cards");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  cardsContainer.innerHTML = "";

  const count = document.getElementById("count").value;
  const category = document.getElementById("category").value;
  const button = form.querySelector("button");

  //  Disable button and show loading
  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = "Loading...";

  if (category === "all") {
    // Fetch random Pokémon by ID
    let fetched = 0;
    while (fetched < count) {
      const randomId = Math.floor(Math.random() * 898) + 1; // Gen 1–8
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await res.json();
        displayCard(data);
        fetched++;
      } catch (err) {
        console.error("Failed to fetch Pokémon ID:", randomId);
      }
    }
  } else {
    // Fetch Pokémon by type
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${category}`);
      const typeData = await res.json();
      const pokemons = typeData.pokemon;

      const selected = pokemons
        .sort(() => Math.random() - 0.5)
        .slice(0, count);

      for (let p of selected) {
        const pokeRes = await fetch(p.pokemon.url);
        const pokeData = await pokeRes.json();
        displayCard(pokeData);
      }
    } catch (err) {
      console.error("Error fetching Pokémon by type:", err);
      cardsContainer.innerHTML = "<p>Error loading Pokémon of this type.</p>";
    }
  }

  //  Re-enable button
  button.disabled = false;
  button.textContent = originalText;
});

//  Display Pokémon card
function displayCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <h3>${capitalize(pokemon.name)}</h3>
    <p>Type: ${pokemon.types.map(t => capitalize(t.type.name)).join(", ")}</p>
  `;
  cardsContainer.appendChild(card);
}

//  Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
