/**
 * Начальная информация профиля пользователя
 * @type {{name: string, about: string}}
 */
export const initialUserInfo = {
  name: 'Жак-Ив Кусто',
  details: 'Исследователь океана'
}

/**
 * Массив с карточками для предзаполнения
 */
 export const initialCards = [
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

export const userInfoSelectors = { nameSelector: '.profile__person-name',detailsSelector: '.profile__person-about' }

/**
 * Набор селекторов формы, подлежащей валидации
 * @type {{inputErrorClass: string, submitButtonSelector: string, errorClass: string, inactiveButtonClass: string, inputSelector: string}}
 */
export const formSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};
