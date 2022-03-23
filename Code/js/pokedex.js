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
                pkImageContainer.src = confusedImage;
            }
            else {
                return res.json();
            }
        }
    ).then(
        (data) => {
            if (data) {
                console.log(data);
                changePokemon(data)
            }
        }
    );
}

const pkNameContainer=document.getElementById("pk_name");
const pkImageContainer = document.getElementById("pk_image");
const pkTypesContainer = document.getElementById("pk_types");
const pkStatsContainer = document.getElementById("pk_stats");
const pkMovesContainer = document.getElementById("pk_moves");

const changePokemon = (data) =>{
    // Pokemon Name
    let pkName = data.name;
    pkName = pkName[0].toUpperCase() + pkName.slice(1);
    pkNameContainer.innerText=pkName;
    
    // Pokemon Image
    let pkImageURL = data.sprites.front_default;
    pkImageContainer.src = pkImageURL;

    // Pokemon type
    pkTypesContainer.innerHTML = null;
    data.types.forEach(
        (type) => {
            let typeName = type.type.name;
            typeName = typeName[0].toUpperCase() + typeName.slice(1);

            let newType = document.createElement("li");
            newType.innerText = typeName;
            pkTypesContainer.appendChild(newType);
        }
    );

    // Pokemon stats
    pkStatsContainer.innerHTML = null;
    data.stats.forEach(
        (stat) => {
            let statValue = stat.base_stat;
            let statName = stat.stat.name;
            statName = statName[0].toUpperCase() + statName.slice(1);

            let newStat = document.createElement("li");
            newStat.innerText = statName + ": " + statValue + "pts";
            pkStatsContainer.appendChild(newStat);
        }
    );

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
    // console.log(pkImage);
}
