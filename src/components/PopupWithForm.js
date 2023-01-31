import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {
    const formValues = {};
    this._formElement
      .querySelectorAll('.popup__input')
      .forEach(input => {
        formValues[input.name] = input.value;
      })
    return formValues;
  }

  open({name = '', details = ''} = {}) {
    this._input_name = this._formElement.querySelector('.popup__input_target_name');
    this._input_details = this._formElement.querySelector('.popup__input_target_info');
    this._input_name.value = name;
    this._input_details.value = details;

    super.open();

    // Для запуска механизма валидации до пользовательского ввода
    // (без этого пользователь запросто сохранит пустую карточку)
    this._input_name.dispatchEvent(new Event('input', {bubbles: true}));
    this._input_details.dispatchEvent(new Event('input', {bubbles: true}));
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

