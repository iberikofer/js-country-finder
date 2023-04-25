import clearMarkup from './index.js';

const fetchOptions = 'name,capital,population,flags,languages';
export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=${fetchOptions}`
  ).then(checkResponse);
  function checkResponse(response) {
    clearMarkup();
    if (!response.ok) {
      return console.error('Response is NOT OK!');
    }
    return response.json();
  }
}
