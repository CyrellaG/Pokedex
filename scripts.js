const searchBox = document.querySelector("#searchbox");

document.querySelector("#searchbutton").addEventListener("click", (e) => {
    console.log("Fetching pokemon data.")

    const pokemonName = document.querySelector("#searchbox").value;
    // Convert input to lowercase letters to match API's lowercase species name
    const pokemonNameInput = pokemonName.toLowerCase();
    const container = document.createElement("div");
    //container.remove();

    //container = document.createElement("div");


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameInput}`)
    .then(response => response.json())
    .then(json => {

        let speciesName = `${json.species.name}`;

        if (pokemonNameInput === speciesName) {
            // const container = document.createElement("div");
        
            // The following information must be rendered to the page for a valid Pokemon request:
            
            // A Picture / Sprite 
            let spriteURL = `${json.sprites.other["official-artwork"].front_default}`;
            let spriteURLPlaceholder = `${json.sprites.other["official-artwork"].front_shiny}`;
            let sprite = document.createElement("img"); 
            sprite.setAttribute("src",spriteURL); 
            // If a valid Pokemon is entered that does not have that sprite version, 
            // you may either implement logic to find a valid sprite version, or display a placeholder image.
            sprite.setAttribute("onerror",spriteURLPlaceholder); 
            container.appendChild(sprite);
    
            // Species Name
            container.appendChild(Object.assign(document.createElement("h2"), {innerText: speciesName}));
            
            //Type Name(s)
            let typeName = `Type: ${json.types[0].type.name}`;
            container.appendChild(Object.assign(document.createElement("h3"), {innerText: typeName}));
    
            // Weight
            let weight = `Weight: ${json.weight}`;
            container.appendChild(Object.assign(document.createElement("p"), {innerText: weight}));
    
            // Height
            let height = `Height: ${json.height}`;
            container.appendChild(Object.assign(document.createElement("p"), {innerText: height}));
    
            // Base Experience
            let baseExperience = `Base Experience: ${json.base_experience}`
            container.appendChild(Object.assign(document.createElement("p"), {innerText: baseExperience}));
    
        } else {
            console.log("error");
        }
        document.querySelector("body").appendChild(container);
        console.log(json);

    })

    .catch((error)=>{
        console.log('Error');
        // container.innerText = "Error. Not a valid Pokemon name. Please try again.";
        const containerError = document.createElement("div");
        const screenError = document.createElement("p");
        screenError.innerText = "ERROR. Please enter a valid Pokemon name. Try again.";
        containerError.appendChild(screenError);
        document.querySelector("body").appendChild(containerError);
    });

    // Text input will be cleared after search button is clicked.
    searchBox.value = "";
    container.remove();

});













