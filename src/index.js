import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

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
  const countryToFind = event.target.value.trim().toLowerCase();
  if (!countryToFind) {
    clearMarkup();
    return;
  }
  fetchCountries(countryToFind);
}
