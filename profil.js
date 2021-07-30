const nomProfil = document.getElementById("nom-profil");
const villeProfil = document.getElementById("ville-profil");
const citaProfil = document.getElementById("citation-profil");
const titlePage = document.getElementById('title-page');
const tagsProfil = document.getElementById('tag-profil');
const photoProfil = document.getElementById('photo-top-section');
const bodySection = document.getElementsByClassName('body-section')[0];
const selectorPopularite = document.getElementsByClassName('container-title1')[0];
const selectorOpen = document.getElementsByClassName('selector-open')[0];
const fleche = document.getElementById('fleche');
const selectorDate = document.getElementById('popularite-title2');
const selectorTitle = document.getElementById('popularite-title3');
const urlParams = new URLSearchParams(window.location.search);
const idProfil = urlParams.get("id");
/* let media = document.getElementsByClassName('media');
 */let titleMedia = document.getElementsByClassName('title-media');
let likesMedia = document.getElementsByClassName('likes-media');
let isOpen = false;
let tjm = document.getElementsByClassName('tjm-profil')[0];
let TotalLikes = document.getElementsByClassName('total-likes')[0];
const modal = document.getElementsByClassName('modal-bg')[0]
const photoModal = document.getElementsByClassName('photo-modal')[0];
const videoModal = document.getElementsByClassName('video-modal')[0];
const sourceModal = document.getElementById('source-modal');
const body = document.getElementsByTagName('body')[0];
const exitModal = document.getElementsByClassName('exit-modal')[0];
let mediasProfil;
let profilPage;
let TLikes = 0;

function createGalery(mediasProfil ) {
    mediasProfil.map(media => {
        TLikes += parseInt(media.likes);

        if (media.image) {

            /** Creation container */
            const container = document.createElement('div');
            bodySection.appendChild(container);

            /** Creation img */

            const newImg = document.createElement('img');
            newImg.className = "media";
            newImg.src = `./FishEye_Photos/Photos/${idProfil}/${media.image}`;

             /** Creation containers */

            const newContainerInfos = document.createElement('div');
            newContainerInfos.className ="container-media";

            const containerLikes = document.createElement('div');
            containerLikes.className = "container-likes";

             /** Creation elements titre, likes et coeur */

            const newTitle = document.createElement('div');
            newTitle.className = "title-media"
            newTitle.textContent = media.title;
            newContainerInfos.appendChild(newTitle);

            const newLikes = document.createElement('div');
            newLikes.className = "likes-media";
            newLikes.textContent = media.likes;

            const newHeart = document.createElement('img');
            newHeart.className = "heart";
            newHeart.src = "./FishEye_Photos/png/heart.png";
            containerLikes.appendChild(newLikes);
            containerLikes.appendChild(newHeart);
            newContainerInfos.appendChild(containerLikes);

            container.appendChild(newImg);
            container.appendChild(newContainerInfos);

            newImg.addEventListener('click', function() {
                photoModal.style.display = "flex";
                photoModal.style.visibility = "visible";
                videoModal.style.display = "none";
                modal.style.visibility = "visible";
                photoModal.src = `./FishEye_Photos/Photos/${idProfil}/${media.image}`;
                body.style.overflowY = "hidden";
            });
        }

        if (media.video) {
             /** Creation container */
             const container = document.createElement('div');
             bodySection.appendChild(container);

             /** Creation video */

             const newVideo = document.createElement('video');
             newVideo.className = "media";
             newVideo.src = `./FishEye_Photos/Photos/${idProfil}/${media.video}`;

             /** Creation containers */

             const newContainerInfos = document.createElement('div');
             newContainerInfos.className ="container-media";

             const containerLikes = document.createElement('div');
             containerLikes.className = "container-likes";

             /** Creation elements titre, likes et coeur */

             const newTitle = document.createElement('div');
             newTitle.className = "title-media"
             newTitle.textContent = media.title;
             newContainerInfos.appendChild(newTitle);

             const newLikes = document.createElement('div');
             newLikes.className = "likes-media";
             newLikes.textContent = media.likes;

             const newHeart = document.createElement('img');
             newHeart.className = "heart";
             newHeart.src = "./FishEye_Photos/png/heart.png"
             containerLikes.appendChild(newLikes);
             containerLikes.appendChild(newHeart);
             newContainerInfos.appendChild(containerLikes);

             container.appendChild(newVideo);
             container.appendChild(newContainerInfos);

             newVideo.addEventListener('click', function() {
                videoModal.style.display = "inline-block";
                videoModal.style.visibility = "visible";
                photoModal.style.display = "none";
                modal.style.visibility = "visible"; 
                videoModal.src = `./FishEye_Photos/Photos/${idProfil}/${media.video}`;
                body.style.overflowY = "hidden";
            });
        };

        localStorage.setItem('nbrLikes', `${TLikes}`);  
        TotalLikes.textContent = `${localStorage.getItem('nbrLikes')}`;
      
    });
}

function setInfosProfil() {

    fetch("photographes.json")
    .then(response => response.json())
    .then(data => {
        profilPage = data.photographers.filter(
        photographe => photographe.id == idProfil);
        profilPage = profilPage[0];

        tjm.textContent = profilPage.price + "€ / jour";

        titlePage.textContent = "Profil de " + profilPage.name;
        nomProfil.textContent = profilPage.name;
        villeProfil.textContent = profilPage.city + ', ' + profilPage.country;
        citaProfil.textContent = profilPage.tagline;
    
        for (let i = 0; i < profilPage.tags.length; i++) {
            const divTag = document.createElement('a');
            divTag.className = "tag";
            divTag.textContent = "#" + profilPage.tags[i];
            divTag.href = "#";
            tagsProfil.appendChild(divTag);
        }

        photoProfil.src = "./FishEye_Photos/Photos/Photographers/" + profilPage.portrait;
        photoProfil.alt = `${profilPage.name}`;
    });
};

function setMediasProfil() {

    fetch("photographes.json")
    .then(response => response.json())
    .then(data => { 
        mediasProfil = data.media.filter(
        media => media.photographerId == idProfil);

        let TLikes = 0;

    selectorDate.addEventListener("click", function() {

        localStorage.setItem('sortedBy', 'date');
        window.location.reload();
        selectorOpen.style.display = 'none';
        fleche.src = "./FishEye_Photos/svg/fleche-bas.svg"
    })

    selectorTitle.addEventListener("click", function() {

        localStorage.setItem('sortedBy', 'title');
        window.location.reload();
        selectorOpen.style.display = 'none';
        fleche.src = "./FishEye_Photos/svg/fleche-bas.svg"
    })

    if (localStorage.getItem('sortedBy') == 'date') {
        mediasProfil.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a > b ? -1 : a < b ? 1 : 0;
        });

        createGalery(mediasProfil);
    }

    else if (localStorage.getItem('sortedBy') == 'title') {
        mediasProfil.sort( function(b, a) {
            a = a.title;
            b = b.title;
            return a > b ? -1 : a < b ? 1 : 0;
        });

        createGalery(mediasProfil);
    }

    else {createGalery(mediasProfil);};

    localStorage.clear(); 
 
    });
};

setInfosProfil();
setMediasProfil();

selectorPopularite.addEventListener('click', function() {

    if (isOpen) {
        isOpen = false;
    }
    else {
        isOpen = true;
    }

    if (isOpen) {
        selectorOpen.style.display = 'inline-block';
        fleche.src = "./FishEye_Photos/svg/fleche-haut.svg"
    }
    else {
        selectorOpen.style.display = 'none';
        fleche.src = "./FishEye_Photos/svg/fleche-bas.svg"
    }
});

exitModal.addEventListener('click', function() {
    modal.style.visibility = "hidden";
    body.style.overflowY = "visible";
    photoModal.style.visibility = "hidden";
    videoModal.style.visibility = "hidden";
});


