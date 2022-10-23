import {initialCards} from './initialCards.js';

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
const profilePopupTitleElement = profilePopupElement.querySelector('.popup__title');
const profilePopupFormElement = profilePopupElement.querySelector('.popup__form');
const profilePopupNameInput = profilePopupFormElement.querySelector('.popup__input_target_name');
const profilePopupAboutInput = profilePopupFormElement.querySelector('.popup__input_target_info');

/*
 * Попап добавления карточки
 */
const cardPopupElement = document.querySelector('.popup_target_card');
const cardPopupCloseButton = cardPopupElement.querySelector('.popup__close-button');
const cardPopupTitleElement = cardPopupElement.querySelector('.popup__title');
const cardPopupFormElement = cardPopupElement.querySelector('.popup__form');
const cardPopupNameInput = cardPopupFormElement.querySelector('.popup__input_target_name');
const cardPopupLinkInput = cardPopupFormElement.querySelector('.popup__input_target_info');

/*
 * Попап просмотра изображения
 */
const imagePopupElement = document.querySelector('.popup_target_image');
const imagePopupCloseButton = imagePopupElement.querySelector('.popup__close-button');
const imagePopupImageElement = imagePopupElement.querySelector('.popup__image');
const imagePopupCaptionElement = imagePopupElement.querySelector('.popup__image-caption');

/**
 * Обработчик нажатия 'Esc' для закрытия диалогового окна
 * @param {*} evt событие клавиатуры
 */
let popupCloseListener = evt => {
  if (evt.key === 'Escape') {
    closePopup(popupElement);
  }
};

/**
 * Шаблон для клонирования карточек
 */
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card-grid__item');

/**
 * Отображает переданный попап
 * @param {*} popupElement попап
 */
const openPopup = function (popupElement) {
  popupElement.classList.add('popup_active');
  window.addEventListener('keydown', popupCloseListener);
}

/**
 * Скрывает переданный попап
 * @param {*} popupElement попап
 */
const closePopup = function (popupElement) {
  window.removeEventListener('keydown', popupCloseListener);
  popupElement.classList.remove('popup_active');
}

/**
 * Создает карточку
 * @param {*} name имя карточки
 * @param {*} link ссылка на изображение
 */
const createCard = function (name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector('.card-grid__item-image');
  const nameElement = cardElement.querySelector('.card-grid__item-caption');
  const likeButtonElement = cardElement.querySelector('.card-grid__item-like-button');
  const deleteButtonElement = cardElement.querySelector('.card-grid__item-delete-button');

  imageElement.src = link;
  imageElement.alt = name;
  nameElement.textContent = name;

  likeButtonElement.addEventListener('click', () => {
    likeButtonElement.classList.toggle('card-grid__item-like-button_active');
  });

  deleteButtonElement.addEventListener('click', () => {
    cardElement.remove();
  });

  imageElement.addEventListener('click', () => {
    if (imageElement.naturalWidth > 0) {
      imagePopupImageElement.src = link;
      imagePopupImageElement.alt = name;
      imagePopupCaptionElement.textContent = name;
      openPopup(imagePopupElement);
    }
  });

  return cardElement;
}

/**
 * Добавляет карточку
 * @param {*} name имя карточки
 * @param {*} link ссылка на изображение
 */
const addCard = function (name, link) {
  const cardElement = createCard(name, link);
  cardContainerElement.prepend(cardElement);
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

  openPopup(profilePopupElement);
  profilePopupNameInput.focus();
});

popupCardOpenButton.addEventListener('click', () => {
  cardPopupNameInput.value = '';
  cardPopupLinkInput.value = '';

  // Для запуска механизма валидации
  cardPopupNameInput.dispatchEvent(new Event('input', { bubbles: true }));
  cardPopupLinkInput.dispatchEvent(new Event('input', { bubbles: true }));

  openPopup(cardPopupElement);
  cardPopupNameInput.focus();
});

profilePopupFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  nameElement.textContent = profilePopupNameInput.value;
  aboutElement.textContent = profilePopupAboutInput.value;
  closePopup(profilePopupElement);
});

cardPopupFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  addCard(cardPopupNameInput.value, cardPopupLinkInput.value);
  closePopup(cardPopupElement);
});

[
  [profilePopupCloseButton, profilePopupElement],
  [cardPopupCloseButton, cardPopupElement],
  [imagePopupCloseButton, imagePopupElement]
].forEach(pair => {
  pair[0].addEventListener('click', () => {
    closePopup(pair[1]);
  });
});

[profilePopupElement, cardPopupElement, imagePopupElement].forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
    }
  });
});

initCards();
