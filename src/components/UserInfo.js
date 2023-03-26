/**
 * Содержит информацию, отображаемую в профиле пользователя.
 * Содержит логику изменения информации в профиле пользователя.
 */
export default class UserInfo {
  constructor({ nameSelector, detailsSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._detailsElement = document.querySelector(detailsSelector);
    this._avatarElement = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      'name': this._nameElement.textContent,
      'about': this._detailsElement.textContent,
      'avatar': this._avatarElement.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._detailsElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}
