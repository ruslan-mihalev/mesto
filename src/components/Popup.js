import { ESC_CODE } from "../utils/constants";

export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    this._closeButton = this._popupElement.querySelector('.popup__close-button');
    this._escClickHandler = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_active');
    window.addEventListener('keydown', this._escClickHandler);
  }

  close() {
    window.removeEventListener('keydown', this._escClickHandler);
    this._popupElement.classList.remove('popup_active');
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', event => {
      this.close();
    });

    this._popupElement.addEventListener('mousedown', event => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }

  /**
   * Логика закрытия попапа клавишей Esc
   */
  _handleEscClose(event) {
    if (event.key === ESC_CODE) {
      this.close();
    }
  }
}
