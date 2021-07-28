const nomProfil = document.getElementById("nom-profil");
const villeProfil = document.getElementById("ville-profil");
const citaProfil = document.getElementById("citation-profil");
const titlePage = document.getElementById('title-page');
const tagsProfil = document.getElementById('tag-profil');
const photoProfil = document.getElementById('photo-top-section');
const bodySection = document.getElementsByClassName('body-section')[0];
const urlParams = new URLSearchParams(window.location.search);
const idProfil = urlParams.get("id");
let tjm = document.getElementsByClassName('tjm-profil')[0];
let TotalLikes = document.getElementsByClassName('total-likes')[0];
let mediasProfil;
let profilPage;

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

        mediasProfil.map(media => {
            TLikes += parseInt(media.likes);

            if (media.image) {

                console.log(media.image)
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

            }

            if (media.video) {
                 /** Creation container */
                 const container = document.createElement('div');
                 bodySection.appendChild(container);
 
                 /** Creation video */

                 const newVideo = document.createElement('video');
                 const newVideoSource = document.createElement('source');
                 newVideo.appendChild(newVideoSource);
                 newVideo.className = "media";
                 newVideoSource.src = `./FishEye_Photos/Photos/${idProfil}/${media.video}`;

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
            }
                
        })

        TotalLikes.textContent = `${TLikes}`;

    });
};


setInfosProfil();
setMediasProfil();

console.log(totalLikes)



