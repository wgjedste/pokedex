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

  // ADD LIST ITEM - Convert to JQUERY
  function addListItem(pokemon) {
    // let ul = document.querySelector(".pokemon-list");
    let ul = $('.pokemon-list')
    // let li = document.createElement("li");
    let li = $('<li></li>')
    // let button = document.createElement("button");
    let button = $('<button>'+pokemon.name+'</button>')
    // button.classList.add("button");
    button.addClass('button')
    // button.innerText = pokemon.name;
    // li.appendChild(button);
    li.append(button)
    // ul.appendChild(li);
    ul.append(li)
    button.on("click", function (event) {
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
  // let modalContainer = document.querySelector("#modal-container");
  let modalContainer = $('#modal-container')
  function showModal(pokemon) {
    // modalContainer.innerHTML = "";
    modalContainer.empty()
    // let modal = document.createElement("div");
    // modal.classList.add("modal");
    let modal = $('<div class = "modal"></div>')

    // let closeButtonElement = document.createElement("button");
    // closeButtonElement.classList.add("modal-close");
    // closeButtonElement.innerText = "Close";
    let closeButtonElement = $('<button class = "modal-close">'+'close'+'</button>')
    // closeButtonElement.addEventListener("click", hideModal);
    closeButtonElement.on("click", hideModal)

    // let pokemonName = document.createElement("h1");
    // pokemonName.innerText = pokemon.name;
    let pokemonName = $('<h1>'+pokemon.name+'</h1>')

    // let pokemonImage = document.createElement("img");
    // pokemonImage.classList.add("modal-img");
    // pokemonImage.setAttribute("src", pokemon.imageUrl);
    let pokemonImage = $('<img class = "modal-img"></img>')
    pokemonImage.attr("src", pokemon.imageUrl)
    // let pokemonImageAnimated = document.createElement("img");
    // pokemonImageAnimated.classList.add("modal-img");
    // pokemonImageAnimated.setAttribute("src", pokemon.imageUrlAnimated);
    let pokemonImageAnimated = $('<img class = "modal-img"></img>')
    pokemonImageAnimated.attr("src", pokemon.imageUrlAnimated)

    // let pokemonWeight = document.createElement("p");
    // pokemonWeight.innerText = "weight: " + pokemon.weight;
    let pokemonWeight = $('<p>'+"weight: "+ pokemon.weight+'</p>')
    // let pokemonHeight = document.createElement("p");
    // pokemonHeight.innerText = "height: " + pokemon.height;
    let pokemonHeight = $('<p>'+"height: "+ pokemon.height+'</p>')
    // let pokemonTypes = document.createElement("p");
    // pokemonTypes.innerText = "types: " + pokemon.types;
    let pokemonTypes = $('<p>'+"types: "+ pokemon.types+'</p>')
    // let pokemonAbilities = document.createElement("p");
    // pokemonAbilities.innerText = "abilities: " + pokemon.abilities;
    let pokemonAbilities = $('<p>'+"abilities: "+ pokemon.abilities+'</p>')

    // let pokemonStat = document.createElement("p");
    // pokemonStat.innerText = "stats: " + pokemon.stats;
    let pokemonStat = $('<p>'+"stats: "+ pokemon.stats+'</p>')

    // let pokemonSpecies = document.createElement("p");
    // pokemonSpecies.innerText = "species: " + pokemon.species;
    let pokemonSpecies = $('<p>'+"species: "+ pokemon.species+'</p>')


    modal.append(closeButtonElement);
    modal.append(pokemonName);
    modal.append(pokemonImage);
    modal.append(pokemonImageAnimated);
    modal.append(pokemonWeight);
    modal.append(pokemonHeight);
    modal.append(pokemonStat);
    modal.append(pokemonTypes);
    modal.append(pokemonSpecies);
    modal.append(pokemonAbilities);
    modalContainer.append(modal);

    modalContainer.addClass("is-visible");
  }

  function hideModal() {
    modalContainer.removeClass("is-visible");
  }

  jQuery(window).on("keydown", e => {
    var $modalContainer = $("#modal-container");
    if (e.key === "Escape" && $modalContainer.hasClass("is-visible")) {
      hideModal();
    }
  });
  modalContainer.on("click", (e) => {
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
