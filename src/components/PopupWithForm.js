import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputDict = this._createInputDict();
  }

  /**
   * Создает словарь input-ов, что облегчает как инициализацию так и получение значений полей ввода
   */
  _createInputDict() {
    const inputDict = {};
    const inputList = this._formElement.querySelectorAll('.popup__input');
    inputList.forEach(input => {
      inputDict[input.name] = input;
    });
    return inputDict;
  }

  _getInputValues() {
    const formValues = {};
    for (const name in this._inputDict) {
      formValues[name] = this._inputDict[name].value;
    }
    return formValues;
  }

  fill(inputValues = {}) {
    for (const name in inputValues) {
      this._inputDict[name].value = inputValues[name];
    }
  }

  open() {
    super.open();
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  getFormElement() {
    return this._formElement;
  }
}

