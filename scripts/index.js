/**
 * Массив с карточками для предзаполнения
 */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


/*
 * Компоненты профиля
 */
const nameElement = document.querySelector('.profile__person-name');
const aboutElement = document.querySelector('.profile__person-about');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

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
 * Шаблон для клонирования карточек
 */
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card-grid__item');

/**
 * Отображает переданный попап
 * @param {*} popupElement попап
 */
const openPopup = function (popupElement) {
  popupElement.classList.toggle('popup_active');
}

/**
 * Скрывает переданный попап
 * @param {*} popupElement попап
 */
const closePopup = function (popupElement) {
  popupElement.classList.toggle('popup_active');
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

editButton.addEventListener('click', () => {
  profilePopupNameInput.value = nameElement.textContent;
  profilePopupAboutInput.value = aboutElement.textContent;
  openPopup(profilePopupElement);
  profilePopupNameInput.focus();
});

addButton.addEventListener('click', () => {
  cardPopupNameInput.value = '';
  cardPopupLinkInput.value = '';
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

profilePopupCloseButton.addEventListener('click', () => {
  closePopup(profilePopupElement);
});

cardPopupCloseButton.addEventListener('click', () => {
  closePopup(cardPopupElement);
});

imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopupElement);
});

[profilePopupElement, cardPopupElement, imagePopupElement].forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
    }
  });
});

/**
 * Закроем любой открытый попап по нажатию на клавищу Esc
 */
window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    [profilePopupElement, cardPopupElement, imagePopupElement].forEach(popup => {
      if (popup.classList.contains('popup_active')) {
        popup.classList.toggle('popup_active');
      }
    });
  }
});

initCards();
