
const nomProfil = document.getElementById("nom-profil");
const villeProfil = document.getElementById("ville-profil");
const citaProfil = document.getElementById("citation-profil");
const titlePage = document.getElementById('title-page');
const tagsProfil = document.getElementById('tag-profil');
const photoProfil = document.getElementById('photo-top-section');
const bodySection = document.getElementsByClassName('body-section')[0];
const selectorPopularite = document.getElementsByClassName('selector-pop')[0];
const titreTrie = document.getElementById('selecteur-trie');
const selectorOpen = document.getElementsByClassName('selector-open')[0];
const fleche = document.getElementById('fleche');
const selectorPop = document.getElementById('popularite-title1');
const selectorDate = document.getElementById('popularite-title2');
const selectorTitle = document.getElementById('popularite-title3');
const urlParams = new URLSearchParams(window.location.search);
const idProfil = urlParams.get("id");
let isOpen = false;
let tjm = document.getElementsByClassName('tjm-profil')[0];
let TotalLikes = document.getElementsByClassName('total-likes')[0];
const modal = document.getElementsByClassName('modal-bg')[0]
const photoModal = document.getElementsByClassName('photo-modal')[0];
const videoModal = document.getElementsByClassName('video-modal')[0];
const body = document.getElementsByTagName('body')[0];
const exitModal = document.getElementsByClassName('exit-modal-event')[0];
const chevronLeft = document.getElementById('chevron-left');
const chevronRight = document.getElementById('chevron-right');
const titleModal = document.getElementsByClassName('title-modal')[0];
const formulaireContact = document.getElementsByClassName('form-container')[0];
const form = document.getElementsByClassName('form')[0];
const contact = document.getElementsByClassName('contactez-moi')[0];
const exitBlanc = document.getElementsByClassName('exitBlanc')[0];
const photographeName = document.getElementById('photographe-name');
let mediasProfil;
let profilPage;
let TLikes = 0;
let currentIndex = 0;
let i = 1;
let isFormOpen = false;
let isCarouOpen = false;

function cleanDisplay() {
    
    while (bodySection.firstChild) {
        bodySection.removeChild(bodySection.lastChild);
    }
}

function setInfosTrie(trie) {
    selectorOpen.style.display = 'none';
    fleche.src = "./FishEye_Photos/svg/fleche-bas.svg";
    titreTrie.textContent = `${trie}`;
    isOpen = false;
}

function createGalery(mediasProfil) {

    TLikes = 0;

    mediasProfil.map(media => {
    TLikes += parseInt(media.likes);

    /** Creation container */
    const container = document.createElement('div');
    bodySection.appendChild(container);  

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
    newHeart.alt = "nombre de coeurs";
    containerLikes.appendChild(newLikes);
    containerLikes.appendChild(newHeart);
    newContainerInfos.appendChild(containerLikes);

    newHeart.addEventListener('click', () => {
        const likes = parseInt(newLikes.textContent) + 1;
        newLikes.textContent = likes;
        localStorage.setItem('nbrLikes', parseInt(`${localStorage.getItem('nbrLikes')}`) + 1);  
        TotalLikes.textContent = `${localStorage.getItem('nbrLikes')}`;      
    });

    if (media.image) {

        const btn = document.createElement("button");
        btn.style.width = "100%";
        btn.ariaLabel = "image provenant de la gallerie du photographe";
        const newImg = document.createElement('img');
        newImg.className = "media";
        newImg.src = `./FishEye_Photos/Photos/${idProfil}/${media.image}`;
        newImg.alt = `${media.title}`;
        
        btn.appendChild(newImg);
        container.appendChild(btn);

        btn.addEventListener('click', function() {

            isCarouOpen = true;
            photoModal.style.display = "flex";
            photoModal.style.visibility = "visible";
            videoModal.style.display = "none";
            modal.style.visibility = "visible";
            photoModal.src = `./FishEye_Photos/Photos/${idProfil}/${media.image}`;
            body.style.overflowY = "hidden";

            titleModal.textContent = media.title;
            currentIndex = mediasProfil.indexOf(media);

            if (currentIndex === 0) {
                chevronLeft.style.opacity = "0.2";
            }
            else {
                chevronLeft.style.opacity = "1";
            }

            if (currentIndex === mediasProfil.length - 1) {
                chevronRight.style.opacity = "0.2";
            }
            else {
                chevronRight.style.opacity = "1";
            }
            
        });
    }

    else if (media.video) {
        const btn = document.createElement("button");
        btn.style.width = "100%";
        btn.ariaLabel = "image provenant de la gallerie du photographe";
        const newVideo = document.createElement('video');
        newVideo.className = "media";
        newVideo.src = `./FishEye_Photos/Photos/${idProfil}/${media.video}`;
        container.appendChild(newVideo);

        btn.appendChild(newVideo);
        container.appendChild(btn);

        btn.addEventListener('click', function() {

            isCarouOpen = true;
            videoModal.style.display = "inline-block";
            videoModal.style.visibility = "visible";
            photoModal.style.display = "none";
            modal.style.visibility = "visible"; 
            videoModal.src = `./FishEye_Photos/Photos/${idProfil}/${media.video}`;
            body.style.overflowY = "hidden";

            titleModal.textContent = media.title;
            currentIndex = mediasProfil.indexOf(media);

            if (currentIndex === 0) {
                chevronLeft.style.opacity = "0.2";
            }
        });
    }

        container.appendChild(newContainerInfos);

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
}

function sortedMediasProfil() {

    fetch("photographes.json")
    .then(response => response.json())
    .then(data => { 
        mediasProfil = data.media.filter(
        media => media.photographerId == idProfil);

        titreTrie.textContent = "Popularité";

        mediasProfil.sort( function(a, b) {
            a = a.likes;
            b = b.likes;
            return a > b ? -1 : a < b ? 1 : 0;
        });

        selectorPop.addEventListener('click', function() {
           
            setInfosTrie("Popularité");
            cleanDisplay();

            mediasProfil.sort( function(a, b) {
                a = a.likes;
                b = b.likes;
                return a > b ? -1 : a < b ? 1 : 0;
            });

            createGalery(mediasProfil);
            
        })


        selectorDate.addEventListener("click", function() {

            setInfosTrie("Date");
            cleanDisplay();

            mediasProfil.sort(function(a, b) {
                a = new Date(a.date);
                b = new Date(b.date);
                return a > b ? -1 : a < b ? 1 : 0;
            });

            createGalery(mediasProfil);

        })

        selectorTitle.addEventListener("click", function() {

            setInfosTrie("Titre");
            cleanDisplay();

            mediasProfil.sort( function(b, a) {
                a = a.title;
                b = b.title;
                return a > b ? -1 : a < b ? 1 : 0;
            });
            
            createGalery(mediasProfil);

        })

    createGalery(mediasProfil);

    });
}

function managerIndex() {

    if (mediasProfil[currentIndex].image) {
        photoModal.style.display = "flex";
        photoModal.style.visibility = "visible";
        videoModal.style.display = "none";
        titleModal.textContent = mediasProfil[currentIndex].title;
        photoModal.src = `./FishEye_Photos/Photos/${idProfil}/${mediasProfil[currentIndex].image}`;

    } else {
        photoModal.style.display = "none";
        videoModal.style.display = "inline-block";
        videoModal.style.visibility = "visible";
        titleModal.textContent = mediasProfil[currentIndex].title;
        videoModal.src = `./FishEye_Photos/Photos/${idProfil}/${mediasProfil[currentIndex].video}`;
    }  
}

function nextMedia() {
    currentIndex = currentIndex < mediasProfil.length - 1 ? ++currentIndex : currentIndex;
       
    managerIndex();

    if (currentIndex !== 0) {
        chevronLeft.style.opacity = "1";
    }

    if (currentIndex === mediasProfil.length - 1 ) {
        chevronRight.style.opacity = "0.2";
    }
}

function prevMedia() {
    currentIndex = currentIndex > 0 ? --currentIndex : currentIndex;

    managerIndex();

    if (currentIndex === 0) {
        chevronLeft.style.opacity = "0.2";
    }

    if (currentIndex < mediasProfil.length - 1 ) {
        chevronRight.style.opacity = "1";
    }
}

chevronLeft.addEventListener('click', prevMedia);
chevronRight.addEventListener('click', nextMedia);


setInfosProfil();
sortedMediasProfil();

selectorPopularite.addEventListener('click', function() {

    if (isOpen) {
        selectorOpen.style.display = 'none';
        fleche.src = "./FishEye_Photos/svg/fleche-bas.svg";
        isOpen = false;
    }

    else {
        selectorOpen.style.display = 'inline-block';
        fleche.src = "./FishEye_Photos/svg/fleche-haut.svg";
        isOpen = true;
    }

});

exitModal.addEventListener('click', closeModalPhoto);

function closeModalPhoto() {
    modal.style.visibility = "hidden";
    body.style.overflowY = "visible";
    photoModal.style.visibility = "hidden";
    videoModal.style.visibility = "hidden";
    isCarouOpen = false;
    i = 0;
}

contact.addEventListener('click', () => {
    formulaireContact.style.visibility = "visible";
    photographeName.textContent = `${nomProfil.textContent}`; 
    formulaireContact.style.animation = 'modalopen 1.5s';
    document.getElementsByClassName("input-form")[0].focus();
    isFormOpen = true;

    console.log(isCarouOpen)
});

exitBlanc.addEventListener('click', () => {
    formulaireContact.style.visibility = "hidden";
    formulaireContact.style.animation = '';
    isFormOpen = false;
    i = 0;
});

/**** Au submit réouvre la page du photographe car sinon si la page se rafraichit, on perd les queryParams *****/
form.addEventListener('submit', (e) => {
    e.preventDefault();
    formulaireContact.style.visibility = "hidden";
    formulaireContact.style.animation = '';
    isFormOpen = false;
 })

 window.addEventListener("keydown", function (e) {
     
    if (isFormOpen) {

        if (e.key !== "Enter") {
            e.preventDefault();
        }

        if (e.key === "Escape" || e.key === "Esc") {
            formulaireContact.style.visibility = "hidden";
            formulaireContact.style.animation = '';
            isFormOpen = false;
        }

        if (e.key === "Tab") {

            const modalFocus = document.getElementsByClassName("js-modal-focus");

            if (i >= modalFocus.length) {
                i = 0;
            }

            modalFocus[i].focus();

            ++i;
        }
    }

    else if (isCarouOpen) {

        if (e.key !== "Enter") {
            e.preventDefault();
        }

        if (e.key === "ArrowLeft") {
            prevMedia();
        }

        if (e.key === "ArrowRight") {
            nextMedia();
        }

        if (e.key === "Escape" || e.key === "Esc") {
            closeModalPhoto();
            modal.style.visibility = "hidden";
        }

        if (e.key === "Tab") {

            const modalPhotoFocus = document.getElementsByClassName("js-modalPhoto-focus");

            if (i >= modalPhotoFocus.length) {
                i = 0;
            }

            if (i == 2) {
                document.getElementsByClassName("exit-modal")[0].style.border = "1px solid red";
            }
            else {
                document.getElementsByClassName("exit-modal")[0].style.border = "none";
            }

            modalPhotoFocus[i].focus();

            ++i;
        }
    }

 });



