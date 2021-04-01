const RealContagious = document.querySelector('#calculateRealContagious');
const tasa = document.querySelector('#infectedPer100');
const habitants = document.querySelector('#population');
const result = document.querySelector('#result');
const resultContainer = document.querySelector('#result-container');
const headerBar = document.getElementsByTagName('header');
const menuIcon = document.querySelector('#menu');
const mainContent = document.getElementsByTagName('main');
const whiteContent = document.querySelector('#white-content');


let cities = []
let population = []

fetch("es.json")
.then(response => response.json())
.then((json) => {
    for (let i = 0; i < json.length; i++) {
        cities.push(json[i].city);
        population.push(json[i].population_proper);
    }
    cities.forEach(element => {
        const optionElement = document.createElement('option');
        optionElement.innerHTML = element;
        habitants.appendChild(optionElement);
    });
    for (let i = 0; i < population.length; i++) {
        habitants.children[i + 1].setAttribute('value', population[i])
    }
});

RealContagious.addEventListener('submit', function(e) {
    e.preventDefault();
    let habitantsData = Number(habitants.value);
    let tasaData = Number(tasa.value);
    resultContainer.classList.remove('revealed');

    if (habitantsData && tasaData) {
        let resultData = Math.round((habitantsData * tasaData) / 100000);
        if (resultData > habitantsData) {
            result.innerHTML = 'Error, hay más contagiados que habitantes. Eso no puede ser'
        }   else {
            result.innerHTML = resultData
        }
        resultContainer.classList.add('revealed');
    }
});

menuIcon.addEventListener('click', revealCredits);

function revealCredits() {
    if (!menuIcon.classList.contains('virus_icon')) {
        headerBar[0].classList.toggle('background');
        menuIcon.classList.add('virus_icon');
        whiteContent.classList.toggle('hidden');
    } else if (menuIcon.classList.contains('virus_icon')) {
        menuIcon.classList.remove('virus_icon');
        whiteContent.classList.toggle('hidden');
        headerBar[0].classList.toggle('background');
    }
}

