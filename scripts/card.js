export default class Card {
  #_link;
  #_name;
  #_templateSelector;
  #_cardSelector;
  #_placeElement;

  #_cardImageSelector;
  #_cardTextSelector;

  #_cardClickHandlerBound;

  #_deleteButtonSelector;

  #_likeButtonSelector;
  #_likeModifier;
  #_likeButtonElement;

  #_popupImageSelector;
  #_popupTextSelector;

  #_popupElement;
  #_popupSelector;
  #_popupOpeningModifier;
  #_closeButtonSelector;
  #_closeButtonElement;

  #_closeButtonClickHandler;

  #_popupBackgroundClickHandlerBound;

  #_deleteButtonClickHandlerBound;

  #_likeButtonClickHandlerBound;

  #_closeByEscapeHandlerBound;

  constructor(cardParams, selectorParams, popupParams) {
    this.#_link = cardParams.link;
    this.#_name = cardParams.name;

    this.#_templateSelector = selectorParams.templateSelector;
    this.#_deleteButtonSelector = selectorParams.deleteButtonSelector;
    this.#_cardSelector = selectorParams.cardSelector;
    this.#_cardImageSelector = selectorParams.cardImageSelector;
    this.#_cardTextSelector = selectorParams.cardTextSelector;
    this.#_likeButtonSelector = selectorParams.likeButtonSelector;
    this.#_likeModifier = selectorParams.likeModifier;
    this.#_popupTextSelector = selectorParams.popupTextSelector;
    this.#_popupImageSelector = selectorParams.popupImageSelector;
    this.#_cardClickHandlerBound = this.#_cardClickHandler.bind(this);

    this.#_closeButtonSelector = popupParams.closeButtonSelector;
    this.#_popupOpeningModifier = popupParams.popupOpeningModifier;
    this.#_popupSelector = popupParams.popupSelector;
    this.#_popupElement = document.querySelector(this.#_popupSelector);
    this.#_closeButtonElement = this.#_popupElement.querySelector(this.#_closeButtonSelector);
    this.#_closeByEscapeHandlerBound = this.#_closeByEscapeHandler.bind(this);
    this.#_closeButtonClickHandler = this.#_closePopup.bind(this);
    this.#_popupBackgroundClickHandlerBound = this.#_popupBackgroundClickHandler.bind(this);
    this.#_deleteButtonClickHandlerBound = this.#_deleteButtonClickHandler.bind(this);
    this.#_likeButtonClickHandlerBound = this.#_likeButtonClickHandler.bind(this);
  }

  #_getTemplate() {
    return document
      .querySelector(this.#_templateSelector)
      .content
      .querySelector(this.#_cardSelector)
      .cloneNode(true);
  }

  #_openHandler(evt) {
    this.#_getPopupElement().querySelector(this.#_popupImageSelector).src = evt.target.src;
    this.#_getPopupElement().querySelector(this.#_popupImageSelector).alt = evt.target.alt;
    this.#_getPopupElement().querySelector(this.#_popupTextSelector).textContent = evt.target.alt;
  }

  #_setupEventListeners() {
    this.#_placeElement.querySelector(this.#_cardImageSelector).addEventListener('click', this.#_cardClickHandlerBound);
    this.#_placeElement.querySelector(this.#_deleteButtonSelector).addEventListener('click', this.#_deleteButtonClickHandlerBound);
    this.#_likeButtonElement.addEventListener('click', this.#_likeButtonClickHandlerBound);
    this.#_closeButtonElement.addEventListener('click', this.#_closeButtonClickHandler);
    this.#_popupElement.addEventListener('click', this.#_popupBackgroundClickHandlerBound);
  }

  #_likeButtonClickHandler(evt) {
    evt.target.classList.toggle(this.#_likeModifier);
  }

  #_deleteButtonClickHandler() {
    this.#_placeElement.remove();
  }

  #_popupBackgroundClickHandler(evt) {
    if (evt.target !== this.#_popupElement) return;
    this.#_closePopup();
  }

  #_cardClickHandler(evt) {
    this.#_openPopup();
    this.#_openHandler(evt);
  }

  createCardElement() {
    this.#_placeElement = this.#_getTemplate();
    this.#_placeElement.querySelector(this.#_cardImageSelector).src = this.#_link;
    this.#_placeElement.querySelector(this.#_cardImageSelector).alt = this.#_name;
    this.#_placeElement.querySelector(this.#_cardTextSelector).textContent = this.#_name;

    this.#_likeButtonElement = this.#_placeElement.querySelector(this.#_likeButtonSelector);

    this.#_setupEventListeners();
    return this.#_placeElement;
  }

  #_closeByEscapeHandler(evt) {
    if (evt.key !== 'Escape') return;
    this.#_closePopup();
  }

  #_openPopup() {
    this.#_popupElement.classList.add(this.#_popupOpeningModifier);
    document.addEventListener('keydown', this.#_closeByEscapeHandlerBound);
  }

  #_closePopup() {
    this.#_popupElement.classList.remove(this.#_popupOpeningModifier);
    document.removeEventListener('keydown', this.#_closeByEscapeHandlerBound);
  }

  #_getPopupElement() {
    return this.#_popupElement;
  }

}