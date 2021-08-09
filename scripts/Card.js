import {openPopup, popupOverview} from './index.js';

export default class Card {
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

  #_deleteButtonClickHandlerBound;

  #_likeButtonClickHandlerBound;

  #_popupTextSelector;
  #_popupImageSelector;

  constructor(cardParams, selectorParams) {
    this.#_link = cardParams.link;
    this.#_name = cardParams.name;

    this.#_templateSelector = selectorParams.templateSelector;
    this.#_deleteButtonSelector = selectorParams.deleteButtonSelector;
    this.#_cardSelector = selectorParams.cardSelector;
    this.#_cardImageSelector = selectorParams.cardImageSelector;
    this.#_cardTextSelector = selectorParams.cardTextSelector;
    this.#_likeButtonSelector = selectorParams.likeButtonSelector;
    this.#_likeModifier = selectorParams.likeModifier;

    this.#_popupImageSelector = selectorParams.popupImageSelector;
    this.#_popupTextSelector = selectorParams.popupTextSelector;

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

  #_setupEventListeners() {
    this.#_placeElement.querySelector(this.#_cardImageSelector).addEventListener('click', this.#_imageClickHandler);
    this.#_placeElement.querySelector(this.#_deleteButtonSelector).addEventListener('click', this.#_deleteButtonClickHandlerBound);
    this.#_likeButtonElement.addEventListener('click', this.#_likeButtonClickHandlerBound);
  }

  #_imageClickHandler(evt) {
    popupOverview.querySelector('.popup__overview-image').src = evt.target.src;
    popupOverview.querySelector('.popup__overview-image').alt = evt.target.alt;
    popupOverview.querySelector('.popup__overview-text').textContent = evt.target.alt;
    openPopup(popupOverview);
  }

  #_likeButtonClickHandler(evt) {
    evt.target.classList.toggle(this.#_likeModifier);
  }

  #_deleteButtonClickHandler() {
    this.#_placeElement.remove();
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