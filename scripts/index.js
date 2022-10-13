let nameElement = document.querySelector('.profile__person-name');
let aboutElement = document.querySelector('.profile__person-about');
let editButton = document.querySelector('.profile__edit-button')

let popupElement = document.querySelector('.popup');
let popupCloseButton = popupElement.querySelector('.popup__close-button');
let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_target_name');
let aboutInput = formElement.querySelector('.popup__input_target_aboutme');

function togglePopupVisibility () {
  popupElement.classList.toggle('popup_active');
  if (popupElement.classList.contains('popup_active')) {
    nameInput.value = nameElement.textContent;
    aboutInput.value = aboutElement.textContent;
  }
}

function formSubmitHandler (event) {
  event.preventDefault()
  nameElement.textContent = nameInput.value;
  aboutElement.textContent = aboutInput.value;
  togglePopupVisibility();
}

editButton.addEventListener('click', togglePopupVisibility);
popupCloseButton.addEventListener('click', togglePopupVisibility);
formElement.addEventListener('submit', formSubmitHandler);
