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
  // function addListItem(pokemon) {
  //   pokemonRepository.loadDetails(pokemon).then(function () {
  //     // let ul = $('.pokemon-list')
  //     // let li = $('<li></li>')
  //     var $row = $(".row");

  //     var $card = $('<div class="card" style="width:400px"></div>');
  //     var $image = $(
  //       '<img class="card-img-top mx-auto" alt="Card image" style="width:20%" />'
  //     );
  //     $image.attr("src", pokemon.imageUrl);
  //     var $cardBody = $('<div class="card-body"></div>');
  //     var $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
  //     let $seeProfile = $(
  //       '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">' +
  //         pokemon.name +
  //         "</button>"
  //     );
  //     // li.append(button)
  //     // ul.append(li)
  //     $row.append($card);
  //     //Append the image to each card
  //     $card.append($image);
  //     $card.append($cardBody);
  //     $cardBody.append($cardTitle);
  //     $cardBody.append($seeProfile);
  //     $seeProfile.on("click", function (event) {
  //       showDetails(pokemon);
  //     });
  //   });
  // }

  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let row = $(".row");

      let card = $(
        '<div class="card mt-5" style="width: 15rem; margin:13px;"></div>'
      );
      let image = $('<img class="card-img-top" alt="...">');
      let title = $('<h5 class="card-title">' + pokemon.name + "</h5>");
      image.attr("src", pokemon.imageUrl);
      let body = $('<div class="card-body" style="text-align: center;"></div>');
      let button = $(
        '<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#exampleModal">See profile</button>'
      );

      //append
      row.append(card);
      card.append(image);
      card.append(body);
      body.append(title);
      body.append(button);

      button.on("click", function (event) {
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

    let pokemonName = $("<h1>" + pokemon.name + "</h1>");

    let pokemonImage = $('<img class = "modal-img" style = "width: 50%">');
    pokemonImage.attr("src", pokemon.imageUrl);
    let pokemonImageAnimated = $(
      '<img class = "modal-img mx-auto" style = "width: 30%">'
    );
    pokemonImageAnimated.attr("src", pokemon.imageUrlAnimated);

    let pokemonWeight = $("<p>" + "weight: " + pokemon.weight + "</p>");
    let pokemonHeight = $("<p>" + "height: " + pokemon.height + "</p>");
    let pokemonTypes = $("<p>" + "types: " + pokemon.types + "</p>");
    let pokemonAbilities = $(
      "<p>" + "abilities: " + pokemon.abilities + "</p>"
    );

    let pokemonStat = $("<p>" + "stats: " + pokemon.stats + "</p>");

    let pokemonSpecies = $("<p>" + "species: " + pokemon.species + "</p>");
    console.log(modalTitle);

    if (pokemon.types.includes("grass")) {
      $(".modal-header").css("background-color", "rgb(120, 200, 80)");
    } else if (pokemon.types.includes("fire")) {
      $(".modal-header").css("background-color", "rgb(240, 128, 48)");
    } else if (pokemon.types.includes("poison")) {
      $(".modal-header").css("background-color", "rgb(168, 144, 240)");
    } else if (pokemon.types.includes("water")) {
      $(".modal-header").css("background-color", "rgb(104, 144, 240)");
    } else if (pokemon.types.includes("bug")) {
      $(".modal-header").css("background-color", "rgb(168, 184, 32)");
    } else if (pokemon.types.includes("water")) {
      $(".modal-header").css("background-color", "rgb(69, 120, 237)");
    } else if (pokemon.types.includes("ice")) {
      $(".modal-header").css("background-color", "rgb(66, 174, 174)");
    } else if (pokemon.types.includes("electric")) {
      $(".modal-header").css("background-color", "rgb(252, 234, 161)");
    } else if (pokemon.types.includes("ground")) {
      $(".modal-header").css("background-color", "rgb(219, 181, 77)");
    } else if (pokemon.types.includes("fairy")) {
      $(".modal-header").css("background-color", "rgb(232, 120, 144)");
    } else if (pokemon.types.includes("ghost")) {
      $(".modal-header").css("background-color", "rgb(100, 78, 136)");
    } else if (pokemon.types.includes("normal")) {
      $(".modal-header").css("background-color", "rgb(156, 156, 99)");
    }

    modalTitle.append(pokemonName);
    // modalBody.append(pokemonImage);
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


// FUNCTION SEARCH
function search() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  // li = ul.getElementsByTagName("");
  li = ul.querySelectorAll(".card");
  // console.log(li[0].querySelector(".card-body").querySelector(".card-title"));
  for (i = 0; i < li.length; i++) {
    // a = li[i].getElementsByTagName("a")[0];
    a = li[i].querySelector(".card-body").querySelector(".card-title");
    console.log(a.innerText);
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
