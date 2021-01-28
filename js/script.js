let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1000";
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
      showDetails(pokemon);
    });
  }

  // SHOW DETAILS
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  // SHOW MODAL
  let modalContainer = document.querySelector("#modal-container");
  function showModal(pokemon) {
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let pokemonName = document.createElement("h1");
    pokemonName.innerText = pokemon.name;

    let pokemonImage = document.createElement("img");
    pokemonImage.classList.add("modal-img");
    pokemonImage.setAttribute("src", pokemon.imageUrl);
    let pokemonImageAnimated = document.createElement("img");
    pokemonImageAnimated.classList.add("modal-img");
    pokemonImageAnimated.setAttribute("src", pokemon.imageUrlAnimated);

    let pokemonWeight = document.createElement("p");
    pokemonWeight.innerText = "weight: " + pokemon.weight;
    let pokemonHeight = document.createElement("p");
    pokemonHeight.innerText = "height: " + pokemon.height;
    let pokemonTypes = document.createElement("p");
    pokemonTypes.innerText = "types: " + pokemon.types;
    let pokemonAbilities = document.createElement("p");
    pokemonAbilities.innerText = "abilities: " + pokemon.abilities;
    let pokemonStat = document.createElement("p");
    pokemonStat.innerText = "stats: " + pokemon.stats;
    let pokemonSpecies = document.createElement("p");
    pokemonSpecies.innerText = "species: " + pokemon.species;

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonImageAnimated);
    modal.appendChild(pokemonWeight);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonStat);
    modal.appendChild(pokemonTypes);
    modal.appendChild(pokemonSpecies);
    modal.appendChild(pokemonAbilities);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  // LOAD LIST
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // LOAD DETAILS
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.imageUrlAnimated =
          details.sprites.versions["generation-v"][
            "black-white"
          ].animated.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.species = details.species.name;
        item.types = [];
        details.types.forEach(function (pokemonType) {
          item.types.push(pokemonType.type.name);
        });
        item.abilities = [];
        details.abilities.forEach(function (pokemonAbility) {
          item.abilities.push(pokemonAbility.ability.name);
        });
        item.stats = [];
        details.stats.forEach(function (pokemonStat) {
          item.stats.push(pokemonStat.stat.name);
        });
      })
      .catch(function (e) {
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
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
