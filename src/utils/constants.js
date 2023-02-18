export const userInfoSelectors = { nameSelector: '.profile__person-name',detailsSelector: '.profile__person-about', avatarSelector: '.profile__avatar' }

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
