import './index.css';

import { initialUserInfo, initialCards, userInfoSelectors, formSelectors} from '../utils/constants';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

const openProfilePopupButton = document.querySelector('.profile__edit-button');
const openCardPopupButton = document.querySelector('.profile__add-button');

const userInfo = new UserInfo(userInfoSelectors);
userInfo.setUserInfo(initialUserInfo);

const profilePopup = new PopupWithForm('.popup_target_profile', (inputValues) => {
  userInfo.setUserInfo({name: inputValues['input-name'], details: inputValues['input-aboutme']});
});
profilePopup.setEventListeners();
const profileFormValidator = new FormValidator(formSelectors, profilePopup.getFormElement());
profileFormValidator.enableValidation();
openProfilePopupButton.addEventListener('click', () => {
  profilePopup.open(userInfo.getUserInfo());
});

const imagePopup = new PopupWithImage('.popup_target_image');
imagePopup.setEventListeners();

const cardSection = new Section({
  items: initialCards.reverse(), renderer: (item) => {
    const { name, link } = item;
    const card = new Card(name, link, '#card-template', (itemInfo) => {
      imagePopup.open(itemInfo);
    });
    cardSection.addItem(card.generateCard());
  }
}, '.card-grid__container');
cardSection.render();

const cardPopup = new PopupWithForm('.popup_target_card', (inputValues) => {
  const card = new Card(inputValues['input-card-name'], inputValues['input-card-image-link'], '#card-template', (itemInfo) => {
    imagePopup.open(itemInfo);
  });
  cardSection.addItem(card.generateCard());
});
cardPopup.setEventListeners();
openCardPopupButton.addEventListener('click', () => {
  cardPopup.open();
});
const cardFormValidator = new FormValidator(formSelectors, cardPopup.getFormElement());
cardFormValidator.enableValidation();
