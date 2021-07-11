let formHandlerMap;

function searchInArrayWithMap(array, map) {
  return array.find(elem => map.get(elem));
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const result = searchInArrayWithMap(Array.from(evt.currentTarget.classList), formHandlerMap);
  formHandlerMap.get(result)();
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
  formList.forEach(item => {
    if (!searchInArrayWithMap(Array.from(item.classList), handlerMap)) return;
    item.addEventListener('submit', formSubmitHandler);
  });

  const inputElement = document.querySelector(inputSelector);
  const submitButtonElement = document.querySelector(submitButtonSelector);
  const inactiveButtonElement = document.querySelector(inactiveButtonClass);
  const inputErrorElement = document.querySelector(inputErrorClass);
  const errorElement = document.querySelector(errorClass);
}