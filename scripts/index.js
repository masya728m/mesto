import {initialCards} from './initial-cards.js';

const profile = document.querySelector('.profile');
const popupProfile = document.querySelector('.popup_type_profile');
const profileEditButton = document.querySelector('.profile__edit-button');

const fieldNameMap = {
  'name': profile.querySelector('.profile__name'),
  'job':  profile.querySelector('.profile__description')
};

function closePopup(popupWindow) {
  popupWindow.classList.remove('popup_opened');
}

function openPopup(popupWindow) {
  popupWindow.classList.add('popup_opened');
}

popupProfile.querySelector('.popup__exit-button').addEventListener('click', () => {
  closePopup(popupProfile);
});

popupProfile.querySelector('.popup__submit-button').addEventListener('click', e => {
  e.preventDefault();
  popupProfile.querySelectorAll('.popup__field').forEach(field => {
    fieldNameMap[field.name].textContent = field.value;
  });
  closePopup(popupProfile);
});

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
  popupProfile.querySelectorAll('.popup__field').forEach(field => {
    field.value = fieldNameMap[field.name].textContent;
  });
});

const popupCardAdd = document.querySelector('.popup_type_card-add');

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', () => {
  popupCardAdd.querySelectorAll('.popup__field').forEach(
    field => {
      field.classList.add('popup__field_inactive');
      field.value = '';
    });
  openPopup(popupCardAdd);
});

const popupCardAddExitButton = popupCardAdd.querySelector('.popup__exit-button');
popupCardAddExitButton.addEventListener('click', () => closePopup(popupCardAdd));

popupCardAdd.querySelectorAll('.popup__field').forEach(
  field => field.addEventListener('input', () => {
    field.classList.remove('popup__field_inactive');
  }));

const popupCardAddSubmitButton = popupCardAdd.querySelector('.popup__submit-button');
popupCardAddSubmitButton.addEventListener('click', event => {
  event.preventDefault();
  let placeName = popupCardAdd.querySelectorAll('.popup__field')[0].value;
  let imageLink = popupCardAdd.querySelectorAll('.popup__field')[1].value;
  const cardElement = createCardElement({
    name: placeName,
    link: imageLink
  });
  places.prepend(cardElement);
  closePopup(popupCardAdd);
});

const popupImageOverview = document.querySelector('.popup_type_overview');
const places = document.querySelector('.places');
const popupImageOverviewExitButton = popupImageOverview.querySelector('.popup__exit-button');

popupImageOverviewExitButton.addEventListener('click', () =>
  popupImageOverview.classList.remove('popup_opened'));

function createCardElement(cardObject) {
  const placeTemplate = document.querySelector('#places__place').content;

  const placeElement = placeTemplate.querySelector('.places__place').cloneNode(true);

  placeElement.querySelector('.places__image').src = cardObject.link;
  placeElement.querySelector('.places__image').alt = cardObject.name;
  placeElement.querySelector('.places__image').addEventListener('click', event => {
    popupImageOverview.classList.add('popup_opened');
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