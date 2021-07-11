import {initialCards} from './initial-cards.js';
import {enableValidation, displayError, toggleButtonState, disableButton, enableButton} from './validation.js';

const profile = document.querySelector('.profile');
const popupProfile = document.querySelector('.popup_type_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCardAdd = document.querySelector('.popup_type_card-add');
const profileAddButton = document.querySelector('.profile__add-button');
const popupImageOverview = document.querySelector('.popup_type_overview');
const places = document.querySelector('.places');
const popupImageOverviewExitButton = popupImageOverview.querySelector('.popup__exit-button');
const popupCardAddExitButton = popupCardAdd.querySelector('.popup__exit-button');
const popupProfileExitButton = popupProfile.querySelector('.popup__exit-button');

const fieldNameMap = {
  'name': profile.querySelector('.profile__name'),
  'job':  profile.querySelector('.profile__description')
};

function closePopup(popupWindow) {
  popupWindow.classList.remove('popup_opened');
  popupWindow.querySelectorAll('.popup__field').forEach(field => {
    field.classList.remove('popup__field_type_error');
  });
  popupWindow.querySelectorAll('.popup__field-error').forEach(errorField => {
    errorField.textContent = '';
  });
  enableButton(popupWindow.querySelector('.popup__submit-button'), 'popup__submit-button_disabled');
}

function openPopup(popupWindow) {
  popupWindow.classList.add('popup_opened');
}

popupProfileExitButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
  popupProfile.querySelectorAll('.popup__field').forEach(field => {
    field.value = fieldNameMap[field.name].textContent;
  });
});

profileAddButton.addEventListener('click', () => {
  const inputList = Array.from(popupCardAdd.querySelectorAll('.popup__field'));
  const submitButton = popupCardAdd.querySelector('.popup__submit-button');
  inputList.forEach(
    field => {
      displayError(field, 'popup__field_type_error', '.popup__field-error', 'Вы пропустили это поле');
      disableButton(submitButton, 'popup__submit-button_disabled');
      field.value = '';

    });
  openPopup(popupCardAdd);
});

popupCardAddExitButton.addEventListener('click', () => closePopup(popupCardAdd));

popupCardAdd.querySelectorAll('.popup__field').forEach(
  field => field.addEventListener('input', () => {
    field.classList.remove('popup__field_inactive');
  }));

popupImageOverviewExitButton.addEventListener('click', () => closePopup(popupImageOverview));

function createCardElement(cardObject) {
  const placeTemplate = document.querySelector('#places__place').content;

  const placeElement = placeTemplate.querySelector('.places__place').cloneNode(true);

  placeElement.querySelector('.places__image').src = cardObject.link;
  placeElement.querySelector('.places__image').alt = cardObject.name;
  placeElement.querySelector('.places__image').addEventListener('click', event => {
    openPopup(popupImageOverview);
    popupImageOverview.querySelector('.popup__overview-image').src = event.target.src;
    popupImageOverview.querySelector('.popup__overview-image').alt = event.target.alt;
    popupImageOverview.querySelector('.popup__overview-text').textContent = event.target.alt;
  });

  placeElement.querySelector('.places__name').textContent = cardObject.name;

  placeElement.querySelector('.places__like-button').addEventListener('click',
    event => event.target.classList.toggle('places__like-button_liked'));

  placeElement.querySelector('.places__delete-button').addEventListener('click', () => placeElement.remove());

  return placeElement;
}

function initCards(cards) {
  cards.forEach(card => {
    const cardElement = createCardElement(card);
    places.append(cardElement);
  });
}

initCards(initialCards);

const handlerMap = new Map;
handlerMap.set('popup_type_profile', () => {
  popupProfile.querySelectorAll('.popup__field').forEach(field => {
    fieldNameMap[field.name].textContent = field.value;
  });
  closePopup(popupProfile);
});
handlerMap.set('popup_type_card-add', () => {
  const placeName = popupCardAdd.querySelector('.popup__field_type_place-name').value;
  const imageLink = popupCardAdd.querySelector('.popup__field_type_image-link').value;
  const cardElement = createCardElement({
    name: placeName,
    link: imageLink
  });
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