import './index.css';
import Api from '../components/Api';

import {userInfoSelectors, formSelectors} from '../utils/constants';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const cohortId = 'cohort-62';
const token = '66420b20-5df2-413b-bc85-90b83b50056d';
const baseUrl = `https://mesto.nomoreparties.co/v1/${cohortId}`;
const headers = {
  'authorization': token, 'Content-Type': 'application/json'
};
const api = new Api({baseUrl, headers});


const userInfo = new UserInfo(userInfoSelectors);

/**
 * Не понимаю как обойтись без этой переменной
 */
let userId;

/*
 * Описываем логику отображения списка карточек
 */

const imagePopup = new PopupWithImage('.popup_target_image');
imagePopup.setEventListeners();


let cardSection = new Section({
  renderer: (item) => {
    cardSection.addItem(createCard(item));
  }
}, '.card-grid__container');

let localCards = [];
function updateCardSection() {
  cardSection.renderItems(localCards);
}

function updateLocalCards(newCards) {
  localCards = newCards;
  updateCardSection();
}

function updateLocalCard(card) {
  localCards = localCards.map(item => {
    if (item._id === card._id) {
      return { ...item, ...card };
    } else {
      return item;
    }
  });
  updateCardSection();
}

function addLocalCard(newCard) {
  localCards.unshift(newCard);
  updateCardSection();
}

function deleteLocalCard(cardId) {
  localCards = localCards.filter(item => item._id !== cardId);
  updateCardSection();
}

const deleteCardPopup = new PopupWithConfirmation('.popup_target_confirmation', (cardId) => {
  api.deleteCard(cardId)
    .then(updatedCardInfo => {
      deleteLocalCard(cardId);
    })
    .catch(err => {
      console.log(err);
    });
  deleteCardPopup.close();
});
deleteCardPopup.setEventListeners();

function cardDeleteHandler(cardId) {
  deleteCardPopup.open(cardId);
}

function cardClickHandler(cardInfo) {
  imagePopup.open(cardInfo);
}

function cardLikeHandler(cardId, enable) {
  api.like(cardId, enable)
    .then(updatedCardInfo => {
      updateLocalCard({ _id: cardId, ...updatedCardInfo });
    })
    .catch(err => {
      console.log(err);
    });
}

function createCard(cardInfo) {
  const {_id: cardId, name, link, likes, owner: { _id: ownerId}} = cardInfo;
  const likedByMe = likes.filter(item => item._id === userId).length > 0;
  const allLikes = likes.length;
  const canDelete = ownerId === userId;
  const card = new Card({
    cardId, name, link, likedByMe, allLikes, canDelete,
    templateSelector: '#card-template',
    handleCardClick: cardClickHandler,
    handleCardLike: cardLikeHandler,
    handleCardDelete: cardDeleteHandler
  });
  return card.generateCard();
}


/*
 * Описываем логику добавления новой карточки
 */

const cardPopup = new PopupWithForm('.popup_target_card', (inputValues) => {
  cardPopup.setSubmitButtonText('Создание...');
  const name = inputValues['input-card-name'];
  const link = inputValues['input-card-image-link'];
  api.addCard({ name, link })
    .then(updatedCardInfo => {
     addLocalCard(updatedCardInfo);
      cardPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      cardPopup.setSubmitButtonText('Создать');
    });

});
cardPopup.setEventListeners();

const openCardPopupButton = document.querySelector('.profile__add-button');
openCardPopupButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardPopup.open();
});

const cardFormValidator = new FormValidator(formSelectors, cardPopup.getFormElement());
cardFormValidator.enableValidation();


/**
 * Описываем логику редактирования профиля
 */

const profilePopup = new PopupWithForm('.popup_target_profile', (inputValues) => {
  profilePopup.setSubmitButtonText('Сохранение...');
  api.setUser({name: inputValues['input-name'], about: inputValues['input-aboutme']})
    .then(json => {
      userInfo.setUserInfo(json);
      profilePopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.setSubmitButtonText('Сохранить');
    });
});
profilePopup.setEventListeners();
const profileFormValidator = new FormValidator(formSelectors, profilePopup.getFormElement());
profileFormValidator.enableValidation();

const openProfilePopupButton = document.querySelector('.profile__edit-button');
openProfilePopupButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  profilePopup.fill({'input-name': name, 'input-aboutme': about});
  profileFormValidator.resetValidation();
  profilePopup.open();
});

const avatarPopup = new PopupWithForm('.popup_target_avatar', (inputValues) => {
  avatarPopup.setSubmitButtonText('Сохранение...');
  api.setAvatar(inputValues['input-profile-avatar-link'])
    .then(newUserInfo => {
      userInfo.setUserInfo(newUserInfo);
      avatarPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.setSubmitButtonText('Сохранить');
    });
});
avatarPopup.setEventListeners();
const avatarFormValidator = new FormValidator(formSelectors, avatarPopup.getFormElement());
avatarFormValidator.enableValidation();

const openAvatarPopupButton = document.querySelector('.profile__avatar-container');
openAvatarPopupButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

Promise.all([api.getUser(), api.getCards()])
  .then(([newUserInfo, initialCards]) => {
    userInfo.setUserInfo(newUserInfo);
    userId = newUserInfo._id;
    updateLocalCards(initialCards);
  })
  .catch(err => {
    console.log(err);
  });
