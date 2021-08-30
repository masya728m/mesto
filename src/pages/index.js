import './index.css';

import {
  cardAddButton, cardSelectorParams, formParams, initialCards, popupCardAdd, popupProfile, profileEditButton,
  profileInfoInput, profileNameInput
} from '../utils/constants.js';

import Section from '../components/Section';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import FormValidator from '../components/FormValidator';
import Api from '../components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: '43168655-eaf1-4fdd-a66c-28d363c4ffc3',
    'ContentType': 'application/json'
  }
});

const imagePopup = new PopupWithImage(
  {
    popupSelector:            '.popup_type_overview',
    popupCloseButtonSelector: '.popup__exit-button',
    popupImageSelector:       '.popup__overview-image',
    popupTextSelector:        '.popup__overview-text'
  }
);

imagePopup.setEventListeners();

function createCardElement(cardItem) {
  const cardObj = new Card(cardItem, cardSelectorParams, () => {
    imagePopup.open({
      imageLink: cardItem['link'],
      text:      cardItem['name']
    });
  }, ({ownerId}) => {
    console.log(ownerId);
  }, (ownerId) => {
    console.log(ownerId);
  });
  return cardObj.createCardElement();
}

function renderCard(cardItem) {
  const cardElement = createCardElement(cardItem);
  placesSection.addItem(cardElement);
}

const placesSection = new Section(
  {
    items:    initialCards,
    renderer: renderCard
  },
  '.places'
);

const cardAddFormValidator = new FormValidator(popupCardAdd, formParams);

cardAddFormValidator.enableValidation();

const cardAddForm = new PopupWithForm(
  {
    popupSelector:            '.popup_type_card-add',
    popupCloseButtonSelector: '.popup__exit-button'
  },
  {
    submitHandler: (userInfoObj) => {
      renderCard({
        name: userInfoObj['location-name'],
        link: userInfoObj['image-link']
      });
      cardAddForm.close();
    }
  }
);
cardAddForm.setEventListeners();

cardAddButton.addEventListener('click', () => {
  cardAddFormValidator.clearErrorFields();
  cardAddFormValidator.disableSubmitButton();
  cardAddForm.open();
});

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__description'
});

const profileEditFormValidator = new FormValidator(popupProfile, formParams);

profileEditFormValidator.enableValidation();

const profileEditForm = new PopupWithForm(
  {
    popupSelector:            '.popup_type_profile',
    popupCloseButtonSelector: '.popup__exit-button'
  },
  {
    submitHandler: (userInfoObj) => {
      userInfo.setUserInfo({
        userName: userInfoObj.name,
        userInfo: userInfoObj.job
      });
      profileEditForm.close();
    }
  }
);
profileEditForm.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userInfoObj = userInfo.getUserInfo();
  profileNameInput.value = userInfoObj.userName;
  profileInfoInput.value = userInfoObj.userInfo;
  profileEditFormValidator.enableSubmitButton();
  profileEditFormValidator.clearErrorFields();
  profileEditForm.open();
});

api.getUserInfo().then(info => {
  console.log(info);
  userInfo.setUserInfo({userName: info.name, userInfo: info.about});
  userInfo.setUserId(info._id);
});

api.getInitialCards().then(cards => {
  placesSection.setItems(cards);
  placesSection.render();
});
