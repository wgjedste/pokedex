let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
    { name: "Golbat", height: 1.6, types: ["flying", "poison"] },
    { name: "Alakazam", height: 1.2, types: ["psychic"] },
    { name: "Hypno", height: 1.6, types: ["psychic"] },
    { name: "Scyther", height: 1.5, types: ["bug", "flying"] },
    { name: "Pikachu", height: 0.4, types: ["electric"] },
    { name: "Venusaur", height: 2, types: ["grass", "poison"] },
  ];

  // ADD POKEMON
  function add(pokemon) {
    pokemonList.push(pokemon);
  }


  // GET ALL
  function getAll() {
    return pokemonList;
  }

  // ADD LIST ITEM
  function addListItem(pokemon) {
    let ul = document.querySelector(".pokemon-list");
    let li = document.createElement("li");
    let button = document.createElement("button");
    button.classList.add("button");
    button.innerText = pokemon.name;
    li.appendChild(button);
    ul.appendChild(li);
    button.addEventListener("click", function (event) {
      console.log(pokemon);
    });
  }

  // SHOW DETAILS
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

console.log(pokemonRepository.getAll()); // Parent Fuction
pokemonRepository.add({ name: "Evee", height: "0.5", types: ["speed"] });

pokemonRepository.getAll().forEach(function (pokemon) {
  let size = " ";
  if (pokemon.height > 1.5) {
    size = "WOW THIS IS BIG";
  } else if (pokemon.height < 1) {
    size = "this is small";
  } else {
    size = "This is Medium";
  }

  let color = " ";
  pokemon.types.forEach(function (type) {
    if (type == "grass") {
      color = '<span style="color:green;"> ';
    } else if (type == "fire") {
      color = '<span style="color:red;"> ';
    } else if (type == "psychic") {
      color = '<span style="color:purple;"> ';
    } else if (type == "electric") {
      color = '<span style="color:gold;"> ';
    } else if (type == "flying") {
      color = '<span style="color:blue;"> ';
    } else if (type == "speed") {
      color = '<span style="color:orange;"> ';
    }
  });

  pokemonRepository.addListItem(pokemon);

  // OLD LIST
  // document.write(
  //   '<div class = "box">' +
  //   pokemon.name +
  //   " " +
  //   "(height: " +
  //   pokemon.height +
  //   ")" +
  //   "<br>" +
  //   color +
  //   pokemon.types +
  //   "<br>"  +
  //   size +
  //   '</div>'
  // )
});
