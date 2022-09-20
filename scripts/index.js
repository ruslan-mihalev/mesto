let nameElement = document.querySelector('.profile__person-name');
let aboutElement = document.querySelector('.profile__person-about');
let editButton = document.querySelector('.profile__edit-button')

let popupElement = document.querySelector('.popup');
let popupCloseButton = popupElement.querySelector('.popup__close-button');
let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('#input-name');
let aboutInput = formElement.querySelector('#input-aboutme');

function editButtonClickHandler (event) {
  popupElement.classList.toggle('popup_opened');
  nameInput.value = nameElement.textContent;
  aboutInput.value = aboutElement.textContent;
}

function popupCloseButtonClickHandler (event) {
  popupElement.classList.toggle('popup_opened');
}

function formSubmitHandler (event) {
  event.preventDefault()
  nameElement.textContent = nameInput.value;
  aboutElement.textContent = aboutInput.value;
}

editButton.addEventListener('click', editButtonClickHandler);
popupCloseButton.addEventListener('click', popupCloseButtonClickHandler);
formElement.addEventListener('submit', formSubmitHandler);
