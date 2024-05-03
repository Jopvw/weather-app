const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const autofill = document.querySelector('.autocomplete');
const cityList = document.querySelector('#city-list');
const inputField = document.querySelector('input');
const button = document.querySelector('button');
const forecast = new Forecast();

const updateUI = (data) => {

    //destructure properties
    const {cityDets, weather} = data;
    
//update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
    </div>
    `;

    //update day.night & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);

    //remove the d-none if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

//enter anywhere on page
window.addEventListener('keydown', (e) => {

    const city = cityForm.city.value.trim();

    if (e.key === 'Enter' && inputField.value) {
       
        cityForm.reset()

        //update UI with new city
        forecast.updateCity(city)
         .then(data => updateUI(data))
         .catch(err => console.log(err));

          //set localstorage

localStorage.setItem('city', city);
    }
  });

  //submit button
  button.addEventListener('click', e => {
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    if(inputField.value) {
        cityForm.reset();
         //update UI with new city
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

        //set localstorage
        localStorage.setItem('city', city);
    }
});

//Search Auto Suggstions

const updateListUI = (data) => {
    
     const {citySearch} = data

         cityList.innerHTML = '';

    citySearch.forEach(city => {
        cityList.innerHTML += 
        `<li>${(city.LocalizedName.toUpperCase())}, ${city.AdministrativeArea.LocalizedName}, ${city.Country.LocalizedName},</li>
        `;
    })
};

//Search bar input event
cityForm.addEventListener('keyup', e => {
    const search = inputField.value.trim();

    forecast.updateCitiesList(search)
    .then(data => updateListUI(data))
    .catch(err => console.log(err));
});

//hide API results event
cityList.addEventListener('click' , e => {
   inputField.value = e.target.textContent;
   if(typeof inputField.value == "string") {
    autofill.classList.add('d-none');
   } 
});

inputField.addEventListener('click', e => {
    inputField.value = null;
    if (autofill.classList.contains('d-none')) {
        autofill.classList.remove('d-none');
       } 
       e.stopPropagation();
});

window.addEventListener('click', e => {
    autofill.classList.add('d-none');
})

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}












    

