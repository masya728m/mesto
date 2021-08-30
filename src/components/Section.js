export default class Section {
  #_items;
  #_renderer;
  #_containerSelector;
  #_containerElement;

  #_renderCalled;

  constructor({items, renderer}, containerSelector) {
    this.#_items = items;
    this.#_renderer = renderer;
    this.#_containerSelector = containerSelector;
    this.#_containerElement = document.querySelector(this.#_containerSelector);
    this.#_renderCalled = false;
  }

  setItems(items) {
    this.#_items = items;
    if (!this.#_renderCalled)
      return;
    this.render();
  }

  render() {
    this.#_items.forEach(item => this.#_renderer(item));
    this.#_renderCalled = true;
  }

  addItem(item) {
    this.#_containerElement.prepend(item);
  }
}