/**
 * Содержит информацию, отображаемую в профиле пользователя.
 * Содержит логику изменения информации в профиле пользователя.
 */
export default class UserInfo {
  constructor({ nameSelector, detailsSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._detailsElement = document.querySelector(detailsSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      details: this._detailsElement.textContent
    }
  }

  setUserInfo({ name, details }) {
    this._nameElement.textContent = name;
    this._detailsElement.textContent = details;
  }
}
