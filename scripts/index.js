const nameElement = document.querySelector('.profile__person-name');
const aboutElement = document.querySelector('.profile__person-about');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-button');
const titleElement = popupElement.querySelector('.popup__title');
const formElement = popupElement.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_target_name');
const descriptionInput = formElement.querySelector('.popup__input_target_info');
const submitInput = formElement.querySelector('.popup__submit');

let popupSubmitListener = null;

function togglePopupVisibility() {

  // Удаляем обработчик события подтверждения формы перед закрытием попапа
  if (popupElement.classList.contains('popup_active') && popupSubmitListener) {
    formElement.removeEventListener('submit', popupSubmitListener);
    popupSubmitListener = null;
  }

  popupElement.classList.toggle('popup_active');
}

const openProfileEditingPopup = function () {
  titleElement.value = 'Редактировать профиль';
  submitInput.value = 'Сохранить';
  nameInput.value = nameElement.textContent;
  nameInput.placeholder = '';
  descriptionInput.value = aboutElement.textContent;
  descriptionInput.placeholder = '';

  popupSubmitListener = (evt) => {
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    aboutElement.textContent = descriptionInput.value;
    togglePopupVisibility();
  };

  formElement.addEventListener('submit', popupSubmitListener);
  togglePopupVisibility();
}

const openCardAddingPopup = function () {
  titleElement.value = 'Новое место';
  submitInput.value = 'Создать';
  nameInput.value = '';
  nameInput.placeholder = 'Название';
  descriptionInput.value = '';
  descriptionInput.placeholder = 'Ссылка на картинку';

  popupSubmitListener = (evt) => {
    evt.preventDefault();
    // TODO Тут будет добавление элемента
    togglePopupVisibility();
  };

  formElement.addEventListener('submit', popupSubmitListener);
  togglePopupVisibility();
}

editButton.addEventListener('click', openProfileEditingPopup);
addButton.addEventListener('click', openCardAddingPopup);
popupCloseButton.addEventListener('click', togglePopupVisibility);
