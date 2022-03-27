const confusedImage="./images/confused.png";

const fetchPokemon = () => {

    const userInput = document.getElementById("user_input");
    let nameInput = userInput.value;
    nameInput = nameInput.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${nameInput}`;

    fetch(url).then(
        (res) => {
            if (res.status != "200") {
                // console.log(res);
                undefindedPokemon()
            }
            else {
                return res.json();
            }
        }
    ).then(
        (data) => {
            if (data) {
                // console.log(data);
                changePokemon(data)
            }
        }
    );
}

const pkNameContainer=document.getElementById("pk_name");

const pkImageContainer = document.getElementById("pk_image");

const pkTypesContainer = document.getElementById("pk_types");
const pkTypesUndefined = document.getElementById("pk_types_undefined");

const pkStatsContainer = document.getElementById("pk_stats");

const pkMovesContainer = document.getElementById("pk_moves");

const pkWeaknessesContainer = document.getElementById("pk_weaknesses");
const pkWeaknessesUndefined = document.getElementById("pk_weaknesses_undefined");

const undefindedPokemon = ()=> {
    pkImageContainer.src = confusedImage;
    pkTypesContainer.innerHTML = `<h3 class="d-inline">TYPE: </h3>`;
    pkTypesContainer.appendChild(pkTypesUndefined)
    pkWeaknessesContainer.innerHTML = `<h3 class="d-inline">WEAKNESSES: </h3>`;
    pkWeaknessesContainer.appendChild(pkWeaknessesUndefined)
}

const changePokemon = (data) =>{
    setPokemonInformation(data.id, data.name);
    
    setPokemonImage(data.sprites);

    setPokemonTypes(data.types);

    setPokemonStats(data.stats);

    setPokemonMoves(data.moves);
}


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

const setPokemonInformation = (id, name) =>{
    // Pokemon Information
    let pkNumber = id;
    let pkName = name;
    // pkName = pkName[0].toUpperCase() + pkName.slice(1);
    pkName = pkName.toUpperCase();
    pkNameContainer.innerText = "#" + pkNumber + " - " + pkName;
}

const setPokemonImage = (sprites) =>{
    // Pokemon Image
    let pkImageURL = sprites.front_default;
    pkImageContainer.src = pkImageURL;
}

const setPokemonMoves = (moves) =>{
    // Pokemon movements
    pkMovesContainer.innerHTML = null;
    moves.forEach(
        (move) => {
            let moveName = move.move.name;
            moveName = moveName[0].toUpperCase() + moveName.slice(1);

            let newMove = document.createElement("li");
            newMove.innerText = moveName;
            pkMovesContainer.appendChild(newMove);
        }
    );
}

const setPokemonStats = (stats) =>{
    // Pokemon stats
    pkStatsContainer.innerHTML = null;
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
            statValue=((statValue*100)/255)
            // console.log(statValue)
            newStatValue.style.height = statValue + "%"
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
}

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