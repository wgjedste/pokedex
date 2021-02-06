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
    pokemonRepository.loadDetails(pokemon).then(function () {
    // let ul = $('.pokemon-list')
    // let li = $('<li></li>')
    var $row = $(".row");

    var $card = $('<div class="card" style="width:400px"></div>');
    var $image = $(
      '<img class="card-img-top" alt="Card image" style="width:20%" />'
    );
    $image.attr("src", pokemon.imageUrl);
    var $cardBody = $('<div class="card-body"></div>');
    var $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
    let $seeProfile = $('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">'+pokemon.name+'</button>')
    // li.append(button)
    // ul.append(li)
    $row.append($card);
      //Append the image to each card
      $card.append($image);
      $card.append($cardBody);
      $cardBody.append($cardTitle);
      $cardBody.append($seeProfile);
      $seeProfile.on("click", function (event) {
      showDetails(pokemon);
    });
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
  // let modalContainer = $('#modal-container')
  function showModal(pokemon) {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");
      // Clear all existing modal content
      modalTitle.empty();
      modalBody.empty();
      // modalContainer.empty();


    let pokemonName = $('<h1>'+pokemon.name+'</h1>')

    let pokemonImage = $('<img class = "modal-img" style = "width: 50%">')
    pokemonImage.attr("src", pokemon.imageUrl)
    let pokemonImageAnimated = $('<img class = "modal-img" style = "width: 50%">')
    pokemonImageAnimated.attr("src", pokemon.imageUrlAnimated)

    let pokemonWeight = $('<p>'+"weight: "+ pokemon.weight+'</p>')
    let pokemonHeight = $('<p>'+"height: "+ pokemon.height+'</p>')
    let pokemonTypes = $('<p>'+"types: "+ pokemon.types+'</p>')
    let pokemonAbilities = $('<p>'+"abilities: "+ pokemon.abilities+'</p>')

    let pokemonStat = $('<p>'+"stats: "+ pokemon.stats+'</p>')

    let pokemonSpecies = $('<p>'+"species: "+ pokemon.species+'</p>')
    console.log(modalTitle)

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonImageAnimated);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonStat);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonSpecies);
    modalBody.append(pokemonAbilities);

  }


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

  // $('[data-toggle="modal"]').on('click', function(){
  //   let targetSelector = $(this).attr('data-target');
  //   $(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
  // });

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
