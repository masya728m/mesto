import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  #_submitHandler;
  #_formElement;

  constructor({popupSelector, popupCloseButtonSelector}, {submitHandler}) {
    super({
      popupSelector:      popupSelector,
      exitButtonSelector: popupCloseButtonSelector
    });
    this.#_submitHandler = submitHandler;
    this.#_formElement = super.getElement().querySelector('form');
  }

  #_getInputValues() {
    const formValues = {};
    this.#_formElement.querySelectorAll('input').forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#_formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this.#_submitHandler?.(this.#_getInputValues());
    });
  }

  close() {
    super.close();
    this.#_formElement.reset();
  }
}