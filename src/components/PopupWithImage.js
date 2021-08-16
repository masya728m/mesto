import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  #_popupImageSelector;
  #_popupTextSelector;

  #_imageLink;
  #_text;

  constructor({popupSelector, popupCloseButtonSelector, popupImageSelector, popupTextSelector}, {imageLink, text}) {
    super({
      popupSelector:      popupSelector,
      exitButtonSelector: popupCloseButtonSelector
    });
    this.#_popupImageSelector = popupImageSelector;
    this.#_popupTextSelector = popupTextSelector;
    this.#_imageLink = imageLink;
    this.#_text = text;
  }

  open() {
    super.getElement().querySelector(this.#_popupImageSelector).setAttribute('src', this.#_imageLink);
    super.getElement().querySelector(this.#_popupTextSelector).textContent = this.#_text;
    super.open();
  }
}