let formHandlerMap;

function searchInArrayWithMap(array, map) {
  return array.find(elem => map.get(elem));
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const result = searchInArrayWithMap(Array.from(evt.currentTarget.classList), formHandlerMap);
  formHandlerMap.get(result)();
}

function displayError(field, errorMessage) {

}

function checkFieldValidity(field) {
  console.log(field.validity);
  if (field.validity.valid) return true;

  if (field.validity.valueMissing) {
    displayError(field, 'Вы пропустили это поле');
  } else if (field.validity.typeMismatch) {
    displayError(field, 'Введите адрес сайта');
  }
  return false;
}

function toggleButtonState(inputList, submitButton, inactiveButtonClass) {
  if (!inputList.every(input => input.validity.valid)) {
    submitButton.classList.add(inactiveButtonClass);
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
}

export function enableValidation(settings, handlerMap) {
  formHandlerMap = new Map(handlerMap);
  const formSelector = settings?.formSelector;
  const inputSelector = settings?.inputSelector;
  const submitButtonSelector = settings?.submitButtonSelector;
  const inactiveButtonClass = settings?.inactiveButtonClass;
  const inputErrorClass = settings?.inputErrorClass;
  const errorClass = settings?.errorClass;

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(form => {
    if (!searchInArrayWithMap(Array.from(form.classList), handlerMap)) return;
    form.addEventListener('submit', formSubmitHandler);

    const inputList = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);
    inputList.forEach(field => field.addEventListener('input', () => {
      if (!checkFieldValidity(field)) toggleButtonState(inputList, submitButton, inactiveButtonClass);
    }));

  });

  const inputElement = document.querySelectorAll(inputSelector);


  const submitButtonElement = document.querySelector(submitButtonSelector);
  const inactiveButtonElement = document.querySelector(inactiveButtonClass);
  const inputErrorElement = document.querySelector(inputErrorClass);
  const errorElement = document.querySelector(errorClass);
}