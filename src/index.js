import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export default function clearMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const countryToFind = event.target.value.trim().toLowerCase();
  if (!countryToFind) {
    clearMarkup();
    return;
  }
  fetchCountries(countryToFind).then(checkCountriesNumber).catch(onError);
}

// CHECKS
function checkCountriesNumber(data) {
  if (data.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.🤔'
    );
  } else if (data.length >= 2) {
    const markup = data
      .map(element => {
        return buildCoutryListMarkup(element.name.official, element.flags.svg);
      })
      .join('');
    countryList.innerHTML = markup;
    return;
  }

  const markup = buildCountryMarkup(data[0]);
  countryInfo.innerHTML = markup;
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name 😞');
}

// BUILD COUNTRY LIST MARKUP
function buildCoutryListMarkup(name, flag) {
  return `
	<li class="listItem">
	<img src="${flag}" alt="flag of ${name}" width="35px" height="35px"/>
	<p class="country-name">${name}</p>
	</li>
	`;
}

// BUILD ONE COUNTRY MARKUP
function buildCountryMarkup({ name, flags, capital, population, languages }) {
  const languageBlock = Object.values(languages).join(', ');

  return (markup = `
	<div class="one-country-header">
		<img src="${flags.svg}" alt="$flag of ${
    name.official
  }" class="one-country-flag""/>
		<h2 class="one-country-name">${name.official}</h2>
	</div>
	<ul class="one-country-info-list">
		<li class="one-country-info-list-item"><h3>Capital:</h3> <span>${
      capital[0]
    }</span></li>
		<li class="one-country-info-list-item"><h3>Population:</h3> <span>${population.toLocaleString()}</span></li>
		<li class="one-country-info-list-item"><h3>Languages:</h3> <span>${languageBlock}</span></li>
	</ul>
	`);
}
