import './index.css';

import {initialUserInfo, initialCards, userInfoSelectors, formSelectors} from '../utils/constants';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

/**
 * Описываем логику редактирования профиля
 */

const userInfo = new UserInfo(userInfoSelectors);
userInfo.setUserInfo(initialUserInfo);

const profilePopup = new PopupWithForm('.popup_target_profile', (inputValues) => {
  userInfo.setUserInfo({name: inputValues['input-name'], details: inputValues['input-aboutme']});
});
profilePopup.setEventListeners();
const profileFormValidator = new FormValidator(formSelectors, profilePopup.getFormElement());
profileFormValidator.enableValidation();

const openProfilePopupButton = document.querySelector('.profile__edit-button');
openProfilePopupButton.addEventListener('click', () => {
  const {name, details} = userInfo.getUserInfo();
  profilePopup.fill({'input-name': name, 'input-aboutme': details});
  profileFormValidator.resetValidation();
  profilePopup.open();
});


/*
 * Описываем логику отображения списка карточек
 */

const imagePopup = new PopupWithImage('.popup_target_image');
imagePopup.setEventListeners();

function createCard(name, link) {
  const card = new Card(name, link, '#card-template', (itemInfo) => {
    imagePopup.open(itemInfo);
  })
  return card.generateCard();
}

const cardSection = new Section({
  items: initialCards.reverse(), renderer: (item) => {
    const {name, link} = item;
    cardSection.addItem(createCard(name, link));
  }
}, '.card-grid__container');
cardSection.render();


/*
 * Описываем логику добавления новой карточки
 */

const cardPopup = new PopupWithForm('.popup_target_card', (inputValues) => {
  cardSection.addItem(createCard(inputValues['input-card-name'], inputValues['input-card-image-link']));
});
cardPopup.setEventListeners();

const openCardPopupButton = document.querySelector('.profile__add-button');
openCardPopupButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardPopup.open();
});

const cardFormValidator = new FormValidator(formSelectors, cardPopup.getFormElement());
cardFormValidator.enableValidation();
