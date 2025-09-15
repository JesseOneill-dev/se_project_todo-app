export default class Section {
  constructor({ items, renderer, containSelector }) {
    // console.log(items);
    // console.log(renderer);
    // console.log(containSelector);
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containSelector);
  }
  rendererItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
