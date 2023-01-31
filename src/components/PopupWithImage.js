import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageElement = this._popupElement.querySelector('.popup__image');
    this._captionElement = this._popupElement.querySelector('.popup__image-caption');
  }

  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}
