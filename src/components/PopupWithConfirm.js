import PopupWithForm from './PopupWithForm';

export default class PopupWithConfirm extends PopupWithForm {
  #_data;

  constructor({popupSelector, popupCloseButtonSelector}, {submitHandler}) {
    super({popupSelector, popupCloseButtonSelector}, {submitHandler});
  }
  setConfirmationData(data) {
    this.#_data = data;
  }

  getConfirmationData() {
    return this.#_data;
  }
}