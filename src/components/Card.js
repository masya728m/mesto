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
  #_likeCounterSelector;
  #_likeModifier;
  #_likeButtonElement;

  #_imageClickHandler;

  #_likes;
  #_owner;
  #_cardId;

  #_deleteHandler;
  #_likeHandler;

  constructor(cardParams, selectorParams, imageClickHandler, deleteHandler, likeHandler) {
    this.#_link = cardParams.link;
    this.#_name = cardParams.name;

    this.#_templateSelector = selectorParams.templateSelector;
    this.#_deleteButtonSelector = selectorParams.deleteButtonSelector;
    this.#_cardSelector = selectorParams.cardSelector;
    this.#_cardImageSelector = selectorParams.cardImageSelector;
    this.#_cardTextSelector = selectorParams.cardTextSelector;
    this.#_likeButtonSelector = selectorParams.likeButtonSelector;
    this.#_likeCounterSelector = selectorParams.likeCounterSelector;
    this.#_likeModifier = selectorParams.likeModifier;
    this.#_imageClickHandler = imageClickHandler;
    this.#_likes = cardParams.likes.length;
    this.#_owner = cardParams.owner;
    this.#_cardId = cardParams._id;
    this.#_deleteHandler = deleteHandler;
    this.#_likeHandler = likeHandler;
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
    this.#_placeElement.querySelector(this.#_deleteButtonSelector).addEventListener('click', this.#_deleteButtonClickHandler.bind(this));
    this.#_likeButtonElement.addEventListener('click', this.#_likeButtonClickHandler.bind(this));
  }

  #_likeButtonClickHandler(evt) {
    this.#_likeHandler?.({cardId: this.#_cardId, isLiked: !evt.target.classList.contains(this.#_likeModifier)});
  }

  setLike(liked) {
    if (liked) {
      this.#_likeButtonElement.classList.add(this.#_likeModifier);
      this.#_likes++;
    } else {
      this.#_likeButtonElement.classList.remove(this.#_likeModifier);
      if (this.#_likes > 0)
        this.#_likes--;
    }
    this.#_placeElement.querySelector(this.#_likeCounterSelector).textContent = (this.#_likes > 0) ? this.#_likes : '';
  }

  #_deleteButtonClickHandler() {
    this.#_deleteHandler?.({cardId: this.#_cardId});
  }

  deleteCard() {
    this.#_placeElement.remove();
    this.#_placeElement = null;
  }

  createCardElement() {
    this.#_placeElement = this.#_getTemplate();
    this.#_placeElement.querySelector(this.#_cardImageSelector).src = this.#_link;
    this.#_placeElement.querySelector(this.#_cardImageSelector).alt = this.#_name;
    this.#_placeElement.querySelector(this.#_cardTextSelector).textContent = this.#_name;
    if (this.#_likes)
      this.#_placeElement.querySelector(this.#_likeCounterSelector).textContent = this.#_likes;

    this.#_likeButtonElement = this.#_placeElement.querySelector(this.#_likeButtonSelector);

    this.#_setupEventListeners();
    return this.#_placeElement;
  }
}