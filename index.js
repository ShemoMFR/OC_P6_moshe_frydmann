const mainSection = document.getElementById("main-section");

function getData() {
    fetch("photographes.json")
    .then(response => response.json())
    .then(data => data.photographers.map(photographe => {
        const newDiv = document.createElement('div');
        newDiv.className = "card";
        mainSection.appendChild(newDiv);

                /*** Création img ***/

        const divPhoto = document.createElement('img');
        divPhoto.src = "./FishEye_Photos/Photos/Photographers/" + photographe.portrait;
        divPhoto.alt = "";
        divPhoto.innerHTML = "<a href=./profil.html></a>";
        divPhoto.className = "card-photo";
        newDiv.appendChild(divPhoto);

                /*** Evenement au click img ***/

        divPhoto.addEventListener("click", function() {
            window.open("profil.html");
            localStorage.setItem("profil", JSON.stringify(photographe));
        })

                /*** Création div name ***/

        const divName = document.createElement('div');
        divName.textContent = photographe.name;
        divName.className = "card-name";
        newDiv.appendChild(divName);

                /*** Création div City ***/

        const divCity = document.createElement('div');
        divCity.textContent = photographe.city + ', ' + photographe.country;
        divCity.className = "card-city";
        newDiv.appendChild(divCity);

                /*** Création div name ***/

        const divCitation = document.createElement('div');
        divCitation.textContent = photographe.tagline;
        divCitation.className = "card-citation";
        newDiv.appendChild(divCitation);

                /*** Création div TJM ***/

        const divTjm = document.createElement('div');
        divTjm.textContent = photographe.price + "€/jour";
        divTjm.className = "card-tjm";
        newDiv.appendChild(divTjm);

                /*** Création div tags ***/


        const divTags = document.createElement('div');
        divTags.className = "card-tags";
        
        for (let i = 0; i < photographe.tags.length; i++) {
            const divTag = document.createElement('a');
            divTag.className = "tag";
            divTag.textContent = "#" + photographe.tags[i];
            divTag.href = "#";
            divTags.appendChild(divTag);
        }

        newDiv.appendChild(divTags);

    }));
};

getData();

