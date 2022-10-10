let nameElement = document.querySelector('.profile__person-name');
let aboutElement = document.querySelector('.profile__person-about');
let editButton = document.querySelector('.profile__edit-button')

let popupElement = document.querySelector('.popup');
let popupCloseButton = popupElement.querySelector('.popup__close-button');
let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_target_name');
let aboutInput = formElement.querySelector('.popup__input_target_aboutme');

function updatePopupHandler (event) {
  popupElement.classList.toggle('popup_opened');
  if (popupElement.classList.contains('popup_opened')) {
    nameInput.value = nameElement.textContent;
    aboutInput.value = aboutElement.textContent;
  }
}

function popupCloseButtonClickHandler (event) {
  popupElement.classList.toggle('popup_opened');
}

function formSubmitHandler (event) {
  event.preventDefault()
  nameElement.textContent = nameInput.value;
  aboutElement.textContent = aboutInput.value;
  popupElement.classList.toggle('popup_opened');
}

editButton.addEventListener('click', updatePopupHandler);
popupCloseButton.addEventListener('click', updatePopupHandler);
formElement.addEventListener('submit', formSubmitHandler);
