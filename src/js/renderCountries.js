import fetchObj from './fetchCountries.js';
import multiCountries from '../templates/multiCountries.hbs';
import singleCountry from '../templates/singleCountry.hbs';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/BrightTheme.css';

const { alert, notice, success, error } = require('@pnotify/core');
const inputArea = document.querySelector('input');
const scheduleArea = document.querySelector('.schedule');

const handleSearch = function (event) {
  clearArea();
  let query = event.target.value;

  fetchObj.fetchCountries(query).then(data => {
    if (data.length > 10) {
      notice({
        text: 'Too many matches found. Please enter a more specific query!'
      });
    } else if (data.status === 404) {
      error({ text: 'No matches found! Please enter a more specific query'});
    } else if (data.length === 1) {
      handleCountries(data, singleCountry);
      success({ text: 'This is an amazing country!'});
    } else if (data.length >= 2 || data.length <= 10) {
      handleCountries(data, multiCountries);
      alert({ text: 'It is hard to make a choice'});
    }
  });
};
inputArea.addEventListener('input', debounce(handleSearch, 1000));

function handleCountries(items, handleBarForm) {
  const newLocal = items.map(el => handleBarForm(el)).join();
  const render = newLocal;
  scheduleArea.insertAdjacentHTML('beforeend', render);
}

function clearArea() {
  scheduleArea.innerHTML = '';
}
