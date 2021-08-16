import './index.css';

import {
  cardAddButton, cardSelectorParams, formParams, initialCards, popupCardAdd, popupProfile, profileEditButton
} from '../utils/constants.js';

import Section from '../components/Section';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import FormValidator from '../components/FormValidator';

function createCardElement(cardItem) {
  const cardObj = new Card(cardItem, cardSelectorParams, (evt) => {
    const imagePopup = new PopupWithImage(
      {
        popupSelector:            '.popup_type_overview',
        popupCloseButtonSelector: '.popup__exit-button',
        popupImageSelector:       '.popup__overview-image',
        popupTextSelector:        '.popup__overview-text'
      },
      {
        imageLink: evt.target.src,
        text:      evt.target.alt
      });
    imagePopup.setEventListeners();
    imagePopup.open();
  });
  return cardObj.createCardElement();
}

const placesSection = new Section(
  {
    items:    initialCards,
    renderer: (cardItem) => {
      const cardElement = createCardElement(cardItem);
      placesSection.addItem(cardElement);
    }
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
    submitHandler: ([placeName, placeImageLink]) => {
      const cardElement = createCardElement({
        name: placeName,
        link: placeImageLink
      });
      placesSection.addItem(cardElement);
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
    submitHandler: ([userName, userJob]) => {
      userInfo.setUserInfo({
        userName: userName,
        userInfo: userJob
      });
      profileEditForm.close();
    }
  }
);
profileEditForm.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userInfoObj = userInfo.getUserInfo();
  const fields = profileEditForm.getElement().querySelectorAll('.popup__field');
  console.log(fields);
  let idx = 0;
  for (const [, value] of Object.entries(userInfoObj)) {
    fields[idx++].value = value;
  }
  profileEditFormValidator.enableSubmitButton();
  profileEditForm.open();
});

placesSection.render();