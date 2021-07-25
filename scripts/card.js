import Popup from './popup.js';

export default class Card extends Popup {
  #_link;
  #_name;
  #_templateSelector;
  #_cardSelector;
  #_placeElement;

  #_cardImageSelector;
  #_cardTextSelector;

  #_deleteButtonSelector;

  #_likeButtonSelector;
  #_likeModifier;
  #_likeButtonElement;

  #_popupImageSelector;
  #_popupTextSelector;

  constructor(cardParams, selectorParams, popupParams) {
    super(popupParams);
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
  }

  #_getTemplate() {
    return document
      .querySelector(this.#_templateSelector)
      .content
      .querySelector(this.#_cardSelector)
      .cloneNode(true);
  }

  _openHandler(evt) {
    super.getPopupElement().querySelector(this.#_popupImageSelector).src = evt.target.src;
    super.getPopupElement().querySelector(this.#_popupImageSelector).alt = evt.target.alt;
    super.getPopupElement().querySelector(this.#_popupTextSelector).textContent = evt.target.alt;
  }

  #_setupEventListeners() {
    this.#_placeElement.querySelector(this.#_cardImageSelector).addEventListener('click', evt => {
      super.openPopup();
      this._openHandler(evt);
    });
    this.#_placeElement.querySelector(this.#_deleteButtonSelector).addEventListener('click', () => this.#_placeElement.remove());
    this.#_likeButtonElement.addEventListener('click', evt => evt.target.classList.toggle(this.#_likeModifier));
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
}