/*
 * Попап просмотра изображения
 */
export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _like() {
    this._likeButtonElement.classList.toggle('card-grid__item-like-button_active');
  }

  _delete() {
    this._cardElement.remove();
  }

  _handleOpenPopup() {
    this._handleCardClick({name: this._name, link: this._link});
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

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card-grid__item')
      .cloneNode(true);
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
