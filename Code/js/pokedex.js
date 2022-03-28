const confusedImage="./images/confused.png";

var pokemonCurrent=null;

const userInput = document.getElementById("user_input");
const searchPokemon = () => {
    let pokemon = userInput.value;
    pokemon = pokemon.toLowerCase();
    if(pokemonCurrent){
        if(pokemon&&pokemon!=pokemonCurrent.id&&pokemon!=pokemonCurrent.name){
            // console.log("Es diferente: "+pokemon);
            fetchPokemon(pokemon);
        }
    }else if(pokemon){
        fetchPokemon(pokemon);
    }
}

const fetchPokemon = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(url).then(
        (res) => {
            if (res.status != "200") {
                // console.log(res);
                undefindedPokemon();
            }
            else {
                return res.json();
            }
        }
    ).then(
        (data) => {
            if (data) {
                // console.log(data);
                pokemonCurrent=changePokemon(data);
            }
        }
    );
}

const undefindedPokemon = () => {
    pokemonCurrent=null;
    
    pkImageContainer.src = confusedImage;
    pkNameContainer.innerText= "No results, is the name/id correct?"

    pkTypesContainer.innerHTML = `<h3 class="d-inline">TYPE: </h3>`;
    pkTypesContainer.appendChild(pkTypesUndefined)

    pkWeaknessesContainer.innerHTML = `<h3 class="d-inline">WEAKNESSES: </h3>`;
    pkWeaknessesContainer.appendChild(pkWeaknessesUndefined)

    for(var i=0; i<pkStatsContainer.children.length; i++){
        // console.log("Stat", pkStatsContainer.children[i]);
        pkStatsContainer.children[i].children[0].innerText =  "";
        pkStatsContainer.children[i].children[1].children[0].style.height = "0%";
    }
    for(var i=0; i<pkStatsContainer.children.length; i++){
        // console.log("Stat", pkStatsContainer.children[i]);
        pkStatsContainer.children[i].children[0].innerText =  "";
        pkStatsContainer.children[i].children[1].children[0].style.height = "0%";
    }
    
    movesTitle.innerHTML=`<h4>MOVEMENTS</h4>`;
    pkMovesContainer.innerHTML="";
}

const changePokemon = (data) =>{

    let information=setPokemonInformation(data.id, data.name);
    
    setPokemonImage(data.sprites);

    setPokemonTypes(data.types);

    setPokemonStats(data.stats);

    setPokemonMoves(data.moves);

    return(information)

}

const pkNameContainer=document.getElementById("pk_name");
const movesTitle=document.getElementById("moves_title");
const setPokemonInformation = (id, name) =>{
    // Pokemon Information
    let pkNumber = id;
    let pkName = name;

    // pkName = pkName[0].toUpperCase() + pkName.slice(1);
    
    pkName = pkName.toUpperCase();
    pkNameContainer.innerText = "#" + pkNumber + " - " + pkName;
    movesTitle.innerHTML=`<h4>MOVEMENTS OF ${pkName}</h4>`;

    return({
        "id": pkNumber,
        "name": pkName.toLowerCase(),
    });
}

const pkImageContainer = document.getElementById("pk_image");
const setPokemonImage = (sprites) =>{
    // Pokemon Image
    let pkImageURL = sprites.front_default;
    pkImageContainer.src = pkImageURL;
}

const pkTypesContainer = document.getElementById("pk_types");
const pkTypesUndefined = document.getElementById("pk_types_undefined");
const setPokemonTypes = (types) =>{
    // Pokemon type
    pkTypesContainer.innerHTML = `<h3 class="d-inline">TYPE: </h3>`;
    types.forEach(
        (type) => {
            let typeName = type.type.name;
            let typeURL = type.type.url;
            typeName = typeName.toUpperCase();

            let newType = document.createElement("span");
            newType.classList.add("badge");
            newType.innerText = typeName;
            pkTypesContainer.appendChild(newType);

            // console.log(typeURL)
            fetchWeaknesses(typeURL);
        }
    );
}

const pkStatsContainer = document.getElementById("pk_stats");
const setPokemonStats = (stats) =>{
    // Pokemon stats
    stats.forEach(
        (stat) => {
            let statValue = stat.base_stat;
            let statName = stat.stat.name;
            let newStatValueText=pkStatsContainer.querySelector("#stat_"+statName+"_text_value");
            let newStatValue=pkStatsContainer.querySelector("#stat_"+statName+"_value");
            
            newStatValueText.innerText =  statValue + "pts";
            statValue = ((statValue*100)/255);
            newStatValue.style.height = statValue + "%";
            
            // fitText(newStatValueText, 0.5);
        }
    );
    /*
    // pkStatsContainer.innerHTML = null;
    stats.forEach(
        (stat) => {
            let statValue = stat.base_stat;
            let statName = stat.stat.name;
            // statName = statName[0].toUpperCase() + statName.slice(1);
            statName = statName.toUpperCase();
            statName = statName.replace("-", " ");

            // Creating the elements for render stat
            let newStat = document.createElement("div");
            let newStatValueText = document.createElement("h4");
            let newStatValueContainer = document.createElement("div");
            let newStatValue = document.createElement("div");
            let newStatName = document.createElement("h4");

            // Adding style classes
            newStat.classList.add("stat");
            newStatValueText.classList.add("stat-name");
            newStatValueContainer.classList.add("stat-value-container");
            newStatValue.classList.add("stat-value");
            newStatName.classList.add("stat-name");

            // Doing calculations for right render
            newStatValueText.innerText =  statValue + "pts";
            statValue=((statValue*100)/255);
            // console.log(statValue);
            newStatValue.style.height = statValue + "%";
            newStatName.innerText=statName;
            
            newStatValueContainer.appendChild(newStatValue)
            newStat.appendChild(newStatValueText)
            newStat.appendChild(newStatValueContainer)
            newStat.appendChild(newStatName)
            pkStatsContainer.appendChild(newStat);

            // Text style height properties
            fitText(newStatValueText, 0.5);
            fitText(newStatName, 0.5);
        }
    );
    */
}

const pkMovesContainer = document.getElementById("pk_moves");
const setPokemonMoves = (moves) =>{
    // Pokemon movements
    // console.log(moves);
    pkMovesContainer.innerHTML=null;
    moves.forEach(
        (move) => {
            let moveURL = move.move.url;
            let moveName = move.move.name;
            // moveName = moveName[0].toUpperCase() + moveName.slice(1);
            moveName = moveName.toUpperCase();

            let newMove = document.createElement("div");
            let newMoveName = document.createElement("p");

            newMoveName.innerText = moveName;
            newMove.appendChild(newMoveName);
            pkMovesContainer.appendChild(newMove);

            fetchMoveType(moveURL, newMove);
        }
    );
}

const setMoveType = (type, element) =>{
    // Pokemon movement type
    // console.log(type.name);
    let newType = document.createElement("span");
    newType.classList.add("badge");
    newType.innerText = type.name.toUpperCase();
    element.appendChild(newType);
}

const pkWeaknessesContainer = document.getElementById("pk_weaknesses");
const pkWeaknessesUndefined = document.getElementById("pk_weaknesses_undefined");
const setPokemonWeaknesses = (data) =>{
    // Pokemon weaknesses
    pkWeaknessesContainer.innerHTML = `<h3 class="d-inline">WEAKNESSES: </h3>`;
    data.damage_relations.double_damage_from.forEach(
        (type) => {
            let typeName = type.name;
            typeName = typeName.toUpperCase();

            let newType = document.createElement("span");
            newType.classList.add("badge");
            newType.innerText = typeName;
            pkWeaknessesContainer.appendChild(newType);
        }
    );
}

const fetchWeaknesses = (typeURL) => {
    fetch(typeURL).then(
        (res) => {
            if (res.status == "200") {
                return res.json();
            }
        }
    ).then(
        (data) => {
            if (data) {
                // console.log(data);
                setPokemonWeaknesses(data);
                // return(data);   
            }
        }
    );
}

const fetchMoveType = (moveURL, element) => {
    fetch(moveURL).then(
        (res) => {
            if (res.status == "200") {
                return res.json();
            }
        }
    ).then(
        (data) => {
            if (data) {
                // console.log(data);
                setMoveType(data.type, element);
                // return(data);   
            }
        }
    );
}
