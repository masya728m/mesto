export default class Section {
  #_items;
  #_renderer;
  #_containerSelector;
  #_containerElement;

  constructor({items, renderer}, containerSelector) {
    this.#_items = items;
    this.#_renderer = renderer;
    this.#_containerSelector = containerSelector;
    this.#_containerElement = document.querySelector(this.#_containerSelector);
  }

  render() {
    this.#_items.forEach(item => this.#_renderer(item));
  }

  addItem(item) {
    this.#_containerElement.prepend(item);
  }
}