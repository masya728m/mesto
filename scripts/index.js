import {initialCards} from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profile = document.querySelector('.profile');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCardAdd = document.querySelector('.popup_type_card-add');
export const popupOverview = document.querySelector('.popup_type_overview');
const places = document.querySelector('.places');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

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

const formParams = {
  popupFieldSelector:          '.popup__field',
  popupFieldErrorSelector:     '.popup__field-error',
  popupFieldErrorModifier:     'popup__field_type_error',
  submitButtonSelector:        '.popup__submit-button',
  submitButtonDisableModifier: 'popup__submit-button_disabled'
};

function createCardElement(cardParams, selectorParams) {
  const cardObj = new Card(cardParams, selectorParams);
  return cardObj.createCardElement();
}

function initCards(cards) {
  cards.forEach(card => {
    places.append(createCardElement(card, cardSelectorParams));
  });
}

initCards(initialCards);

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscapeHandler);
  document.addEventListener('click', popupBackgroundClickHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscapeHandler);
  document.removeEventListener('click', popupBackgroundClickHandler);
}

function closeByEscapeHandler(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function popupBackgroundClickHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

popupProfile.querySelector('.popup__exit-button').addEventListener('click', () => closePopup(popupProfile));

cardAddButton.addEventListener('click', () => openPopup(popupCardAdd));
popupCardAdd.querySelector('.popup__exit-button').addEventListener('click', () => closePopup(popupCardAdd));

popupOverview.querySelector('.popup__exit-button').addEventListener('click', () => closePopup(popupOverview));


const profileForm = new FormValidator(popupProfile, formParams);

profileForm.enableValidation();

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
  profileForm.enableSubmitButton();
  profileForm.clearErrorFields();
  profileForm.getInputFields().forEach(field => {
    field.value = fieldNameMap[field.name].textContent;
  });
});

popupProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  profileForm.getInputFields().forEach(field => {
    fieldNameMap[field.name].textContent = field.value;
  });
  closePopup(popupProfile);
});

const cardAddForm = new FormValidator(popupCardAdd, formParams);

cardAddForm.enableValidation();

cardAddButton.addEventListener('click', () => {
  cardAddForm.disableSubmitButton();
  cardAddForm.clearErrorFields();
  popupCardAdd.querySelector('.popup__form').reset();
});

popupCardAdd.addEventListener('submit', evt => {
  evt.preventDefault();
  const placeName = cardAddForm.getPopupElement().querySelector('.popup__field_type_place-name').value;
  const imageLink = cardAddForm.getPopupElement().querySelector('.popup__field_type_image-link').value;
  const card = {name: placeName, link: imageLink};
  places.prepend(createCardElement(card, cardSelectorParams));
  closePopup(popupCardAdd);
});
