const showInputError = (formElement, inputElement, errorMessage, properties) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(properties.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(properties.errorClass);
};

const hideInputError = (formElement, inputElement, properties) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(properties.inputErrorClass);
  errorElement.classList.remove(properties.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, properties) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, properties);
  } else {
    hideInputError(formElement, inputElement, properties);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, properties) => {
  const inputList = Array.from(formElement.querySelectorAll(properties.inputSelector));
  const buttonElement = formElement.querySelector(properties.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, properties.inactiveButtonClass);

  inputList.forEach((inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, properties);
      toggleButtonState(inputList, buttonElement, properties.inactiveButtonClass);
    })
  }));
};

const enableValidation = (properties) => {
  const formList = Array.from(document.querySelectorAll(properties.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    setEventListeners(formElement, properties);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
