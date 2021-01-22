let pokemonRepository = (function () {

let pokemonList = []
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
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
      showDetails(pokemon)
    });
  }
  

  // SHOW DETAILS
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  // LOAD LIST
 function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

// LOAD DETAILS
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = [];
      details.types.forEach(function(pokemonType){
        item.types.push(pokemonType.type.name)
      })
      item.abilities = [];
      details.abilities.forEach(function(pokemonAbility){
        item.abilities.push(pokemonAbility.ability.name)
      })
    }).catch(function (e) {
      console.error(e);
    });
  }

  

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

