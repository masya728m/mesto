export default class FormValidator {
  #_formElement;

  #_submitButtonSelector;
  #_submitButtonElement;
  #_submitButtonDisableModifier;

  #_popupFieldSelector;
  #_popupFieldErrorModifier;
  #_popupFieldErrorSelector;

  #_fieldInputHandlerBound;

  constructor(formElement, formParams) {
    this.#_formElement = formElement;
    this.#_popupFieldSelector = formParams.popupFieldSelector;
    this.#_popupFieldErrorSelector = formParams.popupFieldErrorSelector;
    this.#_popupFieldErrorModifier = formParams.popupFieldErrorModifier;
    this.#_submitButtonSelector = formParams.submitButtonSelector;
    this.#_submitButtonDisableModifier = formParams.submitButtonDisableModifier;
    this.#_submitButtonElement = this.getPopupElement().querySelector(this.#_submitButtonSelector);

    this.#_fieldInputHandlerBound = this.#_fieldInputHandler.bind(this);
  }

  enableSubmitButton() {
    this.#_submitButtonElement.removeAttribute('disabled');
    this.#_submitButtonElement.classList.remove(this.#_submitButtonDisableModifier);
  }

  disableSubmitButton() {
    this.#_submitButtonElement.setAttribute('disabled', 'disabled');
    this.#_submitButtonElement.classList.add(this.#_submitButtonDisableModifier);
  }

  getInputFields() {
    return this.getPopupElement().querySelectorAll(this.#_popupFieldSelector);
  }

  enableValidation() {
    this.#_setupEventListeners();
  }

  #_setupEventListeners() {
    this.getInputFields().forEach(field => field.addEventListener('input', this.#_fieldInputHandlerBound));
  }


  #_fieldInputHandler(evt) {
    this.checkInputValidity(evt.target);
    this.#_toggleButtonState();
  }

  getPopupElement() {
    return this.#_formElement;
  }

  #_toggleButtonState() {
    if (!Array.from(this.getInputFields()).every(input => input.validity.valid)) {
      this.disableSubmitButton();
      return;
    }
    this.enableSubmitButton();
  }

  #_clearError(field) {
    field.classList.remove(this.#_popupFieldErrorModifier);
    field.parentElement.querySelector(this.#_popupFieldErrorSelector).textContent = '';
  }

  #_displayError(field, errorMessage) {
    field.classList.add(this.#_popupFieldErrorModifier);
    field.parentElement.querySelector(this.#_popupFieldErrorSelector).textContent = errorMessage;
  }

  checkInputValidity(field) {
    if (field.validity.valid) {
      this.#_clearError(field);
      return;
    }
    if (field.validity.valueMissing) {
      this.#_displayError(field, 'Вы пропустили это поле');
    } else if (field.validity.typeMismatch) {
      this.#_displayError(field, 'Введите адрес сайта');
    } else if (field.validity.tooShort) {
      this.#_displayError(field, `Минимальное количество символов: ${field.getAttribute('minlength')}. Длина текста сейчас: ${field.value.length} символ`);
    } else if (field.validity.tooLong) {
      this.#_displayError(field, `Максимальное количество символов: ${field.getAttribute('maxlength')}. Длина текста сейчас: ${field.value.length} символ`);
    }
  }

  clearErrorFields() {
    this.getPopupElement().querySelectorAll(this.#_popupFieldSelector).forEach(field => {
      this.#_clearError(field);
    });
  }
}