// const debounce = require('lodash.debounce');

// const setInput = document.querySelector('#input');

// const fetchCountries = function (searchQuerry) {
//   let countryToSearch = searchQuerry.target.value;
//   return fetch(`https://restcountries.eu/rest/v2/name/${countryToSearch}`)
//     .then(data => data.json())
//     .then(obj => console.log(obj))
//     .catch(err => console.log('ERROR '+ err))
// };

// setInput.addEventListener('input', debounce(fetchCountries, 500));

const objUrl = "https://restcountries.eu/rest/v2/name/";

export default {
  fetchCountries (searchQuery) {
    const countryToSearch = `${searchQuery}`;
    return fetch(objUrl + countryToSearch)
    .then(data => data.json())
  },
};