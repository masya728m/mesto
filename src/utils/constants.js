const arkhyz = new URL('../images/arkhyz.jpg', import.meta.url);
const chelyabinsk = new URL('../images/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('../images/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const kholmogorsky = new URL('../images/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('../images/baikal.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Архыз',
    link: arkhyz
  },
  {
    name: 'Челябинская область',
    link: chelyabinsk
  },
  {
    name: 'Иваново',
    link: ivanovo
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Холмогорский район',
    link: kholmogorsky
  },
  {
    name: 'Байкал',
    link: baikal
  }
];

export const profile = document.querySelector('.profile');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupCardAdd = document.querySelector('.popup_type_card-add');
export const popupOverview = document.querySelector('.popup_type_overview');
export const places = document.querySelector('.places');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');
export const profileNameInput = document.getElementById('profile-name');
export const profileInfoInput = document.getElementById('profile-info');
export const profileAvatar = profile.querySelector('.profile__avatar');
export const avatarEditButton = profile.querySelector('.profile__avatar-button');


export const fieldNameMap = {
  'name': profile.querySelector('.profile__name'),
  'job':  profile.querySelector('.profile__description')
};

export const cardSelectorParams = {
  deleteButtonSelector: '.places__delete-button',
  templateSelector:     '#places__place',
  cardSelector:         '.places__place',
  cardImageSelector:    '.places__image',
  cardTextSelector:     '.places__name',
  likeButtonSelector:   '.places__like-button',
  likeModifier:         'places__like-button_liked',
  popupTextSelector:    '.popup__overview-text',
  popupImageSelector:   '.popup__overview-image',
  likeCounterSelector:  '.places__like-counter'
};

export const formParams = {
  popupFieldSelector:          '.popup__field',
  popupFieldErrorSelector:     '.popup__field-error',
  popupFieldErrorModifier:     'popup__field_type_error',
  submitButtonSelector:        '.popup__submit-button',
  submitButtonDisableModifier: 'popup__submit-button_disabled'
};