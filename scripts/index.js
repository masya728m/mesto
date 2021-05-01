const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelectorAll('.popup__field')[0];
const jobInput = formElement.querySelectorAll('.popup__field')[1];
const closeButton = document.querySelector('.popup__exit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const places = document.querySelector('.places');
const addButton = document.querySelector('.profile__add-button');

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

  let placeInfo = document.createElement('div');
  placeInfo.classList.add('places__info');
  placeInfo.append(placeName, likeButton);

  let place = document.createElement('div');
  place.classList.add('places__place');

  place.append(placeImage, placeInfo);
  places.append(place);
}

function fillCards(cards) {
  cards.forEach(card => addCard(card));
}

fillCards(initialCards);


function editButtonCLickHandler(event) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editButton.addEventListener('click', editButtonCLickHandler);

function popupCloseButtonClickHandler(event) {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', popupCloseButtonClickHandler);

function formSubmitButtonClickHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitButtonClickHandler);