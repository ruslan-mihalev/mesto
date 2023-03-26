/*
 * Попап просмотра изображения
 */
import {all} from "core-js/internals/document-all";

export default class Card {
  constructor({ cardId, name, link, likedByMe, allLikes, canDelete, templateSelector, handleCardClick, handleCardLike, handleCardDelete }) {
    this._cardId = cardId;
    this._name = name;
    this._link = link;
    this._likedByMe = likedByMe;
    this._allLikes = allLikes;
    this._canDelete = canDelete;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener('click', () => {
      this._handleCardLike(this, !this._likedByMe);
    });

    this._deleteButtonElement.addEventListener('click', () => {
      this._handleCardDelete(this);
    });

    this._imageElement.addEventListener('click', () => {
      if (this._imageElement.naturalWidth > 0) {
        this._handleCardClick({name: this._name, link: this._link});
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

  getId() {
    return this._cardId;
  }

  _updateLikes(likedByMe, allLikes) {
    if (likedByMe) {
      this._likeButtonElement.classList.add('card-grid__item-like-button_active');
    } else {
      this._likeButtonElement.classList.remove('card-grid__item-like-button_active');
    }

    if (allLikes > 0) {
      this._likeCountElement.textContent = allLikes;
      this._likeCountElement.classList.add('card-grid__item-like-count_active');
    } else {
      this._likeCountElement.classList.remove('card-grid__item-like-count_active');
      this._likeCountElement.textContent = 0;
    }
  }

  updateLikes(likedByMe, allLikes) {
    this._updateLikes(likedByMe, allLikes);
    this._likedByMe = likedByMe;
    this._allLikes = allLikes;
  }

  delete() {
    this._cardElement.remove();
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._likeButtonElement = this._cardElement.querySelector('.card-grid__item-like-button');
    this._likeCountElement = this._cardElement.querySelector('.card-grid__item-like-count');
    this._deleteButtonElement = this._cardElement.querySelector('.card-grid__item-delete-button');
    this._imageElement = this._cardElement.querySelector('.card-grid__item-image');
    const nameElement = this._cardElement.querySelector('.card-grid__item-caption');

    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    nameElement.textContent = this._name;

    if (this._canDelete) {
      this._deleteButtonElement.classList.add('card-grid__item-delete-button_active');
    } else {
      this._deleteButtonElement.classList.remove('card-grid__item-delete-button_active');
    }

    this._updateLikes(this._likedByMe, this._allLikes);

    return this._cardElement;
  }
}
