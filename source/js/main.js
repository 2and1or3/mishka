"use strict";

const POPUP_OPEN = 'popup--open';
const HEADER_OPEN = 'header--open';

const popup = document.querySelector('.popup');

const header = document.querySelector('.header');
const headerToggle = document.querySelector('.header__toggle');

const openButtonSpecial = document.querySelector('.special__button');
const openButtonCart = document.querySelector('.cart__status');

const togglePopup = () => popup.classList.toggle(POPUP_OPEN);
const toggleHeader = () => header.classList.toggle(HEADER_OPEN);

if (openButtonSpecial) {
  openButtonSpecial.addEventListener('click', (evt) => {
    evt.preventDefault();
        togglePopup();
  });
}

if (openButtonCart) {
  openButtonCart.addEventListener('click', (evt) => {
    evt.preventDefault();
        togglePopup();
  });
}

if (popup) {
  const form = popup.querySelector('.size-form');

  popup.addEventListener('click', (evt) => {
    if (popup == evt.target) {
      togglePopup();
    }
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    togglePopup();
  });
}

if (header) {
  header.classList.remove(HEADER_OPEN);
  headerToggle.addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleHeader();
  });
}
