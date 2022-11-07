import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const getEl = selector => document.querySelector(selector);
getEl(`#search-box`).addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const nameOfCountry = event.target.value.trim();
  if (!nameOfCountry) {
    getEl('.country-list').innerHTML = '';
    getEl('.country-info').innerHTML = '';
      
    return;
  }

  fetchCountries(nameOfCountry)
    .then(addMarkup)
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function addMarkup(data) {
  if (data.length > 10) {
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (data.length > 2 && data.length < 10) {
    getEl('.country-info').innerHTML = '';
    getEl('.country-list').innerHTML = data.map(item => {
        return `
        <li class="country-list-item">
        <img src="${item.flags.svg}"></img>
        <span class="country-list-name">${item.name.official}</span>
        </li>
        `;
      })
      .join('');
  } else {
    getEl('.country-list').innerHTML = '';
    getEl('.country-info').innerHTML = `
    <li class="country-info-item">
    <img src="${data[0].flags.svg}"></img>
    <span class="country-info-name">${data[0].name.official}</span>
    </li>
    <p>Capital: <span class="country-info-text">${data[0].capital}</span></p>
    <p>Population: <span class="country-info-text">${data[0].population}</span></p>
    <p>Languages: <span class="country-info-text">${Object.values(data[0].languages)}</span></p>`;
  }
}



// // function onSearch() {
// //     const countryInfoMarkup = data.results.map(({ name, capital, population, flags, languages }) => {
// //         return `
// //         <ul class="country-info-list">
// //         <li class="country-info-list-item">
// //         <img src=${flags} alt="flag"> 
// //         <p class="name">${name}</p>
// //         <p class="capital">${capital}</p>
// //         <p class="population">${population}</p>
// //         <p class="languages">${languages}</p>
// //         </li>
// //         </ul>
// //         `
// //     }).join('')
// // }


// // if ( ??? > 10) {
// //     Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
// // }
// // if (2 > ??? < 10 ) {
// //     const countryListMarkup = data.results()
// //     return `
// //     <li class="country-list-item"> </li>
// //     `
// // }