let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
    { name: "Golbat", height: 1.6, types: ["flying", "poison"] },
    { name: "Alakazam", height: 1.2, types: ["psychic"] },
    { name: "Hypno", height: 1.6, types: ["psychic"]},
    { name: "Scyther", height: 1.5, types: ["bug", "flying"]},
    { name: "Pikachu", height: 0.4, types: ["electric"]},
    { name: "Venusaur", height: 2, types: ["grass", "poison"]}
  ]

  console.log(pokemonList.length); 

for(let i = 0; i < pokemonList.length; i++){

  let size = "";
  if (pokemonList[i].height > 1.5){ 
    size = "WOW THIS IS BIG"
  } else if (pokemonList[i].height < 1){
    size = "this is small"    
  } else {
    size = "This is Medium"
  }

let color = " "
  for(let k = 0; k < pokemonList[i].types.length; k++){
    if(pokemonList[i].types[k] == "grass"){
    color = '<span style="color:green;"> ';
    } else if (pokemonList[i].types[k] == "fire"){
      color = '<span style="color:red;"> ';
    } else if (pokemonList[i].types[k] == "psychic"){
      color = '<span style="color:purple;"> ';
    } else if (pokemonList[i].types[k] == "electric"){
      color = '<span style="color:gold;"> ';
    } else if (pokemonList[i].types[k] == "flying"){
      color = '<span style="color:blue;"> ';
    }
  }


  document.write(
    '<div class = "box">' + 
    pokemonList[i].name + 
    " " + 
    "(height: " + 
    pokemonList[i].height + 
    ")" + 
    "<br>" + 
    color + 
    pokemonList[i].types + 
    "<br>"  +
    size + 
    '</div>'
  )
}

