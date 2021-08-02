import {initialCards} from './initial-cards.js';
import Card from './card.js';
import FormValidator from './form-validator.js';

const profile = document.querySelector('.profile');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCardAdd = document.querySelector('.popup_type_card-add');
const places = document.querySelector('.places');

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

const popupCardParams = {
  popupSelector:        '.popup_type_overview',
  closeButtonSelector:  '.popup__exit-button',
  popupOpeningModifier: 'popup_opened'
};

function initCards(cards) {
  cards.forEach(card => {
    const cardObj = new Card(card, cardSelectorParams, popupCardParams);
    const cardElement = cardObj.createCardElement();
    places.append(cardElement);
  });
}

initCards(initialCards);

const profileForm = new FormValidator(
  popupProfile,
  {
    openButtonSelector:          '.profile__edit-button',
    popupFieldSelector:          '.popup__field',
    popupFieldErrorSelector:     '.popup__field-error',
    popupFieldErrorModifier:     'popup__field_type_error',
    submitButtonSelector:        '.popup__submit-button',
    submitButtonDisableModifier: 'popup__submit-button_disabled'
  }, {
    popupSelector:        '.popup_type_profile',
    closeButtonSelector:  '.popup__exit-button',
    popupOpeningModifier: 'popup_opened'
  }
);

profileForm.onOpen(() => {
  profileForm.enableSubmitButton();
  profileForm.getInputFields().forEach(field => {
    field.value = fieldNameMap[field.name].textContent;
  });
});

profileForm.onSubmit(() => {
  profileForm.getInputFields().forEach(field => {
    fieldNameMap[field.name].textContent = field.value;
  });
});

const cardAddForm = new FormValidator(
  popupCardAdd,
  {
    openButtonSelector:          '.profile__add-button',
    popupFieldSelector:          '.popup__field',
    popupFieldErrorSelector:     '.popup__field-error',
    popupFieldErrorModifier:     'popup__field_type_error',
    submitButtonSelector:        '.popup__submit-button',
    submitButtonDisableModifier: 'popup__submit-button_disabled'
  }, {
    popupSelector:        '.popup_type_card-add',
    closeButtonSelector:  '.popup__exit-button',
    popupOpeningModifier: 'popup_opened'
  }
);

cardAddForm.onOpen(() => {
  cardAddForm.disableSubmitButton();
  cardAddForm.getInputFields().forEach(field => {
    field.value = '';
    cardAddForm.checkInputValidity(field);
  });
});

cardAddForm.onSubmit(() => {
  const placeName = cardAddForm.getPopupElement().querySelector('.popup__field_type_place-name').value;
  const imageLink = cardAddForm.getPopupElement().querySelector('.popup__field_type_image-link').value;
  const card = {name: placeName, link: imageLink};
  const cardObj = new Card(card, cardSelectorParams, popupCardParams);
  const cardElement = cardObj.createCardElement();
  places.prepend(cardElement);
});
