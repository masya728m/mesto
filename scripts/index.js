import {initialCards} from './initial-cards.js';
import Card from './card.js';
import {disableButton, enableButton, enableValidation} from './validation.js';

const profile = document.querySelector('.profile');
const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCardAdd = document.querySelector('.popup_type_card-add');
const profileAddButton = document.querySelector('.profile__add-button');
const places = document.querySelector('.places');
const popupCardAddExitButton = popupCardAdd.querySelector('.popup__exit-button');
const popupProfileExitButton = popupProfile.querySelector('.popup__exit-button');

const fieldNameMap = {
  'name': profile.querySelector('.profile__name'),
  'job':  profile.querySelector('.profile__description')
};

const cardSelectorParams = {
  deleteButtonSelector: '.places__delete-button',
  templateSelector:     '#places__place',
  cardSelector:         '.places__place',
  cardImageSelector:    '.places__image',
  cardTextSelector:     '.places__name',
  likeButtonSelector:   '.places__like-button',
  likeModifier:         'places__like-button_liked',
  popupTextSelector:    '.popup__overview-text',
  popupImageSelector:   '.popup__overview-image'
};

const popupParams = {
  popupSelector:        '.popup_type_overview',
  closeButtonSelector:  '.popup__exit-button',
  popupOpeningModifier: 'popup_opened'
};

function clearErrorFields(popupWindow) {
  popupWindow.querySelectorAll('.popup__field').forEach(field => {
    field.classList.remove('popup__field_type_error');
  });
  popupWindow.querySelectorAll('.popup__field-error').forEach(errorField => {
    errorField.textContent = '';
  });
}

function closePopup(popupWindow) {
  popupWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscapeHandler);
}

popupList.forEach(item => {
    item.addEventListener('click', evt => {
      if (Array.from(evt.target.classList).some(className => className === 'popup')) {
        closePopup(evt.target);
      }
    });
  }
);

function closeByEscapeHandler(evt) {
  if (evt.key !== 'Escape') return;
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
}

function openPopup(popupWindow) {
  popupWindow.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscapeHandler);
}

popupProfileExitButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
  clearErrorFields(popupProfile);
  enableButton(popupProfile.querySelector('.popup__submit-button'), 'popup__submit-button_disabled');
  popupProfile.querySelectorAll('.popup__field').forEach(field => {
    field.value = fieldNameMap[field.name].textContent;
  });
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupCardAdd);
  clearErrorFields(popupCardAdd);
  enableButton(popupCardAdd.querySelector('.popup__submit-button'), 'popup__submit-button_disabled');
  const inputList = Array.from(popupCardAdd.querySelectorAll('.popup__field'));
  const submitButton = popupCardAdd.querySelector('.popup__submit-button');
  inputList.forEach(
    field => {
      disableButton(submitButton, 'popup__submit-button_disabled');
      field.value = '';

    });
});

popupCardAddExitButton.addEventListener('click', () => {
  closePopup(popupCardAdd);
});

popupCardAdd.querySelectorAll('.popup__field').forEach(
  field => field.addEventListener('input', () => {
    field.classList.remove('popup__field_inactive');
  }));

function initCards(cards) {
  cards.forEach(card => {
    const cardObj = new Card(card, cardSelectorParams, popupParams);
    const cardElement = cardObj.createCardElement();
    places.append(cardElement);
  });
}

initCards(initialCards);

const handlerMap = new Map();

handlerMap.set('popup_type_profile', () => {
  popupProfile.querySelectorAll('.popup__field').forEach(field => {
    fieldNameMap[field.name].textContent = field.value;
  });
  closePopup(popupProfile);
});

handlerMap.set('popup_type_card-add', () => {
  const placeName = popupCardAdd.querySelector('.popup__field_type_place-name').value;
  const imageLink = popupCardAdd.querySelector('.popup__field_type_image-link').value;
  const cardParams = {name: placeName, link: imageLink};
  const cardObj = new Card(cardParams, cardSelectorParams, popupParams);
  const cardElement = cardObj.createCardElement();
  places.prepend(cardElement);
  closePopup(popupCardAdd);
});

enableValidation({
    formSelector:         '.popup',
    inputSelector:        '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass:  'popup__submit-button_disabled',
    inputErrorClass:      'popup__field_type_error',
    errorClass:           '.popup__field-error'
  }, handlerMap
);