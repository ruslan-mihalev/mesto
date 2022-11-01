/*
 * Попап просмотра изображения
 */
const imagePopupElement = document.querySelector('.popup_target_image');
const imagePopupCloseButton = imagePopupElement.querySelector('.popup__close-button');
const imagePopupImageElement = imagePopupElement.querySelector('.popup__image');
const imagePopupCaptionElement = imagePopupElement.querySelector('.popup__image-caption');

class Card {
  constructor(name, link, templateSelector, popupHandler) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._popupHandler = popupHandler;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card-grid__item')
      .cloneNode(true);
  }

  _like() {
    this._likeButtonElement.classList.toggle('card-grid__item-like-button_active');
  }

  _delete() {
    this._cardElement.remove();
  }

  _handleOpenPopup() {
    imagePopupImageElement.src = this._link;
    imagePopupImageElement.alt = this._name;
    imagePopupCaptionElement.textContent = this._name;
    this._popupHandler.openPopup(imagePopupElement);
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener('click', () => {
      this._like();
    });

    this._deleteButtonElement.addEventListener('click', () => {
      this._delete();
      this._cardElement = null;
    });

    this._imageElement.addEventListener('click', () => {
      if (this._imageElement.naturalWidth > 0) {
        this._handleOpenPopup();
      }
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._likeButtonElement = this._cardElement.querySelector('.card-grid__item-like-button');
    this._deleteButtonElement = this._cardElement.querySelector('.card-grid__item-delete-button');
    this._imageElement = this._cardElement.querySelector('.card-grid__item-image');
    const nameElement = this._cardElement.querySelector('.card-grid__item-caption');

    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    nameElement.textContent = this._name;

    return this._cardElement;
  }
}

export { Card, imagePopupElement, imagePopupCloseButton, imagePopupImageElement, imagePopupCaptionElement };
