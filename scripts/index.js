const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const firstInputField = formElement.querySelectorAll('.popup__field')[0];
const secondInputField = formElement.querySelectorAll('.popup__field')[1];
const closeButton = document.querySelector('.popup__exit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const places = document.querySelector('.places');
const addButton = document.querySelector('.profile__add-button');

const popupFieldStyle = firstInputField.style;

class PopupState {
  static CLOSED = 0;
  static ADD_FORM = 1;
  static EDIT_FORM = 2;
}

let popupState = PopupState.CLOSED;

const initialCards = [
  {
    name: 'Архыз',
    link: './images/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: './images/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: './images/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: './images/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg'
  }
];

function addCard(card) {
  let placeImage = document.createElement('img');
  placeImage.classList.add('places__image');
  placeImage.setAttribute('src', card.link);
  placeImage.setAttribute('alt', card.name);

  let placeName = document.createElement('h2');
  placeName.classList.add('places__name');
  placeName.textContent = card.name;

  let likeButton = document.createElement('button');
  likeButton.classList.add('places__like-button');
  likeButton.setAttribute('type', 'button');

  let deleteButton = document.createElement('button');
  deleteButton.classList.add('places__delete-button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.addEventListener('click', event => place.remove());

  let placeInfo = document.createElement('div');
  placeInfo.classList.add('places__info');
  placeInfo.append(placeName, likeButton, deleteButton);

  let place = document.createElement('div');
  place.classList.add('places__place');

  place.append(placeImage, placeInfo);
  places.append(place);
}

function fillCards(cards) {
  cards.forEach(card => addCard(card));
}

fillCards(initialCards);

function inputCLickHandler(event) {
  event.target.value = '';
  event.target.style.opacity = '1';
  event.target.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
}

function addButtonCLickHandler(event) {
  popupState = PopupState.ADD_FORM;
  popup.classList.add('popup_opened');
  firstInputField.setAttribute('name', 'name');
  secondInputField.setAttribute('name', 'link');
  firstInputField.value = 'Название';
  firstInputField.style.opacity = '0.2';
  firstInputField.style.borderBottom = '1px solid black';
  secondInputField.value = 'Ссылка на картинку';
  secondInputField.style.opacity = '0.2';
  secondInputField.style.borderBottom = '1px solid black';
  firstInputField.addEventListener('click', inputCLickHandler);
  secondInputField.addEventListener('click', inputCLickHandler);
  popup.querySelector('.popup__title').textContent = 'Новое место';
  popup.querySelector('.popup__submit-button').textContent = 'Создать';
}

addButton.addEventListener('click', addButtonCLickHandler);

function editButtonCLickHandler(event) {
  popupState = PopupState.EDIT_FORM;
  popup.classList.add('popup_opened');
  firstInputField.value = profileName.textContent;
  firstInputField.setAttribute('name', 'name');
  secondInputField.value = profileJob.textContent;
  secondInputField.setAttribute('name', 'job');
  popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
  popup.querySelector('.popup__submit-button').textContent = 'Сохранить';
}

editButton.addEventListener('click', editButtonCLickHandler);

function popupCloseButtonClickHandler(event) {
  popup.classList.remove('popup_opened');
  popupState = PopupState.CLOSED;
  firstInputField.value = '';
  secondInputField.value = '';
}

closeButton.addEventListener('click', popupCloseButtonClickHandler);

function formSubmitButtonClickHandler(event) {
  event.preventDefault();
  switch (popupState) {
    case PopupState.EDIT_FORM:
      profileName.textContent = firstInputField.value;
      profileJob.textContent = secondInputField.value;
      break;
    case PopupState.ADD_FORM:
      firstInputField.removeEventListener('click', inputCLickHandler);
      secondInputField.removeEventListener('click', inputCLickHandler);
      addCard({name: firstInputField.value, link: secondInputField.value});
      break;
    default:
      return;
  }
  firstInputField.style = popupFieldStyle;
  secondInputField.style = popupFieldStyle;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitButtonClickHandler);