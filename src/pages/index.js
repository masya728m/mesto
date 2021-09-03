import './index.css';

import {
  avatarEditButton, cardAddButton, cardSelectorParams, formParams, initialCards, popupAvatar, popupCardAdd,
  popupProfile, profileAvatar, profileEditButton, profileInfoInput, profileNameInput
} from '../utils/constants.js';

import Section from '../components/Section';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import FormValidator from '../components/FormValidator';
import Api from '../components/Api';
import PopupWithConfirm from '../components/PopupWithConfirm';

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
      });
    }
  }
);

deleteConfirmPopup.setEventListeners();

imagePopup.setEventListeners();

function createCardElement(cardItem) {
  const cardObj = new Card(cardItem, cardSelectorParams, () => {
    imagePopup.open({
      imageLink: cardItem['link'],
      text:      cardItem['name']
    });
  }, ({cardId}) => {
    deleteConfirmPopup.setConfirmationData({cardObj, cardId});
    deleteConfirmPopup.open();
  }, ({cardId, isLiked}) => {
    api.likeCard(isLiked, cardId).then(res => {
      cardObj.setLike(isLiked);
    });
  });
  return cardObj.createCardElement();
}

function renderCard(cardItem) {
  const cardElement = createCardElement(cardItem);
  if (cardItem.owner._id !== userInfo.getUserId()) {
    cardElement.querySelector(cardSelectorParams.deleteButtonSelector).style.display = 'none';
  }
  if (cardItem.likes.some(like => like._id === userInfo.getUserId())) {
    cardElement.querySelector(cardSelectorParams.likeButtonSelector).classList.add(cardSelectorParams.likeModifier);
  }
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
      api.addCard(cardInfo).then(res => {
        renderCard(res);
        cardAddForm.close();
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
      api.setUserInfo({
        name:  userInfoObj.name,
        about: userInfoObj.job
      }).then(res => {
        userInfo.setUserInfo({
          userName: res.name,
          userInfo: res.about
        });
        profileAvatar.src = res.avatar;
        profileAvatar.alt = res.name;
        profileEditForm.close();
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

api.getUserInfo().then(info => {
  userInfo.setUserInfo({userName: info.name, userInfo: info.about});
  profileAvatar.src = info.avatar;
  profileAvatar.alt = info.name;
  userInfo.setUserId(info._id);
  api.getInitialCards().then(cards => {
    placesSection.setItems(cards.reverse());
    placesSection.render();
  });
});

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