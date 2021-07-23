const profil = JSON.parse(localStorage.getItem('profil'));
const nomProfil = document.getElementById("nom-profil");
const villeProfil = document.getElementById("ville-profil");
const citaProfil = document.getElementById("citation-profil");
const titlePage = document.getElementById('title-page');
const tagsProfil = document.getElementById('tag-profil');

function setInfosProfil() {

    console.log(profil);

    titlePage.textContent = "Profil de " + profil.name;
    nomProfil.textContent = profil.name;
    villeProfil.textContent = profil.city + ', ' + profil.country;
    citaProfil.textContent = profil.tagline;

    for (let i = 0; i < profil.tags.length; i++) {
        const divTag = document.createElement('a');
        divTag.className = "tag";
        divTag.textContent = "#" + profil.tags[i];
        divTag.href = "#";
        tagsProfil.appendChild(divTag);
    }

    console.log(nomProfil.textContent);
};

setInfosProfil();



