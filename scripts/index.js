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

const cardContainerElement = document.querySelector('.card-grid__container');

const nameElement = document.querySelector('.profile__person-name');
const aboutElement = document.querySelector('.profile__person-about');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.floating-close-button_place_popup');
const titleElement = popupElement.querySelector('.popup__title');
const formElement = popupElement.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_target_name');
const infoInput = formElement.querySelector('.popup__input_target_info');
const submitInput = formElement.querySelector('.popup__submit');

const imagePopupElement = document.querySelector('.image-popup');
const imagePopupCloseButton = imagePopupElement.querySelector('.floating-close-button_place_image-popup');
const imagePopupCaption = imagePopupElement.querySelector('.image-popup__caption');

let popupSubmitListener = null;

/**
 * Добавляет карточку
 * @param {*} name имя карточки
 * @param {*} link ссылка на изображение
 * @param {*} inHead добавить в начало списка
 */
const addCard = function (name, link, inHead = false) {

  // Prepare template
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card-grid__item').cloneNode(true);
  const imageElement = cardElement.querySelector('.card-grid__item-image');
  const nameElement = cardElement.querySelector('.card-grid__item-caption');
  const likeButtonElement = cardElement.querySelector('.card-grid__item-like-button');
  const deleteButtonElement = cardElement.querySelector('.card-grid__item-delete-button');

  imageElement.src = link;
  imageElement.alt = name;
  nameElement.textContent = name;

  // Bind like action
  likeButtonElement.addEventListener('click', evt => {
    likeButtonElement.classList.toggle('card-grid__item-like-button_active');
  });

  // Bind delete action
  deleteButtonElement.addEventListener('click', evt => {
    evt.target.parentElement.remove();
  });

  // Bind image click action
  imageElement.addEventListener('click', evt => {
    openImagePopup(name, link);
  });

  // Add to grid
  if (inHead) {
    cardContainerElement.prepend(cardElement);
  } else {
    cardContainerElement.append(cardElement);
  }
}

/**
 * Производит первичную инициализацию списка карточек
 */
const initCards = function () {
  initialCards.forEach(item => {
    addCard(item.name, item.link);
  });
}

/**
 * Меняет видимость диалогового окна
 */
const togglePopupVisibility = function () {

  // Удаляем обработчик события подтверждения формы перед закрытием попапа
  if (popupElement.classList.contains('popup_active') && popupSubmitListener) {
    formElement.removeEventListener('submit', popupSubmitListener);
    popupSubmitListener = null;
  }

  popupElement.classList.toggle('popup_active');
}

/**
 * Меняет видимость диалогового окна отображения изображения
 */
const toggleImagePopupVisibility = function () {
  imagePopupElement.classList.toggle('image-popup_active');
}

/**
 * Открывает диалог редактирования профиля
 */
const openProfileEditingPopup = function () {
  titleElement.textContent = 'Редактировать профиль';
  submitInput.textContent = 'Сохранить';
  nameInput.value = nameElement.textContent;
  nameInput.placeholder = '';
  infoInput.value = aboutElement.textContent;
  infoInput.placeholder = '';

  popupSubmitListener = (evt) => {
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    aboutElement.textContent = infoInput.value;
    togglePopupVisibility();
  };

  formElement.addEventListener('submit', popupSubmitListener);
  togglePopupVisibility();
}

/**
 * Открывает диалог добавления карточки
 */
const openCardAddingPopup = function () {
  titleElement.textContent = 'Новое место';
  submitInput.textContent = 'Создать';
  nameInput.value = '';
  nameInput.placeholder = 'Название';
  infoInput.value = '';
  infoInput.placeholder = 'Ссылка на картинку';

  popupSubmitListener = (evt) => {
    evt.preventDefault();
    addCard(nameInput.value, infoInput.value, true);
    togglePopupVisibility();
  };

  formElement.addEventListener('submit', popupSubmitListener);
  togglePopupVisibility();
}

/**
 * Открывает всплывающее окно полноэкранного просмотра изображения
 * @param {*} name имя карточки
 * @param {*} link ссылка на изображение
 */
const openImagePopup = function (name, link) {
  let imageElement = imagePopupElement.querySelector('.image-popup__image');
  imageElement.src = link;
  imagePopupCaption.textContent = name;
  toggleImagePopupVisibility();
}

editButton.addEventListener('click', openProfileEditingPopup);
addButton.addEventListener('click', openCardAddingPopup);
popupCloseButton.addEventListener('click', togglePopupVisibility);
imagePopupCloseButton.addEventListener('click', toggleImagePopupVisibility);
popupElement.addEventListener('click', evt => {
  // Закрываем попап по нажатию за пределами попапа
  if (evt.target == evt.currentTarget) {
    togglePopupVisibility();
  }
});
imagePopupElement.addEventListener('click', evt => {
  // Закрываем попап по нажатию за пределами попапа
  if (evt.target == evt.currentTarget) {
    toggleImagePopupVisibility();
  }
});

initCards();
