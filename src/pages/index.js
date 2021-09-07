import './index.css';

import {
  avatarEditButton, cardAddButton, cardSelectorParams, errorDescription, formParams, initialCards, popupAvatar,
  popupCardAdd, popupProfile, profileAvatar, profileEditButton, profileInfoInput, profileNameInput
} from '../utils/constants.js';

import Section from '../components/Section';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import FormValidator from '../components/FormValidator';
import Api from '../components/Api';
import PopupWithConfirm from '../components/PopupWithConfirm';
import Popup from '../components/Popup';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization:  '43168655-eaf1-4fdd-a66c-28d363c4ffc3',
    'Content-Type': 'application/json'
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

const deleteConfirmPopup = new PopupWithConfirm(
  {
    popupSelector:            '.popup_type_confirmation-dialog',
    popupCloseButtonSelector: '.popup__exit-button'
  },
  {
    submitHandler: () => {
      const {cardObj, cardId} = deleteConfirmPopup.getConfirmationData();
      api.deleteCard(cardId).then(() => {
        cardObj.deleteCard();
        deleteConfirmPopup.close();
      }).catch(err => {
        deleteConfirmPopup.close();
        errorPopup.open();
        errorDescription.textContent = `Error deleting card: ${err}`;
      });
    }
  }
);

deleteConfirmPopup.setEventListeners();

imagePopup.setEventListeners();

function createCardElement(cardItem) {
  const cardObj = new Card(
    cardItem,
    cardSelectorParams,
    cardItem.owner._id === userInfo.getUserId(),
    cardItem.likes.some(like => like._id === userInfo.getUserId()),
    () => {
      imagePopup.open({
        imageLink: cardItem['link'],
        text:      cardItem['name']
      });
    }, ({cardId}) => {
      deleteConfirmPopup.setConfirmationData({cardObj, cardId});
      deleteConfirmPopup.open();
    }, ({cardId, isLiked}) => {
      api.likeCard(isLiked, cardId).then(res => {
        console.log(res);
        cardObj.setLike(isLiked);
      }).catch(err => {
        errorPopup.open();
        errorDescription.textContent = `Failed to ${isLiked ? 'set' : 'unset'} like: ${err}`;
      });
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
      const cardInfo = {
        name: userInfoObj['location-name'],
        link: userInfoObj['image-link']
      };
      const savedText = cardAddForm.getElement().querySelector('.popup__submit-button').textContent;
      cardAddForm.getElement().querySelector('.popup__submit-button').textContent = 'Сохранение...';
      api.addCard(cardInfo).then(res => {
        renderCard(res);
        cardAddForm.getElement().querySelector('.popup__submit-button').textContent = savedText;
        cardAddForm.close();
      }).catch(err => {
        cardAddForm.close();
        errorPopup.open();
        errorDescription.textContent = `Failed to add card: ${err}`;
      });
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
      const savedText = profileEditForm.getElement().querySelector('.popup__submit-button').textContent;
      profileEditForm.getElement().querySelector('.popup__submit-button').textContent = 'Сохранение...';
      api.setUserInfo({
        name:  userInfoObj.name,
        about: userInfoObj.job
      }).then(res => {
        profileEditForm.getElement().querySelector('.popup__submit-button').textContent = savedText;
        userInfo.setUserInfo({
          userName: res.name,
          userInfo: res.about
        });
        profileAvatar.src = res.avatar;
        profileAvatar.alt = res.name;
        profileEditForm.close();
      }).catch(err => {
        profileEditForm.close();
        errorPopup.open();
        errorDescription.textContent = `Failed to set user info: ${err}`;
      });
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

const errorPopup = new Popup({
  popupSelector:      '.popup_type_error',
  exitButtonSelector: '.popup__exit-button'
});

errorPopup.setEventListeners();

const avatarEditFormValidator = new FormValidator(popupAvatar, formParams);
avatarEditFormValidator.enableValidation();

const popupEditAvatarForm = new PopupWithForm(
  {
    popupSelector:            '.popup_type_avatar',
    popupCloseButtonSelector: '.popup__exit-button'
  },
  {
    submitHandler: (avatar) => {
      api.updateProfileImage(avatar.link).then(res => {
        console.log(res);
        profileAvatar.src = avatar.link;
        popupEditAvatarForm.close();
      }).catch(err => {
        popupEditAvatarForm.close();
        errorPopup.open();
        errorDescription.textContent = `Error updating profile image: ${err}`;
      });
    }
  }
);
popupEditAvatarForm.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  avatarEditFormValidator.disableSubmitButton();
  avatarEditFormValidator.clearErrorFields();
  popupEditAvatarForm.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, cards]) => {
    userInfo.setUserInfo({userName: info.name, userInfo: info.about});
    profileAvatar.src = info.avatar;
    profileAvatar.alt = info.name;
    userInfo.setUserId(info._id);
    placesSection.setItems(cards.reverse());
    placesSection.render();
  })
  .catch(err => {
    errorPopup.open();
    errorDescription.textContent = `Error initializing page: ${err}`;
  });