import Notiflix from 'notiflix';

// FETCH
const fetchOptions = 'name,capital,population,flags,languages';
export function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}?fields=${fetchOptions}`)
    .then(checkResponse)
    .then(checkCountriesNumber)
    .catch(onError);
}

function checkResponse(response) {
  clearMarkup();
  if (!response.ok) {
    console.error('Response is not ok!');
  }
  console.log(response);
  return response.json();
}

function checkCountriesNumber(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (data.length >= 2) {
    const markup = data
      .map(element => {
        return buildListMarkup(element.name.official, element.flag.svg);
      })
      .join('');
    countryList.innerHTML = markup;
    return;
  }
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

// BUILD COUNTRY LIST MARKUP
function buildListMarkup(name, flag) {
  return `
	<li class="listItem">
	<img src="${flag}" alt="${name} flag" class="flag" />
	<p class="country-name">${name}</p>
	</li>
	`;
}

// BUILD ONE COUNTRY MARKUP
function buildListMarkup(name, flag) {
  return `
	<li class="listItem">
	<img src="${flag.svg}" alt="${name.official} flag" class="flag" />
	<p class="country-name">${name.official}</p>
	</li>
	`;
}
