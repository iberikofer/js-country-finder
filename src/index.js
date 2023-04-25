import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function clearMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const countryToFind = event.target.value.trim();
  if (!countryToFind) {
    clearMarkup();
    return;
  }
  fetchCountries(countryToFind)
    .then(checkResponse)
    .then(checkCountriesNumber)
    .catch(onError);

  function checkResponse(response) {
    clearMarkup();
    if (!response.ok) {
      return console.error('Response is NOT OK!');
    }
    console.log(response.json()); // DELETE WHEN DONE
    return response.json();
  }
}

// CHECKS
function checkCountriesNumber(data) {
  console.log(YYYYYYYYYYYYYYYYYYEEEEEEEEEEEEEEEEEEESSSSSSSSSSSSSSSS);
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.🤔'
    );
    return;
  } else if (data.length >= 2) {
    const markup = data
      .map(element => {
        return buildListMarkup(element.name, element.flag);
      })
      .join('');
    return (countryList.innerHTML = markup);
  }
}

function onError() {
  Notiflix.Notify.info('Oops, there is no country with that name 😞');
}

// BUILD COUNTRY LIST MARKUP
function buildCoutryListMarkup(name, flag) {
  return `
	<li class="listItem">
	<img src="${flag}" alt="flag of ${name}" class="flag" />
	<p class="country-name">${name}</p>
	</li>
	`;
}

// BUILD ONE COUNTRY MARKUP
function buildCountryMarkup(name, flag) {
  return `
	<li class="listItem">
	<img src="${flag.svg}" alt="$flag of ${name.official}" class="flag" />
	<p class="country-name">${name.official}</p>
	</li>
	`;
}
