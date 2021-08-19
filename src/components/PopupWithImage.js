import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  #_popupImageSelector;
  #_popupTextSelector;

  constructor({popupSelector, popupCloseButtonSelector, popupImageSelector, popupTextSelector}) {
    super({
      popupSelector:      popupSelector,
      exitButtonSelector: popupCloseButtonSelector
    });
    this.#_popupImageSelector = popupImageSelector;
    this.#_popupTextSelector = popupTextSelector;
  }

  open({imageLink, text}) {
    super.getElement().querySelector(this.#_popupImageSelector).src = imageLink;
    super.getElement().querySelector(this.#_popupImageSelector).alt = text;
    super.getElement().querySelector(this.#_popupTextSelector).textContent = text;
    super.open();
  }
}