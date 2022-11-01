import { initialCards } from './initialCards.js';
import { Card, imagePopupElement, imagePopupCloseButton, imagePopupImageElement, imagePopupCaptionElement } from './Card.js';
import FormValidator from './FormValidator.js';

/**
 * Символьный код клавиши 'Escape'
 */
const ESC_CODE = 'Escape';

/*
 * Компоненты профиля
 */
const nameElement = document.querySelector('.profile__person-name');
const aboutElement = document.querySelector('.profile__person-about');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupCardOpenButton = document.querySelector('.profile__add-button');

/*
 * Контейнер карточек
 */
const cardContainerElement = document.querySelector('.card-grid__container');

/*
 * Попап редактирования профиля
 */
const profilePopupElement = document.querySelector('.popup_target_profile');
const profilePopupCloseButton = profilePopupElement.querySelector('.popup__close-button');
const profilePopupFormElement = profilePopupElement.querySelector('.popup__form');
const profilePopupNameInput = profilePopupFormElement.querySelector('.popup__input_target_name');
const profilePopupAboutInput = profilePopupFormElement.querySelector('.popup__input_target_info');

/*
 * Попап добавления карточки
 */
const cardPopupElement = document.querySelector('.popup_target_card');
const cardPopupCloseButton = cardPopupElement.querySelector('.popup__close-button');
const cardPopupFormElement = cardPopupElement.querySelector('.popup__form');
const cardPopupNameInput = cardPopupFormElement.querySelector('.popup__input_target_name');
const cardPopupLinkInput = cardPopupFormElement.querySelector('.popup__input_target_info');

/**
 * Валидация ввода форм
 */
const formValidationProperties = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};
const profileFormValidator = new FormValidator(formValidationProperties, profilePopupFormElement);
const cardFormValidator = new FormValidator(formValidationProperties, cardPopupFormElement);

/**
 * Класс для переиспользования логики открытия / закрытия popup-ов
 */
class PopupHandler {

  /**
   * Отображает переданный попап
   * @param {*} popupElement попап
   */
  openPopup(popupElement) {
    popupElement.classList.add('popup_active');
    window.addEventListener('keydown', popupCloseListener);
  }

  /**
   * Скрывает переданный попап
   * @param {*} popupElement попап
   */
  closePopup(popupElement) {
    window.removeEventListener('keydown', popupCloseListener);
    popupElement.classList.remove('popup_active');
  }
}

const popupHandler = new PopupHandler();

/**
 * Обработчик нажатия 'Esc' для закрытия диалогового окна
 * @param {*} evt событие клавиатуры
 */
const popupCloseListener = evt => {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_active');
    popupHandler.closePopup(openedPopup);
  }
};

/**
 * Добавляет карточку
 * @param {*} name имя карточки
 * @param {*} link ссылка на изображение
 */
const addCard = function (name, link) {
  const card = new Card(name, link, '#card-template', popupHandler);
  cardContainerElement.prepend(card.generateCard());
}

/**
 * Производит первичную инициализацию списка карточек
 */
const initCards = function () {
  initialCards.reverse().forEach(item => {
    addCard(item.name, item.link);
  });
}

popupProfileOpenButton.addEventListener('click', () => {
  profilePopupNameInput.value = nameElement.textContent;
  profilePopupAboutInput.value = aboutElement.textContent;

  // Для запуска механизма валидации
  profilePopupNameInput.dispatchEvent(new Event('input', { bubbles: true }));
  profilePopupAboutInput.dispatchEvent(new Event('input', { bubbles: true }));

  popupHandler.openPopup(profilePopupElement);
  profilePopupNameInput.focus();
});

popupCardOpenButton.addEventListener('click', () => {
  cardPopupNameInput.value = '';
  cardPopupLinkInput.value = '';

  // Для запуска механизма валидации
  cardPopupNameInput.dispatchEvent(new Event('input', { bubbles: true }));
  cardPopupLinkInput.dispatchEvent(new Event('input', { bubbles: true }));

  popupHandler.openPopup(cardPopupElement);
  cardPopupNameInput.focus();
});

profilePopupFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  nameElement.textContent = profilePopupNameInput.value;
  aboutElement.textContent = profilePopupAboutInput.value;
  popupHandler.closePopup(profilePopupElement);
});

cardPopupFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  addCard(cardPopupNameInput.value, cardPopupLinkInput.value);
  popupHandler.closePopup(cardPopupElement);
});

[
  [profilePopupCloseButton, profilePopupElement],
  [cardPopupCloseButton, cardPopupElement],
  [imagePopupCloseButton, imagePopupElement]
].forEach(pair => {
  pair[0].addEventListener('click', () => {
    popupHandler.closePopup(pair[1]);
  });
});

[profilePopupElement, cardPopupElement, imagePopupElement].forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target === evt.currentTarget) {
      popupHandler.closePopup(evt.target);
    }
  });
});

initCards();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
