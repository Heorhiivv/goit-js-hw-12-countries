const objUrl = "https://restcountries.eu/rest/v2/name/";

export default {
  fetchCountries (searchQuery) {
    return fetch(objUrl + searchQuery)
    .then(data => data.json())
  },
};