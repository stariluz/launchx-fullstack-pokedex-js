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

const undefindedPokemon = ()=> {
    pkImageContainer.src = confusedImage;
    pkTypesContainer.innerHTML = `<h3 class="d-inline">TYPE: </h3>`;
    pkTypesContainer.appendChild(pkTypesUndefined)
    pkWeaknessesContainer.innerHTML = `<h3 class="d-inline">WEAKNESSES: </h3>`;
    pkWeaknessesContainer.appendChild(pkWeaknessesUndefined.cloneNode())
}

const changePokemon = (data) =>{
    // Pokemon Name
    let pkNumber = data.id;
    let pkName = data.name;
    pkName = pkName[0].toUpperCase() + pkName.slice(1);
    pkNameContainer.innerText = "#" + pkNumber + " - " + pkName;
    
    // Pokemon Image
    let pkImageURL = data.sprites.front_default;
    pkImageContainer.src = pkImageURL;

    // Pokemon type
    pkTypesContainer.innerHTML = `<h3 class="d-inline">TYPE: </h3>`;
    data.types.forEach(
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

    // Pokemon stats
    pkStatsContainer.innerHTML = null;
    data.stats.forEach(
        (stat) => {
            let statValue = stat.base_stat;
            let statName = stat.stat.name;
            // statName = statName[0].toUpperCase() + statName.slice(1);
            statName = statName.toUpperCase();

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

            fitText(newStatValueText, 0.5);
            fitText(newStatName, 0.5);
        }
    );
/* 
    // Pokemon movements
    pkMovesContainer.innerHTML = null;
    data.moves.forEach(
        (move) => {
            let moveName = move.move.name;
            moveName = moveName[0].toUpperCase() + moveName.slice(1);

            let newMove = document.createElement("li");
            newMove.innerText = moveName;
            pkMovesContainer.appendChild(newMove);
        }
    );
    // console.log(pkImage); */
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
                setWeaknessesPokemon(data);
                // return(data);   
            }
        }
    );
}

const pkWeaknessessContainer = document.getElementById("pk_weaknesses");
const pkWeaknessesUndefined = document.getElementById("pk_weaknesses_undefined");

const setWeaknessesPokemon = (data) =>{
    // Pokemon weaknesses
    pkWeaknessessContainer.innerHTML = `<h3 class="d-inline">WEAKNESSES: </h3>`;
    data.damage_relations.double_damage_from.forEach(
        (type) => {
            let typeName = type.name;
            typeName = typeName.toUpperCase();

            let newType = document.createElement("span");
            newType.classList.add("badge");
            newType.innerText = typeName;
            pkWeaknessessContainer.appendChild(newType);
        }
    );
}