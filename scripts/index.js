let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelectorAll('.popup__field')[0];
let jobInput = formElement.querySelectorAll('.popup__field')[1];
let closeButton = document.querySelector('.popup__exit-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');


editButton.addEventListener('click', (e) => {
  console.log(e);
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeButton.addEventListener('click', (e) => {
  console.log(e);
  popup.classList.remove('popup_opened');
});

formElement.addEventListener('submit', (e) => {
  console.log(e);
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
});