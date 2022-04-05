export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) { //принимает DOM-элемент и добавляет его в контейнер
    this._container.prepend(element);
  }

  setItem(element) { //принимает DOM-элемент и добавляет его в контейнер
    this._container.append(element);
  }

  renderItems() {
    this._renderedItems.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}

