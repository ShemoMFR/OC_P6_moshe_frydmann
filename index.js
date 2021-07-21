const mainSection = document.getElementById("main-section");

function getData() {
    fetch("photographes.json")
    .then(response => response.json())
    .then(data => data.photographers.map(photographe => {
        const newDiv = document.createElement('div');
        newDiv.className = "card";
        newDiv.textContent = photographe.name;
        mainSection.appendChild(newDiv);
    }));
};


 

getData();

