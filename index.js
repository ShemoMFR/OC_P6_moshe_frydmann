const mainSection = document.getElementById("main-section");
const tags = document.querySelectorAll('.tag');
const logoContainer = document.getElementsByClassName('logo-container')[0];

for (let i = 0; i < tags.length; i++) {
        
        tags[i].addEventListener('click', () => {
                localStorage.setItem('tag', `${tags[i].textContent.replace('#', '').toLowerCase()}`);
                window.location.reload();
        });
}

logoContainer.addEventListener('click', () => {
        localStorage.removeItem('tag');
});

function displayProfils(photographe) {
        const newDiv = document.createElement('div');
        newDiv.className = "card";
        mainSection.appendChild(newDiv);

                /*** Création img ***/

        const aPhoto = document.createElement('a');
        aPhoto.href = `profil.html?id=${photographe.id}`;
        const divPhoto = document.createElement('img');
        divPhoto.src = "./FishEye_Photos/Photos/Photographers/" + photographe.portrait;
        divPhoto.alt = "";
        divPhoto.className = "card-photo";
        aPhoto.appendChild(divPhoto);
        newDiv.appendChild(aPhoto);

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

            divTag.addEventListener('click', () => {
                localStorage.setItem('tag', `${photographe.tags[i]}`);
                window.location.reload();
            });
        }        

        newDiv.appendChild(divTags);

}

function getData() {
        fetch("photographes.json")
        .then(response => response.json())
        .then(data => data.photographers.map(photographe => {

            if(!localStorage.getItem('tag')) {
                displayProfils(photographe);
                
            } else {
                
                for (let i = 0; i < photographe.tags.length; i++) {
                        if (photographe.tags[i] === localStorage.getItem('tag')) {
                                displayProfils(photographe);
                                break;
                        }
                }

            }
    
        }));

        //localStorage.removeItem('tag');
    };

getData();


