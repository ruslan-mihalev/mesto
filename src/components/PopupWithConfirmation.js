import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleConfirm) {
    super(selector);
    this._handleConfirm = handleConfirm;
    this._formElement = this._popupElement.querySelector('.popup__form');
  }

  open(payload) {
    this._payload = payload;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._handleConfirm(this._payload);
    });
  }
}
