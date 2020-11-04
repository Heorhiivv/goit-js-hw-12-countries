import fetchObj from './fetchCountries.js';
import multiCountries from '../templates/multiCountries.hbs';
import singleCountry from '../templates/singleCountry.hbs';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/BrightTheme.css';
import { error, alert, Stack } from "@pnotify/core";

const stackBottomModal = new Stack({
  dir1: "up", // With a dir1 of "up", the stacks will start appearing at the bottom.
  // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
  firstpos1: 20, // The notices will appear 25 pixels from the bottom of the context.
  // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
  push: "top", // Each new notice will appear at the bottom of the screen, which is where the "top" of the stack is. Other notices will be pushed up.
  modal: true, // When a notice appears in this stack, a modal overlay will be created.
  overlayClose: true, // When the user clicks on the overlay, all notices in this stack will be closed.
  context: document.querySelector(".gallery") // The notices will be placed in the "page-container" element.
});

const inputArea = document.querySelector('input');
const scheduleArea = document.querySelector('.schedule');
const countriesList = document.querySelector('.countries__list')

const handleSearch = function (event) {
  clearArea();
  let query = event.target.value;

  fetchObj.fetchCountries(query).then(data => {
    if (data.length > 10) {
      alert({text: 'Too many matches found. Please enter a more specific query!'
    });
    } else if (data.status === 404) 
    {
      error({ text: 'No matches found! Please enter a more specific query'
    });
    } else if (data.length === 1) {
      handleCountry(data, singleCountry); 

    } else if (data.length >= 2 || data.length <= 10) {
      handleCountries(data, multiCountries);
    }
  });
};
inputArea.addEventListener('input', debounce(handleSearch, 1000));

function handleCountry(items, handleBarSingle) {
  const newLocal = items.map(el => handleBarSingle(el));
  scheduleArea.insertAdjacentHTML('beforeend', newLocal);
}
function handleCountries(data, handleBarMany) {
  const namesList = data.map(el =>  el.name);
  scheduleArea.insertAdjacentHTML('beforeend', handleBarMany({names : namesList}));
  
}

function clearArea() {
  scheduleArea.innerHTML = '';
}
// el => refs.gallery.insertAdjacentHTML("beforeend", `${galleryCard(el)}`)
// function handleCountries(items, handleBarForm) {
//   const newLocal = items.map(el => el.name);
//   scheduleArea.insertAdjacentHTML('beforeend', handleBarForm({names : newLocal}));
// }
