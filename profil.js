const nomProfil = document.getElementById("nom-profil");
const villeProfil = document.getElementById("ville-profil");
const citaProfil = document.getElementById("citation-profil");
const titlePage = document.getElementById('title-page');
const tagsProfil = document.getElementById('tag-profil');
const photoProfil = document.getElementById('photo-top-section');
const urlParams = new URLSearchParams(window.location.search);
const idProfil = urlParams.get("id");
let test;

function setInfosProfil() {

    fetch("photographes.json")
    .then(response => response.json())
    .then(data => {
        test = data.photographers.filter(
        photographe => photographe.id == idProfil);
        test = test[0];

        titlePage.textContent = "Profil de " + test.name;
        nomProfil.textContent = test.name;
        villeProfil.textContent = test.city + ', ' + test.country;
        citaProfil.textContent = test.tagline;
    
        for (let i = 0; i < test.tags.length; i++) {
            const divTag = document.createElement('a');
            divTag.className = "tag";
            divTag.textContent = "#" + test.tags[i];
            divTag.href = "#";
            tagsProfil.appendChild(divTag);
        }

        photoProfil.src = "./FishEye_Photos/Photos/Photographers/" + test.portrait;
        photoProfil.alt = `${test.name}`;
        console.log(photoProfil)

    });
 


};

setInfosProfil();



